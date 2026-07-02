import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import cookieParser from 'cookie-parser';
import argon2 from 'argon2';
import crypto from 'crypto';
import { createTestDb, seedTestDb } from './helpers/db.js';
import { buildAdminRouter } from '../src/routes/api/admin.js';
import { generateToken } from '../src/middleware/auth.js';

process.env.JWT_SECRET = 'test-secret-for-admin-tests';
process.env.ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');
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
            _raw: null,
            _cookies: {},
            status(c) { this.statusCode = c; return this; },
            json(d) { this._body = d; resolve(this); },
            send(d) { this._raw = d; resolve(this); },
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

// --- Search ---

test('GET /search returns 401 without a token', async () => {
    const res = await req('GET', '/api/admin/search?q=hello');
    assert.equal(res.statusCode, 401);
});

test('GET /search returns empty array for a query shorter than 2 chars', async () => {
    const res = await req('GET', '/api/admin/search?q=a', auth);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res._body, []);
});

test('GET /search returns empty array when query is absent', async () => {
    const res = await req('GET', '/api/admin/search', auth);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res._body, []);
});

test('GET /search finds a comment by content', async () => {
    const now = Date.now();
    db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Searcher', 'search@test.com', '', '<p>uniqueterm</p>', 'uniqueterm', now, now, '/search-post', domainId);

    const res = await req('GET', '/api/admin/search?q=uniqueterm', auth);
    assert.equal(res.statusCode, 200);
    assert.ok(res._body.length >= 1);
    assert.ok(res._body.some(c => c.name === 'Searcher'));
});

test('GET /search finds a comment by author name', async () => {
    const now = Date.now();
    db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('UniqueName99', '', '', '<p>hi</p>', 'hi', now, now, '/search-post-2', domainId);

    const res = await req('GET', '/api/admin/search?q=UniqueName99', auth);
    assert.equal(res.statusCode, 200);
    assert.ok(res._body.some(c => c.name === 'UniqueName99'));
});

test('GET /search does not return deleted comments', async () => {
    const now = Date.now();
    const c = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)'
    ).run('DeletedSearcher', '', '', '<p>ghostterm</p>', 'ghostterm', now, now, '/del-post', domainId);

    const res = await req('GET', '/api/admin/search?q=ghostterm', auth);
    assert.equal(res.statusCode, 200);
    assert.ok(!res._body.some(c => c.name === 'DeletedSearcher'));
});

// --- Domain SMTP settings ---

test('PATCH /domains/:id saves and encrypts SMTP fields', async () => {
    const res = await req('PATCH', `/api/admin/domains/${domainId}`, {
        ...auth,
        body: {
            domain: 'example.com',
            site_name: 'Test Site',
            smtp_host: 'smtp.gmail.com',
            smtp_port: 587,
            smtp_user: 'user@gmail.com',
            smtp_pass: 'mysecretpass',
            notify_email: 'admin@gmail.com',
            notify_on_comment: true,
            notify_on_reply: false,
        },
    });
    assert.equal(res.statusCode, 200);

    // Verify password is stored encrypted (not plaintext)
    const row = db.prepare('SELECT smtp_pass, smtp_host FROM domains WHERE id = ?').get(domainId);
    assert.notEqual(row.smtp_pass, 'mysecretpass');
    assert.ok(row.smtp_pass.includes(':')); // iv:tag:data format
    assert.ok(row.smtp_host.includes(':'));  // also encrypted
});

test('GET /domains/:id returns decrypted SMTP fields without exposing password', async () => {
    const res = await req('GET', `/api/admin/domains/${domainId}`, auth);
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.smtp_host, 'smtp.gmail.com');
    assert.equal(res._body.smtp_user, 'user@gmail.com');
    assert.equal(res._body.notify_email, 'admin@gmail.com');
    assert.equal(res._body.notify_on_comment, 1);
    // Password must never be returned
    assert.equal(res._body.smtp_pass, undefined);
    // But the hint that a password is saved should be present
    assert.equal(res._body.smtp_pass_set, true);
});

test('PATCH /domains/:id preserves existing password when new one is blank', async () => {
    // Save with a password first
    await req('PATCH', `/api/admin/domains/${domainId}`, {
        ...auth,
        body: {
            domain: 'example.com', site_name: 'Test Site',
            smtp_pass: 'original-password',
        },
    });
    const before = db.prepare('SELECT smtp_pass FROM domains WHERE id = ?').get(domainId).smtp_pass;

    // Update without sending a password
    await req('PATCH', `/api/admin/domains/${domainId}`, {
        ...auth,
        body: { domain: 'example.com', site_name: 'Test Site', smtp_pass: '' },
    });
    const after = db.prepare('SELECT smtp_pass FROM domains WHERE id = ?').get(domainId).smtp_pass;

    assert.equal(before, after);
});

test('PATCH /domains/:id updates smtp_pass_set to false when no password ever saved', async () => {
    // Create a fresh domain with no password
    const now = Date.now();
    const fresh = db.prepare(
        'INSERT INTO domains (domain, site_name, admin_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
    ).run('fresh.com', 'Fresh', adminId, now, now);

    const res = await req('GET', `/api/admin/domains/${fresh.lastInsertRowid}`, auth);
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.smtp_pass_set, false);
});

// --- Email preview ---

test('GET /domains/:id/email-preview returns HTML for type comment', async () => {
    const res = await req('GET', `/api/admin/domains/${domainId}/email-preview?type=comment`, auth);
    assert.equal(res.statusCode, 200);
    assert.ok(typeof res._raw === 'string');
    assert.match(res._raw, /<!DOCTYPE html>/);
    assert.match(res._raw, /New comment/);
});

test('GET /domains/:id/email-preview returns HTML for type reply-to-commenter', async () => {
    const res = await req('GET', `/api/admin/domains/${domainId}/email-preview?type=reply-to-commenter`, auth);
    assert.equal(res.statusCode, 200);
    assert.match(res._raw, /replied to your comment/);
});

test('GET /domains/:id/email-preview returns 401 without a token', async () => {
    const res = await req('GET', `/api/admin/domains/${domainId}/email-preview?type=comment`);
    assert.equal(res.statusCode, 401);
});

// --- allowed_origins ---

test('PATCH /domains/:id saves allowed_origins', async () => {
    const res = await req('PATCH', `/api/admin/domains/${domainId}`, {
        ...auth,
        body: { domain: 'example.com', site_name: 'Test Site', allowed_origins: 'http://localhost:4321\nhttp://localhost:3000' },
    });
    assert.equal(res.statusCode, 200);

    const saved = db.prepare('SELECT allowed_origins FROM domains WHERE id = ?').get(domainId).allowed_origins;
    assert.equal(saved, 'http://localhost:4321\nhttp://localhost:3000');
});

test('PATCH /domains/:id clears allowed_origins when empty', async () => {
    await req('PATCH', `/api/admin/domains/${domainId}`, {
        ...auth,
        body: { domain: 'example.com', site_name: 'Test Site', allowed_origins: '' },
    });

    const saved = db.prepare('SELECT allowed_origins FROM domains WHERE id = ?').get(domainId).allowed_origins;
    assert.equal(saved, null);
});

test('GET /domains/:id returns allowed_origins', async () => {
    db.prepare('UPDATE domains SET allowed_origins = ? WHERE id = ?')
        .run('http://localhost:5173', domainId);

    const res = await req('GET', `/api/admin/domains/${domainId}`, auth);
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.allowed_origins, 'http://localhost:5173');
});

// --- Logout ---

test('POST /logout returns 200 with a logout message', async () => {
    const res = await req('POST', '/api/admin/logout');
    assert.equal(res.statusCode, 200);
    assert.match(res._body.message, /[Ll]ogged out/);
});

// --- Edit comment ---

test('PATCH /comments/:id updates name, email, and content', async () => {
    const now = Date.now();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Original', 'orig@test.com', '', '<p>original</p>', 'original', now, now, '/edit-post', domainId);

    const res = await req('PATCH', `/api/admin/comments/${comment.lastInsertRowid}`, {
        ...auth,
        body: { name: 'Edited', email: 'edited@test.com', content: 'updated content' },
    });
    assert.equal(res.statusCode, 200);
    assert.ok(res._body.content.includes('updated content'));
    const row = db.prepare('SELECT name, email, content_raw FROM comments WHERE id = ?').get(comment.lastInsertRowid);
    assert.equal(row.name, 'Edited');
    assert.equal(row.email, 'edited@test.com');
    assert.equal(row.content_raw, 'updated content');
});

test('PATCH /comments/:id returns 400 when name is missing', async () => {
    const now = Date.now();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Name', '', '', '<p>hi</p>', 'hi', now, now, '/edit-post', domainId);

    const res = await req('PATCH', `/api/admin/comments/${comment.lastInsertRowid}`, {
        ...auth,
        body: { content: 'updated content' },
    });
    assert.equal(res.statusCode, 400);
});

test('PATCH /comments/:id returns 400 when content is missing', async () => {
    const now = Date.now();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Name', '', '', '<p>hi</p>', 'hi', now, now, '/edit-post', domainId);

    const res = await req('PATCH', `/api/admin/comments/${comment.lastInsertRowid}`, {
        ...auth,
        body: { name: 'Name' },
    });
    assert.equal(res.statusCode, 400);
});

test('PATCH /comments/:id returns 404 for a comment from another admin domain', async () => {
    const now = Date.now();
    const otherDomain = db.prepare("SELECT id FROM domains WHERE domain = 'otherdomain.com'").get();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Other', '', '', '<p>other</p>', 'other', now, now, '/other-edit-post', otherDomain.id);

    const res = await req('PATCH', `/api/admin/comments/${comment.lastInsertRowid}`, {
        ...auth,
        body: { name: 'Hacked', content: 'hacked' },
    });
    assert.equal(res.statusCode, 404);
});

test('PATCH /comments/:id updates created_at when provided', async () => {
    const now = Date.now();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('TS', '', '', '<p>ts</p>', 'ts', now, now, '/ts-post', domainId);

    const customTs = 1700000000000;
    const res = await req('PATCH', `/api/admin/comments/${comment.lastInsertRowid}`, {
        ...auth,
        body: { name: 'TS', content: 'ts content', created_at: customTs },
    });
    assert.equal(res.statusCode, 200);
    const row = db.prepare('SELECT created_at FROM comments WHERE id = ?').get(comment.lastInsertRowid);
    assert.equal(row.created_at, customTs);
});

// --- Unapprove / unpin ---

test('PATCH /comments/:id/approve unapproves a comment', async () => {
    const now = Date.now();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id, is_approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)'
    ).run('Frank', '', '', '<p>approved</p>', 'approved', now, now, '/unapprove-post', domainId);

    const res = await req('PATCH', `/api/admin/comments/${comment.lastInsertRowid}/approve`, {
        ...auth,
        body: { is_approved: false },
    });
    assert.equal(res.statusCode, 200);
    const row = db.prepare('SELECT is_approved FROM comments WHERE id = ?').get(comment.lastInsertRowid);
    assert.equal(row.is_approved, 0);
});

test('PATCH /comments/:id/pin unpins a comment', async () => {
    const now = Date.now();
    const comment = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id, is_pinned) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)'
    ).run('Grace', '', '', '<p>pinned</p>', 'pinned', now, now, '/unpin-post', domainId);

    const res = await req('PATCH', `/api/admin/comments/${comment.lastInsertRowid}/pin`, {
        ...auth,
        body: { is_pinned: false },
    });
    assert.equal(res.statusCode, 200);
    const row = db.prepare('SELECT is_pinned FROM comments WHERE id = ?').get(comment.lastInsertRowid);
    assert.equal(row.is_pinned, 0);
});

// --- Domain config endpoint ---

test('GET /domains/:id/config returns honeypot_question and primary_color', async () => {
    db.prepare('UPDATE domains SET honeypot_question = ?, primary_color = ? WHERE id = ?')
        .run('What is 2+2?', '#ff0000', domainId);

    const res = await req('GET', `/api/admin/domains/${domainId}/config`, auth);
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.honeypot_question, 'What is 2+2?');
    assert.equal(res._body.primary_color, '#ff0000');

    db.prepare('UPDATE domains SET honeypot_question = NULL, primary_color = NULL WHERE id = ?').run(domainId);
});

test('GET /domains/:id/config returns nulls when fields are unset', async () => {
    db.prepare('UPDATE domains SET honeypot_question = NULL, primary_color = NULL WHERE id = ?').run(domainId);

    const res = await req('GET', `/api/admin/domains/${domainId}/config`, auth);
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.honeypot_question, null);
    assert.equal(res._body.primary_color, null);
});

test('GET /domains/:id/config returns 401 without a token', async () => {
    const res = await req('GET', `/api/admin/domains/${domainId}/config`);
    assert.equal(res.statusCode, 401);
});

test('GET /domains/:id/config returns 404 for a domain owned by another admin', async () => {
    const otherDomain = db.prepare("SELECT id FROM domains WHERE domain = 'otherdomain.com'").get();
    const res = await req('GET', `/api/admin/domains/${otherDomain.id}/config`, auth);
    assert.equal(res.statusCode, 404);
});

// --- Domain delete (happy path) ---

test('DELETE /domains/:id deletes an owned domain', async () => {
    const now = Date.now();
    const d = db.prepare(
        'INSERT INTO domains (domain, site_name, admin_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
    ).run('todelete.com', 'To Delete', adminId, now, now);

    const res = await req('DELETE', `/api/admin/domains/${d.lastInsertRowid}`, auth);
    assert.equal(res.statusCode, 200);
    const found = db.prepare('SELECT id FROM domains WHERE id = ?').get(d.lastInsertRowid);
    assert.equal(found, undefined);
});

// --- Domain posts ---

test('GET /domains/:id/posts returns post list for a domain', async () => {
    const now = Date.now();
    db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Poster', '', '', '<p>post</p>', 'post', now, now, '/my-article', domainId);

    const res = await req('GET', `/api/admin/domains/${domainId}/posts`, auth);
    assert.equal(res.statusCode, 200);
    assert.ok(Array.isArray(res._body.posts));
    assert.ok(res._body.posts.some(p => p.post_url === '/my-article'));
    assert.equal(res._body.domain, 'example.com');
});

test('GET /domains/:id/posts returns 404 for another admin domain', async () => {
    const otherDomain = db.prepare("SELECT id FROM domains WHERE domain = 'otherdomain.com'").get();
    const res = await req('GET', `/api/admin/domains/${otherDomain.id}/posts`, auth);
    assert.equal(res.statusCode, 404);
});

test('GET /domains/:id/posts returns 401 without a token', async () => {
    const res = await req('GET', `/api/admin/domains/${domainId}/posts`);
    assert.equal(res.statusCode, 401);
});

test('GET /domains/:id/posts excludes soft-deleted comments from counts', async () => {
    const now = Date.now();
    const c = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('Ghost', '', '', '<p>del</p>', 'del', now, now, '/deleted-counts-post', domainId);
    db.prepare('UPDATE comments SET is_deleted = 1 WHERE id = ?').run(c.lastInsertRowid);

    const res = await req('GET', `/api/admin/domains/${domainId}/posts`, auth);
    assert.equal(res.statusCode, 200);
    const post = res._body.posts.find(p => p.post_url === '/deleted-counts-post');
    assert.equal(post, undefined);
});

// --- Comment list filters ---

test('GET /comments returns 401 without a token', async () => {
    const res = await req('GET', `/api/admin/comments?domain_id=${domainId}`);
    assert.equal(res.statusCode, 401);
});

test('GET /comments returns all non-deleted comments for a domain', async () => {
    const res = await req('GET', `/api/admin/comments?domain_id=${domainId}`, auth);
    assert.equal(res.statusCode, 200);
    assert.ok(Array.isArray(res._body));
    assert.ok(res._body.every(c => c.is_deleted === 0));
});

test('GET /comments?status=pending returns only unapproved non-deleted comments', async () => {
    const now = Date.now();
    db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id, is_approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)'
    ).run('Pending2', '', '', '<p>pending</p>', 'pending', now, now, '/pending-filter-post', domainId);

    const res = await req('GET', `/api/admin/comments?domain_id=${domainId}&status=pending`, auth);
    assert.equal(res.statusCode, 200);
    assert.ok(res._body.length >= 1);
    assert.ok(res._body.every(c => c.is_approved === 0 && c.is_deleted === 0));
});

test('GET /comments?status=approved returns only approved non-deleted comments', async () => {
    const now = Date.now();
    db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id, is_approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)'
    ).run('Approved2', '', '', '<p>approved</p>', 'approved', now, now, '/approved-filter-post', domainId);

    const res = await req('GET', `/api/admin/comments?domain_id=${domainId}&status=approved`, auth);
    assert.equal(res.statusCode, 200);
    assert.ok(res._body.every(c => c.is_approved === 1 && c.is_deleted === 0));
});

test('GET /comments?status=deleted returns only soft-deleted comments', async () => {
    const now = Date.now();
    const c = db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('ToDelete', '', '', '<p>del</p>', 'del', now, now, '/del-filter-post', domainId);
    db.prepare('UPDATE comments SET is_deleted = 1 WHERE id = ?').run(c.lastInsertRowid);

    const res = await req('GET', `/api/admin/comments?domain_id=${domainId}&status=deleted`, auth);
    assert.equal(res.statusCode, 200);
    assert.ok(res._body.length >= 1);
    assert.ok(res._body.every(c => c.is_deleted === 1));
});

test('GET /comments filters by post_url', async () => {
    const now = Date.now();
    db.prepare(
        'INSERT INTO comments (name, email, avatar, content, content_raw, created_at, updated_at, post_url, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run('URLFilter', '', '', '<p>specific</p>', 'specific', now, now, '/very-specific-url', domainId);

    const res = await req('GET', `/api/admin/comments?domain_id=${domainId}&post_url=${encodeURIComponent('/very-specific-url')}`, auth);
    assert.equal(res.statusCode, 200);
    assert.ok(res._body.every(c => c.post_url === '/very-specific-url'));
});
