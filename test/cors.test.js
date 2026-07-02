import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createTestDb, seedTestDb } from './helpers/db.js';
import { buildCorsMiddleware } from '../src/middleware/cors.js';

const db = createTestDb();
const { domainId } = await seedTestDb(db);

const app = express();
app.use(buildCorsMiddleware(db));
app.get('/test', (req, res) => res.json({ ok: true }));

function makeRes() {
    const res = {
        _headers: {},
        statusCode: 200,
        header(k, v)      { this._headers[k.toLowerCase()] = v; return this; },
        setHeader(k, v)   { this._headers[k.toLowerCase()] = v; return this; },
        getHeader(k)      { return this._headers[k.toLowerCase()]; },
        removeHeader(k)   { delete this._headers[k.toLowerCase()]; return this; },
        status(c)         { this.statusCode = c; return this; },
        json(d)           { this._body = d; this._resolve(this); },
        send(d)           { this._raw = d; this._resolve(this); },
        sendStatus(c)     { this.statusCode = c; this._resolve(this); },
        cookie()          { return this; },
        clearCookie()     { return this; },
    };
    return res;
}

function req(origin) {
    return new Promise((resolve) => {
        const res = makeRes();
        res._resolve = resolve;
        const request = {
            method: 'GET',
            url: '/test',
            path: '/test',
            headers: origin ? { origin } : {},
            body: {},
            query: {},
            params: {},
        };
        app.handle(request, res, () => resolve(res));
    });
}

test('allows origin matching a registered domain', async () => {
    const res = await req('https://example.com');
    assert.equal(res._headers['access-control-allow-origin'], 'https://example.com');
});

test('allows origin listed in allowed_origins', async () => {
    db.prepare('UPDATE domains SET allowed_origins = ? WHERE id = ?')
        .run('http://localhost:4321\nhttp://localhost:3000', domainId);

    const res = await req('http://localhost:4321');
    assert.equal(res._headers['access-control-allow-origin'], 'http://localhost:4321');
});

test('allows second origin in allowed_origins list', async () => {
    const res = await req('http://localhost:3000');
    assert.equal(res._headers['access-control-allow-origin'], 'http://localhost:3000');
});

test('rejects origin not in allowed_origins (wrong port)', async () => {
    const res = await req('http://localhost:9999');
    assert.equal(res._headers['access-control-allow-origin'], undefined);
});

test('rejects unknown origin when allowed_origins is null', async () => {
    db.prepare('UPDATE domains SET allowed_origins = NULL WHERE id = ?').run(domainId);

    const res = await req('http://localhost:4321');
    assert.equal(res._headers['access-control-allow-origin'], undefined);
});

test('rejects completely unknown origin', async () => {
    const res = await req('https://evil.com');
    assert.equal(res._headers['access-control-allow-origin'], undefined);
});

test('passes through requests with no origin header', async () => {
    const res = await req(null);
    assert.equal(res._headers['access-control-allow-origin'], undefined);
});

// --- OPTIONS preflight ---

test('OPTIONS preflight returns 200', async () => {
    const res = await new Promise((resolve) => {
        const r = makeRes();
        r._resolve = resolve;
        app.handle({
            method: 'OPTIONS',
            url: '/test',
            path: '/test',
            headers: { origin: 'https://example.com' },
            body: {},
            query: {},
            params: {},
        }, r, () => resolve(r));
    });
    assert.equal(res.statusCode, 200);
});

// --- Always-set headers ---

test('always sets Access-Control-Allow-Methods on a matched origin', async () => {
    const res = await req('https://example.com');
    assert.ok(res._headers['access-control-allow-methods']);
    assert.match(res._headers['access-control-allow-methods'], /GET/);
    assert.match(res._headers['access-control-allow-methods'], /POST/);
});

test('always sets Access-Control-Allow-Credentials on a matched origin', async () => {
    const res = await req('https://example.com');
    assert.equal(res._headers['access-control-allow-credentials'], 'true');
});

test('sets Allow-Methods even for unrecognised origins', async () => {
    const res = await req('https://evil.com');
    assert.ok(res._headers['access-control-allow-methods']);
});

test('sets Allow-Credentials even for unrecognised origins', async () => {
    const res = await req('https://evil.com');
    assert.equal(res._headers['access-control-allow-credentials'], 'true');
});

// --- Edge cases ---

test('handles a malformed origin URL without crashing', async () => {
    // 'not-a-url' throws in the URL constructor; middleware falls back to treating it as a raw hostname
    const res = await req('not-a-url');
    assert.equal(res._headers['access-control-allow-origin'], undefined);
    assert.ok(res._headers['access-control-allow-methods']); // common headers still set
});

test('handles a DB error gracefully and still processes the request', async () => {
    const brokenDb = { prepare: () => { throw new Error('DB failure'); } };
    const brokenApp = express();
    brokenApp.use(buildCorsMiddleware(brokenDb));
    brokenApp.get('/test', (_req, res) => res.json({ ok: true }));

    const res = await new Promise((resolve) => {
        const r = makeRes();
        r._resolve = resolve;
        brokenApp.handle(
            { method: 'GET', url: '/test', path: '/test', headers: { origin: 'https://example.com' }, body: {}, query: {}, params: {} },
            r,
            () => resolve(r),
        );
    });
    // DB error is caught — request still continues, common headers still set
    assert.ok(res._headers['access-control-allow-methods']);
});
