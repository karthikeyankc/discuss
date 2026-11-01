# Upgrading

## Upgrading to v0.5.9

v0.5.9 needs Node.js 22 or later, because Node 20 reached end of life on 30 April 2026.

```bash
node --version   # must be 22 or later
```

v0.5.8 and earlier leave recent writes in `discuss.db-wal`, so back up with `sqlite3 discuss.db ".backup discuss.db.bak"` before upgrading, as [Before you upgrade](#before-you-upgrade) describes. From v0.5.9, discuss folds the `-wal` file into `discuss.db` when it starts and when it stops, and its first start folds in everything waiting there.

`DB_PATH` is new. It sets where the database lives, and unset it stays at `discuss.db` in the project root.

No manual database changes are needed.

---

## Upgrading to v0.5.0

The big change in v0.5.0 is that CSS is no longer bundled inside `client.js`. It's now a separate `client.css` file. Update your embed snippet to include the stylesheet:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

If you leave out the `<link>` tag the widget loads with no styles at all, which is fine if you're writing your own. See [Customisation](customization.md) for a full example stylesheet.

The snippet in your admin dashboard is already updated. If you hard-coded the old snippet on your site, just add the `<link>` tag manually.

No database changes needed.

---

## Upgrading to v0.3.0

v0.3.0 adds email notifications. Before you enter any SMTP credentials in the dashboard, set `ENCRYPTION_KEY` in your `.env`. If you skip that, credentials get stored as plaintext. It still works, but you really don't want that on a production server.

To generate a key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add it to your `.env`:

```
ENCRYPTION_KEY=your-generated-key-here
```

If you already saved SMTP credentials without a key and then add one later, you will need to re-enter your credentials in the dashboard. The previously stored plaintext values will not decrypt correctly under the new key.

---

## Upgrading to v0.3.6

v0.3.3 adds local dev support via per-domain allowed origins, and switches `.env` loading to Node's native `--env-file` flag. Node.js 20.6.0 or later is now required.

If you were running Node 18, upgrade before pulling this version:

```bash
node --version   # must be >= 20.6.0
```

No database changes require manual intervention. The `allowed_origins` column is added automatically on startup.

---

## Upgrading to v0.4.0

v0.4.0 adds trailing-slash URL normalisation and moves the domain delete button into an Advanced settings tab. No manual steps are required.

The trailing-slash migration runs automatically on first server start: `/post/` and `/post` are unified into a single thread. Back up your database before starting if you want a rollback option.

**Apache users:** this release introduces admin deep-link support via encoded slashes in URLs. Add the following to your VirtualHost if you haven't already:

```apache
AllowEncodedSlashes NoDecode
ProxyPass / http://127.0.0.1:3000/ nocanon
```

See the Apache configuration section in the README for the full example.

---

## Before you upgrade

Always back up your database first. discuss runs SQLite in WAL mode, which keeps recent writes in `discuss.db-wal` until it folds them into `discuss.db`, so a copy of `discuss.db` alone can miss them. Stop discuss before copying it.

```bash
sudo systemctl stop discuss
cp discuss.db discuss.db.bak
```

discuss folds the `-wal` file into `discuss.db` when it stops and when it starts. Versions up to v0.5.8 don't, so on those, or to back up without stopping discuss, use SQLite's own copy, which includes the `-wal` file.

```bash
sqlite3 discuss.db ".backup discuss.db.bak"
```

If you set `DB_PATH`, use that path in place of `discuss.db`.

## Upgrade steps

```bash
git pull origin main
npm install --production
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

To avoid this situation in the first place, pin threads to a stable key using the `data-url` attribute — see the Embedding section in the README.
