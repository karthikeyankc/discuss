# Embedding the Widget

## Basic embed

Go to **Admin > Domains > Settings > Embed** and copy the snippet for your domain. Paste it into any page where you want comments to appear:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

The script figures out the server URL from its own `src`, then pulls the domain's colour and settings automatically. Every page gets its own comment thread based on `window.location.pathname` with nothing else to configure.

### Unstyled embed

To embed without any default styles (for example, when you are writing your own CSS from scratch), omit the `<link>` tag:

```html
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

See [Customisation](./customization.md) for the list of CSS custom properties and an example stylesheet to get you started.

## Stable thread keys

By default the widget uses `window.location.pathname` as the thread key. If you ever rename a URL, the comments under the old path become unreachable from the widget (they are still in the database).

To avoid this, pin a thread to a permanent key using `data-url`:

```html
<div id="discuss-comments" data-url="/posts/my-stable-slug"></div>
```

Use a value that will never change: a post ID, a UUID, or a slug you commit to permanently. The `data-url` attribute takes priority over `window.location.pathname` when present.

The widget also checks `<link rel="canonical">` automatically, so sites using canonical tags (Ghost, Hugo, Jekyll, WordPress) get stable thread keys across slug changes at zero config.

## Programmatic options

Use `new DiscussWidget({...})` only if you need to override defaults:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
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

## Custom font

The widget uses the system font stack by default. To use a custom font, set the `--discuss-font-family` CSS variable on any ancestor element (no `!important` required):

```css
#discuss-comments {
    --discuss-font-family: 'Inter', sans-serif;
}
```

Your page still needs to load the font file (e.g. via Google Fonts). The variable just tells the widget which family to apply.

## Cross-origin setup

If your Discuss server is on a different domain from your site (e.g. `discuss.example.com` serving comments for `myblog.com`), register `myblog.com` as a domain in the admin dashboard. CORS is configured automatically per registered domain.

## Local development

By default, only requests from your registered domain are allowed. To test comments on a local dev server (e.g. `http://localhost:4321`), add it as an allowed origin:

1. Go to **Admin > Domains > Settings > General**
2. Under **Additional allowed origins**, add your local dev server, one origin per line, including protocol and port:
   ```
   http://localhost:4321
   ```
3. Save. The widget on your local server will now be able to fetch and post comments against your production domain record.

These origins are scoped to the domain they're added to, so an origin you add to `myblog.com` can't reach a different domain on the same Discuss instance. You can remove dev origins before going live if you want to keep things tidy, but leaving them there won't cause any problems.
