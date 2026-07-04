# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.5.0] - 2026-07-04

### Added
- **Separate `client.css`**: widget styles are now a standalone file served with `Access-Control-Allow-Origin: *`. Browsers can cache the stylesheet independently of the script. The embed snippet now includes a `<link rel="stylesheet">` tag.
- **Unstyled embed mode**: omit the `<link>` tag to load the widget with no default styles.
- **Icon slots**: pass any SVG string to `icons.name`, `icons.email`, or `icons.submit` in `new DiscussWidget({...})` to replace the built-in icons. Pass `''` to hide an icon entirely. The input adjusts its padding automatically when an icon is removed.
- **Title option**: pass `title` to `new DiscussWidget({...})` to override the "Leave a comment" heading with any text.
- **Help menu in the admin sidebar**: replaces the plain version badge with a popover that links to documentation, GitHub, and the changelog. Shows an update notification when a newer release is available on GitHub, checked once per session.
- **Gravatar fix on admin edit**: editing a commenter's email in the admin now updates their avatar immediately without a page reload.
- **Documentation consolidated into README**: all docs are now in a single README with a table of contents. Separate doc files have been removed.

### Changed
- Admin-shell CSS stripped from the widget bundle. `client.css` now contains only widget component styles.
- `client.js` reduced from 112 KB to 15 KB (4.7 KB gzip). `client.css` is 91 KB (12.9 KB gzip). Total transfer for a styled embed is around 17.6 KB gzip.
- Update notification in the admin now uses a proper semver comparison, so running a pre-release version no longer triggers a false "update available" alert.
- Pre-commit hook extended with a docs drift check: CHANGELOG and README must reference the current version before a commit is allowed.

### Upgrading from v0.4.x

The embed snippet needs updating. CSS was previously bundled inside `client.js` and is now a separate file. Add the stylesheet link:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

The snippet in your admin dashboard has already been updated. If you hard-coded the old snippet, add the `<link>` tag or the widget will load with no styles. No database changes.

---

## [0.4.0] - 2026-07-02

### Added
- **Export comments**: download all comments for a domain as a JSON file from the new Advanced settings tab.
- **Advanced settings tab**: replaces the domain delete button with a proper Export and Danger Zone section inside domain settings.
- **`allowed_origins` per domain**: add one origin per line in General settings to allow local dev servers (e.g. `http://localhost:4321`) to post and load comments without registering a separate domain ([#9](https://github.com/KarthikeyanKC/discuss/issues/9)).
- **`--discuss-font-family` CSS variable**: pass a custom font family to the embed widget via the host page's CSS ([#10](https://github.com/KarthikeyanKC/discuss/issues/10)).
- **AI usage disclosure**: `AI.md` documents which AI tools were used during development ([#7](https://github.com/KarthikeyanKC/discuss/issues/7)).

### Fixed
- Post URL trailing slash normalisation: `/post/` and `/post` now resolve to the same thread. Existing data is migrated automatically on first server start after upgrade.
- Admin post comments view: config now fetched via an admin-authenticated endpoint, eliminating CORS 403 errors when viewing a post's comments from the admin.
- Admin post comments view: breadcrumb domain name now shown correctly on direct page load or hard refresh.
- Admin post comments view: delete, approve, and pin actions now work correctly.
- Admin posts view: post URLs now show the full domain and path (e.g. `example.com/post`) rather than just the path.
- CORS middleware: `allowed_origins` matching now works correctly end-to-end through middleware and the comments router.
- `client.js` now served with `Access-Control-Allow-Origin: *` so it can be loaded as a cross-origin script.
- CSS `--discuss-font-family` variable now inherits correctly through chained `var()` references ([#10](https://github.com/KarthikeyanKC/discuss/issues/10)).
- `.env` file now loaded correctly via Node's native `--env-file` flag ([#8](https://github.com/KarthikeyanKC/discuss/issues/8)).

### Changed
- Domain delete moved out of the domain list into Advanced > Danger Zone in domain settings, reducing accidental deletion risk.
- Node.js minimum version bumped to 20.6+ (required for `--env-file` support).
- Test suite expanded from 144 to 163 tests; statement coverage raised from 80% to 90%.
- Pre-commit hook now runs the full test suite. Any failing test blocks the commit.
- CI adds a coverage gate job that fails if coverage drops below the floor (80% statements, 75% branches).

Thanks to [@krisbalintona](https://github.com/krisbalintona) for reporting issues #7, #8, #9, and #10 that drove most of the fixes and additions in this release.

### Upgrading from v0.3.x

No manual database changes needed. The trailing-slash migration runs automatically on first server start.

**Apache users:** add `AllowEncodedSlashes NoDecode` to your VirtualHost and append `nocanon` to your `ProxyPass` directive, or admin pages will 404 on direct load or hard refresh. See [docs/deployment.md](docs/deployment.md) for the full example.

---

## [0.3.2] - 2026-06-05

### Fixed
- Email logo now loads from a remote URL instead of base64. Email clients (Gmail, Outlook) strip `data:` URI images.
- Domains empty state copy updated to point to the new "+ Add Domain" button.
- Express `trust proxy` set to 1 so express-rate-limit reads the correct client IP behind Nginx/Apache.

---

## [0.3.0] - 2026-06-05

### Added
- **Email notifications**: per-domain SMTP configuration in Site Settings. Admins receive alerts on new comments and replies to their own comments. SMTP credentials are encrypted at rest using AES-256-GCM via a server-side `ENCRYPTION_KEY`.
- **Commenter reply notifications**: when a visitor leaves an email address and someone replies to their comment, they receive a notification automatically.
- **Email preview**: preview all three email templates (new comment, reply to admin, reply to commenter) directly from the dashboard in a modal with desktop/mobile width toggle.
- **Global comment search**: search bar inside the Comments section searches name, email, content, and post URL across all domains.
- **Configurable server bind address**: the `HOST` environment variable (default `127.0.0.1`) controls which interface the server listens on.
- `ENCRYPTION_KEY` and `APP_URL` environment variables documented in `.env.example`.

### Changed
- **Admin inbox**: full comment content shown with no truncation. Cards reuse the same avatar, mail-icon tooltip, and action controls as the thread view.
- **Inbox tabs**: simplified to All and Pending. Approved tab removed.
- **Domains page**: domain list moved to the top; Add New Domain form moved to the bottom.
- **Site Settings**: sections reorganised into horizontal tabs (General, Appearance, Anti-spam, Notifications, Embed). Save/Cancel row anchored at the bottom with a separator.
- **Admin sidebar**: wider (240 px), more generous item padding, larger icons.
- **SMTP password field**: shows masked saved state with a "Change password" link. The real input is only revealed on demand.
- **Email templates**: logo embedded as base64 (no remote load), CTA links replaced with button-styled anchors, footer split into per-audience copy.

### Upgrading from v0.2.x

Set `ENCRYPTION_KEY` in your `.env` before entering SMTP credentials in the dashboard. See [docs/upgrading.md](docs/upgrading.md#upgrading-to-v030).

### Fixed
- Same-origin commenting from the admin dashboard: `getDomainOrError` now falls back to the `Host` header when no `Origin` header is present.
- Admin dashboard commenting: accepts `domain_id` from the POST body when a valid admin JWT is present, enabling the admin to comment from the thread view.

---

## [0.2.0] - 2026-05-20

### Added
- **Zero-config embed**: server URL is now inferred from the `client.js` script `src` automatically. No JavaScript configuration block required.
- **Stable thread keys**: widget resolves `postUrl` in priority order: `data-url` attribute, then `<link rel="canonical">`, then `window.location.pathname`. Sites using canonical tags (Ghost, Hugo, Jekyll, WordPress) get stable thread keys across slug changes automatically.
- **`data-url` attribute**: pin a thread to an explicit stable key with `<div id="discuss-comments" data-url="/posts/123">`.
- **Admin inbox actions**: inbox comment items now show the full action set: Approve/Unapprove, Pin/Unpin, inline Edit, Delete.
- **Clickable post URLs**: post URLs in the inbox and posts table are now clickable links.
- **"View thread" link**: each inbox item links directly to the threaded comment view for that post within the admin.

### Changed
- **Tailwind v4 / KDS migration**: replaced inline Tailwind v3 config with `@karthikeyankc/ken-design-system` (local npm package, Tailwind v4). Deleted `globals.css`, `tailwind.admin.config.js`, `tailwind.client.config.cjs`, `src/design-system/tailwind.config.js`.
- **Admin UI KDS compliance**: replaced all hardcoded `text-neutral-*` colour classes with KDS semantic tokens (`--t1` to `--t5`). Section headings, field spacing, help text, and label weights now follow KDS spec.
- **Widget scoped CSS reset**: added a scoped reset for `button`, `input`, `textarea`, `select` inside `#discuss-comments`. Fixes the raised/3D button appearance on host pages without a CSS reset.
- **Post button KDS compliance**: `.discuss-btn` now has proper base styles: `inline-flex`, `height: 40px`, `border-radius`, `font-weight: 500`, focus ring, and active scale transform.
- **Placeholder consistency**: `::placeholder` reset sets `opacity: 1` to fix Firefox's 54% default opacity on placeholder text.
- **Inbox typography consistency**: excerpt, date, and avatar initials font sizes now match the threaded widget view.
- **`currentScript` detection**: switched from `scripts[scripts.length-1]` to `document.currentScript` for reliable script origin detection with `async`/`defer`.

### Fixed
- **Security: `sanitize-html`**: updated to 2.17.4 (critical XSS via `xmp` raw-text passthrough, GHSA-rpr9-rxv7-x643).
- **Security: `express-rate-limit`**: updated to 8.5.2 (moderate XSS in `ip-address` Address6 HTML methods, GHSA-v2v4-37r5-5v8g).
- **Security: `postcss`**: updated to 8.5.15 (arbitrary file read via user-generated CSS, fixed in 8.5.12).
- **`better-sqlite3`**: updated to 12.10.0 (SQLite 3.53.1, Node.js 26 prebuild support).
- Removed personal email address from `SECURITY.md`, replaced with a GitHub issue link.

---

## [0.1.0] - 2026-04-29

### Added
- Rate limiting on admin login (10 attempts per 15 minutes).
- Content-Security-Policy and Referrer-Policy security headers.
- `JWT_SECRET` environment variable required in production. Server refuses to start without it.
- Centralised config module (`src/config.js`).
- `.env.example` with all supported environment variables.
- `SECURITY.md` with vulnerability disclosure policy.
- `CONTRIBUTING.md` with dev setup, conventions, and PR guidelines.
- `CHANGELOG.md`.
- Dependabot config for weekly dependency updates.
- GitHub issue templates and PR template.
- CI workflow (`npm audit`, module import smoke test).

### Fixed
- Hardcoded JWT secret fallback removed.
- JWT secret deduplicated into a single config module.

---

## [0.0.0] - 2026-04-27

### Added
- Anonymous commenting with name and email.
- Comment threading (nested replies).
- Comment moderation via admin dashboard.
- Spam protection: honeypot hidden field and configurable question.
- Gravatar avatars with initials fallback.
- Markdown rendering (bold, italics, lists, inline code, code blocks) with server-side HTML sanitisation.
- Admin dashboard:
  - Login / logout with JWT stored in an HttpOnly cookie.
  - Overview stats (total, pending, approved, domain count).
  - Comments inbox with tabs (all / pending / approved) and bulk approve/delete.
  - Add and delete domains.
  - Per-domain settings: name, brand colour picker with WCAG AA/AAA and APCA indicators, spam trap label, blocked words.
  - Embed code snippet with one-click copy.
  - Posts view and per-post comment moderation.
  - User avatar (initials) with sign-out dropdown.
- Dynamic CORS: allowed origins are stored in SQLite and checked per request.
- Security headers: X-Content-Type-Options, X-Frame-Options, HSTS, CSP, Referrer-Policy.
- Argon2id password hashing.
- SQLite WAL mode, busy timeout, and foreign key constraints enabled.
