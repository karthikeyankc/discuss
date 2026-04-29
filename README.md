<div align="center">
  <img src="public/logo.png" alt="Discuss" width="480" />
  <p>Self-hosted comments for static sites. One script tag. Your data, your server, no subscriptions.</p>
  <p>
    <img src="https://img.shields.io/github/actions/workflow/status/karthikeyankc/discuss/ci.yml?branch=main&label=CI" alt="CI">
    <img src="https://img.shields.io/github/license/karthikeyankc/discuss" alt="License">
    <img src="https://img.shields.io/github/v/tag/karthikeyankc/discuss?label=version" alt="Version">
  </p>
</div>

---

## Features

- **Single script embed** - one `<script>` tag, no dependencies on the host page
- **Self-hosted** - your data stays on your server in a single SQLite file
- **Gravatar avatars** - with a letter-initial fallback
- **Markdown comments** rendered server-side with `markdown-it`, sanitized with `sanitize-html`
- **Nested replies** - up to 3 levels deep
- **Spam protection** - honeypot field with a configurable question from the admin UI
- **Admin dashboard** - approve, pin, delete, and configure comments at `/admin`
- **No build step on the host** - compiled CSS is bundled inside `client.js`
- **MIT licensed**

---

## Requirements

- Node.js >= 18.11.0
- A Linux server
- A reverse proxy. NGINX recommended for production

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/KarthikeyanKC/discuss.git
cd discuss
```

### 2. Install dependencies

```bash
npm install --production
```

`devDependencies` (Tailwind, PostCSS) are not needed at runtime. The compiled CSS is already bundled in `public/client.js`.

### 3. Create the admin account

```bash
npm run setup
```

### 4. Set your environment variables

```bash
cp .env.example .env
```

Edit `.env` and set `JWT_SECRET` to a long random string. See [Environment Variables](#environment-variables).

### 5. Create the systemd service

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

Update `WorkingDirectory` and `EnvironmentFile` to match your actual install path.

### 6. Start the server

```bash
sudo systemctl daemon-reload
sudo systemctl enable discuss
sudo systemctl start discuss
```

The server runs on port 3000 by default. Enable your reverse proxy (see [Nginx Reverse Proxy](#nginx-reverse-proxy) or [Apache Reverse Proxy](#apache-reverse-proxy)) to access the admin dashboard from your domain.

### 7. Add your domain

Visit `/admin`, log in, and add your site's domain where you want to use the comment system. Allowed domains are stored in SQLite and checked on every request.

### 8. Embed the widget

Go to **Admin > Domains > Settings** for your domain and copy the embed snippet. Paste it into any page where you want comments to appear.

The widget uses the current page URL as the comment thread key, so each page gets its own thread automatically.

---

## Nginx Reverse Proxy (Recommended)

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
> **Setting up a new subdomain with Certbot?** Configure the port 80 block only, then run `certbot --nginx -d discuss.example.com`. Certbot will obtain the certificate and rewrite your config to add the SSL listener automatically. If you already have a certificate for the subdomain, configure the 443 block directly as shown above.

---

## Apache Reverse Proxy

Enable the required modules first: `sudo a2enmod proxy proxy_http headers`

```apache
<VirtualHost *:443>
    ServerName discuss.example.com

    SSLEngine on
    # SSLCertificateFile /path/to/cert.pem
    # SSLCertificateKeyFile /path/to/privkey.pem

    # Required: pass percent-encoded slashes (%2F) through unchanged.
    # Without this, Apache decodes %2F before proxying and breaks URLs like
    # /admin/domains/1/posts/%2Fmy-post/comments on hard refresh.
    AllowEncodedSlashes NoDecode

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/ nocanon
    ProxyPassReverse / http://127.0.0.1:3000/

    RequestHeader set X-Forwarded-Proto "https"
</VirtualHost>
```

Both directives are required to fix a hard-reload 404 on deep admin pages. Apache decodes percent-encoded slashes (`%2F`) in URLs before proxying by default, so a hard reload on a URL like `/admin/domains/1/posts/%2Fmy-post/comments` would arrive at Express malformed and return a 404. `AllowEncodedSlashes NoDecode` must be set at the `VirtualHost` level (not in `.htaccess`), and `nocanon` on `ProxyPass` tells Apache to forward the URL path to Express unchanged.

---

## Environment Variables

Copy `.env.example` to `.env` and set the values before starting the server.

| Variable | Default | Required in production | Description |
|---|---|---|---|
| `JWT_SECRET` | *(none)* | **Yes** | Signs admin session tokens. Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `PORT` | `3000` | No | Port the server listens on |
| `NODE_ENV` | `development` | No | Set to `production` for production |

The server will refuse to start in production if `JWT_SECRET` is not set.

---

## Upgrading

Before upgrading, back up your database:

```bash
cp discuss.db discuss.db.bak
```

Then pull and reinstall:

```bash
git pull origin main
npm install --production
```

If running under systemd:

```bash
sudo systemctl restart discuss
sudo systemctl status discuss
```

The server runs schema migrations automatically on startup. No manual SQL needed.

---

## Roadmap

### v0.2.0
- `data-url` attribute support on the widget container for a stable thread key independent of the page URL
- Export and import comments
- Comment reporting

### v1.0.0
- Comment favouriting
- Comment sorting (newest, oldest, most liked)
- Rate limiting per domain and IP address

### v1.1.0
- Comment mentions
- Email notifications (admin only)

### v1.2.0
- Email notifications for commenters (opt-in)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for dev setup, project structure, conventions, and how to submit a pull request.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

## License

MIT © [Karthikeyan KC](https://github.com/KarthikeyanKC)
