import { test } from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'test-secret-for-auth-tests';

const { generateToken, authenticateAdmin } = await import('../src/middleware/auth.js');

// --- generateToken ---

test('generateToken returns a signed JWT', () => {
    const token = generateToken(42);
    const decoded = jwt.verify(token, 'test-secret-for-auth-tests');
    assert.equal(decoded.id, 42);
});

test('generateToken expires in 1 day', () => {
    const token = generateToken(1);
    const decoded = jwt.decode(token);
    const ttl = decoded.exp - decoded.iat;
    assert.equal(ttl, 86400);
});

// --- authenticateAdmin middleware ---

function mockRes() {
    const res = {};
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (body) => { res.body = body; return res; };
    return res;
}

test('authenticateAdmin calls next() with a valid token', () => {
    const token = generateToken(7);
    const req = { cookies: { admin_token: token } };
    const res = mockRes();
    let called = false;
    authenticateAdmin(req, res, () => { called = true; });
    assert.ok(called);
    assert.equal(req.adminId, 7);
});

test('authenticateAdmin returns 401 with no token', () => {
    const req = { cookies: {} };
    const res = mockRes();
    authenticateAdmin(req, res, () => {});
    assert.equal(res.statusCode, 401);
    assert.match(res.body.error, /No token/);
});

test('authenticateAdmin returns 401 with an invalid token', () => {
    const req = { cookies: { admin_token: 'not.a.valid.token' } };
    const res = mockRes();
    authenticateAdmin(req, res, () => {});
    assert.equal(res.statusCode, 401);
    assert.match(res.body.error, /Invalid token/);
});

test('authenticateAdmin returns 401 with a token signed by a different secret', () => {
    const token = jwt.sign({ id: 1 }, 'wrong-secret');
    const req = { cookies: { admin_token: token } };
    const res = mockRes();
    authenticateAdmin(req, res, () => {});
    assert.equal(res.statusCode, 401);
});

test('authenticateAdmin returns 401 with an expired token', () => {
    const token = jwt.sign({ id: 1 }, 'test-secret-for-auth-tests', { expiresIn: -1 });
    const req = { cookies: { admin_token: token } };
    const res = mockRes();
    authenticateAdmin(req, res, () => {});
    assert.equal(res.statusCode, 401);
});
