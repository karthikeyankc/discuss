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
  - [Cross-origin setup](#cross-origin-setup)
  - [Local development](#local-development)
- [Customisation](#customisation)
  - [CSS custom properties](#css-custom-properties)
  - [Colours, title, and icons](#colours-title-and-icons)
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

| Feature | Description |
|---|---|
| **Lightweight embed** | A `<link>` and a `<script>`. No npm, no bundler, nothing to install on the host page. `client.js` is 4.7 KB gzip; `client.css` is 12.9 KB. |
| **SQLite, no database server** | Everything lives in a single file on your machine. Nothing to provision, nothing to pay for, trivial to back up. |
| **Markdown** | Bold, italic, code blocks, lists, and blockquotes. Rendered server-side and sanitised. Commenters get a live preview as they type. |
| **Nested replies** | Threaded conversations up to three levels deep, with collapsible thread lines. |
| **Spam protection** | Honeypot field catches bots silently. Blocked word list queues matching comments for manual review. Both are configurable per domain. |
| **Email notifications** | Get notified when a new comment arrives or when someone replies. Visitors get notified when someone replies to them too. SMTP credentials are stored encrypted (AES-256-GCM). |
| **Admin dashboard** | Approve, reject, pin, edit, and delete comments. Search across all threads. Everything is at `/admin`. |
| **Full customisation** | Every colour, border, and surface is a CSS variable. Swap the widget's icons with your own SVGs, or hide them. Override the form title. Skip `client.css` entirely and write your own styles from scratch. |
| **Gravatar with initials fallback** | Shows a commenter's Gravatar if they have one. Falls back to a clean initial avatar if they don't. |
| **Stable thread keys** | Widget reads `<link rel="canonical">` automatically, so threads survive URL changes on Ghost, Hugo, Jekyll, and WordPress with no config. Override manually with `data-url` when needed. |
| **MIT licensed** | Free to use, self-host, and modify. |

---

## Quick Start

```bash
git clone https://github.com/KarthikeyanKC/discuss.git
cd discuss
npm install --production
cp .env.example .env  # set JWT_SECRET at minimum
npm run setup         # create your admin account
npm start             # server starts on port 3000
```

Visit `/admin` to log in, register your first domain, and grab your embed snippet.

For local development use `npm run dev` instead. It restarts on file changes.

When you're ready to run this in production, head to the [Deployment](#deployment) section. It covers running the server as a systemd service with automatic restarts, and configuring Nginx or Apache as a reverse proxy with SSL.

---

## Embedding

There are three ways to embed the widget, depending on how much control you want. Most people start with the basic embed and never need anything else.

### Basic embed

Go to **Admin > Domains > Settings > Embed** and copy the snippet for your domain. Paste it into any page where you want comments to appear:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

The script figures out the server URL from its own `src`, then pulls the domain's colour and settings automatically. Every page gets its own comment thread based on `window.location.pathname` with nothing else to configure.

### Unstyled embed

If you want full control over the look, skip the `<link>` tag entirely:

```html
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

The widget loads with no styles at all. Every element has a named class, so you have full control. See [Customisation](#customisation) for the list of CSS custom properties and an example stylesheet.

### Stable thread keys

By default the widget uses `window.location.pathname` as the thread's identifier. If you ever rename a URL, the comments under the old path become unreachable from the widget (they're still in the database, just disconnected).

The widget checks `<link rel="canonical">` automatically, so if your site already outputs canonical tags (Ghost, Hugo, Jekyll, and WordPress all do), threads survive slug changes with no extra config.

If you need to set the key manually, use the `data-url` attribute:

```html
<div id="discuss-comments" data-url="/posts/my-stable-slug"></div>
```

Pick a value that will never change: a post ID, a UUID, or a slug you're permanently committed to. `data-url` takes priority over both the canonical tag and `window.location.pathname`.

### Programmatic options

The snippet from your admin dashboard handles everything automatically for most sites. Use `new DiscussWidget({...})` when you need to override the thread key, the brand colour, or the form's appearance:

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
| `darkSelector` | *(none)* | CSS selector that activates dark mode. When this selector matches an ancestor of the widget, the dark colour tokens are applied. Example: `'[data-theme="dark"]'` or `'.dark'` |
| `title` | `'Leave a comment'` | Heading above the comment form |
| `icons.name` | built-in person icon | Icon inside the name input. Pass any SVG string, or `''` to hide it |
| `icons.email` | built-in envelope icon | Icon inside the email input. Pass any SVG string, or `''` to hide it |
| `icons.submit` | built-in send icon | Icon inside the submit button. Pass any SVG string, or `''` to hide it |

See [Colours, title, and icons](#colours-title-and-icons) for examples of customising the form's appearance.

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

The widget has no dark mode by default. Pass `darkSelector` to tell it which CSS selector your site uses to activate dark mode:

```js
new DiscussWidget({ darkSelector: '[data-theme="dark"]' });
// or
new DiscussWidget({ darkSelector: '.dark' });
```

When that selector matches an ancestor of the widget, the full set of dark colour tokens kicks in automatically. The widget injects a scoped `<style>` tag at runtime, so it works with any selector your site uses — class, attribute, or otherwise.

To override individual dark mode tokens on top of the defaults, target the same selector yourself in your stylesheet:

```css
[data-theme="dark"] #discuss-comments {
    --s1: #0d1117;
}
```

### Colours, title, and icons

**Brand colour**

The brand colour controls buttons, links, and focus rings. The easiest way to set it is through the admin dashboard under **Domains > Settings > Appearance**. It applies to all visitors automatically. If you want to override it per-page, pass `primaryColor` to `new DiscussWidget`:

```html
<script>
  new DiscussWidget({ primaryColor: '#7c3aed' });
</script>
```

**Form title**

The heading above the comment form defaults to "Leave a comment". Change it with the `title` option:

```html
<script>
  new DiscussWidget({ title: 'Join the discussion' });
</script>
```

**Icons**

The name, email, and submit button each have a built-in SVG icon. Replace any of them with your own SVG string, or pass an empty string to hide the icon entirely:

```html
<script>
  new DiscussWidget({
    icons: {
      name:   '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>',
      email:  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
      submit: '',  // hide the icon on the submit button
    }
  });
</script>
```

The SVG is injected directly into the DOM. Size it with `width` and `height` attributes on the SVG element, or target `.discuss-form-input-wrapper svg` in your stylesheet. When an icon is hidden, the input adjusts its padding automatically.

**Custom font**

The widget uses the system font stack by default. Point it at any font your page has already loaded:

```css
#discuss-comments {
    --discuss-font-family: 'Inter', sans-serif;
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
        │   ├── .discuss-form-input-wrapper
        │   │   └── .discuss-form-input   (name)
        │   └── .discuss-form-input-wrapper
        │       └── .discuss-form-input   (email)
        └── .discuss-form-actions
            └── .discuss-btn .discuss-btn-primary
```

| Class | Notes |
|---|---|
| `.discuss-comment-row` | Wraps avatar and comment content |
| `.discuss-avatar` | Circular avatar, Gravatar if available or initials otherwise |
| `.discuss-comment-body` | Rendered markdown prose |
| `.discuss-badge` | Author / Moderator / Pinned label |
| `.discuss-badge-info` | Blue badge variant (Pinned) |
| `.discuss-badge-success` | Green badge variant (Author) |
| `.discuss-badge-warning` | Amber badge variant (Moderator) |
| `.discuss-reply-tag` | Inline @-mention link to parent comment |
| `.discuss-action-btn` | Reply / Share buttons below a comment |
| `.discuss-thread-line` | Vertical clickable thread collapse line |
| `.discuss-form-container` | Outer wrapper for the comment form |
| `.discuss-form-textarea` | Main comment textarea |
| `.discuss-form-input-wrapper` | Wraps icon + input field |
| `.discuss-input-no-icon` | Added to `.discuss-form-input-wrapper` when the icon slot is empty; resets left padding |
| `.discuss-form-input` | Name / email text inputs |
| `.discuss-form-actions` | Wraps the submit button |
| `.discuss-btn-primary` | Submit button |
| `.discuss-hidden` | Utility: `display: none !important`. Used by JS to show and hide elements |

### Example stylesheet

If you embed without `client.css`, here is a minimal starting point. Copy it, extend it, or replace it entirely.

> [!IMPORTANT]
> Don't remove or rename utility classes like `.discuss-hidden`. The widget's JavaScript uses them to show and hide elements at runtime.

<details>
<summary>Show example stylesheet</summary>



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

/* Dark mode: use whatever selector your site uses,
   or pass darkSelector to new DiscussWidget({...}) to have this injected automatically */
[data-theme="dark"] #discuss-comments {
    --t1: #f8fafc; --t2: #e2e8f0; --t3: #cbd5e1; --t4: #94a3b8; --t5: #64748b;
    --s1: #111827; --s2: #0a1120; --s3: #1e293b;
    --bd: #475569; --bds: #334155; --bd-control: #475569; --bd-button: #334155;
    --accent-fg: #93c5fd; --accent-surface: #1e3a5f;
    --focus-ring: #93c5fd;
}
```

</details>

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

Running your own mail server is not recommended. VPS IP ranges are commonly blocklisted and maintaining deliverability is ongoing work. Use a dedicated provider instead.

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

systemd keeps the server running after reboots and restarts it if it crashes. Create `/etc/systemd/system/discuss.service`, replacing `/var/www/discuss` with wherever you cloned the repo and `www-data` with the user you want it to run as:

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

Then enable and start it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable discuss
sudo systemctl start discuss
```

Check that it's running with `sudo systemctl status discuss`.

### Nginx

This config proxies requests from your public domain to the Node server on port 3000. Replace `discuss.example.com` with your domain:

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

> [!TIP]
> **Setting up SSL with Certbot?** Configure the port 80 block only, then run `certbot --nginx -d discuss.example.com`. Certbot will get the certificate and rewrite your config automatically.

### Apache

First enable the modules you need:

```bash
sudo a2enmod proxy proxy_http headers
```

Then add a VirtualHost. Replace `discuss.example.com` with your domain and fill in your SSL cert paths:

```apache
<VirtualHost *:443>
    ServerName discuss.example.com

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/privkey.pem

    AllowEncodedSlashes NoDecode

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/ nocanon
    ProxyPassReverse / http://127.0.0.1:3000/

    RequestHeader set X-Forwarded-Proto "https"
</VirtualHost>
```

> [!WARNING]
> Both `AllowEncodedSlashes NoDecode` and `nocanon` are required. Without them, Apache decodes percent-encoded slashes before proxying and breaks admin deep links on hard reload.

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

**New:** Icon and title slots in the widget. Swap the name, email, and submit button icons with your own SVG, or pass `''` to hide them. Override the "Leave a comment" heading with any text you like. Help menu in the admin sidebar shows the current version and links to docs, GitHub, changelog, and update notifications.

**Breaking:** CSS is no longer bundled inside `client.js`. It's now a separate `client.css` file that you need to include yourself. Update your embed snippet:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

If you intentionally leave out the `<link>` tag the widget still loads, just with no styles. That's fine if you're writing your own. The snippet in your admin dashboard is already updated. No database changes.

### v0.4.0

**New:** Trailing-slash URL normalisation, comment export, and admin deep-link support.

**Migration:** The normalisation migration runs automatically on first server start. It unifies `/post/` and `/post` into a single thread. No data is lost and no manual steps are needed.

> [!WARNING]
> **Apache users:** This release requires two new directives in your VirtualHost. Without them, hard-reloading admin deep links like `/admin/comments` returns a 404:

```apache
AllowEncodedSlashes NoDecode
ProxyPass / http://127.0.0.1:3000/ nocanon
```

### v0.3.0

**New:** Email notifications for new comments and replies, with per-domain SMTP configuration and encrypted credential storage.

> [!IMPORTANT]
> Set `ENCRYPTION_KEY` in your `.env` before entering any SMTP credentials. Without it, credentials are stored as plaintext.

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

If you already saved credentials without a key and add one later, you'll need to re-enter them. The stored plaintext won't decrypt correctly under the new key.

### Renaming a post URL

If you rename a post's URL after comments have been posted, reassign them manually:

```sql
UPDATE comments SET post_url = '/new-path' WHERE post_url = '/old-path';
```

To avoid this situation, pin threads to a stable key using `data-url`. See [Stable thread keys](#stable-thread-keys).

---

## Roadmap

| Version | Feature | Status |
|---|---|---|
| v0.6.0 | Import comments | Planned |
| v0.6.0 | Comment reporting | Planned |
| v1.0.0 | Comment favouriting | Planned |
| v1.0.0 | Comment sorting (newest, oldest, most liked) | Planned |
| v1.0.0 | Rate limiting per domain and IP address | Planned |
| v1.1.0 | Comment mentions | Planned |

Have a feature request? [Open an issue](https://github.com/karthikeyankc/discuss/issues) and let's talk about it.

---

## Contributing

Contributions are welcome. Here's how to get started:

```bash
git clone https://github.com/KarthikeyanKC/discuss.git
cd discuss
npm install
npm run dev       # starts the dev server with auto-restart
npm test          # run the full test suite
```

**Pre-commit hook**

The repo includes a pre-commit hook that runs the test suite, checks that `CHANGELOG.md` has an entry for the current version, and for minor releases checks that the docs are up to date. Install it once after cloning:

```bash
cp scripts/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

If the hook rejects your commit, read the output. It'll tell you exactly what's missing.

**Pull requests**

- Keep PRs focused. One thing per PR makes it much easier to review.
- Add a test for any new behaviour. The test suite is in `test/` using Node's built-in test runner.
- Add a `CHANGELOG.md` entry under `## [Unreleased]`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more detail on conventions and the review process.

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

## License

MIT © [Karthikeyan KC](https://github.com/KarthikeyanKC)
