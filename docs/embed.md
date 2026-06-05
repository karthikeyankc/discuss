# Embedding the Widget

## Basic embed

Go to **Admin > Domains > Settings > Embed** and copy the snippet for your domain. Paste it into any page where you want comments to appear:

```html
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

That's it. The widget infers the server URL from the script `src`, and fetches its colour and settings automatically. Each page gets its own comment thread keyed to `window.location.pathname` with no configuration needed.

## Stable thread keys

By default the widget uses `window.location.pathname` as the thread key. If you ever rename a URL, the comments under the old path become unreachable from the widget (they are still in the database).

To avoid this, pin a thread to a permanent key using `data-url`:

```html
<div id="discuss-comments" data-url="/posts/my-stable-slug"></div>
```

Use a value that will never change — a post ID, a UUID, or a slug you commit to permanently. The `data-url` attribute takes priority over `window.location.pathname` when present.

The widget also checks `<link rel="canonical">` automatically, so sites using canonical tags (Ghost, Hugo, Jekyll, WordPress) get stable thread keys across slug changes at zero config.

## Programmatic options

Use `new DiscussWidget({...})` only if you need to override defaults:

```html
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
<script>
  new DiscussWidget({
    serverUrl: 'https://discuss.example.com',
    postUrl: '/posts/my-post',
    primaryColor: '#2563eb',
  });
</script>
```

| Option | Default | Description |
|---|---|---|
| `serverUrl` | inferred from script `src` | URL of your Discuss server |
| `postUrl` | `window.location.pathname` | Thread key for this page |
| `primaryColor` | fetched from server | Brand colour for buttons and links |
| `domainId` | *(none)* | Required when posting from a cross-origin admin context |

## Cross-origin setup

If your Discuss server is on a different domain from your site (e.g. `discuss.example.com` serving comments for `myblog.com`), register `myblog.com` as a domain in the admin dashboard. The widget handles the rest — CORS is configured automatically per registered domain.
