# Discuss

A self-hosted, lightweight comment system for static sites and blogs. Drop in a single `<script>` tag, and your site gets a fully functional, Gravatar-powered comment thread — no third-party services, no tracking, no subscriptions.

Built with **Node.js + Express**, **SQLite** (via `better-sqlite3`), and a scoped **Ken Design System** widget that won't leak styles into your host page.

---

## Project Rules
- **SPA Routing**: Always use fully contextual, path-based hierarchical routing for SPAs (e.g. `/admin/domains/:domain/posts/:post/comments`) instead of generic section-based slugs or local storage fallback routing. Ensure Express servers correctly serve the `index.html` on deep links containing dots, ignoring only known asset extensions.

---

## Features

- **Single script embed** — one `<script>` tag, zero dependencies on the host page
- **Self-hosted** — your data stays on your server, in a single SQLite file
- **Gravatar avatars** — automatic, with a letter-initial fallback
- **Markdown comments** — rendered server-side with `markdown-it`, sanitized with `sanitize-html`
- **Nested replies** — one level of threading
- **Spam protection** — honeypot field (configurable question/answer from the admin UI)
- **Admin dashboard** — approve, pin, delete, and configure comments at `/admin`
- **No build step on the host** — compiled CSS is bundled inside `client.js`
- **MIT licensed**

---

## Requirements

- **Node.js ≥ 18.11.0**
- A Linux/macOS server (or any machine that can run Node)
- A reverse proxy (Nginx/Caddy) recommended for production

---

## Quick Start (Production Server)

### 1. Clone the repository

```bash
git clone https://github.com/KarthikeyanKC/discuss.git
cd discuss
```

### 2. Install production dependencies

```bash
npm install --production
```

> `devDependencies` (Tailwind, PostCSS) are **not** needed at runtime. The compiled CSS is already bundled in `public/client.js`.

### 3. Create the admin account

```bash
npm run setup
```

Follow the prompts to set your admin username, email, and password.

### 4. Start the server

```bash
npm start
```

The server runs on **port 3000** by default. Set the `PORT` environment variable to change it:

```bash
PORT=8080 npm start
```

### 5. Add your site to the allowed origins

Visit `/admin` on your server, log in, and **add your site's domain to the Allowed Origins list** from the dashboard. That's it — no config files to edit. Allowed domains are stored in SQLite and checked dynamically at request time.

### 6. Embed the widget on your site

Add this snippet wherever you want comments to appear:

```html
<!-- Container element -->
<div id="discuss-comments"></div>

<!-- Widget script — point src at your server -->
<script src="https://your-discuss-server.com/client.js"></script>
```

The widget automatically uses the URL of the page it's embedded on as the comment thread key, so each page gets its own comment section.

---

## Nginx Reverse Proxy (Recommended)

```nginx
server {
    listen 443 ssl;
    server_name discuss.yourdomain.com;

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

---

## Apache Reverse Proxy

Ensure you have the `proxy` and `proxy_http` modules enabled (`sudo a2enmod proxy proxy_http headers`).

```apache
<VirtualHost *:443>
    ServerName discuss.yourdomain.com

    # SSL Configuration here
    SSLEngine on
    # SSLCertificateFile /path/to/cert.pem
    # SSLCertificateKeyFile /path/to/privkey.pem

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    RequestHeader set X-Forwarded-Proto "https"
</VirtualHost>
```

---

## Admin Dashboard

Visit `/admin` on your Discuss server (e.g. `https://discuss.yourdomain.com/admin`) to:

- View and moderate all comments
- Pin comments to the top of a thread
- Configure the honeypot spam-protection question
- Manage allowed origins (CORS)

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on |
| `NODE_ENV` | `development` | Set to `production` for production |

---

## Keeping it Running (systemd)

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
Environment=NODE_ENV=production PORT=3000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable discuss
sudo systemctl start discuss
```

---

## Upgrading

### Steps

```bash
git pull origin main
npm install --production
```

If running under systemd:
```bash
sudo systemctl restart discuss
sudo systemctl status discuss   # verify it came up cleanly
```

If running manually:
```bash
npm start
```

That's it. No manual SQL, no migration scripts.

### How it works

The server runs schema migrations automatically on startup (`src/db/index.js`). Each migration is wrapped in a `try/catch` so it's safe to run against a database that already has the column — the error is silently ignored.

### What changed between versions

#### v0.0.0 → current

Two new columns were added to the `domains` table:

| Column | Type | Default | Purpose |
|---|---|---|---|
| `primary_color` | `TEXT` | `NULL` | Brand colour for widget theming (hex, e.g. `#2563eb`) |
| `blocked_words` | `TEXT` | `NULL` | JSON array of words that silently queue matching comments for moderation |

Existing domains will have `NULL` for both columns. This is safe — the widget falls back to its default blue palette when `primary_color` is `NULL`, and no word-filtering is applied when `blocked_words` is `NULL`. You can configure both per-domain at any time from **Admin → Domains → Settings**.

#### Comment counters showing 0 after upgrade

Early builds stored comments with `domain_id = 0` before that column was fully wired up. The admin stats query joins on `domain_id`, so those comments were invisible in the dashboard. The server now runs a one-time backfill on startup that reassigns any `domain_id = 0` (or orphaned) comments to your first domain. If your counters were stuck at 0, they will be correct after restarting the server.

---

## Contributing

Contributions are welcome! Here's how the project is structured and what you need to know before sending a pull request.

### Prerequisites

You'll need the full dev dependencies installed:

```bash
npm install
```

### Project Structure

```
discuss/
├── public/
│   ├── client.js           # Compiled widget — do not edit directly
│   ├── admin/
│   │   └── admin.css       # Compiled admin stylesheet — do not edit directly
│   └── test.html           # Local dev test page
├── scripts/
│   ├── build-client-css.cjs   # PostCSS pipeline for the widget CSS
│   └── build-client.js        # Injects compiled CSS into client.js
├── src/
│   ├── server.js           # Express app entry point
│   ├── setup.js            # Interactive admin account creation
│   ├── db/
│   │   ├── index.js        # SQLite connection (better-sqlite3)
│   │   └── schema.sql      # Database schema (auto-applied on startup)
│   ├── routes/
│   │   ├── index.js        # Static file / admin HTML serving
│   │   └── api/
│   │       ├── comments.js # Public comments API
│   │       └── admin.js    # Admin API (auth required)
│   ├── middleware/
│   │   └── cors.js         # Dynamic CORS based on allowed origins
│   └── design-system/
│       ├── tailwind.config.js      # ← Single source of truth for all design tokens
│       ├── globals.css             # Ken Design System component styles
│       ├── ken-design-system.md    # Design system specification
│       └── components.md           # Component reference
├── tailwind.admin.config.js    # Admin dashboard Tailwind config (extends DS config)
├── tailwind.client.config.cjs  # Widget Tailwind config (extends DS config, no preflight)
└── postcss.client.cjs          # (Legacy, superseded by scripts/build-client-css.cjs)
```

### Development Workflow

#### Run the dev server

```bash
npm run dev
```

Uses Node's built-in `--watch` mode. The server restarts automatically on file changes.

#### Edit the widget (`client.js`)

`public/client.js` is the **built output** — edit the source and rebuild:

```bash
# After editing public/client.js source (the JS logic, not the injected CSS):
npm run build:client
```

The build pipeline:
1. `build:client:css` — Compiles `src/design-system/globals.css` through Tailwind + `postcss-prefix-selector` (scopes all styles to `#discuss-comments .discuss-*`) → outputs `public/client.css`
2. `build:client:inject` — Reads `public/client.css`, JSON-stringifies it, and injects it between the `/* INJECT_CSS_START */` / `/* INJECT_CSS_END */` markers in `client.js` as `const injectedCss = "...";`

#### Edit the admin dashboard CSS

```bash
# After editing src/design-system/globals.css or any admin HTML:
npm run build:css
```

#### Full rebuild

```bash
npm run build
```

### Design System

All design tokens (brand colours, shadows, border radii, typography) live in **`src/design-system/tailwind.config.js`**. Both the admin and widget Tailwind configs import from this file — change a colour there and it propagates everywhere on next build.

> **Important:** `client.js` uses class names prefixed with `discuss-` (e.g. `discuss-btn`, `discuss-hidden`). Tailwind's content scanner can't map these back to the unprefixed utility names, so critical utility classes that are toggled via JavaScript must be explicitly defined in the manual CSS block inside `client.js` (the `` const cssContent = injectedCss + `...` `` section). See comments in that block for guidance.

### Submitting a Pull Request

1. Fork the repository and create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Run `npm run build` to ensure the compiled assets are up to date
4. Commit **both** your source changes and the rebuilt `public/client.js` / `public/admin/admin.css`
5. Open a pull request with a clear description of what changed and why

### Reporting Issues

Please open an issue at [github.com/KarthikeyanKC/discuss/issues](https://github.com/KarthikeyanKC/discuss/issues) with:

- Your Node.js version (`node --version`)
- Steps to reproduce
- Expected vs actual behaviour

---

## License

MIT © [Karthikeyan KC](https://github.com/KarthikeyanKC)
