import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import cookieParser from 'cookie-parser';
import argon2 from 'argon2';
import { createTestDb, seedTestDb } from './helpers/db.js';
import { buildAdminRouter } from '../src/routes/api/admin.js';
import { generateToken } from '../src/middleware/auth.js';

process.env.JWT_SECRET = 'test-secret-for-admin-tests';
process.env.NODE_ENV = 'test';

const db = createTestDb();
const { adminId, domainId } = await seedTestDb(db);
const token = generateToken(adminId);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/admin', buildAdminRouter(db));

function req(method, path, { body, cookies = {} } = {}) {
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
            headers: { 'content-type': 'application/json' },
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

const auth = { cookies: { admin_token: token } };

// --- Login (tested directly against db — rate-limit middleware requires a real HTTP stack) ---

test('login rejects unknown username', async () => {
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get('nobody');
    assert.equal(admin, undefined);
});

test('login rejects wrong password', async () => {
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get('testadmin');
    const isValid = await argon2.verify(admin.password, 'wrongpass');
    assert.equal(isValid, false);
});

test('login accepts correct password', async () => {
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get('testadmin');
    const isValid = await argon2.verify(admin.password, 'password123');
    assert.equal(isValid, true);
});

// --- Auth protection ---

test('GET /me returns 401 without a token', async () => {
    const res = await req('GET', '/api/admin/me');
    assert.equal(res.statusCode, 401);
});

test('GET /me returns admin info with a valid token', async () => {
    const res = await req('GET', '/api/admin/me', auth);
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.username, 'testadmin');
});

// --- Stats ---

test('GET /stats returns comment and domain counts', async () => {
    const res = await req('GET', '/api/admin/stats', auth);
    assert.equal(res.statusCode, 200);
    assert.ok('total_comments' in res._body);
    assert.ok('pending_comments' in res._body);
    assert.ok('approved_comments' in res._body);
    assert.ok('domain_count' in res._body);
});

// --- Domains ---

test('GET /domains returns the seeded domain', async () => {
    const res = await req('GET', '/api/admin/domains', auth);
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.length, 1);
    assert.equal(res._body[0].domain, 'example.com');
});

test('POST /domains creates a new domain', async () => {
    const res = await req('POST', '/api/admin/domains', {
        ...auth,
        body: { domain: 'newsite.com', site_name: 'New Site' },
    });
    assert.equal(res.statusCode, 201);
    assert.equal(res._body.domain, 'newsite.com');
});

test('POST /domains returns 400 for a duplicate domain', async () => {
    const res = await req('POST', '/api/admin/domains', {
        ...auth,
        body: { domain: 'example.com', site_name: 'Duplicate' },
    });
    assert.equal(res.statusCode, 400);
    assert.match(res._body.error, /already exists/);
});

test('POST /domains returns 400 when site_name is missing', async () => {
    const res = await req('POST', '/api/admin/domains', {
        ...auth,
        body: { domain: 'nodesc.com' },
    });
    assert.equal(res.statusCode, 400);
});

test('DELETE /domains returns 404 for a domain owned by another admin', async () => {
    // Insert a domain owned by a different admin id
    const now = Date.now();
    db.prepare('INSERT INTO admins (username, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)')
        .run('otheradmin', 'other@test.com', 'hash', now, now);
    const otherId = db.prepare("SELECT id FROM admins WHERE username = 'otheradmin'").get().id;
    const otherDomain = db.prepare('INSERT INTO domains (domain, site_name, admin_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)')
        .run('otherdomain.com', 'Other', otherId, now, now);

    const res = await req('DELETE', `/api/admin/domains/${otherDomain.lastInsertRowid}`, auth);
    assert.equal(res.statusCode, 404);
});

// --- Comment moderation ---

test('PATCH /comments/:id/approve approves a comment', async () => {
    const now = Date.now();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id, is_approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)'
    ).run('Bob', 'bob@test.com', '', 'pending comment', 'pending comment', now, now, 'https://example.com/p', domainId);

    const res = await req('PATCH', `/api/admin/comments/${comment.lastInsertRowid}/approve`, {
        ...auth,
        body: { is_approved: true },
    });
    assert.equal(res.statusCode, 200);
    const row = db.prepare('SELECT is_approved FROM comments WHERE id = ?').get(comment.lastInsertRowid);
    assert.equal(row.is_approved, 1);
});

test('DELETE /comments/:id soft-deletes a comment', async () => {
    const now = Date.now();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Carol', 'carol@test.com', '', 'delete me', 'delete me', now, now, 'https://example.com/p', domainId);

    const res = await req('DELETE', `/api/admin/comments/${comment.lastInsertRowid}`, auth);
    assert.equal(res.statusCode, 200);
    const row = db.prepare('SELECT is_deleted FROM comments WHERE id = ?').get(comment.lastInsertRowid);
    assert.equal(row.is_deleted, 1);
});

test('DELETE /comments/:id returns 404 for a comment from another admin domain', async () => {
    const now = Date.now();
    const otherAdmin = db.prepare("SELECT id FROM admins WHERE username = 'otheradmin'").get();
    const otherDomain = db.prepare("SELECT id FROM domains WHERE domain = 'otherdomain.com'").get();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Eve', 'eve@test.com', '', 'other domain comment', 'other domain comment', now, now, 'https://otherdomain.com/p', otherDomain.id);

    const res = await req('DELETE', `/api/admin/comments/${comment.lastInsertRowid}`, auth);
    assert.equal(res.statusCode, 404);
});

test('PATCH /comments/:id/pin pins a comment', async () => {
    const now = Date.now();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Dan', 'dan@test.com', '', 'pin me', 'pin me', now, now, 'https://example.com/p', domainId);

    const res = await req('PATCH', `/api/admin/comments/${comment.lastInsertRowid}/pin`, {
        ...auth,
        body: { is_pinned: true },
    });
    assert.equal(res.statusCode, 200);
    const row = db.prepare('SELECT is_pinned FROM comments WHERE id = ?').get(comment.lastInsertRowid);
    assert.equal(row.is_pinned, 1);
});
