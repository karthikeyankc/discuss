# Configuration

All configuration is done via environment variables. Copy `.env.example` to `.env` and set values before starting the server.

## Environment variables

| Variable | Default | Required in production | Description |
|---|---|---|---|
| `JWT_SECRET` | *(none)* | **Yes** | Signs admin session tokens. Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ENCRYPTION_KEY` | *(none)* | Recommended | 32-byte hex key used to encrypt SMTP credentials at rest (AES-256-GCM). Generate the same way as `JWT_SECRET`. If not set, SMTP credentials are stored as plaintext. |
| `PORT` | `3000` | No | Port the server listens on. |
| `HOST` | `127.0.0.1` | No | Interface the server binds to. The default is localhost-only, which is correct behind a reverse proxy. Do not set to `0.0.0.0` unless you have a specific reason to expose the port directly. |
| `APP_URL` | *(none)* | No | Public URL of your Discuss instance, e.g. `https://discuss.example.com`. Used to generate dashboard links in notification emails. |
| `NODE_ENV` | `development` | No | Set to `production` for production deployments. |

The server refuses to start in production if `JWT_SECRET` is not set.

## Per-domain settings

Settings that vary per site — brand colour, spam controls, SMTP credentials — are configured through the admin dashboard under **Domains > Settings**, not via environment variables. This allows you to run multiple sites from a single Discuss instance with independent configurations.
