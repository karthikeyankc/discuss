# AI Usage Disclosure

Discuss uses AI tools during development. This file documents how and where.

## Tools used

- **Gemini** (Google)
- **ChatGPT** (OpenAI)
- **Claude** (Anthropic)

## What AI contributed

- Server-side route logic and middleware
- Database migration scripts
- Admin UI JavaScript (`public/admin/app.js`)
- Client widget (`src/client/`)
- Documentation drafts (`docs/`, `README.md`)

## What was reviewed by a human

Every AI-generated change was reviewed, tested in a staging environment, and committed by the project author. No code was merged without manual verification.

This project was built for personal use and runs on the author's own site. Security is taken seriously as a result: AI-generated code is not blindly trusted, and every change is read, understood, and tested before being shipped.

## Why disclose this

Transparency. If you're evaluating this project for production use, you should know how it was built. The software is released under the MIT license, so use it, audit it, and judge it on its merits.
