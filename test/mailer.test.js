import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';

process.env.ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');

const { previewEmailHtml } = await import('../src/lib/mailer.js');

const fakeDomain = {
    domain: 'test.com',
    site_name: 'Test Site',
    smtp_host: null,
    smtp_user: null,
    smtp_from: null,
    notify_email: null,
    notify_on_comment: 0,
    notify_on_reply: 0,
};

// --- previewEmailHtml ---

test('preview type "comment" returns HTML with new comment heading', () => {
    const html = previewEmailHtml(fakeDomain, 'comment');
    assert.match(html, /New comment/);
    assert.match(html, /Test Site/);
});

test('preview type "reply-to-admin" returns HTML with reply heading', () => {
    const html = previewEmailHtml(fakeDomain, 'reply-to-admin');
    assert.match(html, /New reply to your comment/);
});

test('preview type "reply-to-commenter" returns HTML with replied context', () => {
    const html = previewEmailHtml(fakeDomain, 'reply-to-commenter');
    assert.match(html, /replied to your comment/);
    assert.match(html, /Your comment/);
});

test('preview HTML contains embedded base64 logo', () => {
    const html = previewEmailHtml(fakeDomain, 'comment');
    assert.match(html, /data:image\/png;base64,/);
});

test('preview HTML contains site name in footer', () => {
    const html = previewEmailHtml(fakeDomain, 'comment');
    assert.match(html, /Test Site/);
});

test('preview HTML contains Powered by Discuss link', () => {
    const html = previewEmailHtml(fakeDomain, 'comment');
    assert.match(html, /Powered by/);
    assert.match(html, /github\.com\/KarthikeyanKC\/discuss/);
});

test('preview HTML contains CTA button', () => {
    const html = previewEmailHtml(fakeDomain, 'comment');
    // Should have a button-styled anchor
    assert.match(html, /background:#2563eb/);
    assert.match(html, /View post/);
});

test('preview with APP_URL set uses dashboard link', () => {
    process.env.APP_URL = 'https://discuss.example.com';
    const html = previewEmailHtml(fakeDomain, 'comment');
    assert.match(html, /View in dashboard/);
    assert.match(html, /discuss\.example\.com\/admin/);
    delete process.env.APP_URL;
});

test('commenter reply footer uses commenter-specific reason text', () => {
    const html = previewEmailHtml(fakeDomain, 'reply-to-commenter');
    assert.match(html, /you commented on/);
    assert.doesNotMatch(html, /notifications are enabled/);
});

test('admin notification footer uses admin-specific reason text', () => {
    const html = previewEmailHtml(fakeDomain, 'comment');
    assert.match(html, /notifications are enabled/);
});

test('unknown type falls back to new comment template', () => {
    const html = previewEmailHtml(fakeDomain, 'unknown-type');
    assert.match(html, /New comment/);
});
