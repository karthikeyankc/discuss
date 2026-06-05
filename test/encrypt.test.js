import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';

// Each test sets its own key to ensure isolation
function withKey(fn) {
    const key = crypto.randomBytes(32).toString('hex');
    const prev = process.env.ENCRYPTION_KEY;
    process.env.ENCRYPTION_KEY = key;
    try { return fn(); }
    finally { process.env.ENCRYPTION_KEY = prev; }
}

// Import fresh for each test run — module is stateless so a single import is fine
const { encrypt, decrypt } = await import('../src/lib/encrypt.js');

// --- encrypt ---

test('encrypt returns null for null input', () => {
    withKey(() => assert.equal(encrypt(null), null));
});

test('encrypt returns null for empty string', () => {
    withKey(() => assert.equal(encrypt(''), null));
});

test('encrypt returns plaintext when no ENCRYPTION_KEY is set', () => {
    const prev = process.env.ENCRYPTION_KEY;
    delete process.env.ENCRYPTION_KEY;
    assert.equal(encrypt('hello'), 'hello');
    process.env.ENCRYPTION_KEY = prev;
});

test('encrypt returns a colon-separated base64 string', () => {
    withKey(() => {
        const result = encrypt('secret');
        const parts = result.split(':');
        assert.equal(parts.length, 3);
        // Each part should be valid base64
        parts.forEach(p => assert.doesNotThrow(() => Buffer.from(p, 'base64')));
    });
});

test('encrypt produces different ciphertext each call (random IV)', () => {
    withKey(() => {
        const a = encrypt('same text');
        const b = encrypt('same text');
        assert.notEqual(a, b);
    });
});

// --- decrypt ---

test('decrypt returns null for null input', () => {
    withKey(() => assert.equal(decrypt(null), null));
});

test('decrypt returns plaintext when no ENCRYPTION_KEY is set', () => {
    const prev = process.env.ENCRYPTION_KEY;
    delete process.env.ENCRYPTION_KEY;
    assert.equal(decrypt('hello'), 'hello');
    process.env.ENCRYPTION_KEY = prev;
});

test('decrypt correctly reverses encrypt', () => {
    withKey(() => {
        const plaintext = 'my smtp password';
        assert.equal(decrypt(encrypt(plaintext)), plaintext);
    });
});

test('decrypt handles unicode correctly', () => {
    withKey(() => {
        const text = 'päss wörd 🔐';
        assert.equal(decrypt(encrypt(text)), text);
    });
});

test('decrypt returns null for tampered ciphertext', () => {
    withKey(() => {
        const enc = encrypt('secret');
        const parts = enc.split(':');
        // Corrupt the data segment
        parts[2] = Buffer.from('corrupted').toString('base64');
        assert.equal(decrypt(parts.join(':')), null);
    });
});

test('decrypt returns stored value as-is when it has no colon separators (legacy plaintext)', () => {
    withKey(() => {
        // Simulate a value stored before encryption was added
        const legacy = 'plain-old-password';
        assert.equal(decrypt(legacy), legacy);
    });
});

test('decrypt returns null for tampered auth tag', () => {
    withKey(() => {
        const enc = encrypt('secret');
        const parts = enc.split(':');
        parts[1] = Buffer.from('badtag1234567890').toString('base64');
        assert.equal(decrypt(parts.join(':')), null);
    });
});

test('round-trip with long string', () => {
    withKey(() => {
        const long = 'a'.repeat(10000);
        assert.equal(decrypt(encrypt(long)), long);
    });
});
