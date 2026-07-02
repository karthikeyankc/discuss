# Contributing to Discuss

Thanks for your interest in contributing. Here's everything you need to know.

## Before You Start

- Check [existing issues](https://github.com/KarthikeyanKC/discuss/issues) to avoid duplicating effort.
- For significant changes, open an issue first to discuss the approach before writing code.
- All contributions are subject to the [MIT License](LICENSE).

## Development Setup

### Prerequisites

- Node.js ≥ 20.6.0
- npm

### Steps

```bash
git clone https://github.com/KarthikeyanKC/discuss.git
cd discuss
npm install
cp .env.example .env  # edit .env — JWT_SECRET is required
npm run setup         # create your local admin account
npm run dev           # starts the server with --watch
```

The server runs at `http://localhost:3000`. The admin dashboard is at `http://localhost:3000/admin`.

The dev server loads `.env` automatically via Node's `--env-file` flag (no dotenv needed).

### Working on the design system

If you're developing `ken-design-system` alongside Discuss, link it locally:

```bash
npm install --save-dev file:../../ken-design-system
```

Do not commit this change — the `file:` path only resolves on your machine.

## Project Structure

```
src/
├── server.js           # Express entry point
├── config.js           # Centralised env/config
├── setup.js            # Interactive admin account creation
├── db/
│   ├── index.js        # SQLite connection
│   └── schema.sql      # Schema (auto-applied on startup)
├── routes/api/
│   ├── comments.js     # Public comments API
│   └── admin.js        # Admin API (auth required)
├── middleware/
│   ├── auth.js         # JWT auth middleware
│   └── cors.js         # Dynamic CORS
└── lib/
    ├── encrypt.js      # AES-256-GCM encrypt/decrypt helpers
    ├── mailer.js       # nodemailer wrappers (comment + reply notifications)
    └── render.js       # Markdown → sanitised HTML
```

## Building Assets

`public/client.js` and `public/admin/admin.css` are compiled outputs — do not edit them directly.

```bash
npm run build           # full rebuild (admin CSS + widget)
npm run build:css       # admin dashboard CSS only
npm run build:client    # widget (client.js) only
```

After editing the widget source or the design system, rebuild and commit **both** source changes and updated compiled assets.

## Submitting a Pull Request

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Make your changes.
3. Run `npm run build` if you touched anything in `src/design-system/`, `src/client/`, or CSS files.
4. Commit source changes and any rebuilt assets together.
5. Open a PR with a clear description of what changed and why.

## Code Style

- ES modules (`import`/`export`) throughout.
- No comments unless the *why* is non-obvious.
- Keep routes thin — logic belongs in helpers or the db layer.
- Do not add dependencies without discussion.

## Conventions

### SPA Routing

Always use fully contextual, path-based hierarchical routing (e.g. `/admin/domains/:id/posts/:post/comments`) instead of generic section-based slugs or localStorage fallback routing. Express must serve `index.html` on deep links — skip to static middleware only for known asset extensions (`.js`, `.css`, `.png`, etc.).

### Tech Stack

- **Server:** Node.js + Express
- **Frontend:** Vanilla JS, HTML, Tailwind CSS (compiled, not shipped raw)
- **Database:** SQLite via `better-sqlite3`
  - WAL mode must be enabled
  - `busy_timeout` must be set
  - Foreign key constraints must be on (`PRAGMA foreign_keys = ON`)

### Security defaults

- CORS is dynamic — check the origin against the `domains` table on every request, never use a static allowlist.
- JWT is stored in an HttpOnly, Secure cookie.
- All user-generated content goes through `sanitize-html` before storage or rendering.
- Passwords are hashed with argon2id.

### Design system

All design tokens (colours, shadows, radii, typography) live in `src/design-system/tailwind.config.js`. Both the admin and widget Tailwind configs extend it. Change a token there and it propagates everywhere on the next build.

`client.js` uses class names prefixed with `discuss-` (e.g. `discuss-btn`, `discuss-hidden`). Tailwind's scanner cannot resolve these back to utility names, so any utility toggled via JavaScript must be defined manually in the CSS block inside `client.js`.

## Releasing a new version

Use `npm version` to bump, commit, and tag atomically — never manually edit `package.json` and `git tag` separately, as they will drift:

```bash
npm version patch   # 0.3.5 → 0.3.6 (bug fixes)
npm version minor   # 0.3.5 → 0.4.0 (new features)
npm version major   # 0.3.5 → 1.0.0 (breaking changes)
```

This updates `package.json`, creates a commit, and creates a `vX.Y.Z` git tag in one step. Then push both:

```bash
git push && git push --tags
```

A pre-commit hook is installed automatically via `npm install`. It runs the full test suite before every commit — if any test fails, the commit is blocked. It also checks that `package.json` is not behind the latest git tag. Fix both before pushing.

## Reporting Bugs

Open an issue with:
- Your Node.js version (`node --version`)
- Steps to reproduce
- Expected vs actual behaviour

For security vulnerabilities, see [SECURITY.md](SECURITY.md).
