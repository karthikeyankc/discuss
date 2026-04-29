import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createTestDb, seedTestDb } from './helpers/db.js';
import { buildCommentsRouter } from '../src/routes/api/comments.js';

process.env.JWT_SECRET = 'test-secret-for-comment-tests';
process.env.NODE_ENV = 'test';

const db = createTestDb();
const { domainId } = await seedTestDb(db);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/comments', buildCommentsRouter(db));

// Minimal in-process request helper — no network, no supertest needed
function req(method, path, { body, origin = 'http://example.com', cookies = {} } = {}) {
    return new Promise((resolve) => {
        const res = {
            statusCode: 200,
            _body: null,
            _cookies: {},
            status(c) { this.statusCode = c; return this; },
            json(d) { this._body = d; resolve(this); },
            cookie(k, v) { this._cookies[k] = v; return this; },
            clearCookie() { return this; },
            setHeader() { return this; },
            getHeader() {},
            header() { return this; },
            removeHeader() {},
        };
        const [pathname, search] = path.split('?');
        const request = {
            method,
            url: path,
            path: pathname,
            headers: { 'content-type': 'application/json', origin },
            cookies,
            body: body || {},
            query: search ? Object.fromEntries(new URLSearchParams(search)) : {},
            params: {},
        };
        app.handle(request, res, () => {
            res.statusCode = 404;
            res._body = { error: 'Not found' };
            resolve(res);
        });
    });
}

const validPost = { name: 'Alice', content: 'Hello world', post_url: 'https://example.com/post-1' };

// --- GET ---

test('GET returns 400 when post_url is missing', async () => {
    const res = await req('GET', '/api/comments');
    assert.equal(res.statusCode, 400);
});

test('GET returns empty array for a new post', async () => {
    const res = await req('GET', '/api/comments?post_url=https://example.com/new-post');
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res._body, []);
});

test('GET does not expose email field', async () => {
    await req('POST', '/api/comments', { body: { ...validPost, post_url: 'https://example.com/email-test' } });
    const res = await req('GET', '/api/comments?post_url=https://example.com/email-test');
    assert.equal(res.statusCode, 200);
    res._body.forEach(c => assert.equal(c.email, undefined));
});

test('GET only returns approved non-deleted comments', async () => {
    const post = await req('POST', '/api/comments', {
        body: { ...validPost, post_url: 'https://example.com/filter-test' },
    });
    db.prepare('UPDATE comments SET is_deleted = 1 WHERE id = ?').run(post._body.id);

    const res = await req('GET', '/api/comments?post_url=https://example.com/filter-test');
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.length, 0);
});

// --- POST ---

test('POST creates a comment and returns 201', async () => {
    const res = await req('POST', '/api/comments', { body: validPost });
    assert.equal(res.statusCode, 201);
    assert.ok(res._body.id);
});

test('POST returns 400 when name is missing', async () => {
    const res = await req('POST', '/api/comments', {
        body: { content: 'hi', post_url: 'https://example.com/post-1' },
    });
    assert.equal(res.statusCode, 400);
});

test('POST returns 400 when content is missing', async () => {
    const res = await req('POST', '/api/comments', {
        body: { name: 'Alice', post_url: 'https://example.com/post-1' },
    });
    assert.equal(res.statusCode, 400);
});

test('POST returns 400 when post_url is missing', async () => {
    const res = await req('POST', '/api/comments', {
        body: { name: 'Alice', content: 'hi' },
    });
    assert.equal(res.statusCode, 400);
});

test('POST returns 403 when origin is not a registered domain', async () => {
    const res = await req('POST', '/api/comments', {
        body: validPost,
        origin: 'http://notregistered.com',
    });
    assert.equal(res.statusCode, 403);
});

test('POST returns 400 when hidden honeypot field is filled', async () => {
    const res = await req('POST', '/api/comments', {
        body: { ...validPost, honeypot_field: 'gotcha' },
    });
    assert.equal(res.statusCode, 400);
    assert.match(res._body.error, /[Ss]pam/);
});

test('POST queues for moderation when blocked word matches', async () => {
    db.prepare('UPDATE domains SET blocked_words = ? WHERE id = ?')
        .run(JSON.stringify(['badword']), domainId);

    const res = await req('POST', '/api/comments', {
        body: { ...validPost, content: 'this has badword in it' },
    });
    assert.equal(res.statusCode, 201);
    const row = db.prepare('SELECT is_approved FROM comments WHERE id = ?').get(res._body.id);
    assert.equal(row.is_approved, 0);

    db.prepare('UPDATE domains SET blocked_words = NULL WHERE id = ?').run(domainId);
});

test('POST approves comment when no blocked words match', async () => {
    const res = await req('POST', '/api/comments', {
        body: { ...validPost, content: 'totally clean content' },
    });
    assert.equal(res.statusCode, 201);
    const row = db.prepare('SELECT is_approved FROM comments WHERE id = ?').get(res._body.id);
    assert.equal(row.is_approved, 1);
});

test('POST increments reply_count on parent when parent_id is set', async () => {
    const parent = await req('POST', '/api/comments', { body: validPost });
    const parentId = parent._body.id;

    await req('POST', '/api/comments', {
        body: { ...validPost, parent_id: parentId },
    });

    const row = db.prepare('SELECT reply_count FROM comments WHERE id = ?').get(parentId);
    assert.equal(row.reply_count, 1);
});
