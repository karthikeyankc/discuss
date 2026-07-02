import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { createTestDb, seedTestDb } from './helpers/db.js';

// JWT_SECRET and ENCRYPTION_KEY must be set before any module that reads config.js
// or encrypt.js is loaded — static imports are hoisted past these lines in ESM.
process.env.JWT_SECRET = 'test-secret-for-comment-tests';
process.env.ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');
process.env.NODE_ENV = 'test';

// Dynamic imports keep the load order explicit so config.js picks up the env vars above.
const { encrypt } = await import('../src/lib/encrypt.js');
const { _setTransportForTest } = await import('../src/lib/mailer.js');
const { buildCommentsRouter } = await import('../src/routes/api/comments.js');

const sentNotifications = [];
_setTransportForTest(() => ({
    sendMail: async (opts) => { sentNotifications.push(opts); return { messageId: 'test' }; },
}));

const db = createTestDb();
const { adminId, domainId } = await seedTestDb(db);

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

// --- allowed_origins ---

test('POST allows comment from an origin in allowed_origins', async () => {
    db.prepare('UPDATE domains SET allowed_origins = ? WHERE id = ?')
        .run('http://localhost:4321', domainId);

    const res = await req('POST', '/api/comments', {
        origin: 'http://localhost:4321',
        body: { name: 'Dev', content: 'from localhost', post_url: '/dev-post' },
    });
    assert.equal(res.statusCode, 201);

    db.prepare('UPDATE domains SET allowed_origins = NULL WHERE id = ?').run(domainId);
});

test('POST rejects comment from origin not in allowed_origins', async () => {
    db.prepare('UPDATE domains SET allowed_origins = ? WHERE id = ?')
        .run('http://localhost:4321', domainId);

    const res = await req('POST', '/api/comments', {
        origin: 'http://localhost:9999',
        body: { name: 'Eve', content: 'sneaky', post_url: '/dev-post' },
    });
    assert.equal(res.statusCode, 403);

    db.prepare('UPDATE domains SET allowed_origins = NULL WHERE id = ?').run(domainId);
});

test('POST scopes comment to the correct domain when posted from allowed_origins', async () => {
    db.prepare('UPDATE domains SET allowed_origins = ? WHERE id = ?')
        .run('http://localhost:4321', domainId);

    const res = await req('POST', '/api/comments', {
        origin: 'http://localhost:4321',
        body: { name: 'Dev', content: 'scoped comment', post_url: '/scoped-post' },
    });
    assert.equal(res.statusCode, 201);

    const comment = db.prepare('SELECT domain_id FROM comments WHERE id = ?').get(res._body.id);
    assert.equal(comment.domain_id, domainId);

    db.prepare('UPDATE domains SET allowed_origins = NULL WHERE id = ?').run(domainId);
});

// --- GET /config ---

test('GET /config returns honeypot_question and primary_color for the matching domain', async () => {
    db.prepare('UPDATE domains SET honeypot_question = ?, primary_color = ? WHERE id = ?')
        .run('Leave this blank', '#3b82f6', domainId);

    const res = await req('GET', '/api/comments/config');
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.honeypot_question, 'Leave this blank');
    assert.equal(res._body.primary_color, '#3b82f6');

    db.prepare('UPDATE domains SET honeypot_question = NULL, primary_color = NULL WHERE id = ?').run(domainId);
});

test('GET /config returns 403 for an unregistered origin', async () => {
    const res = await req('GET', '/api/comments/config', { origin: 'http://evil.com' });
    assert.equal(res.statusCode, 403);
});

test('GET /config returns nulls when honeypot and color are not set', async () => {
    db.prepare('UPDATE domains SET honeypot_question = NULL, primary_color = NULL WHERE id = ?').run(domainId);

    const res = await req('GET', '/api/comments/config');
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.honeypot_question, null);
    assert.equal(res._body.primary_color, null);
});

// --- Custom honeypot question ---

test('POST returns 400 when custom honeypot_answer_given is non-empty', async () => {
    db.prepare('UPDATE domains SET honeypot_question = ? WHERE id = ?')
        .run('Leave this blank', domainId);

    const res = await req('POST', '/api/comments', {
        body: { ...validPost, honeypot_answer_given: 'I am a bot' },
    });
    assert.equal(res.statusCode, 400);
    assert.match(res._body.error, /[Ss]pam/);

    db.prepare('UPDATE domains SET honeypot_question = NULL WHERE id = ?').run(domainId);
});

test('POST allows comment when honeypot_answer_given is an empty string', async () => {
    db.prepare('UPDATE domains SET honeypot_question = ? WHERE id = ?')
        .run('Leave this blank', domainId);

    const res = await req('POST', '/api/comments', {
        body: { ...validPost, honeypot_answer_given: '' },
    });
    assert.equal(res.statusCode, 201);

    db.prepare('UPDATE domains SET honeypot_question = NULL WHERE id = ?').run(domainId);
});

test('POST allows comment when honeypot_question is set but answer field is absent', async () => {
    db.prepare('UPDATE domains SET honeypot_question = ? WHERE id = ?')
        .run('Leave this blank', domainId);

    const res = await req('POST', '/api/comments', { body: validPost });
    assert.equal(res.statusCode, 201);

    db.prepare('UPDATE domains SET honeypot_question = NULL WHERE id = ?').run(domainId);
});

// --- Trailing slash normalization ---

test('POST strips a trailing slash from post_url before storing', async () => {
    const res = await req('POST', '/api/comments', {
        body: { ...validPost, post_url: '/trailing-slash/' },
    });
    assert.equal(res.statusCode, 201);

    const row = db.prepare('SELECT post_url FROM comments WHERE id = ?').get(res._body.id);
    assert.equal(row.post_url, '/trailing-slash');
});

test('POST strips multiple trailing slashes from post_url', async () => {
    const res = await req('POST', '/api/comments', {
        body: { ...validPost, post_url: '/double-slash//' },
    });
    assert.equal(res.statusCode, 201);

    const row = db.prepare('SELECT post_url FROM comments WHERE id = ?').get(res._body.id);
    assert.equal(row.post_url, '/double-slash');
});

test('GET normalizes a trailing slash in the post_url query param', async () => {
    await req('POST', '/api/comments', {
        body: { ...validPost, post_url: '/slash-test-get' },
    });

    const res = await req('GET', '/api/comments?post_url=/slash-test-get/');
    assert.equal(res.statusCode, 200);
    assert.ok(res._body.length >= 1);
});

test('GET and POST with trailing-slash variants resolve to the same thread', async () => {
    await req('POST', '/api/comments', { body: { ...validPost, post_url: '/same-thread' } });
    await req('POST', '/api/comments', { body: { ...validPost, post_url: '/same-thread/' } });

    const res = await req('GET', '/api/comments?post_url=/same-thread');
    assert.equal(res.statusCode, 200);
    assert.equal(res._body.length, 2);
});

// --- Admin author flag ---

test('POST sets is_author=1 when posted with a valid admin JWT', async () => {
    const token = jwt.sign({ id: adminId }, 'test-secret-for-comment-tests', { expiresIn: '1d' });
    const res = await req('POST', '/api/comments', {
        cookies: { admin_token: token },
        body: { ...validPost, post_url: '/author-post' },
    });
    assert.equal(res.statusCode, 201);

    const row = db.prepare('SELECT is_author FROM comments WHERE id = ?').get(res._body.id);
    assert.equal(row.is_author, 1);
});

test('POST leaves is_author=0 when JWT belongs to a different admin', async () => {
    const now = Date.now();
    const other = db.prepare(
        'INSERT INTO admins (username, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
    ).run('stranger', 'stranger@test.com', 'hash', now, now);
    const token = jwt.sign({ id: other.lastInsertRowid }, 'test-secret-for-comment-tests', { expiresIn: '1d' });

    const res = await req('POST', '/api/comments', {
        cookies: { admin_token: token },
        body: { ...validPost, post_url: '/non-author-post' },
    });
    assert.equal(res.statusCode, 201);

    const row = db.prepare('SELECT is_author FROM comments WHERE id = ?').get(res._body.id);
    assert.equal(row.is_author, 0);
});

// --- domain_id fallback for admin posting from an unregistered origin ---

test('POST resolves domain via admin token + domain_id when origin is unregistered', async () => {
    const token = jwt.sign({ id: adminId }, 'test-secret-for-comment-tests', { expiresIn: '1d' });
    const res = await req('POST', '/api/comments', {
        origin: 'http://unregistered-origin.com',
        cookies: { admin_token: token },
        body: { name: 'Admin', content: 'Direct post', post_url: '/direct', domain_id: domainId },
    });
    assert.equal(res.statusCode, 201);
});

// --- Async notifications ---

test('POST dispatches comment notification when notify_on_comment is enabled', async () => {
    db.prepare('UPDATE domains SET notify_on_comment = 1, smtp_host = ?, smtp_port = 587, smtp_user = ?, smtp_pass = ?, notify_email = ? WHERE id = ?')
        .run(encrypt('smtp.test.com'), encrypt('u@test.com'), encrypt('p'), encrypt('admin@test.com'), domainId);

    sentNotifications.length = 0;
    const res = await req('POST', '/api/comments', {
        body: { ...validPost, post_url: '/notify-comment-test' },
    });
    assert.equal(res.statusCode, 201);

    // Let the fire-and-forget notification resolve
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(sentNotifications.length, 1);
    assert.match(sentNotifications[0].subject, /New comment/);

    db.prepare('UPDATE domains SET notify_on_comment = 0, smtp_host = NULL, smtp_user = NULL, smtp_pass = NULL, notify_email = NULL WHERE id = ?').run(domainId);
});

test('POST dispatches reply-to-commenter notification when parent has email', async () => {
    db.prepare('UPDATE domains SET smtp_host = ?, smtp_port = 587, smtp_user = ?, smtp_pass = ?, notify_email = ? WHERE id = ?')
        .run(encrypt('smtp.test.com'), encrypt('u@test.com'), encrypt('p'), encrypt('admin@test.com'), domainId);

    const parent = await req('POST', '/api/comments', {
        body: { name: 'Visitor', email: 'visitor@test.com', content: 'First post', post_url: '/reply-notify-test' },
    });

    sentNotifications.length = 0;
    const reply = await req('POST', '/api/comments', {
        body: { name: 'Bob', content: 'Reply to visitor', post_url: '/reply-notify-test', parent_id: parent._body.id },
    });
    assert.equal(reply.statusCode, 201);

    await new Promise(resolve => setImmediate(resolve));
    assert.equal(sentNotifications.length, 1);
    assert.equal(sentNotifications[0].to, 'visitor@test.com');

    db.prepare('UPDATE domains SET smtp_host = NULL, smtp_user = NULL, smtp_pass = NULL, notify_email = NULL WHERE id = ?').run(domainId);
});

test('POST dispatches reply-to-admin notification when parent is_author=1', async () => {
    db.prepare('UPDATE domains SET notify_on_reply = 1, smtp_host = ?, smtp_port = 587, smtp_user = ?, smtp_pass = ?, notify_email = ? WHERE id = ?')
        .run(encrypt('smtp.test.com'), encrypt('u@test.com'), encrypt('p'), encrypt('admin@test.com'), domainId);

    const token = jwt.sign({ id: adminId }, 'test-secret-for-comment-tests', { expiresIn: '1d' });
    const adminComment = await req('POST', '/api/comments', {
        cookies: { admin_token: token },
        body: { ...validPost, post_url: '/admin-reply-notify-test' },
    });

    sentNotifications.length = 0;
    const reply = await req('POST', '/api/comments', {
        body: { name: 'Visitor', content: 'Reply to admin', post_url: '/admin-reply-notify-test', parent_id: adminComment._body.id },
    });
    assert.equal(reply.statusCode, 201);

    await new Promise(resolve => setImmediate(resolve));
    assert.equal(sentNotifications.length, 1);
    assert.match(sentNotifications[0].subject, /New reply/);

    db.prepare('UPDATE domains SET notify_on_reply = 0, smtp_host = NULL, smtp_user = NULL, smtp_pass = NULL, notify_email = NULL WHERE id = ?').run(domainId);
});
