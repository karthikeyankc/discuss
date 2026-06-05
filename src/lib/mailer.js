import nodemailer from 'nodemailer';
import { decrypt } from './encrypt.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const GITHUB_URL = 'https://github.com/KarthikeyanKC/discuss';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOGO_B64 = readFileSync(join(__dirname, '../../public/logo.png')).toString('base64');
const LOGO_SRC = `data:image/png;base64,${LOGO_B64}`;

function buildTransport(domain) {
    const host = decrypt(domain.smtp_host);
    const user = decrypt(domain.smtp_user);
    const pass = decrypt(domain.smtp_pass);
    if (!host) return null;
    return nodemailer.createTransport({
        host,
        port: domain.smtp_port || 587,
        secure: !!domain.smtp_secure,
        auth: user && pass ? { user, pass } : undefined,
    });
}

function fullPostUrl(domain, postUrl) {
    return `https://${domain.domain}${postUrl}`;
}

function emailFooter(domain, { isCommenter = false } = {}) {
    const reason = isCommenter
        ? `You're receiving this because you commented on ${domain.site_name}.`
        : `You're receiving this because notifications are enabled for ${domain.site_name}.`;
    return `
  <div style="padding:1rem 1.75rem;border-top:1px solid #e2e8f0;font-size:0.75rem;color:#94a3b8">
    <p style="margin:0 0 0.25rem">${reason}</p>
    <p style="margin:0">Powered by <a href="${GITHUB_URL}" style="color:#94a3b8" target="_blank">Discuss</a>.</p>
  </div>`;
}

function commentEmailHtml({ domain, comment, isReply }) {
    const postUrl  = fullPostUrl(domain, comment.post_url);
    const appUrl   = process.env.APP_URL ? process.env.APP_URL.replace(/\/$/, '') : null;
    const dashLink = appUrl
        ? `<a href="${appUrl}/admin" style="display:inline-block;padding:0.5rem 1.25rem;background:#2563eb;color:#fff;font-size:0.875rem;font-weight:600;border-radius:6px;text-decoration:none" target="_blank">View in dashboard</a>`
        : `<a href="${postUrl}" style="display:inline-block;padding:0.5rem 1.25rem;background:#2563eb;color:#fff;font-size:0.875rem;font-weight:600;border-radius:6px;text-decoration:none" target="_blank">View post</a>`;

    return `<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#f8fafc;margin:0;padding:2rem">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
  <div style="background:#f8fafc;padding:1.25rem 1.75rem;border-bottom:1px solid #e2e8f0">
    <img src="${LOGO_SRC}" alt="Discuss" style="height:28px;width:auto;display:inline-block">
  </div>
  <div style="padding:1.75rem">
    <h2 style="margin:0 0 0.25rem;font-size:1.0625rem;color:#0f172a">
      ${isReply ? 'New reply to your comment' : 'New comment'} on <em>${domain.site_name}</em>
    </h2>
    <p style="margin:0 0 1.25rem;font-size:0.875rem;color:#64748b">
      <a href="${postUrl}" style="color:#64748b;text-decoration:none">${postUrl}</a>
    </p>
    <div style="border-left:3px solid #e2e8f0;padding:0.75rem 1rem;margin-bottom:1.25rem;background:#f8fafc;border-radius:0 6px 6px 0">
      <p style="margin:0 0 0.375rem;font-size:0.8125rem;font-weight:600;color:#0f172a">${comment.name}</p>
      <div style="font-size:0.9375rem;color:#334155;line-height:1.6">${comment.content}</div>
    </div>
    <p style="margin:0;font-size:0.875rem">${dashLink}</p>
  </div>
  ${emailFooter(domain)}
</div>
</body></html>`;
}

export async function sendCommentNotification(domain, comment, { isReply = false } = {}) {
    const transport = buildTransport(domain);
    if (!transport) return;

    const user = decrypt(domain.smtp_user);
    const name = decrypt(domain.smtp_from);
    const from = user ? (name ? `${name} <${user}>` : user) : null;
    const to   = decrypt(domain.notify_email);
    if (!to) return;

    const subject = isReply
        ? `New reply on ${domain.site_name}`
        : `New comment on ${domain.site_name}`;

    await transport.sendMail({ from, to, subject, html: commentEmailHtml({ domain, comment, isReply }) });
}

export function previewEmailHtml(domain, type) {
    const fakeDomain = { ...domain, domain: domain.domain || 'example.com' };
    if (type === 'reply-to-admin') {
        return commentEmailHtml({
            domain: fakeDomain,
            comment: { name: 'Jane Smith', content: '<p>This is a sample reply to your comment.</p>', post_url: '/hello-world' },
            isReply: true,
        });
    }
    if (type === 'reply-to-commenter') {
        const fakeParent = { name: 'John Doe', content: '<p>This is the original comment left by a visitor.</p>', post_url: '/hello-world', email: 'visitor@example.com', is_author: 0 };
        const fakeReply  = { name: 'Jane Smith', content: '<p>Thanks for your comment! Here is a reply.</p>', post_url: '/hello-world' };
        return buildReplyToCommenterHtml(fakeDomain, fakeParent, fakeReply);
    }
    // default: new comment
    return commentEmailHtml({
        domain: fakeDomain,
        comment: { name: 'Jane Smith', content: '<p>This is a sample comment on your post.</p>', post_url: '/hello-world' },
        isReply: false,
    });
}

function buildReplyToCommenterHtml(domain, parentComment, replyComment) {
    const postUrl = fullPostUrl(domain, parentComment.post_url);
    return `<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#f8fafc;margin:0;padding:2rem">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
  <div style="background:#f8fafc;padding:1.25rem 1.75rem;border-bottom:1px solid #e2e8f0">
    <img src="${LOGO_SRC}" alt="Discuss" style="height:28px;width:auto;display:inline-block">
  </div>
  <div style="padding:1.75rem">
    <h2 style="margin:0 0 1.25rem;font-size:1.0625rem;color:#0f172a">
      <strong>${replyComment.name}</strong> replied to your comment on <em>${domain.site_name}</em>
    </h2>
    <div style="border-left:3px solid #e2e8f0;padding:0.75rem 1rem;margin-bottom:1rem;background:#f8fafc;border-radius:0 6px 6px 0">
      <p style="margin:0 0 0.25rem;font-size:0.75rem;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.04em">Your comment</p>
      <div style="font-size:0.875rem;color:#64748b;line-height:1.6">${parentComment.content}</div>
    </div>
    <div style="border-left:3px solid #2563eb;padding:0.75rem 1rem;margin-bottom:1.25rem;background:#eff6ff;border-radius:0 6px 6px 0">
      <p style="margin:0 0 0.25rem;font-size:0.75rem;font-weight:600;color:#2563eb;text-transform:uppercase;letter-spacing:0.04em">${replyComment.name}</p>
      <div style="font-size:0.9375rem;color:#334155;line-height:1.6">${replyComment.content}</div>
    </div>
    <a href="${postUrl}" style="display:inline-block;padding:0.5rem 1.25rem;background:#2563eb;color:#fff;font-size:0.875rem;font-weight:600;border-radius:6px;text-decoration:none" target="_blank">Continue the conversation</a>
  </div>
  ${emailFooter(domain, { isCommenter: true })}
</div>
</body></html>`;
}

export async function sendReplyNotification(domain, parentComment, replyComment) {
    const transport = buildTransport(domain);
    if (!transport || !parentComment.email) return;

    const user = decrypt(domain.smtp_user);
    const name = decrypt(domain.smtp_from);
    const from = user ? (name ? `${name} <${user}>` : user) : null;

    await transport.sendMail({
        from,
        to: parentComment.email,
        subject: `Someone replied to your comment on ${domain.site_name}`,
        html: buildReplyToCommenterHtml(domain, parentComment, replyComment),
    });
}

export async function sendTestEmail(domain) {
    const transport = buildTransport(domain);
    if (!transport) throw new Error('SMTP not configured');

    const user = decrypt(domain.smtp_user);
    const name = decrypt(domain.smtp_from);
    const from = user ? (name ? `${name} <${user}>` : user) : null;
    const to   = decrypt(domain.notify_email);
    if (!to) throw new Error('Notification email not set');

    await transport.sendMail({
        from,
        to,
        subject: `Test email from Discuss for ${domain.site_name}`,
        html: `<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#f8fafc;margin:0;padding:2rem">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
  <div style="background:#f8fafc;padding:1.25rem 1.75rem;border-bottom:1px solid #e2e8f0">
    <img src="${LOGO_SRC}" alt="Discuss" style="height:28px;width:auto;display:inline-block">
  </div>
  <div style="padding:1.75rem">
    <p style="font-size:1rem;color:#0f172a;margin:0 0 0.5rem">Your email notifications are set up for <strong>${domain.site_name}</strong>.</p>
    <p style="font-size:0.875rem;color:#64748b;margin:0">You will receive alerts at this address when new comments are posted.</p>
  </div>
  ${emailFooter(domain)}
</div>
</body></html>`,
    });
}
