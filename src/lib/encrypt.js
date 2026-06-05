import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function getKey() {
    const hex = process.env.ENCRYPTION_KEY;
    if (!hex) return null;
    const buf = Buffer.from(hex, 'hex');
    if (buf.length !== 32) throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)');
    return buf;
}

// Returns "ivB64:tagB64:dataB64", or the original value if no key is configured.
export function encrypt(text) {
    if (!text) return null;
    const key = getKey();
    if (!key) return text;
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const data = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return [iv.toString('base64'), tag.toString('base64'), data.toString('base64')].join(':');
}

// Returns plaintext, or null on failure.
export function decrypt(stored) {
    if (!stored) return null;
    const key = getKey();
    if (!key) return stored; // no key — stored as plaintext
    try {
        const [ivB64, tagB64, dataB64] = stored.split(':');
        if (!ivB64 || !tagB64 || !dataB64) return stored; // legacy plaintext
        const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(ivB64, 'base64'));
        decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
        return Buffer.concat([
            decipher.update(Buffer.from(dataB64, 'base64')),
            decipher.final(),
        ]).toString('utf8');
    } catch {
        return null;
    }
}
