<div align="center">
  <img src="public/logo.png" alt="Discuss" width="480" />
  <p>Self-hosted comments for static sites. One script tag. Your data, your server, no subscriptions.</p>
  <p>
    <img src="https://img.shields.io/github/actions/workflow/status/karthikeyankc/discuss/ci.yml?branch=main&label=CI" alt="CI">
    <img src="https://img.shields.io/badge/tests-163%20passing-brightgreen" alt="Tests">
    <img src="https://img.shields.io/badge/coverage-90%25-brightgreen" alt="Coverage">
    <img src="https://img.shields.io/github/license/karthikeyankc/discuss" alt="License">
    <img src="https://img.shields.io/github/v/tag/karthikeyankc/discuss?label=version" alt="Version">
  </p>
  <p><a href="https://karthikeyankc.github.io/discuss/">Live Demo</a></p>
</div>

---

## Features

- **Single script embed** — one `<script>` tag, no dependencies on the host page
- **Self-hosted** — your data stays on your server in a single SQLite file
- **Gravatar avatars** — with a letter-initial fallback
- **Markdown comments** — rendered server-side, sanitized with `sanitize-html`
- **Nested replies** — up to 3 levels deep
- **Spam protection** — honeypot field and blocked words list, configurable per domain
- **Local dev support** — add allowed origins per domain to test comments on localhost without a separate domain registration
- **Email notifications** — SMTP alerts for new comments and replies; admin and commenter notifications are separate. Credentials stored encrypted at rest (AES-256-GCM)
- **Admin dashboard** — approve, pin, edit, delete, search, and configure comments at `/admin`
- **Per-domain settings** — brand colour with WCAG/APCA indicators, spam controls, SMTP setup, and embed code in a tabbed settings page
- **Email preview** — preview all notification email templates from the dashboard before sending
- **MIT licensed**

---

## Quick Start

```bash
git clone https://github.com/KarthikeyanKC/discuss.git
cd discuss
npm install --production
cp .env.example .env  # edit .env — set JWT_SECRET at minimum
npm run setup         # create your admin account
npm start             # production server on port 3000
```

Then visit `/admin` to log in, add your domain, and copy your embed snippet.

Use `npm run dev` instead of `npm start` if you're running locally — it restarts the server automatically when files change.

> For production, run Discuss as a systemd service behind a reverse proxy. See the [Deployment guide](docs/deployment.md).

```html
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

---

## Documentation

| Guide | Description |
|---|---|
| [Deployment](docs/deployment.md) | systemd service, Nginx and Apache reverse proxy setup |
| [Configuration](docs/configuration.md) | All environment variables |
| [Embedding](docs/embed.md) | Widget options, stable thread keys, cross-origin setup |
| [Email Notifications](docs/smtp.md) | SMTP setup, provider recommendations, Gmail and Resend guides |
| [Upgrading](docs/upgrading.md) | How to upgrade safely |
| [Contributing](CONTRIBUTING.md) | Dev setup, conventions, and how to submit a pull request |
| [AI Usage](AI.md) | How and where AI tools were used in this project |

---

## Roadmap

### v0.5.0
- Import comments
- Comment reporting

### v1.0.0
- Comment favouriting
- Comment sorting (newest, oldest, most liked)
- Rate limiting per domain and IP address

### v1.1.0
- Comment mentions

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

## License

MIT © [Karthikeyan KC](https://github.com/KarthikeyanKC)
