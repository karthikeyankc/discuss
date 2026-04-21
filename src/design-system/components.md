# Ken Design System — Component Reference

## Setup
Copy `tailwind.config.js` + `globals.css` into the project.
Import `globals.css` as the stylesheet entry point.
`globals.css` includes Tailwind Preflight via `@tailwind base`, so the reset step is already covered. The file also defines semantic CSS variables (`--s1`, `--t1`, `--focus-ring`, etc.) that composite components consume.
Replace the `primary` color scale in `tailwind.config.js` with the brand scale
(use `ken-design-system.html` to pick a color and export the config).

Add Lucide for icons:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```
Then call `lucide.createIcons()` after the DOM is ready. Icons inside `.btn` auto-size to `1em` and inherit color — no extra classes needed.

---

## Logo mark
The Ken DS mark is a geometric "K" in a `var(--b600)` rounded square. It updates live with the brand color.
```html
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
  <rect width="32" height="32" rx="8" fill="var(--b600)"/>
  <path d="M11 8v16M11 16l11-8M11 16l11 8"
        stroke="white" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```
Use `width="28" height="28"` in sidebars, `width="24" height="24"` in top bars.

---

## Color tokens (CSS variables, updated live with brand)
| Variable | Stop | Use |
|---|---|---|
| `--b50` | 50 | Tinted page backgrounds, alert fills |
| `--b100` | 100 | Badge backgrounds |
| `--b200` | 200 | Borders on colored surfaces |
| `--b600` | 600 | Buttons, links — your brand hex (passes WCAG AA) |
| `--b700` | 700 | Hover states |
| `--b800` | 800 | Active / pressed states |
| `--b900` | 900 | Dark text on light brand bg |

Neutral palette (cool blue-gray): `#ffffff` `#f8fafc` `#f1f5f9` `#e2e8f0` `#cbd5e1` `#94a3b8` `#64748b` `#475569` `#334155` `#1e293b` `#111827` `#0a1120`

---

## Label overline
Small uppercase group header. Used above component groups, form sections, sidebar group labels.
```html
<span class="label-overline">Section title</span>
```
Color is `neutral-600` — passes WCAG AA (≥ 4.5:1) on both white and the `#f8fafc` page background. Never use `neutral-400` or `neutral-500` for text this small — they fail.

## Label mono
Monospace reference label. Used below component demos to show the class name or token.
```html
<div class="label-mono">.btn-primary</div>
```

## Section title / description
Page or section headings used in documentation, settings pages, or content layouts.
```html
<div class="section-title">Typography</div>
<div class="section-desc">System font stack. Sizes on the 8px grid from 24px up.</div>
```

---

## Button
```html
<button class="btn btn-primary">Label</button>
<button class="btn btn-secondary">Label</button>
<button class="btn btn-ghost">Label</button>
<button class="btn btn-danger">Label</button>
<button class="btn btn-success">Label</button>
```
Size modifiers: `btn-sm` `btn-lg`

**With Lucide icons** — icons inside `.btn` auto-size to `1em`, no extra classes:
```html
<!-- Leading icon (most common) -->
<button class="btn btn-primary"><i data-lucide="plus"></i> New item</button>
<button class="btn btn-secondary"><i data-lucide="download"></i> Export</button>
<button class="btn btn-danger"><i data-lucide="trash-2"></i> Delete</button>

<!-- Trailing icon (directional CTAs) -->
<button class="btn btn-ghost">Continue <i data-lucide="arrow-right"></i></button>

<!-- Icon-only — always add aria-label -->
<button class="btn btn-icon" aria-label="Settings"><i data-lucide="settings"></i></button>
```

With spinner: `<button class="btn btn-secondary"><span class="spinner spinner-sm"></span> Loading</button>`

---

## Form fields
```html
<div class="field-group">
  <label class="label">Field name</label>
  <input type="text" class="input" placeholder="…">
  <span class="field-help-text">Helper text</span>
</div>

<!-- Error state -->
<input class="input input-error" …>
<span class="field-error-text">Required</span>

<!-- Textarea -->
<textarea class="input textarea"></textarea>

<!-- Select -->
<select class="input select"><option>…</option></select>
```
Note: the `<select>` trigger is styled but the dropdown list is OS-rendered — no browser allows CSS styling of the native dropdown. This is intentional; native select retains full keyboard and screen reader accessibility.

**Checkbox**
```html
<label class="checkbox-label">
  <input type="checkbox" class="checkbox-input">
  <span class="checkbox-box">
    <svg class="checkbox-icon" viewBox="0 0 12 10"><path d="M1.5 5L4.5 8.5L10.5 1.5"/></svg>
  </span>
  Label text
</label>
```
`.checkbox-label` sets `position:relative` in CSS — the hidden input is `position:absolute` and anchors to the nearest positioned ancestor. This is enforced by the class itself; no extra HTML attribute is needed.

**Radio**
```html
<label class="radio-label">
  <input type="radio" class="radio-input" name="group">
  <span class="radio-box"><span class="radio-dot"></span></span>
  Label text
</label>
```
Same `position:relative` is set on `.radio-label` — see note above.

---

## Card
```html
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
  <div class="card-footer">Actions</div>
</div>
```
`card-header` and `card-footer` are optional.

---

## Badge
```html
<span class="badge badge-info">Info</span>
<span class="badge badge-neutral">Label</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-danger">Error</span>
```

`badge-info` uses **fixed blue** (`#dbeafe` bg / `#1e40af` text, ~5.2:1 WCAG AA). It does **not** derive from the brand `primary` scale — semantic status colors must stay constant regardless of brand hue.

---

## Alert
```html
<div class="alert alert-info">
  <span>ℹ</span><span><strong>Title:</strong> Message text.</span>
</div>
```
Variants: `alert-info` `alert-success` `alert-warning` `alert-danger`

`alert-info` uses **fixed blue** (`#eff6ff` bg / `#1e3a8a` text, ~9.6:1 WCAG AAA) — same fixed-blue rationale as `badge-info`.

---

## Table
```html
<div class="table-wrap">
  <table class="table">
    <thead><tr><th>Name</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>Row value</td><td><span class="badge badge-success">Active</span></td></tr>
    </tbody>
  </table>
</div>
```
Always wrap in `.table-wrap` (`overflow-x:auto`) so the table scrolls horizontally on mobile instead of being clipped. Wrap in `.card` for a contained surface.

---

## Avatar
```html
<span class="avatar avatar-md">AB</span>
```
Sizes: `avatar-xs` `avatar-sm` `avatar-md` `avatar-lg` `avatar-xl`
For image avatars: `<img class="avatar avatar-md" src="…" alt="…">`

---

## Misc
```html
<!-- Spinner (inherits color from parent) -->
<span class="spinner spinner-md"></span>
<!-- Sizes: spinner-sm spinner-md spinner-lg -->

<!-- Skeleton -->
<div class="skeleton" style="height:1rem;width:60%"></div>

<!-- Divider with text -->
<div class="divider">or continue with</div>

<!-- Tooltip (CSS-only) -->
<div class="tooltip">
  <button class="btn btn-secondary btn-sm">Hover</button>
  <div class="tooltip-content">Tooltip text</div>
</div>
```

**Tooltip placement variants** — default is above the trigger. For elements near the top of the viewport (e.g., table action buttons), use a below variant by overriding `bottom-full`/`mb-2` with `top-full`/`mt-2` and flipping the `translateY` direction. The CSS-only implementation cannot auto-flip; choose the placement intentionally and document it on the component.

```html
<!-- Default: above -->
<div class="tooltip">
  <button class="btn btn-secondary btn-sm">Hover</button>
  <div class="tooltip-content">Tooltip text</div>
</div>

<!-- Below (for near-top elements) -->
<div class="tooltip">
  <button class="btn btn-secondary btn-sm">Hover</button>
  <div class="tooltip-content" style="bottom:auto;top:100%;margin-top:.5rem;margin-bottom:0;
       transform:translateX(-50%) translateY(-4px);">Tooltip text</div>
</div>
```

---

## Layout helpers
```html
<div class="page-container">   <!-- max-w-7xl, centered, horizontal padding -->
  <div class="section">        <!-- vertical padding block -->
    …
  </div>
</div>
```

---

## Composite components

**Navbar**
```html
<nav class="navbar">
  <a class="navbar-brand" href="#">Brand</a>
  <div class="navbar-menu">
    <a class="navbar-item active" href="#">Dashboard</a>
    <a class="navbar-item" href="#">Projects</a>
  </div>
  <div class="navbar-end">
    <button class="btn btn-primary btn-sm">Action</button>
  </div>
</nav>
```

**Tabs**
```html
<div class="tabs">
  <a class="tab active" href="#overview">Overview</a>
  <a class="tab" href="#settings">Settings</a>
</div>
```

**Stat card**
```html
<div class="stat-card">
  <div class="stat-label">Total users</div>
  <div class="stat-value">12,483</div>
  <div class="stat-delta up">↑ 12%</div>
</div>
```
Delta variants: `.up` `.down` `.flat`

**Page header**
```html
<div class="page-header">
  <div class="breadcrumb">
    <a href="#">Home</a>
    <span class="breadcrumb-sep"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    <span>Page</span>
  </div>
  <div class="page-title-row">
    <h1 class="page-title">Title</h1>
    <div class="page-actions"><button class="btn btn-primary">Action</button></div>
  </div>
</div>
```

**Dropdown** (toggle with JS: `toggleDropdown('id')`)
```html
<div class="dropdown">
  <button class="btn btn-secondary" onclick="toggleDropdown('dd1')"
          aria-expanded="false" aria-controls="dd1">Actions ▾</button>
  <div class="dropdown-menu" id="dd1">
    <div class="dropdown-header">Section</div>
    <a class="dropdown-item">Edit</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item danger">Delete</a>
  </div>
</div>
```

**Modal** (open/close with JS: `openModal('id')` / `closeModal('id')`)
```html
<button class="btn btn-secondary" onclick="openModal('myModal')">Open</button>

<div class="modal-overlay" id="myModal" onclick="if(event.target===this)closeModal('myModal')">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="myModal-title">
    <div class="modal-header">
      <span class="modal-title" id="myModal-title">Title</span>
      <button class="btn btn-icon" onclick="closeModal('myModal')" aria-label="Close">✕</button>
    </div>
    <div class="modal-body">Content</div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('myModal')">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

---

## App shell layouts

The design system supports two composable shell variants. Both share the same base CSS properties — only the presence of the sidebar differs.

### Variant A — Navbar only

Use for marketing pages, documentation, or any app that navigates via the top bar.

```html
<div class="app">
  <header class="app-navbar">
    <a class="navbar-brand" href="#"><!-- logo --></a>
    <nav style="display:flex;gap:.25rem;margin-left:2rem">
      <a class="navbar-item active" href="#">Dashboard</a>
      <a class="navbar-item" href="#">Projects</a>
    </nav>
    <div style="margin-left:auto;display:flex;gap:.5rem">
      <button class="btn btn-primary btn-sm">Action</button>
    </div>
  </header>
  <main class="app-content">
    <div class="app-content-inner">…</div>
  </main>
</div>
```

```css
html, body      { height: 100%; overflow: clip; }          /* CRITICAL — see overflow:clip note */
.app            { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.app-navbar     { height: 52px; flex-shrink: 0; display: flex; align-items: center;
                  padding: 0 1rem; box-shadow: 0 1px 0 #e2e8f0; }
.app-content    { flex: 1; min-height: 0; overflow-y: auto; scroll-behavior: smooth; }
.app-content-inner { padding: 1.5rem; }
@media (min-width: 768px) { .app-content-inner { padding: 2rem; } }
```

### Variant B — Navbar + Sidebar

Use for admin dashboards, tools, or any app where the primary navigation lives in a side panel.

```html
<div class="app">
  <header class="app-navbar">
    <a class="navbar-brand" href="#"><!-- logo --></a>
    <!-- mobile only: hamburger opens sidebar drawer from right -->
    <button class="btn btn-icon" id="menuBtn" style="display:none"
            aria-label="Open menu" aria-expanded="false" aria-controls="sidebarNav">
      <i data-lucide="menu"></i>
    </button>
  </header>
  <div class="sidebar-backdrop"></div>
  <div class="app-body">
    <nav class="app-sidebar" id="sidebarNav">
      <a class="sidebar-item active" href="#dashboard">Dashboard</a>
      <a class="sidebar-item" href="#settings">Settings</a>
    </nav>
    <main class="app-content">
      <div class="app-content-inner">…</div>
    </main>
  </div>
</div>
```

```css
html, body      { height: 100%; overflow: clip; }          /* CRITICAL — see overflow:clip note */
.app            { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.app-navbar     { height: 52px; flex-shrink: 0; display: flex; align-items: center;
                  padding: 0 1rem; box-shadow: 0 1px 0 #e2e8f0; }
.sidebar-backdrop { display:none; position:fixed; inset:0; background:rgba(0,0,0,.4); }
.app-body       { display: flex; flex: 1; min-height: 0; }
.app-sidebar    { width: 200px; flex-shrink: 0; overflow-y: auto;
                  box-shadow: 1px 0 0 #e2e8f0; z-index: 1; }
.app-content    { flex: 1; min-height: 0; overflow-y: auto; scroll-behavior: smooth; }
.app-content-inner { padding: 1.5rem; }
@media (min-width: 768px) { .app-content-inner { padding: 2rem; } }
```

> **`overflow:clip` is not interchangeable with `overflow:hidden`.**  
> `overflow:hidden` hides visual overflow but still allows browsers to modify `scrollTop` programmatically, causing a blank gap at the bottom of the shell. `overflow:clip` prevents this entirely. Do not change it.

**Navbar content rules:**
- Variant A: logo (left) + inline nav links + action button (right via `margin-left:auto`)
- Variant B: logo (left) + hamburger mobile toggle (right via `margin-left:auto`). No nav links — that’s the sidebar’s job. Keeping them separate prevents duplication and follows the Apple HIG principle that the top bar signals identity/actions, not navigation.

**Content spacing:** `.app-content` is intentionally unpadded so edge-to-edge tables, canvases, and custom panes are still possible. For normal pages, wrap the page body in `.app-content-inner` to get a comfortable gutter: `1.5rem` on small screens, `2rem` from `768px` upward.

**White page surfaces:** when the main pane should feel like a page rather than a dashboard canvas, add `.app-content-page` to the same element. This makes the full content column white without forcing the reading surface into a card.

**Sidebar item states:**

| State | Background | Text | Note |
|---|---|---|---|
| Default | transparent | `var(--t4)` | — |
| Hover | `var(--accent-surface)` | `var(--t1)` | faint brand tint; derived to maintain contrast at any brand hue |
| Active | `var(--accent-surface)` | `var(--accent-fg)` | brand-colored text + `font-weight:600`; `--accent-fg` is solved to ≥ 4.5:1 on `--accent-surface` |

The shell `aside` / `.app-sidebar` requires `z-index: 1` so its right-edge shadow paints on top of `main`’s background (flex items paint in DOM order without it).

**Active sidebar item tracking:** use a scroll listener on `.app-content` — mark the `.sidebar-item` whose section’s top edge has passed 80px below the navbar. Anchor clicks must scroll `.app-content` directly (never let the browser scroll `body` — it fights the `overflow:clip` constraint).

**Mobile (`< 768px`) — Variant B only:** the sidebar becomes a fixed drawer sliding in from the **right** (logo stays left, hamburger stays right via `margin-left:auto`). Use `transform: translateX(100%)` closed / `translateX(0)` open + a backdrop overlay. Dismiss via backdrop click or **Escape** (WCAG 2.1 SC 1.4.13).

**Empty state**
```html
<div class="empty-state">
  <div class="empty-icon">📭</div>
  <div class="empty-title">Nothing here</div>
  <div class="empty-desc">Create something to get started.</div>
  <button class="btn btn-primary btn-sm">Create</button>
</div>
```

---

## Common patterns

**Form with validation**
```html
<div class="field-group">
  <label class="label">Email <span class="label-required"></span></label>
  <input type="email" class="input input-error" value="bad@">
  <span class="field-error-text">Enter a valid email address.</span>
</div>
```

**Card with badge in header**
```html
<div class="card">
  <div class="card-header" style="display:flex;justify-content:space-between;align-items:center">
    <span style="font-weight:600">Title</span>
    <span class="badge badge-success">Live</span>
  </div>
  <div class="card-body">…</div>
</div>
```

**Table inside card**
```html
<div class="card">
  <div class="table-wrap">
    <table class="table">…</table>
  </div>
</div>
```

**Writing / reading page in app shell**
```html
<main class="app-content app-content-page">
  <div class="app-content-inner">
    <article class="max-w-prose">
      <span class="label-overline">Essay</span>
      <h1 class="page-title" style="margin-bottom:.5rem">On Writing With Clarity</h1>
      <p style="margin:0 0 1.25rem;color:var(--t4);font-size:.875rem">By Mara Vale · 8 min read</p>
      <p>Long-form content sits best on a full white page surface, not inside a floating card.</p>
    </article>
  </div>
</main>
```
Use this when the entire content column should feel like a page: editorial surfaces, publisher tools, e-sign review screens, or any reading-heavy workflow. `.app-content-page` turns the main pane white, `.app-content-inner` provides the gutter, and `max-w-prose` keeps line length in the comfortable 65ch range defined in `ken-design-system.md`.

**Button group**
```html
<div style="display:flex;gap:.5rem">
  <button class="btn btn-primary">Save</button>
  <button class="btn btn-secondary">Cancel</button>
  <button class="btn btn-ghost btn-sm">Delete</button>
</div>
```

**Comments**
```html
<div style="margin-bottom:2.5rem">
  <h3 style="font-size:1.125rem;font-weight:600;color:var(--t1);margin:0 0 1.25rem">Leave a comment</h3>
  <div style="display:flex;gap:1rem;margin-bottom:1rem;flex-wrap:wrap">
    <div class="field-group" style="flex:1;min-width:200px;margin-bottom:0">
      <label class="label">Name</label>
      <input type="text" class="input" placeholder="Your name">
    </div>
    <div class="field-group" style="flex:1;min-width:200px;margin-bottom:0">
      <label class="label">Email</label>
      <input type="email" class="input" placeholder="Your email">
    </div>
  </div>
  <div class="field-group" style="margin-bottom:1.25rem">
    <label class="label">Comment</label>
    <textarea class="input textarea" placeholder="Write your comment here..."></textarea>
  </div>
  <div style="display:flex;justify-content:flex-end">
    <button class="btn btn-primary">Post comment</button>
  </div>
</div>

<div style="display:flex;flex-direction:column;gap:1.5rem">
  <!-- Top level comment -->
  <div style="display:flex;gap:1rem">
    <span class="avatar avatar-md" style="background:var(--b100);color:var(--b900)">JD</span>
    <div style="flex:1">
      <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.25rem">
        <span style="font-weight:600;font-size:.875rem;color:var(--t1)">Jane Doe</span>
        <span style="font-size:.875rem;color:var(--t4)">2 hours ago</span>
      </div>
      <p style="font-size:.9375rem;color:var(--t2);line-height:1.65;margin:0 0 .75rem">This is a great article! Thanks for sharing the insights on design systems. I found the elevation philosophy particularly useful.</p>
      <div style="display:flex;gap:.5rem;align-items:center">
        <button class="btn btn-ghost" style="padding:0 .5rem;height:24px;font-size:.75rem"><i data-lucide="reply"></i> Reply</button>
        <button class="btn btn-ghost" style="padding:0 .5rem;height:24px;font-size:.75rem"><i data-lucide="share"></i> Share</button>
      </div>
      
      <!-- Nested reply -->
      <div style="display:flex;gap:.75rem;margin-top:1rem">
        <span class="avatar avatar-sm">KS</span>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.25rem">
            <span style="font-weight:600;font-size:.875rem;color:var(--t1)">Ken Smith</span>
            <span class="badge badge-info">Admin</span>
            <span style="font-size:.875rem;color:var(--t4)">1 hour ago</span>
          </div>
          <p style="font-size:.9375rem;color:var(--t2);line-height:1.65;margin:0 0 .75rem">Glad you found it helpful, Jane! Let me know if you have any questions.</p>
          <div style="display:flex;gap:.5rem;align-items:center">
            <button class="btn btn-ghost" style="padding:0 .5rem;height:24px;font-size:.75rem"><i data-lucide="reply"></i> Reply</button>
            <button class="btn btn-ghost" style="padding:0 .5rem;height:24px;font-size:.75rem"><i data-lucide="share"></i> Share</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
