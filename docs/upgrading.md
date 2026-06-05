# Upgrading

## Upgrading to v0.3.0

v0.3.0 adds email notifications with encrypted SMTP credential storage. If you configure SMTP through the dashboard, set `ENCRYPTION_KEY` in your `.env` **before** entering any credentials. If you skip this, credentials are stored as plaintext — functional but not recommended for production.

To generate a key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add it to your `.env`:

```
ENCRYPTION_KEY=your-generated-key-here
```

If you already saved SMTP credentials without a key and then add one later, you will need to re-enter your credentials in the dashboard — the previously stored plaintext values will not decrypt correctly under the new key.

---

## Before you upgrade

Always back up your database first:

```bash
cp discuss.db discuss.db.bak
```

## Upgrade steps

```bash
git pull origin main
npm install --production
```

If running under systemd:

```bash
sudo systemctl restart discuss
sudo systemctl status discuss
```

Schema migrations run automatically on startup. No manual SQL is needed.

## Renaming a post URL

If you rename a post's URL after comments have been posted, the comments are still in the database under the old path. To reassign them:

```sql
UPDATE comments SET post_url = '/new-path' WHERE post_url = '/old-path';
```

Run this directly against your SQLite database using the `sqlite3` CLI or any SQLite client.

To avoid this situation in the first place, pin threads to a stable key using the `data-url` attribute — see [Embedding](embed.md).
