# Ken Design System
<!-- v1.2.0 -->

This project uses a custom Tailwind-based design system. Before writing any UI code, read `COMPONENTS.md` for the full class reference.

## Authority hierarchy — where design decisions come from

Every decision in this system traces to a primary authority. When in doubt, check in this order:

| Domain | Primary authority | Why |
|---|---|---|
| Accessibility (contrast, focus, touch, spacing) | **WCAG 2.2** (W3C) | Codified into law in US (ADA, Section 508), EU (EN 301 549), UK (Equality Act). Non-negotiable. |
| Contrast calculation | **APCA** (WCAG 3.0 draft) | Replaces the flawed 4.5:1 ratio formula. Models human perception accurately — the old formula fails for some hues and sizes. |
| HTML semantics | **WHATWG HTML Living Standard** | Browser vendors (Apple, Google, Mozilla, Microsoft) maintain this, not W3C. More current. |
| CSS specifications | **W3C CSS Working Group** | The normative reference for all CSS properties. |
| Typography proportions | **Bringhurst — *The Elements of Typographic Style*** | WCAG sets minimums (12px, 1.5× line-height) but says nothing about scale ratios, heading hierarchy, or optimal line length. Bringhurst fills that gap. |
| Touch interaction patterns | **Apple HIG** | WCAG 2.5.8 says 24px minimum. Apple HIG says 44pt. Prefer 44px for touch-primary surfaces. |
| Aesthetics / visual taste | No standard covers this. Intentionally. | |

## Shadows and borders — W3C basis

The shadow-only philosophy for containers is grounded in WCAG 2.2 SC 1.4.11 (Non-text Contrast):

> *"A shadow effect or other visual cue may be used to convey boundary information."* — WCAG Understanding 1.4.11

**What WCAG 1.4.11 actually requires:** Interactive UI components (buttons, inputs, checkboxes) must have 3:1 contrast against adjacent colors. Presentational surfaces (cards showing content) are not in scope.

**Implication for this system:**
- Presentational cards/panels → shadow only is WCAG-compliant
- Interactive surfaces (clickable cards, selectable rows) → must add a visible hover/focus state that independently meets 3:1, because the shadow alone may not be perceivable by low-vision users
- Form controls → border required (shadow alone does not satisfy 1.4.11 for inputs)

**No W3C standard governs shadow aesthetics** (blur radius, spread, opacity). Decisions here follow perceptual principles: shadows simulate directional light and communicate z-axis elevation, not containment. Multiple shadow layers (a diffuse ambient + a sharper key shadow) model real light more accurately than a single layer.

**Two improvements over the baseline jakub.kr formula:**
- Shadow color uses `rgba(15,23,42,x)` (neutral-900 cool blue-gray) instead of pure black — keeps shadows cohesive with the cool palette.
- Layer 2 uses `-0.5px` spread on the near shadow — creates a tighter undercut that reinforces the perimeter ring.

## Elevation philosophy — shadows for containers, borders for form controls

This is the single rule that defines the visual identity. Do not break it.

**Shadows** signal depth and containment for UI surfaces: cards, panels, modals, dropdowns, sidebars, navbars.
**Borders** signal "this field is editable" for form controls only: inputs, selects, textareas, checkboxes, radios.

| Surface type | Depth signal |
|---|---|
| Card, modal, dropdown, sidebar, navbar, stat card | Box shadow — never a border |
| Input, select, textarea, checkbox, radio | Border — accessibility requires visible boundary |
| Card header / footer divider | Internal separator line — acceptable (divides zones within a surface, not its container) |
| Table row separator | Internal separator line — acceptable |

**Never** put both a border and a box shadow on the same container. Pick one. For UI containers, that one is always the shadow.

**Shell divider convention:** The navbar bottom edge and sidebar right edge are both 1px zone dividers. Both use `box-shadow` (not `border`) and the same color for visual parity:
- Navbar: `box-shadow: 0 1px 0 #e2e8f0`
- Sidebar: `box-shadow: 1px 0 0 #e2e8f0`

## Z-index ladder

All components in the system use this fixed z-index scale. Never invent values outside it.

| Level | Value | Components |
|---|---|---|
| Shell chrome | `1` | `.app-sidebar` — paints right-edge shadow over `main` |
| Sticky elements | `10` | Sticky table headers, floating labels |
| Tooltip | `10` | `.tooltip-content` |
| Dropdown | `50` | `.dropdown-menu` |
| Sticky navbar | `100` | `.app-navbar` when `position:sticky` / `position:fixed` |
| Modal backdrop | `200` | `.modal-overlay` |
| Modal | `201` | `.modal` (must be above its backdrop) |
| Toast / notification | `300` | Toasts — above modals so system messages are always visible |

If a future component needs a new layer, add it to this table — do not invent a one-off value.

## Focus rings

**WCAG 2.4.13 (AA):** Focus indicator must have 3:1 contrast against adjacent color and cover at least the perimeter of the unfocused component at 2px thickness.

**System-wide pattern** — all interactive elements (buttons, inputs, nav items, tabs, dropdown items) use a semi-transparent glow:

```css
box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
outline: none;
```

`--focus-ring` resolves to the brand accent color set by `deriveThemeTokens()`. The 25% alpha keeps the ring visually soft while the 3px spread satisfies WCAG 2.4.13 area requirements.

**Exceptions — solid outline only:**
- `.checkbox-input:focus-visible + .checkbox-box` → `outline: 2px solid var(--focus-ring)` — the visual element is a custom `<div>`; box-shadow would not track its shape reliably.
- `.radio-input:focus-visible + .radio-dot-wrapper` — same rule.

**Status-state overrides** replace the default accent ring with a hue-matched ring:
- `.input-error:focus` → `box-shadow: 0 0 0 3px rgba(220,38,38,.25)` — red hue matches the error border color.
- `.input-success:focus` → `box-shadow: 0 0 0 3px rgba(22,163,74,.25)` — green hue matches the success border color.

Never use a fully opaque color for the focus glow — it fights the component's own border and shadow.

## Motion — standards and principles

**W3C/WCAG standards (the only hard rules):**

| Standard | Level | Rule |
|---|---|---|
| WCAG 2.3.1 | A | Nothing may flash > 3× per second — seizure risk (Harding test) |
| WCAG 2.3.3 | AAA | Non-essential animation must be disabled when `prefers-reduced-motion: reduce` is set |
| CSS Media Queries L5 | W3C spec | Defines the `prefers-reduced-motion` signal — respect it unconditionally |

**`prefers-reduced-motion` implementation** — already in `globals.css`. Sets `animation-duration: 0.01ms` and `transition-duration: 0.01ms` on all elements. This is the correct approach: it does not remove animations (which can break JS-driven state machines) — it makes them imperceptibly fast.

**Duration scale** (perception research — no W3C standard covers this):

| Token | Duration | Use |
|---|---|---|
| `instant` | 75ms | Focus ring, micro-highlight — imperceptible delay |
| `fast` | 120ms | Button color, input border — direct tactile feedback |
| `base` | 200ms | Dropdown, tooltip, badge — deliberate but quick |
| `slow` | 300ms | Modal, panel, drawer — considered, spatial |

Above 400ms = users perceive lag. Never use for UI responses.

**Easing:**
- `enter` (`cubic-bezier(0.16, 1, 0.3, 1)`) — ease-out-expo: fast start, silky stop. Use for things *entering* the screen.
- `exit` (`cubic-bezier(0.7, 0, 1, 1)`) — ease-in-expo: soft start, fast exit. Use for things *leaving* — gets out of the way.
- `move` (`cubic-bezier(0.4, 0, 0.2, 1)`) — standard ease-in-out for elements that travel through the frame.
- `linear` — spinners and progress bars only. Everything else feels mechanical.

**Principle (Apple HIG, no W3C standard):** Motion should *communicate*, not decorate. Every animation should answer: what changed, where did it go, or what is the system doing?

**Animated overlay pattern (CSSWG-recommended):** Use `visibility` + `opacity` with a delayed transition — not `display` toggling or `pointer-events:none`.

```css
/* Closed */
opacity: 0;
visibility: hidden;
transition: opacity 200ms, visibility 0ms 200ms; /* visibility delays until fade-out finishes */

/* Open */
opacity: 1;
visibility: visible;
transition: opacity 200ms, visibility 0ms; /* visibility snaps instantly on show */
```

Why `visibility` over `pointer-events:none`:
- `visibility:hidden` inherently removes pointer events — no extra property needed
- Screen readers skip `visibility:hidden` elements — `opacity:0` alone does not hide from assistive tech
- The delayed `visibility` transition keeps the element visible during fade-out, then snaps to hidden after

Applies to: modal overlays, sidebar backdrops, tooltips, dropdowns, any element that fades in/out.

## Typography scale — derived from web standards

Font sizes are on the **8px grid from 24px upward**. Below 24px, 2px increments give the nuance needed for body/label distinctions.

| Token | Size | Line-height | Ratio | Standard basis |
|---|---|---|---|---|
| `5xl` | 48px / 3rem | 52px | ×1.08 | 8-grid display |
| `4xl` | 40px / 2.5rem | 44px | ×1.10 | 8-grid h1 |
| `3xl` | 32px / 2rem | 40px | ×1.25 | 8-grid h2 |
| `2xl` | 24px / 1.5rem | 32px | ×1.33 | 8-grid h3 |
| `xl` | 20px / 1.25rem | 28px | ×1.40 | h4 |
| `lg` | 18px / 1.125rem | 26px | ×1.44 | h5 |
| **`base`** | **16px / 1rem** | **26px** | **×1.63** | **W3C browser default · iOS-safe** |
| `sm` | 14px / 0.875rem | 22px | ×1.57 | secondary text |
| `xs` | 12px / 0.75rem | 18px | ×1.50 | caption — WCAG minimum |

**Rules:**
- Body (`base`) and below: line-height ≥ 1.5× — WCAG 1.4.12 (AA Text Spacing)
- Heading (`lg` and above): line-height tightens as size grows — typographic convention
- Never use font-size below `xs` (12px) — WCAG floor
- Never use `font-size < 1rem` on `<input>` — iOS Safari auto-zooms below 16px
- Long-form text containers: add `max-w-prose` (65ch) — WCAG 1.4.8 max 80ch, Bringhurst optimum 45–75ch

## Size scale — derived from web standards, not frameworks

| Size | Font | Height | Basis |
|---|---|---|---|
| sm | 0.875rem (14px) | 32px | 8-grid utility size |
| **default** | **1rem (16px)** | **40px** | iOS auto-zoom safe (< 16px triggers zoom); 8-grid |
| lg | 1.125rem (18px) | 48px | 8-grid prominent CTA |

Height = `padding-top × 2 + line-height`. Use `line-height: 1rem` (16px) on both buttons and inputs so the math is exact: `py-3 (12px) × 2 + 16px = 40px`.

Inputs and buttons share the default scale so they sit flush when paired inline. Never use `font-size < 1rem` on inputs — iOS Safari auto-zooms the page below that threshold.

**Nav items follow the same 40px height rule.** Sidebar items, navbar items, and any clickable nav link must use `padding: .75rem` + `font-size: .875rem` + `line-height: 1rem` = 40px. Consistent with buttons and inputs, and meets WCAG 2.5.5 touch target guidance.

## Other key rules

- Use component classes from `globals.css` — `.btn-primary`, `.card`, `.input`, `.badge-*`, `.alert-*`, etc.
- Do **not** invent new color values. Use the brand CSS variables (`--b50` through `--b900`) or the neutral palette documented in `COMPONENTS.md`.
- Brand primary color is configured in `tailwind.config.js` under the `primary` key. Never hardcode the brand hex — use `var(--b600)` or Tailwind's `bg-primary-600` etc.
- All buttons, links, and interactive elements must pass APCA |Lc| ≥ 75 (body text threshold). The design system enforces this at the 600 stop. Do not use 400 or 500 stops for text on white — they fall below Lc 60.
- The Lc ≥ 75 threshold applies against the **actual adjacent background**, not always white. For example, `text-success-700` on `bg-success-100` (inside a badge) must be evaluated as `#15803d` on `#dcfce7`, not on white. The system’s status color pairs are pre-validated; only verify when composing new combinations.
- For new components not in the design system, compose from existing classes + Tailwind utilities. Do not add new global CSS unless unavoidable. Example — a toggle switch is not in the system; build it from `.checkbox-input` (hidden native control for a11y) + a custom visual track/thumb div, styled with existing color variables and `duration-fast ease-DEFAULT`.

## ARIA minimums

These attributes are required — not optional — for the listed components.

| Component | Required attributes |
|---|---|
| Modal (`.modal`) | `role="dialog"` + `aria-modal="true"` + `aria-labelledby="<title-id>"` on the `.modal` element |
| Disclosure trigger (dropdown, accordion) | `aria-expanded="true/false"` + `aria-controls="<panel-id>"` on the trigger button |
| Icon-only button (`.btn-icon`) | `aria-label="<action name>"` — the icon is decorative; the label is the accessible name |
| `<a>` used as a tab or nav control | `tabindex="0"` — without it, keyboard users cannot reach anchors that lack an `href` |
| Modal close button | `aria-label="Close"` — the × glyph is not a reliable accessible name |

`aria-expanded` must be kept in sync by JS — set `"true"` when the controlled element is open, `"false"` when closed. Do not omit it after the first toggle.

## App shell layouts

The design system supports **two composable shell variants**. Pick the one that fits the app; you are not locked into the navbar+sidebar combination.

### Variant A — Navbar only

Use for marketing pages, documentation sites, or any app whose primary navigation fits in the top bar.

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
  <main class="app-content">…</main>
</div>
```

```css
html, body    { height: 100%; overflow: clip; }
.app          { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.app-navbar   { height: 52px; flex-shrink: 0; display: flex; align-items: center;
                padding: 0 1rem; box-shadow: 0 1px 0 #e2e8f0; }
.app-content  { flex: 1; min-height: 0; overflow-y: auto; scroll-behavior: smooth; }
```

### Variant B — Navbar + Sidebar

Use for admin dashboards, tools, or any app where the primary navigation lives in a side panel.

```html
<div class="app">                          <!-- flex column, height:100vh -->
  <header class="app-navbar">             <!-- 52px, flex-shrink:0 -->
    <a class="navbar-brand" href="#"><!-- logo --></a>
    <!-- mobile only: hamburger opens sidebar drawer from right -->
    <button class="btn btn-icon" id="menuBtn" style="display:none" aria-label="Open menu">
      <i data-lucide="menu"></i>
    </button>
  </header>
  <div class="app-body">                  <!-- flex row, flex:1, min-height:0 -->
    <nav class="app-sidebar"><!-- sidebar nav items --></nav>
    <main class="app-content"><!-- sections --></main>
  </div>
</div>
```

```css
html, body    { height: 100%; overflow: clip; }
.app          { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.app-navbar   { height: 52px; flex-shrink: 0; display: flex; align-items: center;
                padding: 0 1rem; box-shadow: 0 1px 0 #e2e8f0; }
.app-body     { display: flex; flex: 1; min-height: 0; }
.app-sidebar  { width: 200px; flex-shrink: 0; overflow-y: auto;
                box-shadow: 1px 0 0 #e2e8f0; z-index: 1; }
.app-content  { flex: 1; min-height: 0; overflow-y: auto; scroll-behavior: smooth; }
```

> **⚠️ `overflow:clip` is not interchangeable with `overflow:hidden`.**  
> `overflow:hidden` hides visual overflow but browsers can still modify `scrollTop` programmatically, which shifts the layout and produces a blank gap at the bottom. `overflow:clip` prevents this entirely. Do not substitute or remove it.

**Three rules that must all be present to prevent the blank-gap bug:**
1. `html, body { overflow: clip }` — blocks body-level scroll including programmatic `scrollTop` shifts
2. `flex-direction: column` on `.app` — stacks navbar above the body row
3. `min-height: 0` on `.app-content` (and `.app-body`) — flex items default to `min-height: auto` (content size), which lets them grow past the `100vh` constraint

**Navbar content rules by variant:**
- **Variant A:** logo (left) + inline nav links + action button (right via `margin-left:auto`)
- **Variant B:** logo (left) + hamburger mobile toggle (right via `margin-left:auto`). No nav links in the navbar — that is the sidebar’s job. Keeping them separate avoids duplication and follows the Apple HIG principle that the top bar signals identity/actions, not navigation.

**Sidebar active item:** track with a scroll listener on `.app-content` — mark the `.sidebar-item` whose section’s top edge has passed 80px below the navbar. Anchor clicks must scroll `.app-content` directly (never let the browser scroll `body` — it fights the `overflow:clip` constraint).

**Mobile (`< 768px`) — Variant B only:** the sidebar becomes a fixed drawer sliding in from the **right** (logo stays left, hamburger stays right via `margin-left:auto`). Use `transform: translateX(100%)` closed / `translateX(0)` open + a backdrop overlay. Dismiss via backdrop click or **Escape** (WCAG 2.1 SC 1.4.13).


## Dark mode

Dark mode is implemented as a **`.dark` class on `<html>`** (not `prefers-color-scheme` alone), so it can be toggled by the user independent of the OS setting. The OS signal can be read to set the initial class, but the stored preference wins.

```js
// On load — check stored preference, fall back to OS signal
const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (stored === 'dark' || (!stored && prefersDark)) document.documentElement.classList.add('dark');
```

### Dark mode architecture

Use a **Bulma-style theme architecture**:
- Components consume **semantic tokens only**: surface, text, border, focus, accent, and `on-*` tokens
- Themes update those tokens at the root scope; components do not hardcode dark literals
- Accent colors generate an **on-scheme** variant for links, active nav, and text-on-fill, just like Bulma regenerates `*-on-scheme` colors when the scheme background changes

Use **OKLCH** to derive dark tokens:
- Keep hue and most chroma stable
- Change tone/lightness per role
- Clamp out-of-gamut colors by reducing chroma before changing hue

### Border token light/dark split

`--bd`, `--bds`, `--bd-control`, and `--bd-button` use **static `:root` defaults in light mode** — these are design-intentional values, not derived:

```css
:root {
  --bd:         #cbd5e1;  /* slate-300 — card/panel separators */
  --bds:        #e2e8f0;  /* slate-200 — subtle dividers, shell edges */
  --bd-control: #cbd5e1;  /* matches --bd — form control borders */
}
```

In **dark mode**, `deriveThemeTokens()` replaces all four with OKLCH-derived values (same hue as the brand, tone solved for 3:1 against the dark surface). Component CSS references the tokens and adapts automatically.

> **Do not call `solveToneForContrast()` for these tokens in light mode.** The solver targets 3:1 contrast, which in light mode produces a harsh `~#767676`-equivalent border — far darker than the design intent. Reserve OKLCH derivation for dark mode only.

### Contrast rules

**WCAG 2.2 is the shipping conformance target.** WCAG 3/APCA is a forward-looking secondary check, not the legal pass/fail line today.

- Meaningful text must pass **4.5:1** against its actual adjacent background
- Large text may use **3:1**
- UI boundaries, focus rings, inputs, checkboxes, radios, and active-state indicators must pass **3:1** (WCAG 1.4.11 / 2.4.13)
- Decorative placeholder/faint text may drop below 4.5:1 only if it does not carry meaning needed to complete the task
- As a secondary APCA check, target `|Lc| ≥ 75` for body text, `≥ 60` for large text, and `≥ 45` for non-text UI

### Implementation pattern

1. Define light-theme semantic tokens at `:root`
2. On theme or brand change, derive dark tokens from a small seed set in **OKLCH**
3. For each semantic role, solve tone until it meets the required contrast against its owning surface
4. Write only the resulting CSS variables; component CSS should stay unchanged

Example token families:
- Surfaces: `--page-bg`, `--s1`, `--s2`, `--s3`
- Text: `--t1` through `--t5`
- Boundaries: `--bd`, `--bds`, `--focus-ring`
- Accent: `--accent-fg`, `--accent-surface`, `--on-primary`, `--on-success`, `--on-danger`

> **Never hand-author dark colors per component when a semantic token can express the role.** Fix the token or the derivation rule once, then let every component inherit it.
>
> **Never use `color-mix()` or rgba alpha-blending for semantic status colors in dark mode.** The result over near-black surfaces desaturates and weakens the semantic signal. Use opaque fills plus derived `on-*` text colors.

## Files
| File | Purpose | Edit when |
|---|---|---|
| `tailwind.config.js` | Brand colors → fonts → radius → shadows → motion tokens | Changing brand hue, adding a new design token |
| `globals.css` | Component classes (`@layer components`) + dark mode overrides | Adding/modifying a component, dark mode values |
| `COMPONENTS.md` | Full component reference for LLMs | Adding a component, documenting a new pattern |

**Dependency order:** `tailwind.config.js` defines the token values → `globals.css` consumes them via `@apply` and CSS variables → `COMPONENTS.md` documents the resulting classes. Always update the token source before updating the consuming file.
