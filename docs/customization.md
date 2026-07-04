# Customising the Widget

# Customising the Widget

The default styles are just a starting point. You can override individual tokens, restyle specific components, or skip `client.css` entirely and write your own from scratch.

## How styles are loaded

The widget ships as two files. `client.js` is always required. `client.css` is optional.

The standard embed includes both:

```html
<link rel="stylesheet" href="https://discuss.example.com/client.css">
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

If you want to build your own styles from scratch, just drop the `<link>`:

```html
<div id="discuss-comments"></div>
<script src="https://discuss.example.com/client.js"></script>
```

The widget loads with no styles at all in this mode. Every element has a named class, so you have full control over the look. There's a complete example stylesheet at the bottom of this page.

---

## CSS custom properties (design tokens)

All colours, borders, and surfaces are CSS custom properties set on `#discuss-comments`. Override any of them from your own stylesheet and the whole widget picks up the change without you having to touch individual selectors.

### Text colours

| Token | Default (light) | Role |
|---|---|---|
| `--t1` | `oklch(18.5% 0.008 250)` (near-black) | Primary text |
| `--t2` | `oklch(37.5% 0.016 250)` (dark grey) | Body text |
| `--t3` | `oklch(48.0% 0.020 250)` (mid grey) | Secondary / muted text |
| `--t4` | `oklch(58.5% 0.022 250)` (grey) | Placeholder, icon colour |
| `--t5` | `oklch(71.0% 0.020 250)` (light grey) | Disabled / placeholder |

### Surface colours

| Token | Default (light) | Role |
|---|---|---|
| `--s1` | `#ffffff` | Primary surface (cards, inputs) |
| `--s2` | `oklch(98.2% 0.004 250)` (near-white) | Secondary surface (form footer) |
| `--s3` | `oklch(95.8% 0.008 250)` (off-white) | Tertiary surface (hover states) |

### Border colours

| Token | Default (light) | Role |
|---|---|---|
| `--bd` | `oklch(84.5% 0.016 250)` | Default border |
| `--bds` | `oklch(91.2% 0.012 250)` | Subtle border (thread lines, dividers) |
| `--bd-control` | same as `--bd` | Input / form element borders |
| `--bd-button` | same as `--bds` | Button borders |
| `--bd-strong` | `oklch(71.0% 0.020 250)` | Elevated border (kbd shadow) |

### Accent (primary) colours

| Token | Role |
|---|---|
| `--accent-fg` | Accent foreground: links, reply tags |
| `--accent-surface` | Accent background: reply tag fill |
| `--focus-ring` | Focus outline colour |
| `--on-primary` | Text colour on primary buttons (`#ffffff`) |

### Dynamic primary scale (`--b50` to `--b900`)

When you pass `primaryColor` to `DiscussWidget`, the widget generates a 10-stop scale from that hex and sets `--b50` through `--b900` on the container. Primary buttons use `--b600` and hover uses `--b700`. You can also set the scale yourself if you want tighter control:

```css
#discuss-comments {
    --b600: #7c3aed;
    --b700: #6d28d9;
    --b800: #5b21b6;
    --on-primary: #fff;
}
```

### Font

```css
#discuss-comments {
    --discuss-font-family: 'Inter', sans-serif;
}
```

Your page still needs to load the font file. The variable just tells the widget which family to apply.

---

## Dark mode

The widget detects dark mode by looking for a `dark` class on an ancestor element. Add it to `<html>` or `<body>` and the widget switches automatically:

```html
<html class="dark">
```

The dark-mode token overrides are defined in `client.css` as:

```css
.dark #discuss-comments {
    --t1: #f8fafc;
    --s1: #111827;
    /* ... */
}
```

You can override individual tokens the same way:

```css
.dark #discuss-comments {
    --s1: #0d1117; /* GitHub-style dark background */
}
```

---

## Widget HTML structure

The widget renders inside `<div id="discuss-comments">`. Here is a simplified view of the DOM tree:

```
#discuss-comments
├── .discuss-comment-row              (one per top-level comment)
│   ├── .discuss-avatar               (user avatar img)
│   └── .discuss-comment-content
│       ├── [comment author + badge]
│       ├── .discuss-comment-body     (rendered markdown prose)
│       ├── .discuss-action-btn       (Reply / Share buttons)
│       ├── .discuss-reply-form       (inline reply form, hidden by default)
│       └── .discuss-nested           (child comment rows, same structure)
│           └── .discuss-comment-row  (recurses)
│
└── .discuss-form-container           (new comment form at the bottom)
    ├── .discuss-form-textarea
    └── .discuss-form-bottom
        ├── .discuss-form-inputs      (name + email fields)
        │   └── .discuss-form-input-wrapper
        │       └── .discuss-form-input
        └── .discuss-form-actions
            └── .discuss-btn .discuss-btn-primary
```

### Key classes

| Class | Element | Notes |
|---|---|---|
| `.discuss-comment-row` | `div` | Wraps avatar and content |
| `.discuss-avatar` | `div > img` | Circular avatar image |
| `.discuss-comment-content` | `div` | Flex column for comment text and actions |
| `.discuss-comment-body` | `div` | Prose area; inherits `color: var(--t2)` |
| `.discuss-badge` | `span` | Author badge (Author, Moderator) |
| `.discuss-reply-tag` | `a` | Inline @-mention link to parent comment |
| `.discuss-action-btn` | `button` / `a` | Reply / Share buttons |
| `.discuss-thread-line` | `div` | Vertical clickable thread collapse line |
| `.discuss-form-container` | `div` | New-comment form wrapper |
| `.discuss-form-textarea` | `textarea` | Main comment textarea |
| `.discuss-form-input` | `input` | Name / email fields |
| `.discuss-btn-primary` | `button` | Submit button |
| `.discuss-spinner` | `span` | Loading spinner (SVG inside) |
| `.discuss-hidden` | any | Utility: `display: none !important` |

---

## Writing a custom stylesheet from scratch

If you embed without `client.css`, you are writing the stylesheet yourself. Here's a minimal starting point. Readable comments, no decoration. Take it and build from there.

```css
/*
 * Minimal Discuss stylesheet
 * Copy, extend, or replace entirely.
 */

#discuss-comments {
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #1a1a1a;

    /* Required tokens: widget reads these for colour */
    --t1: #1a1a1a;
    --t2: #333;
    --t3: #555;
    --t4: #777;
    --t5: #999;
    --s1: #fff;
    --s2: #f5f5f5;
    --s3: #ececec;
    --bd: #ccc;
    --bds: #e0e0e0;
    --bd-control: #ccc;
    --bd-button: #ddd;
    --bd-strong: #aaa;
    --accent-fg: #0055cc;
    --accent-surface: #e8f0fe;
    --focus-ring: #0055cc;
    --on-primary: #fff;

    /* Primary button colour scale: adjust to match your brand */
    --b50:  #e8f0fe;
    --b400: #4d88ff;
    --b600: #0055cc;
    --b700: #0047b3;
    --b800: #003a99;
}

/* Comment thread */
.discuss-comment-row {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.discuss-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
}

.discuss-avatar img { width: 100%; height: 100%; object-fit: cover; }

.discuss-comment-content { flex: 1; min-width: 0; }

.discuss-comment-body {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--t2);
    margin: 0.25rem 0 0.5rem;
}

.discuss-comment-body p { margin: 0 0 0.5em; }
.discuss-comment-body p:last-child { margin-bottom: 0; }
.discuss-comment-body code {
    font-family: monospace;
    background: var(--s3);
    padding: 0.1em 0.3em;
    border-radius: 3px;
}
.discuss-comment-body pre {
    background: var(--t1);
    color: var(--s1);
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
}

/* Thread collapse line */
.discuss-thread-line { display: none; }
.discuss-collapse-line { display: none; }

/* Nested replies */
.discuss-nested { margin-left: 2.75rem; margin-top: 1rem; }

/* Action buttons */
.discuss-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.5rem;
    font-size: 0.8125rem;
    color: var(--t4);
    border: 1px solid var(--bd-button);
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
}
.discuss-action-btn:hover { color: var(--t1); background: var(--s3); }

/* Badge */
.discuss-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.1rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 999px;
}
.discuss-badge-info    { background: #dbeafe; color: #1e40af; }
.discuss-badge-warning { background: #fef3c7; color: #b45309; }

/* Reply tag */
.discuss-reply-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    font-size: 0.8125rem;
    font-weight: 600;
    background: var(--accent-surface);
    color: var(--accent-fg);
    text-decoration: none;
    margin-right: 0.25rem;
}

/* New comment form */
.discuss-form-container {
    border: 1px solid var(--bd-control);
    border-radius: 6px;
    overflow: hidden;
    margin-top: 2rem;
}
.discuss-form-container:focus-within { border-color: var(--focus-ring); }

.discuss-form-textarea {
    display: block;
    width: 100%;
    min-height: 80px;
    padding: 0.75rem;
    border: none;
    resize: vertical;
    font: inherit;
    font-size: 0.9375rem;
    outline: none;
    background: var(--s1);
    color: var(--t1);
}
.discuss-form-textarea::placeholder { color: var(--t5); }

.discuss-form-bottom {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--s2);
    border-top: 1px solid var(--bds);
}

.discuss-form-input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
    min-width: 120px;
}
.discuss-form-input-wrapper svg {
    position: absolute;
    left: 0.6rem;
    width: 1rem;
    height: 1rem;
    color: var(--t4);
    pointer-events: none;
}
.discuss-form-input {
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    border: 1px solid var(--bd-control);
    border-radius: 4px;
    font: inherit;
    background: var(--s1);
    color: var(--t1);
    outline: none;
}
.discuss-form-input:focus { border-color: var(--focus-ring); }
.discuss-form-input::placeholder { color: var(--t5); }

/* Buttons */
.discuss-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    height: 36px;
    border: 1px solid transparent;
    border-radius: 4px;
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
}
.discuss-btn-primary { background: var(--b600); color: var(--on-primary); border-color: var(--b600); }
.discuss-btn-primary:hover { background: var(--b700); border-color: var(--b700); }
.discuss-btn-secondary { background: var(--s1); color: var(--t2); border-color: var(--bd-button); }
.discuss-btn-secondary:hover { background: var(--s3); }

/* Spinner */
.discuss-spinner { display: inline-block; }

/* Utilities: required by the widget's JavaScript to show and hide elements */
.discuss-hidden { display: none !important; }
.discuss-flex { display: flex; }
.discuss-flex-col { flex-direction: column; }
.discuss-flex-wrap { flex-wrap: wrap; }
.discuss-flex-1 { flex: 1 1 0%; }
.discuss-flex-shrink-0 { flex-shrink: 0; }
.discuss-items-center { align-items: center; }
.discuss-justify-end { justify-content: flex-end; }
.discuss-gap-2 { gap: 0.5rem; }
.discuss-gap-4 { gap: 1rem; }
.discuss-gap-6 { gap: 1.5rem; }
.discuss-text-sm { font-size: 0.875rem; }
.discuss-text-xs { font-size: 0.75rem; }
.discuss-text-lg { font-size: 1.125rem; }
.discuss-font-semibold { font-weight: 600; }
.discuss-uppercase { text-transform: uppercase; }
.discuss-tracking-wide { letter-spacing: 0.025em; }
.discuss-mb-10 { margin-bottom: 2.5rem; }

/* Dark mode (optional) */
.dark #discuss-comments {
    --t1: #f8fafc; --t2: #e2e8f0; --t3: #cbd5e1; --t4: #94a3b8; --t5: #64748b;
    --s1: #111827; --s2: #0a1120; --s3: #1e293b;
    --bd: #475569; --bds: #334155; --bd-control: #475569; --bd-button: #334155;
    --accent-fg: #93c5fd; --accent-surface: #1e3a5f;
    --focus-ring: #93c5fd;
}
```

> Copy the above into a `discuss.css` on your site, include it instead of `client.css`, and go from there. Don't remove the utility classes like `.discuss-hidden` and `.discuss-flex`. The widget's JavaScript uses them to show and hide things.
