# Security Policy

## Supported Versions

Only the latest release receives security fixes. We recommend always running the latest version.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

To report a vulnerability, email **karthikeyank@signeasy.com** with:

- A description of the vulnerability and its potential impact
- Steps to reproduce or a proof-of-concept
- Any suggested mitigations (optional)

You can expect an acknowledgement within **48 hours** and a resolution or status update within **7 days**.

Once the vulnerability is confirmed and fixed, we will:
1. Release a patched version
2. Credit you in the release notes (unless you prefer to remain anonymous)
3. Publish a security advisory on GitHub

## Security Best Practices for Self-Hosters

- **Always set `JWT_SECRET`** to a long, random string in production. Generate one with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- Run behind a reverse proxy (Nginx/Caddy) with TLS enabled.
- Keep Node.js and all dependencies up to date.
- Restrict server access to only the ports you need (80, 443).
- Set `NODE_ENV=production` in your environment.
