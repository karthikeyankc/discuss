# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.2.0] - 2026-05-20

### Added
- **Zero-config embed** — server URL is now inferred from the `client.js` script `src` automatically. No JavaScript configuration block required. Embed is now just two lines: a `<div>` and a `<script>` tag.
- **Stable thread keys** — widget resolves `postUrl` in priority order: `data-url` attribute → `<link rel="canonical">` → `window.location.pathname`. Sites using canonical tags (Ghost, Hugo, Jekyll, WordPress) get stable thread keys across slug changes automatically at zero config.
- **`data-url` attribute** — power users can pin a thread to an explicit stable key: `<div id="discuss-comments" data-url="/posts/123">`.
- **Admin inbox actions** — inbox comment items now show the full action set: Approve/Unapprove, Pin/Unpin, inline Edit, Delete — matching the threaded post view.
- **Clickable post URLs** — post URLs in the inbox and posts table are now clickable links.
- **"View thread →" link** — each inbox item links directly to the threaded comment view for that post within the admin.

### Changed
- **Tailwind v4 / KDS migration** — replaced inline Tailwind v3 config with `@karthikeyankc/ken-design-system` (local npm package, Tailwind v4). Deleted `globals.css`, `tailwind.admin.config.js`, `tailwind.client.config.cjs`, `src/design-system/tailwind.config.js`.
- **Admin UI KDS compliance** — replaced all hardcoded `text-neutral-*` colour classes with KDS semantic tokens (`--t1`–`--t5`). Section headings, field spacing, help text, and label weights now follow KDS spec.
- **Widget scoped CSS reset** — added a scoped reset for `button`, `input`, `textarea`, `select` inside `#discuss-comments`, stripping browser-native appearance, box-shadow, and outline. Fixes raised/3D button appearance on host pages without a CSS reset.
- **Post button KDS compliance** — `.discuss-btn` now has proper base styles: `inline-flex`, `height: 40px`, `border-radius`, `font-weight: 500`, focus ring, active scale transform — matching KDS `.btn` spec.
- **Placeholder consistency** — `::placeholder` reset sets `opacity: 1` to fix Firefox's 54% default opacity on placeholder text.
- **Inbox typography consistency** — excerpt, date, and avatar initials font sizes now match the threaded widget view.
- **`currentScript` detection** — switched from `scripts[scripts.length-1]` to `document.currentScript` for reliable script origin detection with `async`/`defer`.

### Fixed
- **Security: `sanitize-html`** — updated to 2.17.4 (critical XSS via `xmp` raw-text passthrough, GHSA-rpr9-rxv7-x643).
- **Security: `express-rate-limit`** — updated to 8.5.2 (moderate XSS in `ip-address` Address6 HTML methods, GHSA-v2v4-37r5-5v8g).
- **Security: `postcss`** — updated to 8.5.15 (arbitrary file read via user-generated CSS, fixed in 8.5.12).
- **`better-sqlite3`** — updated to 12.10.0 (SQLite 3.53.1, Node.js 26 prebuild support).
- Removed personal email address from `SECURITY.md`, replaced with GitHub issue link.

## [0.1.0] - 2026-04-29

### Added
- Rate limiting on admin login (10 attempts per 15 minutes)
- Content-Security-Policy and Referrer-Policy security headers
- `JWT_SECRET` environment variable required in production — server refuses to start without it
- Centralised config module (`src/config.js`)
- `.env.example` with all supported environment variables
- `SECURITY.md` with vulnerability disclosure policy
- `CONTRIBUTING.md` with dev setup, conventions, and PR guidelines
- `CHANGELOG.md`
- Dependabot config for weekly dependency updates
- GitHub issue templates and PR template
- CI workflow (`npm audit`, module import smoke test)

### Fixed
- Hardcoded JWT secret fallback removed
- JWT secret deduplicated into a single config module

## [0.0.0] - 2026-04-27

### Added
- Anonymous commenting with name and email
- Comment threading (nested replies)
- Comment moderation via admin dashboard
- Spam protection: honeypot hidden field and configurable question
- Gravatar avatars with initials fallback
- Markdown rendering (bold, italics, lists, inline code, code blocks) with server-side HTML sanitisation
- Admin dashboard:
  - Login / logout with JWT stored in HttpOnly cookie
  - Overview stats (total, pending, approved, domain count)
  - Comments inbox with tabs (all / pending / approved) and bulk approve/delete
  - Add and delete domains
  - Per-domain settings: name, brand colour picker with WCAG AA/AAA + APCA indicators, spam trap label, blocked words
  - Embed code snippet with one-click copy
  - Posts view and per-post comment moderation
  - User avatar (initials) with sign-out dropdown
- Dynamic CORS: allowed origins are stored in SQLite and checked per request
- Security headers: X-Content-Type-Options, X-Frame-Options, HSTS, CSP, Referrer-Policy
- Argon2id password hashing
- SQLite WAL mode, busy timeout, and foreign key constraints enabled
