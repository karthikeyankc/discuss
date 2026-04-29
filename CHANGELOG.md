# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
