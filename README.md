<div align="center">
  <img src="public/logo.png" alt="Discuss" width="480" />
  <p>Self-hosted comments for static sites. One script tag. Your data, your server, no subscriptions.</p>
  <p>
    <img src="https://img.shields.io/github/actions/workflow/status/karthikeyankc/discuss/ci.yml?branch=main&label=CI" alt="CI">
    <img src="https://img.shields.io/badge/tests-167%20passing-brightgreen" alt="Tests">
    <img src="https://img.shields.io/badge/coverage-90%25-brightgreen" alt="Coverage">
    <img src="https://img.shields.io/github/license/karthikeyankc/discuss" alt="License">
    <img src="https://img.shields.io/github/v/tag/karthikeyankc/discuss?label=version" alt="Version">
  </p>
  <p><a href="https://karthikeyankc.github.io/discuss/">Live Demo</a></p>
</div>

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Embedding](#embedding)
  - [Basic embed](#basic-embed)
  - [Unstyled embed](#unstyled-embed)
  - [Stable thread keys](#stable-thread-keys)
  - [Programmatic options](#programmatic-options)
  - [Custom font](#custom-font)
  - [Cross-origin setup](#cross-origin-setup)
  - [Local development](#local-development)
- [Customisation](#customisation)
  - [CSS custom properties](#css-custom-properties)
  - [Widget HTML structure](#widget-html-structure)
  - [Example stylesheet](#example-stylesheet)
- [Configuration](#configuration)
- [Email Notifications](#email-notifications)
  - [Choosing a provider](#choosing-a-provider)
  - [Gmail setup](#gmail-setup)
  - [Resend setup](#resend-setup)
  - [Postmark setup](#postmark-setup)
- [Deployment](#deployment)
  - [systemd](#systemd)
  - [Nginx](#nginx)
  - [Apache](#apache)
- [Upgrading](#upgrading)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Lightweight embed.** Two lines: a `<link>` for styles and a `<script>`. No npm, no bundler, nothing to install on the host page. `client.js` is 4.7 KB gzip, `client.css` is 12.9 KB.
- **Unstyled mode.** Don't want the default look? Skip the `<link>` tag and the widget loads with no styles. Build your own using the widget's class names and CSS custom properties.
- **CSS custom properties.** All colours, surfaces, and borders are CSS variables on `#discuss-comments`. Change a token and the whole widget picks it up, no need to hunt down every selector.
- **Your data, your server.** Everything goes into a single SQLite file on your machine. No third-party services, no subscriptions.
- **Gravatar avatars** with a letter-initial fallback.
- **Markdown support.** Comments are rendered server-side and sanitized with `sanitize-html`.
- **Nested replies** up to 3 levels deep.
- **Spam protection.** Honeypot field and a blocked words list, both configurable per domain.
- **Local dev support.** Add extra allowed origins to any domain so you can test comments on localhost without registering a separate entry.
- **Email notifications.** SMTP alerts for new comments and replies. Credentials are stored encrypted (AES-256-GCM). Admin and commenter notifications are set up independently.
- **Full admin dashboard** at `/admin`. Approve, pin, edit, delete, search comments, and manage per-domain settings.
- **Per-domain settings.** Brand colour with WCAG/APCA indicators, spam controls, SMTP setup, and your embed snippet in one tabbed settings page.
- **Email preview.** Check how each notification template looks before a real comment ever fires it.
- **MIT licensed.**

---

## Quick Start

```bash
git clone https://github.com/KarthikeyanKC/discuss.git
cd discuss
npm install --production
cp .env.example .env  # set JWT_SECRET at minimum
npm run setup         # create your admin account
npm start             # production server on port 3000
```

Then visit `/admin` to log in, add your domain, and copy your embed snippet.

Use `npm run dev` instead of `npm start` for local development. It restarts the server automatically when files change.

---

## Embedding

### Basic embed

Go to **Admin > Domains > Settings > Embed** and copy the snippet for your domain. Paste it into any page where you want comments to appear:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

The script figures out the server URL from its own `src`, then pulls the domain's colour and settings automatically. Every page gets its own comment thread based on `window.location.pathname` with nothing else to configure.

### Unstyled embed

To embed without any default styles, omit the `<link>` tag:

```html
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

The widget loads with no styles at all. Every element has a named class, so you have full control. See [Customisation](#customisation) for the list of CSS custom properties and an example stylesheet.

### Stable thread keys

By default the widget uses `window.location.pathname` as the thread key. If you ever rename a URL, the comments under the old path become unreachable from the widget (they are still in the database).

To avoid this, pin a thread to a permanent key using `data-url`:

```html
<div id="discuss-comments" data-url="/posts/my-stable-slug"></div>
```

Use a value that will never change: a post ID, a UUID, or a slug you commit to permanently. The `data-url` attribute takes priority over `window.location.pathname` when present.

The widget also checks `<link rel="canonical">` automatically, so sites using canonical tags (Ghost, Hugo, Jekyll, WordPress) get stable thread keys across slug changes at zero config.

### Programmatic options

Use `new DiscussWidget({...})` only if you need to override defaults:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
<script>
  new DiscussWidget({
    serverUrl: 'https://discuss.example.com',
    postUrl: '/posts/my-post',
    primaryColor: '#2563eb',
  });
</script>
```

| Option | Default | Description |
|---|---|---|
| `serverUrl` | inferred from script `src` | URL of your Discuss server |
| `postUrl` | `window.location.pathname` | Thread key for this page |
| `primaryColor` | fetched from server | Brand colour for buttons and links |
| `domainId` | *(none)* | Required when posting from a cross-origin admin context |
| `title` | `'Leave a comment'` | Heading above the comment form |
| `icons.name` | person SVG | Icon inside the name input. Pass an SVG string or `''` to hide it |
| `icons.email` | envelope SVG | Icon inside the email input. Pass an SVG string or `''` to hide it |
| `icons.submit` | send SVG | Icon inside the submit button. Pass an SVG string or `''` to hide it |

**Customising the title:**

```html
<script>
  new DiscussWidget({ title: 'Join the conversation' });
</script>
```

**Replacing icons:**

Pass any SVG string. To remove an icon entirely, pass an empty string.

```html
<script>
  new DiscussWidget({
    icons: {
      name:   '<svg>...</svg>',  // your own person icon
      email:  '<svg>...</svg>',  // your own email icon
      submit: '',                // no icon on the submit button
    }
  });
</script>
```

The SVG is injected directly into the DOM, so standard SVG attributes apply. Size the icon with `width` and `height` attributes or CSS.

### Custom font

The widget uses the system font stack by default. To use a custom font, set the `--discuss-font-family` CSS variable:

```css
#discuss-comments {
    --discuss-font-family: 'Inter', sans-serif;
}
```

Your page still needs to load the font file. The variable just tells the widget which family to apply.

### Cross-origin setup

If your Discuss server is on a different domain from your site, register your site's domain in the admin dashboard under **Domains**. CORS is configured automatically per registered domain.

### Local development

To test comments on a local dev server, add it as an allowed origin:

1. Go to **Admin > Domains > Settings > General**
2. Under **Additional allowed origins**, add your local dev server:
   ```
   http://localhost:4321
   ```
3. Save. The widget on your local server can now fetch and post comments against your production domain record.

Origins are scoped to the domain they're added to, so an origin you add to `myblog.com` can't reach a different domain on the same Discuss instance.

---

## Customisation

The default styles are just a starting point. You can override individual tokens, restyle specific components, or skip `client.css` entirely and write your own from scratch.

### CSS custom properties

All colours, borders, and surfaces are CSS custom properties set on `#discuss-comments`. Override any of them from your own stylesheet and the whole widget picks up the change without you having to touch individual selectors.

**Text colours**

| Token | Default (light) | Role |
|---|---|---|
| `--t1` | `oklch(18.5% 0.008 250)` | Primary text |
| `--t2` | `oklch(37.5% 0.016 250)` | Body text |
| `--t3` | `oklch(48.0% 0.020 250)` | Secondary / muted text |
| `--t4` | `oklch(58.5% 0.022 250)` | Placeholder, icon colour |
| `--t5` | `oklch(71.0% 0.020 250)` | Disabled / placeholder |

**Surface colours**

| Token | Default (light) | Role |
|---|---|---|
| `--s1` | `#ffffff` | Primary surface (cards, inputs) |
| `--s2` | `oklch(98.2% 0.004 250)` | Secondary surface (form footer) |
| `--s3` | `oklch(95.8% 0.008 250)` | Tertiary surface (hover states) |

**Border colours**

| Token | Default (light) | Role |
|---|---|---|
| `--bd` | `oklch(84.5% 0.016 250)` | Default border |
| `--bds` | `oklch(91.2% 0.012 250)` | Subtle border (thread lines, dividers) |
| `--bd-control` | same as `--bd` | Input / form element borders |
| `--bd-button` | same as `--bds` | Button borders |
| `--bd-strong` | `oklch(71.0% 0.020 250)` | Elevated border (kbd shadow) |

**Accent colours**

| Token | Role |
|---|---|
| `--accent-fg` | Links, reply tags |
| `--accent-surface` | Reply tag fill |
| `--focus-ring` | Focus outline |
| `--on-primary` | Text on primary buttons |

**Primary scale**

When you pass `primaryColor` to `DiscussWidget`, the widget generates a 10-stop scale and sets `--b50` through `--b900` on the container. You can also set the scale yourself:

```css
#discuss-comments {
    --b600: #7c3aed;
    --b700: #6d28d9;
    --on-primary: #fff;
}
```

**Dark mode**

The widget detects dark mode by looking for a `dark` class on an ancestor element:

```html
<html class="dark">
```

You can override individual tokens for dark mode the same way:

```css
.dark #discuss-comments {
    --s1: #0d1117;
}
```

### Widget HTML structure

```
#discuss-comments
├── .discuss-comment-row
│   ├── .discuss-avatar
│   └── .discuss-comment-content
│       ├── .discuss-comment-body
│       ├── .discuss-action-btn       (Reply / Share)
│       ├── .discuss-reply-form       (hidden by default)
│       └── .discuss-nested
│           └── .discuss-comment-row  (recurses)
│
└── .discuss-form-container
    ├── .discuss-form-textarea
    └── .discuss-form-bottom
        ├── .discuss-form-inputs
        │   └── .discuss-form-input
        └── .discuss-form-actions
            └── .discuss-btn .discuss-btn-primary
```

| Class | Notes |
|---|---|
| `.discuss-comment-row` | Wraps avatar and content |
| `.discuss-avatar` | Circular avatar |
| `.discuss-comment-body` | Prose area; inherits `color: var(--t2)` |
| `.discuss-badge` | Author / Moderator badge |
| `.discuss-reply-tag` | Inline @-mention link to parent comment |
| `.discuss-action-btn` | Reply / Share buttons |
| `.discuss-thread-line` | Vertical clickable thread collapse line |
| `.discuss-form-container` | New-comment form wrapper |
| `.discuss-form-textarea` | Main comment textarea |
| `.discuss-form-input` | Name / email fields |
| `.discuss-btn-primary` | Submit button |
| `.discuss-hidden` | Utility: `display: none !important` |

### Example stylesheet

If you embed without `client.css`, here is a minimal starting point. Copy it, extend it, or replace it entirely. Don't remove the utility classes like `.discuss-hidden` — the widget's JavaScript uses them to show and hide things.

```css
#discuss-comments {
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #1a1a1a;

    --t1: #1a1a1a;
    --t2: #333;
    --t3: #555;
    --t4: #777;
    --t5: #999;
    --s1: #fff;
    --s2: #f5f5f5;
    --s3: #ececec;
    --bd: #ccc;
    --bds: #e0e0e0;
    --bd-control: #ccc;
    --bd-button: #ddd;
    --bd-strong: #aaa;
    --accent-fg: #0055cc;
    --accent-surface: #e8f0fe;
    --focus-ring: #0055cc;
    --on-primary: #fff;
    --b50:  #e8f0fe;
    --b400: #4d88ff;
    --b600: #0055cc;
    --b700: #0047b3;
    --b800: #003a99;
}

.discuss-comment-row {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.discuss-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
}

.discuss-avatar img { width: 100%; height: 100%; object-fit: cover; }

.discuss-comment-content { flex: 1; min-width: 0; }

.discuss-comment-body {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--t2);
    margin: 0.25rem 0 0.5rem;
}

.discuss-comment-body p { margin: 0 0 0.5em; }
.discuss-comment-body p:last-child { margin-bottom: 0; }
.discuss-comment-body code {
    font-family: monospace;
    background: var(--s3);
    padding: 0.1em 0.3em;
    border-radius: 3px;
}
.discuss-comment-body pre {
    background: var(--t1);
    color: var(--s1);
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
}

.discuss-thread-line { display: none; }
.discuss-nested { margin-left: 2.75rem; margin-top: 1rem; }

.discuss-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.5rem;
    font-size: 0.8125rem;
    color: var(--t4);
    border: 1px solid var(--bd-button);
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
}
.discuss-action-btn:hover { color: var(--t1); background: var(--s3); }

.discuss-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.1rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 999px;
}
.discuss-badge-info    { background: #dbeafe; color: #1e40af; }
.discuss-badge-warning { background: #fef3c7; color: #b45309; }

.discuss-reply-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    font-size: 0.8125rem;
    font-weight: 600;
    background: var(--accent-surface);
    color: var(--accent-fg);
    text-decoration: none;
    margin-right: 0.25rem;
}

.discuss-form-container {
    border: 1px solid var(--bd-control);
    border-radius: 6px;
    overflow: hidden;
    margin-top: 2rem;
}
.discuss-form-container:focus-within { border-color: var(--focus-ring); }

.discuss-form-textarea {
    display: block;
    width: 100%;
    min-height: 80px;
    padding: 0.75rem;
    border: none;
    resize: vertical;
    font: inherit;
    font-size: 0.9375rem;
    outline: none;
    background: var(--s1);
    color: var(--t1);
}
.discuss-form-textarea::placeholder { color: var(--t5); }

.discuss-form-bottom {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--s2);
    border-top: 1px solid var(--bds);
}

.discuss-form-input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
    min-width: 120px;
}
.discuss-form-input-wrapper svg {
    position: absolute;
    left: 0.6rem;
    width: 1rem;
    height: 1rem;
    color: var(--t4);
    pointer-events: none;
}
.discuss-form-input {
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    border: 1px solid var(--bd-control);
    border-radius: 4px;
    font: inherit;
    background: var(--s1);
    color: var(--t1);
    outline: none;
}
.discuss-form-input:focus { border-color: var(--focus-ring); }
.discuss-form-input::placeholder { color: var(--t5); }

.discuss-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    height: 36px;
    border: 1px solid transparent;
    border-radius: 4px;
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
}
.discuss-btn-primary { background: var(--b600); color: var(--on-primary); border-color: var(--b600); }
.discuss-btn-primary:hover { background: var(--b700); border-color: var(--b700); }
.discuss-btn-secondary { background: var(--s1); color: var(--t2); border-color: var(--bd-button); }
.discuss-btn-secondary:hover { background: var(--s3); }

.discuss-spinner { display: inline-block; }

.discuss-hidden { display: none !important; }
.discuss-flex { display: flex; }
.discuss-flex-col { flex-direction: column; }
.discuss-flex-wrap { flex-wrap: wrap; }
.discuss-flex-1 { flex: 1 1 0%; }
.discuss-flex-shrink-0 { flex-shrink: 0; }
.discuss-items-center { align-items: center; }
.discuss-justify-end { justify-content: flex-end; }
.discuss-gap-2 { gap: 0.5rem; }
.discuss-gap-4 { gap: 1rem; }
.discuss-gap-6 { gap: 1.5rem; }
.discuss-text-sm { font-size: 0.875rem; }
.discuss-text-xs { font-size: 0.75rem; }
.discuss-text-lg { font-size: 1.125rem; }
.discuss-font-semibold { font-weight: 600; }
.discuss-uppercase { text-transform: uppercase; }
.discuss-tracking-wide { letter-spacing: 0.025em; }
.discuss-mb-10 { margin-bottom: 2.5rem; }

.dark #discuss-comments {
    --t1: #f8fafc; --t2: #e2e8f0; --t3: #cbd5e1; --t4: #94a3b8; --t5: #64748b;
    --s1: #111827; --s2: #0a1120; --s3: #1e293b;
    --bd: #475569; --bds: #334155; --bd-control: #475569; --bd-button: #334155;
    --accent-fg: #93c5fd; --accent-surface: #1e3a5f;
    --focus-ring: #93c5fd;
}
```

---

## Configuration

All configuration is done via environment variables. Copy `.env.example` to `.env` and set values before starting the server.

| Variable | Default | Required | Description |
|---|---|---|---|
| `JWT_SECRET` | *(none)* | **Yes** | Signs admin session tokens. Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ENCRYPTION_KEY` | *(none)* | Recommended | 32-byte hex key for encrypting SMTP credentials at rest (AES-256-GCM). Generate the same way as `JWT_SECRET`. If not set, credentials are stored as plaintext. |
| `PORT` | `3000` | No | Port the server listens on. |
| `HOST` | `127.0.0.1` | No | Interface the server binds to. The default is localhost-only, which is correct behind a reverse proxy. Don't set to `0.0.0.0` unless you have a specific reason to expose the port directly. |
| `APP_URL` | *(none)* | No | Public URL of your Discuss instance, e.g. `https://discuss.example.com`. Used to generate dashboard links and the logo in notification emails. |
| `NODE_ENV` | `development` | No | Set to `production` for production deployments. |

The server refuses to start in production if `JWT_SECRET` is not set.

Settings that vary per site (brand colour, spam controls, SMTP credentials) are configured through the admin dashboard under **Domains > Settings**, not via environment variables. This lets you run multiple sites from a single Discuss instance with independent configurations.

---

## Email Notifications

Discuss sends email notifications when new comments are posted or when someone replies. Configuration is per-domain under **Admin > Domains > Settings > Notifications**.

- **Admin notifications** tell you when a new comment arrives or when someone replies to one of your comments.
- **Commenter notifications** go out automatically when someone replies to a visitor's comment. They don't need to opt in.

Set `ENCRYPTION_KEY` in `.env` before entering any SMTP credentials. If you skip it, credentials are stored as plaintext.

### Choosing a provider

Running your own mail server is not recommended — VPS IP ranges are commonly blocklisted and maintaining deliverability is ongoing work. Use a dedicated provider instead.

| Provider | Free tier | Best for |
|---|---|---|
| **Gmail** | 500/day | Personal projects, easy setup |
| **Resend** | 3,000/month | Best developer experience |
| **Postmark** | 100/month | Best deliverability |
| **Brevo** | 300/day | Generous free tier |

For most self-hosters, Gmail or Resend is the right starting point.

### Gmail setup

Gmail requires an **App Password**. Your regular Google account password won't work.

1. Enable 2-Step Verification on your Google account.
2. Go to **Google Account > Security > App passwords**.
3. Create a new app password and name it "Discuss".
4. Use the 16-character password in the SMTP Password field.

| Setting | Value |
|---|---|
| SMTP Host | `smtp.gmail.com` |
| Port | `587` |
| SSL/TLS | Off (587 uses STARTTLS) |
| Username | your Gmail address |
| Password | the 16-character app password |

### Resend setup

1. Sign up at [resend.com](https://resend.com) and verify your sending domain.
2. Create an API key.

| Setting | Value |
|---|---|
| SMTP Host | `smtp.resend.com` |
| Port | `465` |
| SSL/TLS | On |
| Username | `resend` |
| Password | your API key |

### Postmark setup

1. Sign up at [postmarkapp.com](https://postmarkapp.com) and create a server.
2. Get your SMTP credentials from the server's **API Tokens** tab.

| Setting | Value |
|---|---|
| SMTP Host | `smtp.postmarkapp.com` |
| Port | `587` |
| SSL/TLS | Off |
| Username | your server API token |
| Password | your server API token |

Use **Send test email** in the Notifications tab to verify your settings. The **Preview** links show you how each template looks before a real comment triggers it.

---

## Deployment

### Requirements

- Node.js >= 20.6.0
- A Linux server
- A reverse proxy (Nginx recommended)

### Install

```bash
git clone https://github.com/KarthikeyanKC/discuss.git
cd discuss
npm install --production
npm run setup
cp .env.example .env
```

Edit `.env` and set `JWT_SECRET` at minimum.

### systemd

Create `/etc/systemd/system/discuss.service`:

```ini
[Unit]
Description=Discuss Comment Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/discuss
ExecStart=/usr/bin/node src/server.js
Restart=on-failure
EnvironmentFile=/var/www/discuss/.env
Environment=NODE_ENV=production PORT=3000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable discuss
sudo systemctl start discuss
```

### Nginx

```nginx
server {
    listen 443 ssl;
    server_name discuss.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

> **New subdomain with Certbot?** Configure the port 80 block only, then run `certbot --nginx -d discuss.example.com`. Certbot will obtain the certificate and rewrite your config automatically.

### Apache

Enable the required modules first: `sudo a2enmod proxy proxy_http headers`

```apache
<VirtualHost *:443>
    ServerName discuss.example.com

    SSLEngine on
    # SSLCertificateFile /path/to/cert.pem
    # SSLCertificateKeyFile /path/to/privkey.pem

    AllowEncodedSlashes NoDecode

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/ nocanon
    ProxyPassReverse / http://127.0.0.1:3000/

    RequestHeader set X-Forwarded-Proto "https"
</VirtualHost>
```

Both `AllowEncodedSlashes NoDecode` and `nocanon` are required. Without them, Apache decodes percent-encoded slashes before proxying and breaks deep admin URLs on hard reload.

---

## Upgrading

Always back up your database before upgrading:

```bash
cp discuss.db discuss.db.bak
git pull origin main
npm install --production
```

Schema migrations run automatically on startup. No manual SQL is needed.

If running under systemd:

```bash
sudo systemctl restart discuss
sudo systemctl status discuss
```

### v0.5.0

CSS is no longer bundled inside `client.js`. It's now a separate `client.css` file. Update your embed snippet to include the stylesheet:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

If you leave out the `<link>` tag the widget loads with no styles, which is fine if you're writing your own. The snippet in your admin dashboard is already updated. No database changes needed.

### v0.4.0

Adds trailing-slash URL normalisation. The migration runs automatically on first server start and unifies `/post/` and `/post` into a single thread. No manual steps needed.

**Apache users:** this release introduced admin deep-link support. Add the following to your VirtualHost if you haven't already:

```apache
AllowEncodedSlashes NoDecode
ProxyPass / http://127.0.0.1:3000/ nocanon
```

### v0.3.0

Adds email notifications. Before entering any SMTP credentials, set `ENCRYPTION_KEY` in your `.env`. If you skip that, credentials are stored as plaintext.

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

If you already saved SMTP credentials without a key and then add one later, you'll need to re-enter them. The previously stored plaintext values won't decrypt correctly under the new key.

### Renaming a post URL

If you rename a post's URL after comments have been posted, reassign them manually:

```sql
UPDATE comments SET post_url = '/new-path' WHERE post_url = '/old-path';
```

To avoid this situation, pin threads to a stable key using `data-url`. See [Stable thread keys](#stable-thread-keys).

---

## Roadmap

### v0.6.0
- Import comments
- Comment reporting

### v1.0.0
- Comment favouriting
- Comment sorting (newest, oldest, most liked)
- Rate limiting per domain and IP address

### v1.1.0
- Comment mentions

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for dev setup, conventions, and how to submit a pull request.

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

## License

MIT © [Karthikeyan KC](https://github.com/KarthikeyanKC)
