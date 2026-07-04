# Email Notifications

Discuss can send email notifications when new comments are posted or when someone replies to a comment. Configuration is per-domain and done through the admin dashboard under **Domains > Settings > Notifications**.

## How it works

- **Admin notifications** tell you when a new comment arrives on your site, or when someone replies to one of your own comments.
- **Commenter notifications** go out automatically when someone replies to a visitor's comment. They don't need to opt in anywhere.

Credentials are stored encrypted (AES-256-GCM), but only if you've already set `ENCRYPTION_KEY` in your `.env`. Do that before entering any SMTP credentials in the dashboard. See [Configuration](configuration.md).

## Choosing a provider

Running your own mail server is technically possible but not recommended. VPS IP ranges are commonly block-listed, and maintaining deliverability (SPF, DKIM, DMARC, bounce handling) is ongoing work. Use a dedicated mail provider instead.

| Provider | Free tier | Best for |
|---|---|---|
| **Gmail** | 500/day | Personal projects, easy setup |
| **Resend** | 3,000/month | Best developer experience, modern API |
| **Postmark** | 100/month | Best deliverability, transactional email |
| **Brevo** | 300/day | Generous free tier |
| **Mailgun** | 1,000/month (trial) | Flexible, good API |

For most self-hosters, Gmail or Resend is the right starting point.

## Gmail setup

Gmail requires an **App Password**. Your regular Google account password will not work.

1. Enable 2-Step Verification on your Google account.
2. Go to **Google Account > Security > App passwords**.
3. Create a new app password (name it "Discuss").
4. Use the generated 16-character password in the SMTP Password field.

| Setting | Value |
|---|---|
| SMTP Host | `smtp.gmail.com` |
| Port | `587` |
| SSL/TLS | Off (587 uses STARTTLS) |
| Username | your Gmail address |
| Password | the 16-character app password |

## Resend setup

1. Sign up at [resend.com](https://resend.com) and verify your sending domain.
2. Create an API key.

| Setting | Value |
|---|---|
| SMTP Host | `smtp.resend.com` |
| Port | `465` |
| SSL/TLS | On |
| Username | `resend` |
| Password | your API key |

## Postmark setup

1. Sign up at [postmarkapp.com](https://postmarkapp.com) and create a server.
2. Get your SMTP credentials from the server's **API Tokens** tab.

| Setting | Value |
|---|---|
| SMTP Host | `smtp.postmarkapp.com` |
| Port | `587` |
| SSL/TLS | Off |
| Username | your server API token |
| Password | your server API token |

## Sender name

Set **Sender Name** to whatever you want people to see in their inbox, like `Discuss` or your site name. The actual sending address is always your SMTP username regardless of what you put here.

## Testing

Use the **Send test email** button in the Notifications tab to verify your SMTP settings. Use the **Preview** links to see how each email template looks before a real comment triggers it.
