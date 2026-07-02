import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import { encrypt } from '../src/lib/encrypt.js';

process.env.ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');

const { previewEmailHtml, sendCommentNotification, sendReplyNotification, sendTestEmail, _setTransportForTest } = await import('../src/lib/mailer.js');

// Shared mock transport — captures sent emails without a real SMTP connection.
const sentEmails = [];
const mockTransport = {
    sendMail: async (opts) => { sentEmails.push(opts); return { messageId: 'test-id' }; },
};
_setTransportForTest(() => mockTransport);

// Domain with all SMTP fields encrypted and valid.
function makeDomain(overrides = {}) {
    return {
        domain: 'test.com',
        site_name: 'Test Site',
        smtp_host: encrypt('smtp.test.com'),
        smtp_port: 587,
        smtp_secure: 0,
        smtp_user: encrypt('sender@test.com'),
        smtp_pass: encrypt('s3cr3t'),
        smtp_from: encrypt('Test Discuss'),
        notify_email: encrypt('admin@test.com'),
        ...overrides,
    };
}

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

test('preview HTML contains logo img when APP_URL is set', () => {
    process.env.APP_URL = 'https://discuss.example.com';
    const html = previewEmailHtml(fakeDomain, 'comment');
    assert.match(html, /logo\.png/);
    delete process.env.APP_URL;
});

test('preview HTML falls back to text logo when APP_URL is not set', () => {
    const prev = process.env.APP_URL;
    delete process.env.APP_URL;
    const html = previewEmailHtml(fakeDomain, 'comment');
    assert.match(html, /Discuss/);
    if (prev) process.env.APP_URL = prev;
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

// --- sendCommentNotification ---

test('sendCommentNotification sends to notify_email with correct subject', async () => {
    sentEmails.length = 0;
    const domain = makeDomain();
    const comment = { name: 'Bob', content: '<p>Hello!</p>', post_url: '/my-post' };

    await sendCommentNotification(domain, comment);

    assert.equal(sentEmails.length, 1);
    assert.equal(sentEmails[0].to, 'admin@test.com');
    assert.match(sentEmails[0].subject, /New comment on Test Site/);
    assert.match(sentEmails[0].html, /Hello!/);
    assert.match(sentEmails[0].html, /New comment/);
});

test('sendCommentNotification uses reply subject when isReply is true', async () => {
    sentEmails.length = 0;
    const domain = makeDomain();
    const comment = { name: 'Bob', content: '<p>A reply.</p>', post_url: '/my-post' };

    await sendCommentNotification(domain, comment, { isReply: true });

    assert.equal(sentEmails.length, 1);
    assert.match(sentEmails[0].subject, /New reply on Test Site/);
    assert.match(sentEmails[0].html, /New reply to your comment/);
});

test('sendCommentNotification sets From header with name and address', async () => {
    sentEmails.length = 0;
    await sendCommentNotification(makeDomain(), { name: 'Alice', content: 'Hi', post_url: '/p' });
    assert.match(sentEmails[0].from, /Test Discuss/);
    assert.match(sentEmails[0].from, /sender@test\.com/);
});

test('sendCommentNotification returns without sending when smtp_host is null', async () => {
    sentEmails.length = 0;
    await sendCommentNotification(makeDomain({ smtp_host: null }), { name: 'Bob', content: 'Hi', post_url: '/p' });
    assert.equal(sentEmails.length, 0);
});

test('sendCommentNotification returns without sending when notify_email is null', async () => {
    sentEmails.length = 0;
    await sendCommentNotification(makeDomain({ notify_email: null }), { name: 'Bob', content: 'Hi', post_url: '/p' });
    assert.equal(sentEmails.length, 0);
});

// --- sendReplyNotification ---

test('sendReplyNotification sends to parentComment.email', async () => {
    sentEmails.length = 0;
    const domain = makeDomain();
    const parent = { name: 'Jane', email: 'jane@test.com', content: '<p>Original</p>', post_url: '/post' };
    const reply  = { name: 'Bob',  content: '<p>Reply</p>',   post_url: '/post' };

    await sendReplyNotification(domain, parent, reply);

    assert.equal(sentEmails.length, 1);
    assert.equal(sentEmails[0].to, 'jane@test.com');
    assert.match(sentEmails[0].subject, /replied to your comment/);
    assert.match(sentEmails[0].html, /replied to your comment/);
    assert.match(sentEmails[0].html, /Your comment/);
});

test('sendReplyNotification returns without sending when smtp_host is null', async () => {
    sentEmails.length = 0;
    const domain = makeDomain({ smtp_host: null });
    const parent = { name: 'Jane', email: 'jane@test.com', content: 'Hi', post_url: '/post' };
    const reply  = { name: 'Bob',  content: 'Reply',         post_url: '/post' };

    await sendReplyNotification(domain, parent, reply);

    assert.equal(sentEmails.length, 0);
});

test('sendReplyNotification returns without sending when parentComment.email is falsy', async () => {
    sentEmails.length = 0;
    const domain = makeDomain();
    const parent = { name: 'Jane', email: null, content: 'Hi', post_url: '/post' };
    const reply  = { name: 'Bob',  content: 'Reply',          post_url: '/post' };

    await sendReplyNotification(domain, parent, reply);

    assert.equal(sentEmails.length, 0);
});

// --- sendTestEmail ---

test('sendTestEmail sends to notify_email with correct subject', async () => {
    sentEmails.length = 0;
    await sendTestEmail(makeDomain());

    assert.equal(sentEmails.length, 1);
    assert.equal(sentEmails[0].to, 'admin@test.com');
    assert.match(sentEmails[0].subject, /Test email from Discuss for Test Site/);
    assert.match(sentEmails[0].html, /set up for/);
});

test('sendTestEmail throws when smtp_host is null', async () => {
    await assert.rejects(
        () => sendTestEmail(makeDomain({ smtp_host: null })),
        { message: 'SMTP not configured' },
    );
});

test('sendTestEmail throws when notify_email is null', async () => {
    await assert.rejects(
        () => sendTestEmail(makeDomain({ notify_email: null })),
        { message: 'Notification email not set' },
    );
});
