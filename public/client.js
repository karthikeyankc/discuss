(()=>{var m={reply:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>',share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>'};var x=document.getElementsByTagName("script"),w=x[x.length-1],$=w?new URL(w.src).origin:window.location.origin,T=`/*! tailwindcss v4.3.0 | MIT License | https://tailwindcss.com */
@layer properties;
@layer ken {
  @layer theme, base, components, utilities;
  @layer theme {
    #discuss-comments, #discuss-comments :host {
      --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      --color-neutral-50: oklch(98.2% 0.004 250);
      --color-neutral-100: oklch(95.8% 0.008 250);
      --color-neutral-200: oklch(91.2% 0.012 250);
      --color-neutral-300: oklch(84.5% 0.016 250);
      --color-neutral-400: oklch(71.0% 0.020 250);
      --color-neutral-500: oklch(58.5% 0.022 250);
      --color-neutral-600: oklch(48.0% 0.020 250);
      --color-neutral-700: oklch(37.5% 0.016 250);
      --color-neutral-800: oklch(27.0% 0.012 250);
      --color-neutral-900: oklch(18.5% 0.008 250);
      --color-white: #fff;
      --spacing: 0.25rem;
      --container-xs: 20rem;
      --container-sm: 24rem;
      --container-2xl: 42rem;
      --container-7xl: 80rem;
      --text-xs: 0.75rem;
      --text-xs--line-height: 1.125rem;
      --text-sm: 0.875rem;
      --text-sm--line-height: 1.375rem;
      --text-base: 1rem;
      --text-base--line-height: 1.625rem;
      --text-lg: 1.125rem;
      --text-lg--line-height: 1.625rem;
      --text-xl: 1.25rem;
      --text-xl--line-height: 1.75rem;
      --text-2xl: 1.5rem;
      --text-2xl--line-height: 2rem;
      --text-3xl: 2rem;
      --text-3xl--line-height: 2.5rem;
      --text-4xl: 2.5rem;
      --text-4xl--line-height: 2.75rem;
      --font-weight-normal: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --tracking-wide: 0.025em;
      --tracking-widest: 0.1em;
      --leading-relaxed: 1.625;
      --radius-md: 10px;
      --radius-lg: 14px;
      --shadow-sm: 0 0 0 1px rgba(15,23,42,0.06), 0 1px 2px -0.5px rgba(15,23,42,0.07), 0 2px 4px rgba(15,23,42,0.04);
      --shadow-md: 0 0 0 1px rgba(15,23,42,0.07), 0 4px 8px -2px rgba(15,23,42,0.10), 0 8px 16px rgba(15,23,42,0.07);
      --shadow-lg: 0 0 0 1px rgba(15,23,42,0.06), 0 8px 16px -4px rgba(15,23,42,0.12), 0 16px 32px rgba(15,23,42,0.08);
      --ease-out: cubic-bezier(0, 0, 0.2, 1);
      --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
      --animate-spin: spin 1s linear infinite;
      --default-transition-duration: 150ms;
      --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      --default-font-family: var(--font-sans);
      --default-mono-font-family: var(--font-mono);
      --color-primary-50: oklch(97.1% 0.013 250);
      --color-primary-100: oklch(93.7% 0.032 250);
      --color-primary-200: oklch(88.2% 0.060 250);
      --color-primary-300: oklch(80.5% 0.098 250);
      --color-primary-400: oklch(70.2% 0.140 250);
      --color-primary-500: oklch(59.8% 0.175 250);
      --color-primary-600: oklch(50.2% 0.195 250);
      --color-primary-700: oklch(42.5% 0.180 250);
      --color-primary-800: oklch(34.8% 0.148 250);
      --color-primary-900: oklch(28.0% 0.112 250);
      --color-success-50: oklch(97.2% 0.018 145);
      --color-success-100: oklch(93.0% 0.048 145);
      --color-success-200: oklch(87.5% 0.088 145);
      --color-success-600: oklch(53.5% 0.168 145);
      --color-success-700: oklch(44.8% 0.145 145);
      --color-warning-50: oklch(98.0% 0.020 85);
      --color-warning-100: oklch(95.2% 0.058 85);
      --color-warning-200: oklch(91.0% 0.108 85);
      --color-warning-700: oklch(52.8% 0.155 85);
      --color-danger-50: oklch(97.5% 0.012 20);
      --color-danger-100: oklch(93.5% 0.038 20);
      --color-danger-200: oklch(88.0% 0.072 20);
      --color-danger-500: oklch(63.5% 0.222 20);
      --color-danger-600: oklch(53.5% 0.210 20);
      --color-danger-700: oklch(44.5% 0.188 20);
      --color-danger-800: oklch(36.0% 0.158 20);
      --radius-none: 0;
      --duration-fast: 120ms;
      --ease-DEFAULT: cubic-bezier(0.16, 1, 0.3, 1);
    }
  }
  @layer base {
    #discuss-comments *, #discuss-comments ::after, #discuss-comments ::before, #discuss-comments ::backdrop, #discuss-comments ::file-selector-button {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0 solid;
    }
    #discuss-comments, #discuss-comments :host {
      line-height: 1.5;
      -webkit-text-size-adjust: 100%;
      -moz-tab-size: 4;
        -o-tab-size: 4;
           tab-size: 4;
      font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
      font-feature-settings: var(--default-font-feature-settings, normal);
      font-variation-settings: var(--default-font-variation-settings, normal);
      -webkit-tap-highlight-color: transparent;
    }
    #discuss-comments hr {
      height: 0;
      color: inherit;
      border-top-width: 1px;
    }
    #discuss-comments abbr:where([title]) {
      -webkit-text-decoration: underline dotted;
      text-decoration: underline dotted;
    }
    #discuss-comments h1, #discuss-comments h2, #discuss-comments h3, #discuss-comments h4, #discuss-comments h5, #discuss-comments h6 {
      font-size: inherit;
      font-weight: inherit;
    }
    #discuss-comments a {
      color: inherit;
      -webkit-text-decoration: inherit;
      text-decoration: inherit;
    }
    #discuss-comments b, #discuss-comments strong {
      font-weight: bolder;
    }
    #discuss-comments code, #discuss-comments kbd, #discuss-comments samp, #discuss-comments pre {
      font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
      font-feature-settings: var(--default-mono-font-feature-settings, normal);
      font-variation-settings: var(--default-mono-font-variation-settings, normal);
      font-size: 1em;
    }
    #discuss-comments small {
      font-size: 80%;
    }
    #discuss-comments sub, #discuss-comments sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }
    #discuss-comments sub {
      bottom: -0.25em;
    }
    #discuss-comments sup {
      top: -0.5em;
    }
    #discuss-comments table {
      text-indent: 0;
      border-color: inherit;
      border-collapse: collapse;
    }
    #discuss-comments :-moz-focusring {
      outline: auto;
    }
    #discuss-comments progress {
      vertical-align: baseline;
    }
    #discuss-comments summary {
      display: list-item;
    }
    #discuss-comments ol, #discuss-comments ul, #discuss-comments menu {
      list-style: none;
    }
    #discuss-comments img, #discuss-comments svg, #discuss-comments video, #discuss-comments canvas, #discuss-comments audio, #discuss-comments iframe, #discuss-comments embed, #discuss-comments object {
      display: block;
      vertical-align: middle;
    }
    #discuss-comments img, #discuss-comments video {
      max-width: 100%;
      height: auto;
    }
    #discuss-comments button, #discuss-comments input, #discuss-comments select, #discuss-comments optgroup, #discuss-comments textarea, #discuss-comments ::file-selector-button {
      font: inherit;
      font-feature-settings: inherit;
      font-variation-settings: inherit;
      letter-spacing: inherit;
      color: inherit;
      border-radius: 0;
      background-color: transparent;
      opacity: 1;
    }
    #discuss-comments :where(select:is([multiple], [size])) optgroup {
      font-weight: bolder;
    }
    #discuss-comments :where(select:is([multiple], [size])) optgroup option {
      padding-inline-start: 20px;
    }
    #discuss-comments ::file-selector-button {
      margin-inline-end: 4px;
    }
    #discuss-comments ::-moz-placeholder {
      opacity: 1;
    }
    #discuss-comments ::placeholder {
      opacity: 1;
    }
    @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
      #discuss-comments ::-moz-placeholder {
        color: currentcolor;
        @supports (color: color-mix(in lab, red, red)) {
          color: color-mix(in oklab, currentcolor 50%, transparent);
        }
      }
      #discuss-comments ::placeholder {
        color: currentcolor;
        @supports (color: color-mix(in lab, red, red)) {
          color: color-mix(in oklab, currentcolor 50%, transparent);
        }
      }
    }
    #discuss-comments textarea {
      resize: vertical;
    }
    #discuss-comments ::-webkit-search-decoration {
      -webkit-appearance: none;
    }
    #discuss-comments ::-webkit-date-and-time-value {
      min-height: 1lh;
      text-align: inherit;
    }
    #discuss-comments ::-webkit-datetime-edit {
      display: inline-flex;
    }
    #discuss-comments ::-webkit-datetime-edit-fields-wrapper {
      padding: 0;
    }
    #discuss-comments ::-webkit-datetime-edit, #discuss-comments ::-webkit-datetime-edit-year-field, #discuss-comments ::-webkit-datetime-edit-month-field, #discuss-comments ::-webkit-datetime-edit-day-field, #discuss-comments ::-webkit-datetime-edit-hour-field, #discuss-comments ::-webkit-datetime-edit-minute-field, #discuss-comments ::-webkit-datetime-edit-second-field, #discuss-comments ::-webkit-datetime-edit-millisecond-field, #discuss-comments ::-webkit-datetime-edit-meridiem-field {
      padding-block: 0;
    }
    #discuss-comments ::-webkit-calendar-picker-indicator {
      line-height: 1;
    }
    #discuss-comments :-moz-ui-invalid {
      box-shadow: none;
    }
    #discuss-comments button, #discuss-comments input:where([type="button"], [type="reset"], [type="submit"]), #discuss-comments ::file-selector-button {
      -webkit-appearance: button;
         -moz-appearance: button;
              appearance: button;
    }
    #discuss-comments ::-webkit-inner-spin-button, #discuss-comments ::-webkit-outer-spin-button {
      height: auto;
    }
    #discuss-comments [hidden]:where(:not([hidden="until-found"])) {
      display: none !important;
    }
  }
  @layer utilities {
    #discuss-comments .discuss-visible {
      visibility: visible;
    }
    #discuss-comments .discuss-fixed {
      position: fixed;
    }
    #discuss-comments .discuss-relative {
      position: relative;
    }
    #discuss-comments .discuss-static {
      position: static;
    }
    #discuss-comments .discuss-top-full {
      top: 100%;
    }
    #discuss-comments .discuss-bottom-full {
      bottom: 100%;
    }
    #discuss-comments .discuss-container {
      width: 100%;
      @media (width >= 40rem) {
        max-width: 40rem;
      }
      @media (width >= 48rem) {
        max-width: 48rem;
      }
      @media (width >= 64rem) {
        max-width: 64rem;
      }
      @media (width >= 80rem) {
        max-width: 80rem;
      }
      @media (width >= 96rem) {
        max-width: 96rem;
      }
    }
    #discuss-comments .discuss-mt-1 {
      margin-top: calc(var(--spacing) * 1);
    }
    #discuss-comments .discuss-mt-2 {
      margin-top: calc(var(--spacing) * 2);
    }
    #discuss-comments .discuss-mb-2 {
      margin-bottom: calc(var(--spacing) * 2);
    }
    #discuss-comments .discuss-mb-6 {
      margin-bottom: calc(var(--spacing) * 6);
    }
    #discuss-comments .discuss-mb-8 {
      margin-bottom: calc(var(--spacing) * 8);
    }
    #discuss-comments .discuss-mb-10 {
      margin-bottom: calc(var(--spacing) * 10);
    }
    #discuss-comments .discuss-block {
      display: block;
    }
    #discuss-comments .discuss-flex {
      display: flex;
    }
    #discuss-comments .discuss-grid {
      display: grid;
    }
    #discuss-comments .discuss-hidden {
      display: none;
    }
    #discuss-comments .discuss-inline {
      display: inline;
    }
    #discuss-comments .discuss-inline-flex {
      display: inline-flex;
    }
    #discuss-comments .discuss-table {
      display: table;
    }
    #discuss-comments .discuss-min-h-screen {
      min-height: 100vh;
    }
    #discuss-comments .discuss-w-full {
      width: 100%;
    }
    #discuss-comments .discuss-max-w-2xl {
      max-width: var(--container-2xl);
    }
    #discuss-comments .discuss-max-w-prose {
      max-width: 65ch;
    }
    #discuss-comments .discuss-max-w-sm {
      max-width: var(--container-sm);
    }
    #discuss-comments .discuss-max-w-xs {
      max-width: var(--container-xs);
    }
    #discuss-comments .discuss-flex-shrink {
      flex-shrink: 1;
    }
    #discuss-comments .discuss-flex-grow {
      flex-grow: 1;
    }
    #discuss-comments .discuss-grow {
      flex-grow: 1;
    }
    #discuss-comments .discuss-border-collapse {
      border-collapse: collapse;
    }
    #discuss-comments .discuss-transform {
      transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
    }
    #discuss-comments .discuss-cursor-pointer {
      cursor: pointer;
    }
    #discuss-comments .discuss-resize {
      resize: both;
    }
    #discuss-comments .discuss-grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    #discuss-comments .discuss-grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    #discuss-comments .discuss-flex-wrap {
      flex-wrap: wrap;
    }
    #discuss-comments .discuss-items-center {
      align-items: center;
    }
    #discuss-comments .discuss-justify-center {
      justify-content: center;
    }
    #discuss-comments .discuss-gap-1 {
      gap: calc(var(--spacing) * 1);
    }
    #discuss-comments .discuss-gap-3 {
      gap: calc(var(--spacing) * 3);
    }
    #discuss-comments .discuss-gap-4 {
      gap: calc(var(--spacing) * 4);
    }
    #discuss-comments .discuss-space-y-6 {
      #discuss-comments :where(& > :not(:last-child)) {
        --tw-space-y-reverse: 0;
        margin-block-start: calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));
        margin-block-end: calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)));
      }
    }
    #discuss-comments .discuss-truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    #discuss-comments .discuss-rounded {
      border-radius: 0.25rem;
    }
    #discuss-comments .discuss-rounded-full {
      border-radius: calc(infinity * 1px);
    }
    #discuss-comments .discuss-border {
      border-style: var(--tw-border-style);
      border-width: 1px;
    }
    #discuss-comments .discuss-bg-neutral-50 {
      background-color: var(--color-neutral-50);
    }
    #discuss-comments .discuss-bg-primary-600 {
      background-color: var(--color-primary-600);
    }
    #discuss-comments .discuss-bg-success-100 {
      background-color: var(--color-success-100);
    }
    #discuss-comments .discuss-bg-white {
      background-color: var(--color-white);
    }
    #discuss-comments .discuss-p-4 {
      padding: calc(var(--spacing) * 4);
    }
    #discuss-comments .discuss-px-2\\.5 {
      padding-inline: calc(var(--spacing) * 2.5);
    }
    #discuss-comments .discuss-py-0\\.5 {
      padding-block: calc(var(--spacing) * 0.5);
    }
    #discuss-comments .discuss-py-3 {
      padding-block: calc(var(--spacing) * 3);
    }
    #discuss-comments .discuss-text-left {
      text-align: left;
    }
    #discuss-comments .discuss-text-right {
      text-align: right;
    }
    #discuss-comments .discuss-text-sm {
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
    }
    #discuss-comments .discuss-text-xs {
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
    }
    #discuss-comments .discuss-font-medium {
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
    }
    #discuss-comments .discuss-text-danger-600 {
      color: var(--color-danger-600);
    }
    #discuss-comments .discuss-text-neutral-900 {
      color: var(--color-neutral-900);
    }
    #discuss-comments .discuss-text-primary-600 {
      color: var(--color-primary-600);
    }
    #discuss-comments .discuss-text-success-700 {
      color: var(--color-success-700);
    }
    #discuss-comments .discuss-uppercase {
      text-transform: uppercase;
    }
    #discuss-comments .discuss-italic {
      font-style: italic;
    }
    #discuss-comments .discuss-overline {
      text-decoration-line: overline;
    }
    #discuss-comments .discuss-underline {
      text-decoration-line: underline;
    }
    #discuss-comments .discuss-shadow {
      --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    #discuss-comments .discuss-ring {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    #discuss-comments .discuss-outline {
      outline-style: var(--tw-outline-style);
      outline-width: 1px;
    }
    #discuss-comments .discuss-blur {
      --tw-blur: blur(8px);
      filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
    }
    #discuss-comments .discuss-filter {
      filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
    }
    #discuss-comments .discuss-transition {
      transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
    }
    #discuss-comments .discuss-ease-DEFAULT {
      --tw-ease: var(--ease-DEFAULT);
      transition-timing-function: var(--ease-DEFAULT);
    }
    #discuss-comments .discuss-ease-in-out {
      --tw-ease: var(--ease-in-out);
      transition-timing-function: var(--ease-in-out);
    }
    #discuss-comments .discuss-ease-out {
      --tw-ease: var(--ease-out);
      transition-timing-function: var(--ease-out);
    }
    #discuss-comments .discuss-select-none {
      -webkit-user-select: none;
      -moz-user-select: none;
           user-select: none;
    }
    #discuss-comments .discuss-hover\\:bg-danger-50 {
      #discuss-comments &:hover {
        @media (hover: hover) {
          background-color: var(--color-danger-50);
        }
      }
    }
    #discuss-comments .discuss-hover\\:text-danger-700 {
      #discuss-comments &:hover {
        @media (hover: hover) {
          color: var(--color-danger-700);
        }
      }
    }
    #discuss-comments .discuss-md\\:hidden {
      @media (width >= 48rem) {
        display: none;
      }
    }
    #discuss-comments .discuss-md\\:grid-cols-2 {
      @media (width >= 48rem) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    #discuss-comments .discuss-md\\:grid-cols-4 {
      @media (width >= 48rem) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
  }
  @layer base {
    #discuss-comments {
      --b50: var(--color-primary-50);
      --b100: var(--color-primary-100);
      --b200: var(--color-primary-200);
      --b300: var(--color-primary-300);
      --b400: var(--color-primary-400);
      --b500: var(--color-primary-500);
      --b600: var(--color-primary-600);
      --b700: var(--color-primary-700);
      --b800: var(--color-primary-800);
      --b900: var(--color-primary-900);
      --t1: var(--color-neutral-900);
      --t2: var(--color-neutral-700);
      --t3: var(--color-neutral-600);
      --t4: var(--color-neutral-500);
      --t5: var(--color-neutral-400);
      --s1: #ffffff;
      --s2: var(--color-neutral-50);
      --s3: var(--color-neutral-100);
      --bd: var(--color-neutral-300);
      --bds: var(--color-neutral-200);
      --bd-control: var(--color-neutral-300);
      --bd-button: var(--color-neutral-200);
      --bd-strong: var(--color-neutral-400);
      --shell-divider: var(--color-neutral-200);
      --accent-fg: var(--color-primary-800);
      --accent-surface: var(--color-primary-50);
      --focus-ring: var(--color-primary-700);
      --success-fill: var(--color-success-600);
      --success-fill-hover: var(--color-success-700);
      --danger-fg: var(--color-danger-600);
      --danger-border: var(--color-danger-600);
      --on-primary: #ffffff;
      --on-success: #ffffff;
      --on-danger: #ffffff;
      --surface-shadow: var(--shadow-sm);
      --surface-shadow-md: var(--shadow-md);
      --surface-shadow-lg: var(--shadow-lg);
      --tooltip-bg: var(--color-neutral-900);
      --tooltip-fg: #ffffff;
      --toast-bg: var(--color-neutral-900);
      --toast-fg: #ffffff;
      --modal-backdrop: rgba(0, 0, 0, 0.45);
    }
    #discuss-comments .discuss-dark {
      --t1: var(--color-neutral-50);
      --t2: var(--color-neutral-200);
      --t3: var(--color-neutral-300);
      --t4: var(--color-neutral-400);
      --t5: var(--color-neutral-500);
      --s1: oklch(3% 0 0);
      --s2: oklch(0% 0 0);
      --s3: oklch(8% 0.004 250);
      --bd: var(--color-neutral-600);
      --bds: var(--color-neutral-700);
      --bd-control: var(--color-neutral-600);
      --bd-button: var(--color-neutral-700);
      --bd-strong: var(--color-neutral-400);
      --shell-divider: var(--color-neutral-700);
      --accent-fg: var(--color-primary-300);
      --accent-surface: color-mix(in srgb, oklch(34.8% 0.148 250) 32%, oklch(18.5% 0.008 250));
      @supports (color: color-mix(in lab, red, red)) {
        --accent-surface: color-mix(in srgb, var(--color-primary-800) 32%, var(--color-neutral-900));
      }
      --focus-ring: var(--color-primary-300);
      --success-fill: var(--color-success-600);
      --success-fill-hover: var(--color-success-700);
      --danger-fg: var(--color-danger-500);
      --danger-border: var(--color-danger-500);
      --surface-shadow: inset 0 1px 0 rgba(255,255,255,0.09), 0 0 0 1px rgba(255,255,255,0.10);
      --surface-shadow-md: inset 0 1px 0 rgba(255,255,255,0.11), 0 0 0 1px rgba(255,255,255,0.12);
      --surface-shadow-lg: inset 0 1px 0 rgba(255,255,255,0.13), 0 0 0 1px rgba(255,255,255,0.14);
      --tooltip-bg: var(--t1);
      --tooltip-fg: var(--s2);
      --toast-bg: var(--t1);
      --toast-fg: var(--s2);
      --modal-backdrop: rgba(0, 0, 0, 0.72);
    }
    #discuss-comments .discuss-theme-light {
      color-scheme: light;
      --t1: var(--color-neutral-900);
      --t2: var(--color-neutral-700);
      --t3: var(--color-neutral-600);
      --t4: var(--color-neutral-500);
      --t5: var(--color-neutral-400);
      --s1: #ffffff;
      --s2: var(--color-neutral-50);
      --s3: var(--color-neutral-100);
      --bd: var(--color-neutral-300);
      --bds: var(--color-neutral-200);
      --bd-control: var(--color-neutral-300);
      --bd-button: var(--color-neutral-200);
      --bd-strong: var(--color-neutral-400);
      --shell-divider: var(--color-neutral-200);
      --accent-fg: var(--color-primary-800);
      --accent-surface: var(--color-primary-50);
      --focus-ring: var(--color-primary-700);
      --success-fill: var(--color-success-600);
      --success-fill-hover: var(--color-success-700);
      --danger-fg: var(--color-danger-600);
      --danger-border: var(--color-danger-600);
      --surface-shadow: var(--shadow-sm);
      --surface-shadow-md: var(--shadow-md);
      --surface-shadow-lg: var(--shadow-lg);
      --modal-backdrop: rgba(0, 0, 0, 0.45);
    }
    #discuss-comments .discuss-theme-dark {
      color-scheme: dark;
      --t1: var(--color-neutral-50);
      --t2: var(--color-neutral-200);
      --t3: var(--color-neutral-300);
      --t4: var(--color-neutral-400);
      --t5: var(--color-neutral-500);
      --s1: oklch(3% 0 0);
      --s2: oklch(0% 0 0);
      --s3: oklch(8% 0.004 250);
      --bd: var(--color-neutral-600);
      --bds: var(--color-neutral-700);
      --bd-control: var(--color-neutral-600);
      --bd-button: var(--color-neutral-700);
      --bd-strong: var(--color-neutral-400);
      --shell-divider: var(--color-neutral-700);
      --accent-fg: var(--color-primary-300);
      --accent-surface: color-mix(in srgb, oklch(34.8% 0.148 250) 32%, oklch(18.5% 0.008 250));
      @supports (color: color-mix(in lab, red, red)) {
        --accent-surface: color-mix(in srgb, var(--color-primary-800) 32%, var(--color-neutral-900));
      }
      --focus-ring: var(--color-primary-300);
      --success-fill: var(--color-success-600);
      --success-fill-hover: var(--color-success-700);
      --danger-fg: var(--color-danger-500);
      --danger-border: var(--color-danger-500);
      --surface-shadow: inset 0 1px 0 rgba(255,255,255,0.09), 0 0 0 1px rgba(255,255,255,0.10);
      --surface-shadow-md: inset 0 1px 0 rgba(255,255,255,0.11), 0 0 0 1px rgba(255,255,255,0.12);
      --surface-shadow-lg: inset 0 1px 0 rgba(255,255,255,0.13), 0 0 0 1px rgba(255,255,255,0.14);
      --modal-backdrop: rgba(0, 0, 0, 0.72);
    }
    #discuss-comments *, #discuss-comments *::before, #discuss-comments *::after {
      box-sizing: border-box;
    }
    #discuss-comments {
      font-family: var(--font-sans);
      font-size: var(--text-base);
      line-height: var(--tw-leading, var(--text-base--line-height));
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: var(--t1);
      background-color: var(--s2);
      letter-spacing: 0em;
    }
    #discuss-comments h1 {
      font-size: var(--text-4xl);
      line-height: var(--tw-leading, var(--text-4xl--line-height));
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
      color: var(--t1);
      letter-spacing: -0.018em;
    }
    #discuss-comments h2 {
      font-size: var(--text-3xl);
      line-height: var(--tw-leading, var(--text-3xl--line-height));
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
      color: var(--t1);
      letter-spacing: -0.014em;
    }
    #discuss-comments h3 {
      font-size: var(--text-2xl);
      line-height: var(--tw-leading, var(--text-2xl--line-height));
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
      color: var(--t1);
      letter-spacing: -0.010em;
    }
    #discuss-comments h4 {
      font-size: var(--text-xl);
      line-height: var(--tw-leading, var(--text-xl--line-height));
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
      color: var(--t1);
      letter-spacing: -0.006em;
    }
    #discuss-comments h5 {
      font-size: var(--text-lg);
      line-height: var(--tw-leading, var(--text-lg--line-height));
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
      color: var(--t1);
      letter-spacing: -0.003em;
    }
    #discuss-comments h6 {
      font-size: var(--text-base);
      line-height: var(--tw-leading, var(--text-base--line-height));
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
      color: var(--t1);
      letter-spacing: 0em;
    }
    #discuss-comments p {
      --tw-leading: var(--leading-relaxed);
      line-height: var(--leading-relaxed);
    }
    #discuss-comments a {
      color: var(--accent-fg);
      text-decoration: none;
    }
    #discuss-comments a:hover {
      text-decoration: underline;
    }
    #discuss-comments strong {
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
    }
    #discuss-comments code {
      border-radius: 0.25rem;
      padding-inline: calc(var(--spacing) * 1.5);
      padding-block: calc(var(--spacing) * 0.5);
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      background-color: var(--s3);
      color: var(--t2);
    }
    #discuss-comments pre {
      overflow-x: auto;
      border-radius: var(--radius-lg);
      padding: calc(var(--spacing) * 4);
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      background-color: var(--color-neutral-900);
      color: var(--color-neutral-100);
    }
    #discuss-comments pre code {
      border-radius: var(--radius-none);
      background-color: transparent;
      padding: calc(var(--spacing) * 0);
      color: inherit;
    }
    #discuss-comments hr {
      margin-block: calc(var(--spacing) * 6);
      border-style: var(--tw-border-style);
      border-width: 0px;
      border-top-style: var(--tw-border-style);
      border-top-width: 1px;
      border-color: var(--bds);
    }
  }
  @layer components {
    #discuss-comments .discuss-btn {
      display: inline-flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      gap: calc(var(--spacing) * 2);
      border-radius: var(--radius-md);
      border-style: var(--tw-border-style);
      border-width: 1px;
      padding-inline: calc(var(--spacing) * 5);
      font-size: var(--text-base);
      line-height: var(--tw-leading, var(--text-base--line-height));
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
      white-space: nowrap;
      transition-property: background-color,border-color,box-shadow,transform;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
      -webkit-user-select: none;
      -moz-user-select: none;
           user-select: none;
      #discuss-comments &:disabled {
        cursor: not-allowed;
      }
      #discuss-comments &:disabled {
        opacity: 50%;
      }
      height: 40px;
      line-height: 1;
      padding-top: 0;
      padding-bottom: 0;
      box-sizing: border-box;
      text-decoration: none;
      transition-duration: var(--duration-fast);
      transition-timing-function: var(--ease-DEFAULT);
    }
    #discuss-comments .discuss-btn:hover {
      text-decoration: none;
    }
    #discuss-comments .discuss-btn:active:not(:disabled) {
      transform: scale(0.96);
      transition: transform 60ms linear, background-color 60ms linear, border-color 60ms linear, box-shadow 60ms linear;
    }
    #discuss-comments .discuss-btn:focus-visible {
      box-shadow: 0 0 0 3px var(--focus-ring);
      @supports (color: color-mix(in lab, red, red)) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
      }
      outline: none;
    }
    #discuss-comments .discuss-btn svg, #discuss-comments .discuss-btn i[data-lucide] {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }
    #discuss-comments i[data-lucide] {
      display: inline-flex;
    }
    #discuss-comments .discuss-btn-primary {
      background-color: var(--b600);
      color: var(--on-primary);
      border-color: var(--b600);
    }
    #discuss-comments .discuss-btn-primary:hover {
      background-color: var(--b700);
      border-color: var(--b700);
    }
    #discuss-comments .discuss-btn-primary:active:not(:disabled) {
      background-color: var(--b800);
      border-color: var(--b800);
    }
    #discuss-comments .discuss-btn-secondary {
      background-color: var(--s1);
      color: var(--t2);
      border-color: var(--bd-button);
    }
    #discuss-comments .discuss-btn-secondary:hover {
      background-color: var(--s3);
      border-color: var(--bd-control);
    }
    #discuss-comments .discuss-btn-secondary:active:not(:disabled) {
      background-color: var(--s2);
      border-color: var(--bd-control);
    }
    #discuss-comments .discuss-btn-ghost {
      background-color: transparent;
      color: var(--t3);
      border-color: var(--bd-button);
    }
    #discuss-comments .discuss-btn-ghost:hover {
      background-color: var(--s3);
      color: var(--t1);
      border-color: var(--bd-control);
    }
    #discuss-comments .discuss-btn-ghost:active:not(:disabled) {
      background-color: var(--s2);
      border-color: var(--bd-control);
    }
    #discuss-comments .discuss-btn-danger {
      background-color: var(--danger-border);
      color: var(--on-danger);
      border-color: var(--danger-border);
    }
    #discuss-comments .discuss-btn-danger:hover {
      background-color: var(--color-danger-700);
      border-color: var(--color-danger-700);
    }
    #discuss-comments .discuss-btn-danger:active:not(:disabled) {
      background-color: var(--color-danger-800);
      border-color: var(--color-danger-800);
    }
    #discuss-comments .discuss-btn-success {
      background-color: var(--success-fill);
      color: var(--on-success);
      border-color: var(--success-fill);
    }
    #discuss-comments .discuss-btn-success:hover {
      background-color: var(--success-fill-hover);
      border-color: var(--success-fill-hover);
    }
    #discuss-comments .discuss-btn-sm {
      padding-inline: calc(var(--spacing) * 3.5);
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
      height: 32px;
      padding-top: 0;
      padding-bottom: 0;
    }
    #discuss-comments .discuss-btn-lg {
      padding-inline: calc(var(--spacing) * 8);
      font-size: var(--text-lg);
      line-height: var(--tw-leading, var(--text-lg--line-height));
      height: 48px;
      padding-top: 0;
      padding-bottom: 0;
    }
    #discuss-comments .discuss-btn-icon {
      width: 40px;
      height: 40px;
      padding: 0;
      border-color: transparent;
      background-color: transparent;
      color: var(--t3);
    }
    #discuss-comments .discuss-btn-sm.btn-icon {
      width: 32px;
      height: 32px;
    }
    #discuss-comments .discuss-btn-lg.btn-icon {
      width: 48px;
      height: 48px;
    }
    #discuss-comments .discuss-btn-icon:hover {
      background-color: var(--s3);
      color: var(--t2);
    }
    #discuss-comments .discuss-label {
      margin-bottom: calc(var(--spacing) * 1);
      display: block;
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
      color: var(--t2);
      letter-spacing: 0.006em;
    }
    #discuss-comments .discuss-label-required::after {
      content: ' *';
      color: var(--color-danger-500);
    }
    #discuss-comments .discuss-label-overline {
      margin-bottom: calc(var(--spacing) * 2);
      display: block;
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
      --tw-tracking: var(--tracking-widest);
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      color: var(--t4);
    }
    #discuss-comments .discuss-label-mono {
      margin-top: calc(var(--spacing) * 1);
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      color: var(--t4);
    }
    #discuss-comments .discuss-section-title {
      margin-bottom: calc(var(--spacing) * 1);
      font-size: var(--text-lg);
      line-height: var(--tw-leading, var(--text-lg--line-height));
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
      color: var(--t1);
    }
    #discuss-comments .discuss-section-desc {
      margin-bottom: calc(var(--spacing) * 6);
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
      color: var(--t3);
    }
    #discuss-comments .discuss-input {
      display: block;
      width: 100%;
      border-radius: var(--radius-md);
      border-style: var(--tw-border-style);
      border-width: 1px;
      padding-inline: calc(var(--spacing) * 3);
      padding-block: calc(var(--spacing) * 3);
      font-size: var(--text-base);
      line-height: var(--tw-leading, var(--text-base--line-height));
      --tw-leading: calc(var(--spacing) * 4);
      line-height: calc(var(--spacing) * 4);
      transition-property: border-color,box-shadow;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
      #discuss-comments &:disabled {
        cursor: not-allowed;
      }
      color: var(--t1);
      background-color: var(--s1);
      border-color: var(--bd-control);
      transition-duration: var(--duration-fast);
      transition-timing-function: var(--ease-DEFAULT);
    }
    #discuss-comments .discuss-input::-moz-placeholder {
      color: var(--t5);
    }
    #discuss-comments .discuss-input::placeholder {
      color: var(--t5);
    }
    #discuss-comments .discuss-input:focus, #discuss-comments .discuss-input:focus-visible {
      border-color: var(--focus-ring);
      box-shadow: 0 0 0 3px var(--focus-ring);
      @supports (color: color-mix(in lab, red, red)) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
      }
      outline: none;
    }
    #discuss-comments .discuss-input:disabled {
      background-color: var(--s2);
      color: var(--t5);
    }
    #discuss-comments .discuss-input-error {
      border-color: var(--danger-border);
    }
    #discuss-comments .discuss-input-error:focus, #discuss-comments .discuss-input-error:focus-visible {
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.25);
    }
    #discuss-comments .discuss-input-error.shake {
      animation: field-shake 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
    #discuss-comments .discuss-input-success {
      border-color: var(--color-success-600);
    }
    #discuss-comments .discuss-input-success:focus, #discuss-comments .discuss-input-success:focus-visible {
      box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.25);
    }
    #discuss-comments .discuss-textarea {
      min-height: 80px;
      resize: vertical;
    }
    #discuss-comments .discuss-select {
      cursor: pointer;
      -webkit-appearance: none;
         -moz-appearance: none;
              appearance: none;
      padding-right: calc(var(--spacing) * 8);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.25rem;
    }
    #discuss-comments .discuss-checkbox-label {
      position: relative;
      display: inline-flex;
      cursor: pointer;
      align-items: center;
      gap: calc(var(--spacing) * 2);
      -webkit-user-select: none;
      -moz-user-select: none;
           user-select: none;
    }
    #discuss-comments .discuss-checkbox-input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border-width: 0;
    }
    #discuss-comments .discuss-checkbox-box {
      display: flex;
      height: calc(var(--spacing) * 4);
      width: calc(var(--spacing) * 4);
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      transition-property: background-color,border-color;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
      border: 2px solid var(--bd-control);
      background-color: var(--s1);
      color: var(--on-primary);
      transition-duration: var(--duration-fast);
      transition-timing-function: var(--ease-DEFAULT);
    }
    #discuss-comments .discuss-checkbox-input:checked + .checkbox-box {
      background-color: var(--b600);
      border-color: var(--b600);
      animation: checkbox-pop 250ms cubic-bezier(0.16,1,0.3,1) forwards;
    }
    #discuss-comments .discuss-checkbox-input:focus-visible + .checkbox-box {
      outline: 2px solid var(--focus-ring);
      outline-offset: 2px;
    }
    #discuss-comments .discuss-checkbox-input:disabled + .checkbox-box {
      cursor: not-allowed;
      opacity: 50%;
    }
    #discuss-comments .discuss-checkbox-icon {
      width: 0.625rem;
      height: 0.625rem;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    #discuss-comments .discuss-checkbox-icon path {
      stroke-dasharray: 14;
      stroke-dashoffset: 14;
      transition: stroke-dashoffset 150ms ease-out;
    }
    #discuss-comments .discuss-checkbox-input:checked + .checkbox-box .checkbox-icon path {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 150ms ease-out 80ms;
    }
    #discuss-comments .discuss-radio-label {
      position: relative;
      display: inline-flex;
      cursor: pointer;
      align-items: center;
      gap: calc(var(--spacing) * 2);
      -webkit-user-select: none;
      -moz-user-select: none;
           user-select: none;
    }
    #discuss-comments .discuss-radio-input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border-width: 0;
    }
    #discuss-comments .discuss-radio-box {
      display: flex;
      height: calc(var(--spacing) * 4);
      width: calc(var(--spacing) * 4);
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      border-radius: calc(infinity * 1px);
      transition-property: border-color;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
      border: 2px solid var(--bd-control);
      background-color: var(--s1);
      transition-duration: var(--duration-fast);
      transition-timing-function: var(--ease-DEFAULT);
    }
    #discuss-comments .discuss-radio-input:checked + .radio-box {
      border-color: var(--b600);
    }
    #discuss-comments .discuss-radio-input:focus-visible + .radio-box {
      outline: 2px solid var(--focus-ring);
      outline-offset: 2px;
    }
    #discuss-comments .discuss-radio-input:disabled + .radio-box {
      cursor: not-allowed;
      opacity: 50%;
    }
    #discuss-comments .discuss-radio-dot {
      height: calc(var(--spacing) * 1.5);
      width: calc(var(--spacing) * 1.5);
      border-radius: calc(infinity * 1px);
      background-color: var(--b600);
      transform: scale(0);
      transition: transform 100ms ease-in;
    }
    #discuss-comments .discuss-radio-input:checked + .radio-box .radio-dot {
      transform: scale(1);
      transition: transform 200ms cubic-bezier(0.16,1,0.3,1);
    }
    #discuss-comments .discuss-field-group {
      margin-bottom: calc(var(--spacing) * 4);
      display: flex;
      flex-direction: column;
      gap: calc(var(--spacing) * 1);
    }
    #discuss-comments .discuss-field-help-text {
      display: flex;
      align-items: center;
      gap: calc(var(--spacing) * 1);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      color: var(--t4);
      letter-spacing: 0.010em;
    }
    #discuss-comments .discuss-field-error-text {
      display: flex;
      align-items: center;
      gap: calc(var(--spacing) * 1);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      color: var(--danger-fg);
      letter-spacing: 0.010em;
    }
    #discuss-comments .discuss-field-help-text svg, #discuss-comments .discuss-field-help-text i[data-lucide], #discuss-comments .discuss-field-error-text svg, #discuss-comments .discuss-field-error-text i[data-lucide] {
      width: .875rem;
      height: .875rem;
      flex-shrink: 0;
    }
    #discuss-comments .discuss-card {
      overflow: hidden;
      border-radius: var(--radius-lg);
      background-color: var(--s1);
      box-shadow: var(--surface-shadow);
    }
    #discuss-comments .discuss-card-header {
      border-bottom-style: var(--tw-border-style);
      border-bottom-width: 1px;
      padding-inline: calc(var(--spacing) * 5);
      padding-block: calc(var(--spacing) * 4);
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
      border-color: var(--bds);
      color: var(--t1);
    }
    #discuss-comments .discuss-card-body {
      padding-inline: calc(var(--spacing) * 5);
      padding-block: calc(var(--spacing) * 4);
    }
    #discuss-comments .discuss-card-footer {
      border-top-style: var(--tw-border-style);
      border-top-width: 1px;
      padding-inline: calc(var(--spacing) * 5);
      padding-block: calc(var(--spacing) * 3);
      border-color: var(--bds);
      background-color: var(--s3);
    }
    #discuss-comments .discuss-badge {
      display: inline-flex;
      align-items: center;
      gap: calc(var(--spacing) * 1);
      border-radius: calc(infinity * 1px);
      padding-inline: calc(var(--spacing) * 2.5);
      padding-block: calc(var(--spacing) * 0.5);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
      letter-spacing: 0.010em;
    }
    #discuss-comments .discuss-badge-info {
      background: #dbeafe;
      color: #1e40af;
    }
    #discuss-comments .discuss-badge-neutral {
      background: var(--s3);
      color: var(--t2);
    }
    #discuss-comments .discuss-badge-brand {
      background: var(--accent-surface);
      color: var(--accent-fg);
    }
    #discuss-comments .discuss-badge-success {
      background-color: var(--color-success-100);
      color: var(--color-success-700);
    }
    #discuss-comments .discuss-badge-warning {
      background-color: var(--color-warning-100);
      color: var(--color-warning-700);
    }
    #discuss-comments .discuss-badge-danger {
      background-color: var(--color-danger-100);
      color: var(--color-danger-700);
    }
    #discuss-comments .discuss-alert {
      display: flex;
      gap: calc(var(--spacing) * 3);
      border-radius: var(--radius-lg);
      border-style: var(--tw-border-style);
      border-width: 1px;
      padding-inline: calc(var(--spacing) * 4);
      padding-block: calc(var(--spacing) * 3);
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
    }
    #discuss-comments .discuss-alert-info {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: #1e3a8a;
    }
    #discuss-comments .discuss-alert-success {
      border-color: var(--color-success-200);
      background-color: var(--color-success-50);
      color: var(--color-success-700);
    }
    #discuss-comments .discuss-alert-warning {
      border-color: var(--color-warning-200);
      background-color: var(--color-warning-50);
      color: var(--color-warning-700);
    }
    #discuss-comments .discuss-alert-danger {
      border-color: var(--color-danger-200);
      background-color: var(--color-danger-50);
      color: var(--color-danger-700);
    }
    #discuss-comments .discuss-table-wrap {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border: 1px solid var(--bd);
      border-radius: 8px;
    }
    #discuss-comments .discuss-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
    }
    #discuss-comments .discuss-table thead {
      border-bottom-style: var(--tw-border-style);
      border-bottom-width: 1px;
      background-color: var(--s3);
      border-color: var(--bd);
    }
    #discuss-comments .discuss-table th {
      padding-inline: calc(var(--spacing) * 4);
      padding-block: calc(var(--spacing) * 3);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
      --tw-tracking: var(--tracking-wide);
      letter-spacing: var(--tracking-wide);
      text-transform: uppercase;
      color: var(--t4);
    }
    #discuss-comments .discuss-table tbody tr {
      border-bottom-style: var(--tw-border-style);
      border-bottom-width: 1px;
      transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
      --tw-duration: 100ms;
      transition-duration: 100ms;
      border-color: var(--bds);
    }
    #discuss-comments .discuss-table tbody tr:hover {
      background-color: var(--s2);
    }
    #discuss-comments .discuss-table tbody tr:last-child {
      border-bottom-style: var(--tw-border-style);
      border-bottom-width: 0px;
    }
    #discuss-comments .discuss-table td {
      padding-inline: calc(var(--spacing) * 4);
      padding-block: calc(var(--spacing) * 3);
      color: var(--t2);
    }
    #discuss-comments .discuss-avatar {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: calc(infinity * 1px);
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
      background-color: var(--s3);
      color: var(--t3);
    }
    #discuss-comments .discuss-avatar-xs {
      height: calc(var(--spacing) * 6);
      width: calc(var(--spacing) * 6);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
    }
    #discuss-comments .discuss-avatar-sm {
      height: calc(var(--spacing) * 8);
      width: calc(var(--spacing) * 8);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
    }
    #discuss-comments .discuss-avatar-md {
      height: calc(var(--spacing) * 10);
      width: calc(var(--spacing) * 10);
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
    }
    #discuss-comments .discuss-avatar-lg {
      height: calc(var(--spacing) * 12);
      width: calc(var(--spacing) * 12);
      font-size: var(--text-base);
      line-height: var(--tw-leading, var(--text-base--line-height));
    }
    #discuss-comments .discuss-avatar-xl {
      height: calc(var(--spacing) * 16);
      width: calc(var(--spacing) * 16);
      font-size: var(--text-xl);
      line-height: var(--tw-leading, var(--text-xl--line-height));
    }
    #discuss-comments .discuss-spinner {
      display: inline-block;
      animation: var(--animate-spin);
      border-radius: calc(infinity * 1px);
      border-style: var(--tw-border-style);
      border-width: 2px;
      border-color: currentcolor;
      border-top-color: transparent;
      opacity: 75%;
    }
    #discuss-comments .discuss-spinner-sm {
      height: calc(var(--spacing) * 3);
      width: calc(var(--spacing) * 3);
    }
    #discuss-comments .discuss-spinner-md {
      height: calc(var(--spacing) * 4);
      width: calc(var(--spacing) * 4);
    }
    #discuss-comments .discuss-spinner-lg {
      height: calc(var(--spacing) * 6);
      width: calc(var(--spacing) * 6);
      border-style: var(--tw-border-style);
      border-width: 3px;
    }
    #discuss-comments .discuss-skeleton {
      border-radius: 0.25rem;
      background-color: var(--s3);
      background-image: linear-gradient( 90deg, transparent 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.55) 55%, transparent 100% );
      background-size: 200% 100%;
      background-position: 200% 0;
      animation: skeleton-shimmer 1400ms cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    #discuss-comments .discuss-skeleton-sm {
      height: calc(var(--spacing) * 3);
    }
    #discuss-comments .discuss-skeleton-md {
      height: calc(var(--spacing) * 4);
    }
    #discuss-comments .discuss-skeleton-lg {
      height: calc(var(--spacing) * 6);
    }
    #discuss-comments .discuss-divider {
      margin-block: calc(var(--spacing) * 4);
      display: flex;
      align-items: center;
      gap: calc(var(--spacing) * 3);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      color: var(--t4);
    }
    #discuss-comments .discuss-divider::before, #discuss-comments .discuss-divider::after {
      content: '';
      height: 1px;
      flex: 1;
      background-color: var(--bds);
    }
    #discuss-comments .discuss-tooltip {
      position: relative;
      display: inline-block;
    }
    #discuss-comments .discuss-tooltip-content {
      visibility: hidden;
      position: absolute;
      bottom: 100%;
      z-index: 10;
      margin-bottom: calc(var(--spacing) * 2);
      border-radius: var(--radius-md);
      padding-inline: calc(var(--spacing) * 2.5);
      padding-block: calc(var(--spacing) * 1.5);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      white-space: nowrap;
      opacity: 0%;
      left: 50%;
      color: var(--tooltip-fg);
      background-color: var(--tooltip-bg);
      transform: translateX(-50%) translateY(4px);
      transition: opacity 150ms ease-in, transform 150ms ease-in, visibility 0ms 150ms;
    }
    #discuss-comments .discuss-tooltip-content::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: var(--tooltip-bg);
    }
    #discuss-comments .discuss-tooltip:hover .tooltip-content {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
      transition: opacity 150ms cubic-bezier(0.16,1,0.3,1), transform 150ms cubic-bezier(0.16,1,0.3,1), visibility 0ms;
    }
    #discuss-comments .discuss-tabs {
      position: relative;
      display: flex;
      border-bottom-style: var(--tw-border-style);
      border-bottom-width: 1px;
      border-color: var(--bds);
      gap: 0;
    }
    #discuss-comments .discuss-tab {
      cursor: pointer;
      padding-inline: calc(var(--spacing) * 4);
      padding-block: calc(var(--spacing) * 2.5);
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
      white-space: nowrap;
      text-decoration-line: none;
      transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
      --tw-duration: 100ms;
      transition-duration: 100ms;
      color: var(--t4);
      background: none;
      border: none;
      font-family: inherit;
      letter-spacing: 0.006em;
    }
    #discuss-comments .discuss-tab:hover {
      color: var(--t1);
    }
    #discuss-comments .discuss-tab:focus-visible {
      box-shadow: 0 0 0 3px var(--focus-ring);
      @supports (color: color-mix(in lab, red, red)) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
      }
      border-radius: 4px;
      outline: none;
    }
    #discuss-comments .discuss-tab.active {
      color: var(--accent-fg);
      font-weight: 500;
    }
    #discuss-comments .discuss-tab-indicator {
      position: absolute;
      background-color: var(--accent-fg);
      bottom: -1px;
      height: 2px;
      border-radius: 2px 2px 0 0;
      pointer-events: none;
      transition: left 200ms cubic-bezier(0.4,0,0.2,1), width 200ms cubic-bezier(0.4,0,0.2,1);
    }
    #discuss-comments .discuss-dropdown {
      position: relative;
      display: inline-block;
    }
    #discuss-comments .discuss-dropdown-menu {
      position: absolute;
      z-index: 50;
      min-width: 180px;
      border-radius: var(--radius-lg);
      padding: calc(var(--spacing) * 1);
      top: calc(100% + 6px);
      left: 0;
      background-color: var(--s1);
      border: 1px solid var(--bd);
      box-shadow: 0 4px 16px rgba(15,23,42,.10), 0 1px 4px rgba(15,23,42,.06);
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95) translateY(-6px);
      transform-origin: top center;
      transition: opacity 150ms ease-in, transform 150ms ease-in, visibility 0ms 150ms;
    }
    #discuss-comments .discuss-dropdown-menu.open {
      opacity: 1;
      visibility: visible;
      transform: scale(1) translateY(0);
      transition: opacity 200ms cubic-bezier(0.16,1,0.3,1), transform 200ms cubic-bezier(0.16,1,0.3,1), visibility 0ms;
    }
    #discuss-comments .discuss-dropdown-item {
      display: flex;
      cursor: pointer;
      align-items: center;
      gap: calc(var(--spacing) * 2);
      border-radius: var(--radius-md);
      padding-inline: calc(var(--spacing) * 3);
      padding-block: calc(var(--spacing) * 2);
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
      text-decoration-line: none;
      transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
      --tw-duration: 75ms;
      transition-duration: 75ms;
      color: var(--t2);
      outline: none;
      letter-spacing: 0.006em;
    }
    #discuss-comments .discuss-dropdown-item svg, #discuss-comments .discuss-dropdown-item i[data-lucide] {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
    #discuss-comments .discuss-dropdown-item:hover {
      background-color: var(--s3);
    }
    #discuss-comments .discuss-dropdown-item:focus-visible {
      box-shadow: 0 0 0 3px var(--focus-ring);
      @supports (color: color-mix(in lab, red, red)) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
      }
      outline: none;
    }
    #discuss-comments .discuss-dropdown-item.danger {
      color: var(--danger-fg);
    }
    #discuss-comments .discuss-dropdown-item.danger:hover {
      background-color: var(--color-danger-50);
    }
    #discuss-comments .discuss-dropdown-divider {
      margin-block: calc(var(--spacing) * 1);
      height: 1px;
      background-color: var(--bds);
    }
    #discuss-comments .discuss-dropdown-header {
      padding-inline: calc(var(--spacing) * 3);
      padding-block: calc(var(--spacing) * 1);
      font-size: var(--text-xs);
      line-height: var(--tw-leading, var(--text-xs--line-height));
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
      --tw-tracking: var(--tracking-wide);
      letter-spacing: var(--tracking-wide);
      text-transform: uppercase;
      color: var(--t4);
    }
    #discuss-comments .discuss-page-container {
      margin-inline: auto;
      max-width: var(--container-7xl);
      padding-inline: calc(var(--spacing) * 4);
      @media (width >= 40rem) {
        padding-inline: calc(var(--spacing) * 6);
      }
      @media (width >= 64rem) {
        padding-inline: calc(var(--spacing) * 8);
      }
    }
    #discuss-comments .discuss-section {
      padding-block: calc(var(--spacing) * 8);
      @media (width >= 40rem) {
        padding-block: calc(var(--spacing) * 12);
      }
    }
    #discuss-comments .discuss-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    #discuss-comments .discuss-navbar {
      display: flex;
      align-items: center;
      gap: calc(var(--spacing) * 2);
      border-radius: var(--radius-lg);
      padding: 0.625rem 1.25rem;
      background-color: var(--s1);
      box-shadow: var(--surface-shadow);
    }
    #discuss-comments .discuss-navbar-brand {
      font-size: 0.9375rem;
      font-weight: 700;
      color: var(--t1);
      margin-right: 0.75rem;
      text-decoration: none;
      white-space: nowrap;
    }
    #discuss-comments .discuss-navbar-menu {
      display: flex;
      flex: 1;
      align-items: center;
      gap: 0.125rem;
    }
    #discuss-comments .discuss-navbar-item {
      padding: 0.75rem;
      font-size: 0.875rem;
      line-height: 1rem;
      letter-spacing: 0em;
      color: var(--t2);
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      background: none;
      border: none;
      font-family: inherit;
      transition: color 120ms, background-color 100ms, box-shadow 120ms, transform 60ms linear;
    }
    #discuss-comments .discuss-navbar-item:hover {
      background-color: var(--accent-surface);
      color: var(--t1);
    }
    #discuss-comments .discuss-navbar-item:active {
      transform: scale(0.96);
      transition: transform 60ms linear, background-color 60ms linear, color 60ms linear;
    }
    #discuss-comments .discuss-navbar-item:focus-visible {
      box-shadow: 0 0 0 3px var(--focus-ring);
      @supports (color: color-mix(in lab, red, red)) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
      }
      outline: none;
    }
    #discuss-comments .discuss-navbar-item.active {
      background-color: var(--accent-surface);
      color: var(--accent-fg);
      font-weight: 600;
    }
    #discuss-comments .discuss-navbar-end {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: auto;
    }
    #discuss-comments .discuss-stat-card {
      border-radius: var(--radius-lg);
      padding: 1.25rem;
      background-color: var(--s1);
      box-shadow: var(--surface-shadow);
    }
    #discuss-comments .discuss-stat-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--t4);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.375rem;
    }
    #discuss-comments .discuss-stat-value {
      font-size: 1.875rem;
      line-height: 1;
      font-weight: 700;
      color: var(--t1);
      margin-bottom: 0.375rem;
    }
    #discuss-comments .discuss-stat-delta {
      font-size: 0.75rem;
      font-weight: 500;
    }
    #discuss-comments .discuss-stat-delta.up {
      color: var(--color-success-600);
    }
    #discuss-comments .discuss-stat-delta.down {
      color: var(--color-danger-600);
    }
    #discuss-comments .discuss-stat-delta.flat {
      color: var(--t4);
    }
    #discuss-comments .discuss-page-header {
      padding-bottom: 1.25rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--bds);
    }
    #discuss-comments .discuss-breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.75rem;
      color: var(--t4);
      margin-bottom: 0.5rem;
    }
    #discuss-comments .discuss-breadcrumb a {
      color: var(--t4);
      text-decoration: none;
    }
    #discuss-comments .discuss-breadcrumb a:hover {
      color: var(--accent-fg);
    }
    #discuss-comments .discuss-breadcrumb-sep {
      display: inline-flex;
      align-items: center;
      color: var(--t4);
      width: 14px;
      height: 14px;
    }
    #discuss-comments .discuss-breadcrumb-sep svg {
      display: block;
      width: 14px;
      height: 14px;
    }
    #discuss-comments .discuss-page-title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    #discuss-comments .discuss-page-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--t1);
    }
    #discuss-comments .discuss-page-actions {
      display: flex;
      gap: 0.5rem;
    }
    #discuss-comments .discuss-modal-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: var(--modal-backdrop);
      opacity: 0;
      visibility: hidden;
      transition: opacity 200ms, visibility 0ms 200ms;
      z-index: 200;
    }
    #discuss-comments .discuss-modal-overlay.open {
      opacity: 1;
      visibility: visible;
      transition: opacity 200ms, visibility 0ms;
    }
    #discuss-comments .discuss-modal {
      width: 100%;
      max-width: 480px;
      border-radius: 12px;
      background-color: var(--s1);
      box-shadow: var(--surface-shadow-lg);
      transform: scale(0.96) translateY(8px);
      transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out;
      opacity: 0;
      position: relative;
      z-index: 201;
    }
    #discuss-comments .discuss-modal-overlay.open .modal {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
    #discuss-comments .discuss-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--bds);
    }
    #discuss-comments .discuss-modal-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--t1);
    }
    #discuss-comments .discuss-modal-body {
      padding: 1.25rem;
      font-size: 0.875rem;
      line-height: 1.65;
      color: var(--t2);
    }
    #discuss-comments .discuss-modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 1rem 1.25rem;
      border-top: 1px solid var(--bds);
      border-radius: 0 0 12px 12px;
      background-color: var(--s3);
    }
    #discuss-comments .discuss-toast-region {
      position: fixed;
      bottom: 1.25rem;
      right: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 300;
      pointer-events: none;
    }
    #discuss-comments .discuss-toast {
      display: inline-flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--toast-fg);
      background-color: var(--toast-bg);
      box-shadow: var(--surface-shadow-md);
      pointer-events: auto;
      transform: translateX(calc(100% + 1.5rem));
      opacity: 0;
      transition: transform 300ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease-out;
    }
    #discuss-comments .discuss-toast.show {
      transform: translateX(0);
      opacity: 1;
    }
    #discuss-comments .discuss-toast.hide {
      transform: translateX(calc(100% + 1.5rem));
      opacity: 0;
      transition: transform 200ms cubic-bezier(0.7,0,1,1), opacity 150ms ease-in;
    }
    #discuss-comments .discuss-toast svg, #discuss-comments .discuss-toast i[data-lucide] {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
    #discuss-comments .discuss-toast-success {
      background-color: var(--color-success-700);
    }
    #discuss-comments .discuss-toast-danger {
      background-color: var(--color-danger-600);
    }
    #discuss-comments .discuss-toast-warning {
      background-color: var(--color-neutral-800);
    }
    #discuss-comments .discuss-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 3rem 1.5rem;
    }
    #discuss-comments .discuss-empty-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
      color: var(--t4);
    }
    #discuss-comments .discuss-empty-icon svg, #discuss-comments .discuss-empty-icon i[data-lucide] {
      width: 32px;
      height: 32px;
    }
    #discuss-comments .discuss-empty-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--t1);
      margin-bottom: 0.375rem;
    }
    #discuss-comments .discuss-empty-desc {
      max-width: 320px;
      margin: 0 auto 1.25rem;
      font-size: 0.875rem;
      color: var(--t4);
    }
    #discuss-comments .discuss-app {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
      background-color: var(--s2);
    }
    #discuss-comments .discuss-app-navbar {
      display: flex;
      align-items: center;
      height: 52px;
      flex-shrink: 0;
      gap: 0.5rem;
      padding: 0 1rem;
      background-color: var(--s1);
      box-shadow: 0 1px 0 var(--shell-divider);
      z-index: 100;
    }
    #discuss-comments .discuss-app-body {
      display: flex;
      flex: 1;
      min-height: 0;
    }
    #discuss-comments .discuss-app-sidebar {
      width: 200px;
      flex-shrink: 0;
      overflow-y: auto;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      background-color: var(--s1);
      box-shadow: 1px 0 0 var(--shell-divider);
      z-index: 1;
      transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    #discuss-comments .discuss-app-content {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      scroll-behavior: smooth;
    }
    #discuss-comments .discuss-app-content-page {
      min-height: 100%;
      background-color: var(--s1);
    }
    #discuss-comments .discuss-app-content-inner {
      padding: 1.5rem;
    }
    #discuss-comments .discuss-sidebar-group-label {
      padding: 0.5rem 0.5rem 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--t4);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    #discuss-comments .discuss-sidebar-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      margin-bottom: 4px;
      font-size: 0.875rem;
      line-height: 1rem;
      letter-spacing: 0em;
      color: var(--t2);
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      outline: none;
      transition: background-color 100ms, color 100ms, box-shadow 120ms, transform 120ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    #discuss-comments .discuss-sidebar-item svg {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
    #discuss-comments .discuss-sidebar-item:hover {
      background-color: var(--accent-surface);
      color: var(--t1);
      transform: scale(1.02);
    }
    #discuss-comments .discuss-sidebar-item:active {
      transform: scale(0.97);
      transition: transform 60ms linear, background-color 60ms linear, color 60ms linear;
    }
    #discuss-comments .discuss-sidebar-item:focus-visible {
      box-shadow: 0 0 0 3px var(--focus-ring);
      @supports (color: color-mix(in lab, red, red)) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
      }
      outline: none;
    }
    #discuss-comments .discuss-sidebar-item.active {
      background-color: var(--accent-surface);
      color: var(--accent-fg);
      font-weight: 600;
    }
    #discuss-comments .discuss-sidebar-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      opacity: 0;
      visibility: hidden;
      transition: opacity 200ms, visibility 0ms 200ms;
      z-index: 10;
    }
    #discuss-comments .discuss-sidebar-backdrop.open {
      opacity: 1;
      visibility: visible;
      transition: opacity 200ms, visibility 0ms;
    }
    @media (max-width: 767px) {
      #discuss-comments .discuss-app-navbar {
        padding: 0 0.75rem;
      }
      #discuss-comments .discuss-app-sidebar {
        position: fixed;
        top: 52px;
        right: 0;
        left: auto;
        height: calc(100vh - 52px);
        transform: translateX(100%);
        z-index: 50;
        box-shadow: -2px 0 8px rgba(15, 23, 42, 0.08);
      }
      #discuss-comments .discuss-app-sidebar.open {
        transform: translateX(0);
      }
      #discuss-comments .discuss-sidebar-backdrop {
        display: block;
        top: 52px;
      }
    }
    @media (min-width: 768px) {
      #discuss-comments .discuss-app-content-inner {
        padding: 2rem;
      }
    }
    #discuss-comments .discuss-theme-light .badge-info {
      background: var(--color-primary-100);
      color: var(--color-primary-800);
    }
    #discuss-comments .discuss-theme-light .badge-neutral {
      background: var(--color-neutral-100);
      color: var(--color-neutral-700);
    }
    #discuss-comments .discuss-theme-light .badge-success {
      background: var(--color-success-100);
      color: var(--color-success-700);
    }
    #discuss-comments .discuss-theme-light .badge-warning {
      background: var(--color-warning-100);
      color: var(--color-warning-700);
    }
    #discuss-comments .discuss-theme-light .badge-danger {
      background: var(--color-danger-100);
      color: var(--color-danger-700);
    }
    #discuss-comments .discuss-theme-light .alert-info {
      background: var(--color-primary-50);
      border-color: var(--color-primary-200);
      color: var(--color-primary-800);
    }
    #discuss-comments .discuss-theme-light .alert-success {
      background: var(--color-success-50);
      border-color: var(--color-success-200);
      color: var(--color-success-700);
    }
    #discuss-comments .discuss-theme-light .alert-warning {
      background: var(--color-warning-50);
      border-color: var(--color-warning-200);
      color: var(--color-warning-700);
    }
    #discuss-comments .discuss-theme-light .alert-danger {
      background: var(--color-danger-50);
      border-color: var(--color-danger-200);
      color: var(--color-danger-700);
    }
    #discuss-comments .discuss-theme-dark .badge-info {
      background: #1e1b4b;
      color: #93c5fd;
    }
    #discuss-comments .discuss-theme-dark .badge-neutral {
      background: var(--color-neutral-800);
      color: var(--color-neutral-400);
    }
    #discuss-comments .discuss-theme-dark .badge-success {
      background: #14532d;
      color: #4ade80;
    }
    #discuss-comments .discuss-theme-dark .badge-warning {
      background: #451a03;
      color: #fbbf24;
    }
    #discuss-comments .discuss-theme-dark .badge-danger {
      background: #450a0a;
      color: #f87171;
    }
    #discuss-comments .discuss-theme-dark .alert-info {
      background: #1e1b4b;
      border-color: #312e81;
      color: #93c5fd;
    }
    #discuss-comments .discuss-theme-dark .alert-success {
      background: #14532d;
      border-color: #166534;
      color: #4ade80;
    }
    #discuss-comments .discuss-theme-dark .alert-warning {
      background: #451a03;
      border-color: #78350f;
      color: #fbbf24;
    }
    #discuss-comments .discuss-theme-dark .alert-danger {
      background: #450a0a;
      border-color: #7f1d1d;
      color: #f87171;
    }
    #discuss-comments .discuss-theme-dark .dropdown-item.danger:hover {
      background: #450a0a;
    }
  }
  @keyframes checkbox-pop {
    0% {
      transform: scale(0.8);
    }
    60% {
      transform: scale(1.12);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes skeleton-shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  #discuss-comments .discuss-dark .skeleton {
    background-image: linear-gradient( 90deg, transparent 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 55%, transparent 100% );
  }
  @keyframes field-shake {
    0%, 100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-5px);
    }
    40% {
      transform: translateX(5px);
    }
    60% {
      transform: translateX(-3px);
    }
    80% {
      transform: translateX(3px);
    }
  }
  @keyframes success-pop {
    0% {
      transform: scale(0.72);
      opacity: 0;
    }
    60% {
      transform: scale(1.12);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  #discuss-comments .discuss-success-pop {
    animation: success-pop 320ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  #discuss-comments .discuss-dark .badge-info {
    background: #1e1b4b;
    color: #93c5fd;
  }
  #discuss-comments .discuss-dark .badge-neutral {
    background: var(--color-neutral-800);
    color: var(--color-neutral-400);
  }
  #discuss-comments .discuss-dark .badge-success {
    background: #14532d;
    color: #4ade80;
  }
  #discuss-comments .discuss-dark .badge-warning {
    background: #451a03;
    color: #fbbf24;
  }
  #discuss-comments .discuss-dark .badge-danger {
    background: #450a0a;
    color: #f87171;
  }
  #discuss-comments .discuss-dark .alert-info {
    background: #1e1b4b;
    border-color: #312e81;
    color: #93c5fd;
  }
  #discuss-comments .discuss-dark .alert-success {
    background: #14532d;
    border-color: #166534;
    color: #4ade80;
  }
  #discuss-comments .discuss-dark .alert-warning {
    background: #451a03;
    border-color: #78350f;
    color: #fbbf24;
  }
  #discuss-comments .discuss-dark .alert-danger {
    background: #450a0a;
    border-color: #7f1d1d;
    color: #f87171;
  }
  #discuss-comments .discuss-dark .dropdown-item.danger:hover {
    background: #450a0a;
  }
  @media (prefers-reduced-motion: reduce) {
    #discuss-comments *, #discuss-comments *::before, #discuss-comments *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
@layer base;
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-tracking {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    #discuss-comments *, #discuss-comments ::before, #discuss-comments ::after, #discuss-comments ::backdrop {
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-space-y-reverse: 0;
      --tw-border-style: solid;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-ease: initial;
      --tw-leading: initial;
      --tw-tracking: initial;
      --tw-duration: initial;
    }
  }
}
`,S=T+`
    .dark #discuss-comments {
        --t1:#f8fafc; --t2:#e2e8f0; --t3:#cbd5e1; --t4:#94a3b8; --t5:#64748b;
        --s1:#111827; --s2:#0a1120; --s3:#1e293b;
        --bd:#475569; --bds:#334155; --bd-control:#475569; --bd-button:#334155; --bd-strong:#94a3b8;
        --accent-fg:#93c5fd; --accent-surface:color-mix(in srgb,#1e40af 32%,#111827); --focus-ring:#93c5fd;
    }

    #discuss-comments { text-align: left; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background-color: transparent; }
    #discuss-comments * { box-sizing: inherit; }
    
    #discuss-comments .em-tip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border-width: 4px; border-style: solid; border-color: #1e293b transparent transparent transparent; }
    #discuss-comments .discuss-badge-warning { background: #fef3c7; color: #b45309; }

    /* \u2500\u2500 Visibility utilities (Tailwind purges these because it sees discuss-hidden, not hidden) \u2500\u2500 */
    #discuss-comments .discuss-hidden { display: none !important; }
    #discuss-comments .discuss-flex-1 { flex: 1 1 0%; }
    #discuss-comments .discuss-flex-shrink-0 { flex-shrink: 0; }
    #discuss-comments .discuss-items-center { align-items: center; }
    #discuss-comments .discuss-justify-end { justify-content: flex-end; }
    #discuss-comments .discuss-gap-2 { gap: 0.5rem; }
    #discuss-comments .discuss-gap-4 { gap: 1rem; }
    #discuss-comments .discuss-gap-6 { gap: 1.5rem; }
    #discuss-comments .discuss-flex-col { flex-direction: column; }
    #discuss-comments .discuss-flex-wrap { flex-wrap: wrap; }
    #discuss-comments .discuss-font-semibold { font-weight: 600; }
    #discuss-comments .discuss-font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
    #discuss-comments .discuss-text-sm { font-size: 0.875rem; line-height: 1.25rem; }
    #discuss-comments .discuss-text-xs { font-size: 0.75rem; line-height: 1rem; }
    #discuss-comments .discuss-text-lg { font-size: 1.125rem; line-height: 1.75rem; }
    #discuss-comments .discuss-uppercase { text-transform: uppercase; }
    #discuss-comments .discuss-tracking-wide { letter-spacing: 0.025em; }
    #discuss-comments .discuss-mb-10 { margin-bottom: 2.5rem; }

    /* \u2500\u2500 Button variants (Tailwind only generates .btn, not .discuss-btn-primary) \u2500\u2500 */
    #discuss-comments .discuss-btn-primary {
        background-color: var(--b600);
        color: var(--on-primary);
        border-color: var(--b600);
    }
    #discuss-comments .discuss-btn-primary:hover { background-color: var(--b700); border-color: var(--b700); }
    #discuss-comments .discuss-btn-primary:active:not(:disabled) { background-color: var(--b800); border-color: var(--b800); }
    #discuss-comments .discuss-btn-secondary {
        background-color: var(--s1);
        color: var(--t2);
        border-color: var(--bd-button);
    }
    #discuss-comments .discuss-btn-secondary:hover { background-color: var(--s3); }

    /* \u2500\u2500 Responsive Avatar & Thread Spacing \u2500\u2500 */
    #discuss-comments .discuss-comment-row {
        --avatar-size: 2rem;
        --avatar-gap: 0.75rem;
        gap: var(--avatar-gap);
        position: relative;
        transition: box-shadow 300ms ease;
    }
    @media (min-width: 640px) {
        #discuss-comments .discuss-comment-row {
            --avatar-size: 2.5rem;
            --avatar-gap: 1rem;
        }
    }

    #discuss-comments .discuss-avatar {
        flex-shrink: 0;
        min-width: var(--avatar-size);
        width: var(--avatar-size);
        height: var(--avatar-size);
    }
    #discuss-comments .discuss-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    /* \u2500\u2500 Comment content column: min-width:0 is required for text to wrap in flex \u2500\u2500 */
    #discuss-comments .discuss-comment-content {
        min-width: 0;
        flex: 1;
    }

    /* \u2500\u2500 Comment body prose \u2500\u2500 */
    #discuss-comments .discuss-comment-body {
        font-size: 0.9375rem;
        line-height: 1.65;
        color: var(--t2);
        margin: 0 0 0.75rem;
        word-break: break-word;
        overflow-wrap: break-word;
    }
    #discuss-comments .discuss-comment-body p { margin: 0 0 0.5em; }
    #discuss-comments .discuss-comment-body p:last-child { margin-bottom: 0; }
    #discuss-comments .discuss-comment-body blockquote {
        border-left: 3px solid var(--bds);
        padding-left: 1rem;
        margin: 0.5rem 0;
        color: var(--t4);
        font-style: italic;
    }
    #discuss-comments .discuss-comment-body kbd {
        display: inline-block;
        padding: 0.15em 0.5em 0.2em;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.8125em;
        line-height: 1.4;
        color: var(--t2);
        background: var(--s2);
        border: 1px solid var(--bd);
        border-bottom: 2px solid var(--bd-strong);
        border-radius: 4px;
        box-shadow: inset 0 -1px 0 var(--bd-strong), inset 0 1px 0 #fff;
        white-space: nowrap;
        vertical-align: baseline;
    }
    #discuss-comments .discuss-comment-body mark {
        background: #fef9c3;
        color: #713f12;
        padding: 0.1em 0.2em;
        border-radius: 3px;
    }
    #discuss-comments .discuss-comment-body abbr[title] {
        text-decoration: underline dotted;
        cursor: help;
    }
    #discuss-comments .discuss-comment-body code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.875em;
        padding: 0.15em 0.4em;
        background: var(--s3);
        color: var(--t2);
        border-radius: 4px;
    }
    #discuss-comments .discuss-comment-body pre {
        margin: 0.875em 0;
        padding: 1rem 1.25rem;
        background: var(--t1);
        color: var(--s2);
        border-radius: 8px;
        overflow-x: auto;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.875rem;
        line-height: 1.6;
    }
    #discuss-comments .discuss-comment-body pre code {
        background: transparent;
        color: inherit;
        padding: 0;
        font-size: inherit;
        border-radius: 0;
    }
    #discuss-comments .discuss-comment-body ul,
    #discuss-comments .discuss-comment-body ol {
        margin: 0.625em 0 0.75em;
        padding-left: 1.5rem;
    }
    #discuss-comments .discuss-comment-body ul { list-style-type: disc; }
    #discuss-comments .discuss-comment-body ol { list-style-type: decimal; }
    #discuss-comments .discuss-comment-body li { margin: 0.3em 0; }
    #discuss-comments .discuss-comment-body del { color: var(--t4); text-decoration: line-through; }
    #discuss-comments .discuss-comment-body ins {
        text-decoration: none;
        background: #dcfce7;
        color: #15803d;
        padding: 0.1em 0.2em;
        border-radius: 3px;
    }
    #discuss-comments .discuss-comment-body cite { font-style: italic; color: var(--t3); }
    #discuss-comments .discuss-comment-body sup,
    #discuss-comments .discuss-comment-body sub { font-size: 0.75em; line-height: 0; position: relative; vertical-align: baseline; }
    #discuss-comments .discuss-comment-body sup { top: -0.5em; }
    #discuss-comments .discuss-comment-body sub { bottom: -0.25em; }

    /* \u2500\u2500 Badge (also purged by scanner) \u2500\u2500 */
    /* \u2500\u2500 Badge \u2014 exact DS spec: inline-flex gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full \u2500\u2500 */
    #discuss-comments .discuss-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;          /* gap-1 */
        padding: 0.125rem 0.625rem; /* py-0.5 px-2.5 */
        font-size: 0.75rem;    /* text-xs */
        line-height: 1rem;     /* text-xs \u2014 critical: without this it inherits 1.5rem from parent */
        font-weight: 500;      /* font-medium */
        border-radius: 9999px; /* rounded-full */
    }
    #discuss-comments .discuss-badge-info    { background: #dbeafe; color: #1e40af; }
    #discuss-comments .discuss-badge-success { background: #dcfce7; color: #15803d; }

    /* \u2500\u2500 Reply Tag \u2500\u2500 */
    #discuss-comments .discuss-reply-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.125rem 0.5rem;
        border-radius: 6px;
        font-size: 0.8125rem;
        font-weight: 600;
        background-color: var(--accent-surface);
        color: var(--accent-fg);
        margin-right: 0.375rem;
        text-decoration: none !important;
        transition: background-color 150ms, opacity 150ms;
        vertical-align: baseline;
    }
    #discuss-comments .discuss-reply-tag:hover {
        background-color: color-mix(in srgb, var(--accent-surface) 90%, var(--accent-fg));
        text-decoration: none !important;
    }
    #discuss-comments .discuss-reply-tag:focus-visible {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
        outline: none;
    }

    /* \u2500\u2500 New Comment Form UI \u2500\u2500 */
    #discuss-comments .discuss-form-container {
        border: 1px solid var(--bd-control);
        border-radius: 0.5rem;
        background-color: var(--s1);
        overflow: hidden;
        transition: border-color 150ms, box-shadow 150ms;
    }
    #discuss-comments .discuss-form-container:focus-within {
        border-color: var(--focus-ring);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
    }
    #discuss-comments .discuss-form-textarea {
        display: block;
        width: 100%;
        border: none;
        background: transparent;
        padding: 1rem;
        min-height: 80px;
        resize: vertical;
        font-size: 0.9375rem;
        line-height: 1.5;
        color: var(--t1);
        outline: none;
        box-shadow: none;
    }
    #discuss-comments .discuss-form-textarea::placeholder { color: var(--t5); }
    #discuss-comments .discuss-form-bottom {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1rem;
        background-color: var(--s2);
        border-top: 1px solid var(--bds);
    }
    #discuss-comments .discuss-form-inputs {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
    }
    #discuss-comments .discuss-form-actions {
        display: flex;
        width: 100%;
    }
    #discuss-comments .discuss-form-actions .discuss-btn {
        width: 100%;
        justify-content: center;
    }

    @media (min-width: 640px) {
        #discuss-comments .discuss-form-bottom {
            flex-direction: row;
            align-items: center;
        }
        #discuss-comments .discuss-form-inputs {
            flex-direction: row;
            flex: 1;
        }
        #discuss-comments .discuss-form-actions {
            width: auto;
            margin-left: auto;
        }
        #discuss-comments .discuss-form-actions .discuss-btn {
            width: auto;
        }
    }

    #discuss-comments .discuss-form-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 120px;
    }
    #discuss-comments .discuss-form-input-wrapper svg {
        position: absolute;
        left: 0.75rem;
        width: 1rem;
        height: 1rem;
        color: var(--t4);
        pointer-events: none;
    }
    #discuss-comments .discuss-form-input {
        width: 100%;
        border: 1px solid var(--bd-control);
        border-radius: 6px;
        padding: 0.75rem 0.75rem 0.75rem 2.25rem;
        font-size: 1rem;
        line-height: 1rem;
        background-color: var(--s1);
        color: var(--t1);
        outline: none;
        transition: border-color 120ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 120ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    #discuss-comments .discuss-form-input:focus {
        border-color: var(--focus-ring);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
        outline: none;
    }
    #discuss-comments .discuss-form-input::placeholder { color: var(--t5); }


    /* \u2500\u2500 Nested comment indent \u2500\u2500 */
    #discuss-comments .discuss-nested {
        margin-top: 1rem;
        /* Indentation is now naturally handled by flex gaps and missing left borders */
    }

    /* \u2500\u2500 Thread line (Clickable) \u2500\u2500 */
    #discuss-comments .discuss-collapse-line {
        position: absolute;
        top: calc(var(--avatar-size) + 0.25rem);
        bottom: 0.5rem;
        left: calc(var(--avatar-size) / 2);
        width: 1.5rem;
        transform: translateX(-50%);
        cursor: pointer;
        display: flex;
        justify-content: center;
        z-index: 10;
    }
    #discuss-comments .discuss-collapse-line:hover .discuss-thread-line {
        background-color: var(--b400); /* Highlight on hover */
    }
    #discuss-comments .discuss-thread-line {
        width: 2px;
        height: 100%;
        background-color: var(--bds);
        transition: background-color 150ms;
    }

    /* \u2500\u2500 Action buttons (Reply / Share) \u2500\u2500 */
    #discuss-comments .discuss-action-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.25rem 0.625rem;
        font-size: 0.8125rem;
        font-weight: 500;
        line-height: 1.25rem;
        border-radius: 0.375rem;
        border: 1px solid var(--bd-button);
        background: transparent;
        color: var(--t4);
        cursor: pointer;
        transition: background-color 120ms, color 120ms, border-color 120ms, box-shadow 120ms;
        white-space: nowrap;
        text-decoration: none;
        outline: none;
    }
    #discuss-comments .discuss-action-btn:hover {
        background-color: var(--s3);
        color: var(--t1);
        border-color: var(--bd-control);
    }
    #discuss-comments .discuss-action-btn:focus-visible {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
    }
    #discuss-comments .discuss-action-btn svg {
        width: 13px;
        height: 13px;
        flex-shrink: 0;
    }

    /* \u2500\u2500 Comment Row Target Highlight \u2500\u2500 */
    #discuss-comments .discuss-comment-row:target {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
        border-radius: 0.5rem;
        transition: box-shadow 300ms ease;
    }
`;function E(){if(document.getElementById("discuss-styles"))return;let c=document.createElement("style");c.id="discuss-styles",c.textContent=S,document.head.appendChild(c)}function z(c){let s=parseInt(c.replace("#",""),16);return[s>>16&255,s>>8&255,s&255]}function M(c,s,e){return"#"+[c,s,e].map(t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0")).join("")}function _(c,s,e){c/=255,s/=255,e/=255;let t=Math.max(c,s,e),i=Math.min(c,s,e),a,o,r=(t+i)/2;if(t===i)a=o=0;else{let n=t-i;switch(o=r>.5?n/(2-t-i):n/(t+i),t){case c:a=((s-e)/n+(s<e?6:0))/6;break;case s:a=((e-c)/n+2)/6;break;default:a=((c-s)/n+4)/6}}return[a*360,o,r]}function B(c,s,e){c/=360;let t=(o,r,n)=>(n<0&&(n+=1),n>1&&(n-=1),n<1/6?o+(r-o)*6*n:n<1/2?r:n<2/3?o+(r-o)*(2/3-n)*6:o);if(s===0){let o=Math.round(e*255);return[o,o,o]}let i=e<.5?e*(1+s):e+s-e*s,a=2*e-i;return[t(a,i,c+1/3),t(a,i,c),t(a,i,c-1/3)].map(o=>Math.round(o*255))}function I(c){let[s,e,t]=z(c),[i,a]=_(s,e,t),o={50:.96,100:.93,200:.86,300:.74,400:.6,500:.48,600:.38,700:.3,800:.22,900:.15},r={};for(let[n,d]of Object.entries(o)){let[l,p,f]=B(i,Math.min(a,.85),d);r[n]=M(l,p,f)}return r}var b=class{constructor(s){window.DiscussWidgetInstance=this,this.container=s.container,this.container&&(this.postUrl=s.postUrl||window.location.pathname,this.serverUrl=s.serverUrl||$,this.fetchUrl=s.fetchUrl||`${this.serverUrl}/api/comments?post_url=${encodeURIComponent(this.postUrl)}`,this.config={},this.primaryColor=s.primaryColor||null,this.init=this.init.bind(this),this.render=this.render.bind(this),this.renderComment=this.renderComment.bind(this),this.renderForm=this.renderForm.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.primaryColor&&this.applyTheme(this.primaryColor),this.init())}applyTheme(s){if(!s||!/^#[0-9a-fA-F]{6}$/.test(s))return;let e=I(s),t=this.container;t.style.setProperty("--b50",e[50]),t.style.setProperty("--b100",e[100]),t.style.setProperty("--b200",e[200]),t.style.setProperty("--b300",e[300]),t.style.setProperty("--b400",e[400]),t.style.setProperty("--b500",e[500]),t.style.setProperty("--b600",e[600]),t.style.setProperty("--b700",e[700]),t.style.setProperty("--b800",e[800]),t.style.setProperty("--b900",e[900]),t.style.setProperty("--accent-fg",e[700]),t.style.setProperty("--accent-surface",e[50]),t.style.setProperty("--focus-ring",e[700])}async init(){E(),this.container.innerHTML='<div style="padding:1rem;color:#64748b;font-family:sans-serif">Loading comments\u2026</div>';try{let s=await fetch(`${this.serverUrl}/api/comments/config`);s.ok&&(this.config=await s.json(),this.config.primary_color&&this.applyTheme(this.config.primary_color));let e=await fetch(this.fetchUrl);if(!e.ok)throw new Error("Failed to load comments");let t=await e.json();this.render(t)}catch(s){this.container.innerHTML='<div style="padding:1rem;color:#dc2626;font-family:sans-serif">Error loading comments.</div>',console.error("[Discuss]",s)}}buildTree(s){let e={},t=[];return s.forEach(i=>{i.children=[],e[i.id]=i}),s.forEach(i=>{i.parent_id===0||!e[i.parent_id]?t.push(i):e[i.parent_id].children.push(i)}),t}render(s){let e=this.buildTree(s);this.container.innerHTML=`
            <div class="discuss-font-sans" style="color:var(--t1)">
                <div class="discuss-mb-10">
                    <h3 class="discuss-text-lg discuss-font-semibold" style="margin:0 0 1.25rem;color:var(--t1)">Leave a comment</h3>
                    ${this.renderForm(0)}
                </div>
                ${e.length>0?`
                <div>
                    <h4 class="discuss-text-sm discuss-font-semibold discuss-uppercase discuss-tracking-wide" style="margin:0 0 1.25rem;color:var(--t4)">${e.length} Comment${e.length!==1?"s":""}</h4>
                    <div class="discuss-flex discuss-flex-col discuss-gap-6">
                        ${e.map(i=>this.renderComment(i)).join("")}
                    </div>
                </div>`:""}
            </div>
        `,this.container.querySelectorAll("form[data-parent]").forEach(i=>{i.addEventListener("submit",this.handleSubmit)}),this.container.querySelectorAll(".discuss-reply-tag").forEach(i=>{i.addEventListener("click",a=>{a.preventDefault();let o=a.currentTarget.getAttribute("href"),r=o.startsWith("#")?o.substring(1):o,n=document.getElementById(r);if(n){n.scrollIntoView({behavior:"smooth",block:"center"});let d=n.style.backgroundColor,l=document.documentElement.classList.contains("dark")||document.body.classList.contains("dark");n.style.backgroundColor=l?"#1e293b":"var(--b50)",n.style.borderRadius="8px",setTimeout(()=>{n.style.transition="background-color 500ms ease",n.style.backgroundColor=d,setTimeout(()=>{n.style.transition="",n.style.borderRadius=""},500)},1500)}})}),this.container.querySelectorAll(".discuss-reply-btn").forEach(i=>{i.addEventListener("click",a=>{let o=a.currentTarget.dataset.id,r=document.getElementById(`discuss-reply-form-${o}`);r&&r.classList.toggle("discuss-hidden")})});let t=i=>{let a=i.currentTarget.dataset.id,o=!1,r=document.getElementById(`discuss-collapse-target-${a}`);r&&(o=r.classList.toggle("discuss-hidden"));let n=document.getElementById(`discuss-children-${a}`);n&&(r?n.classList.toggle("discuss-hidden",o):o=n.classList.toggle("discuss-hidden"));let d=document.querySelector(`.discuss-collapse-btn[data-id="${a}"]`);if(d){let l=d.querySelector("svg");l&&(l.style.transform=o?"rotate(-90deg)":"rotate(0deg)")}};this.container.querySelectorAll(".discuss-collapse-btn, .discuss-collapse-line").forEach(i=>{i.addEventListener("click",t)}),this.container.querySelectorAll(".discuss-share-btn").forEach(i=>{i.addEventListener("click",async a=>{let o=a.currentTarget,r=o.dataset.id,n=`${window.location.origin}${window.location.pathname}#comment-${r}`;if(navigator.share){try{await navigator.share({title:document.title,url:n})}catch(d){if(d.name==="AbortError")return;await this.copyToClipboard(o,n)}return}await this.copyToClipboard(o,n)})})}async copyToClipboard(s,e){try{if(navigator.clipboard)await navigator.clipboard.writeText(e);else{window.prompt("Copy link:",e);return}s.innerHTML=`${m.share} <span>Copied!</span>`,setTimeout(()=>{s.innerHTML=`${m.share} <span>Share</span>`},2e3)}catch{window.prompt("Copy link:",e)}}getInitialsColor(s){let e=["#0d4891","#16a34a","#b45309","#1e40af","#dc2626","#6b21a8","#be185d","#0369a1"],t=0;for(let i=0;i<s.length;i++)t=s.charCodeAt(i)+((t<<5)-t);return e[Math.abs(t)%e.length]}getAvatarHtml(s){let e=s.name?s.name.charAt(0).toUpperCase():"U";return`
            <div style="width:100%;height:100%;background-color:${this.getInitialsColor(s.name||"")};display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:0.875rem;position:relative;overflow:hidden;border-radius:inherit;">
                ${e}
                <img src="${s.avatar}" alt="${s.name}" 
                     onerror="this.style.opacity='0';this.style.visibility='hidden'" 
                     onload="this.style.opacity='1';this.style.visibility='visible'" 
                     style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity 0.2s;" />
            </div>
        `}getAdminBadges(s){return""}getAdminTooltip(s){return""}getAdminControls(s){return""}renderComment(s,e,t,i){e=e||0;let a=s.is_pinned?'<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>':"",o=s.is_author?'<span class="discuss-badge discuss-badge-success" style="margin-left:0.375rem">Author</span>':"",r=new Date(s.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),n=this.getAdminBadges(s),d=this.getAdminTooltip(s),l=this.getAdminControls(s),p=t?`<a href="#comment-${i}" class="discuss-reply-tag"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>${t}</a>`:"",f=`
            <button class="discuss-collapse-btn" data-id="${s.id}" aria-label="Collapse" style="background:transparent;border:none;padding:0;cursor:pointer;color:var(--t4);display:inline-flex;align-items:center;margin-left:0.25rem;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 150ms;"><path d="m6 9 6 6 6-6"/></svg>
            </button>
        `,g="";if(s.children.length>0)if(e>=3){let y=s.children.map(C=>this.renderComment(C,3,s.name,s.id)).join("");g=`
                    <div id="discuss-children-${s.id}" style="display:contents">
                        ${y}
                    </div>
                `}else g=`
                    <div class="discuss-nested discuss-flex discuss-flex-col discuss-gap-4" id="discuss-children-${s.id}">
                        ${s.children.map(y=>this.renderComment(y,e+1)).join("")}
                    </div>
                `;let u=s.content;p&&(u.startsWith("<p>")?u=u.replace("<p>",`<p>${p}`):u=p+u);let k=s.children.length>0&&e<3?`
            <div class="discuss-collapse-line" data-id="${s.id}" aria-label="Collapse thread">
                <div class="discuss-thread-line"></div>
            </div>
        `:"",v=`
            <div class="discuss-flex discuss-comment-row" id="comment-${s.id}">
                ${k}
                <span class="discuss-avatar discuss-avatar-md discuss-flex-shrink-0" style="position:relative;z-index:20;overflow:hidden">
                    ${this.getAvatarHtml(s)}
                </span>
                <div class="discuss-comment-content" style="min-width:0">
                    <div style="display:flex;align-items:center;gap:0.375rem;flex-wrap:wrap;margin-bottom:0.375rem">
                        <span style="font-weight:600;font-size:0.875rem;color:var(--t1)">${s.name}</span>
                        ${o}${a}${n}${d}
                        <span style="color:var(--t5);font-size:0.75rem">\xB7</span>
                        <span style="font-size:0.8125rem;color:var(--t4)">${r}</span>
                        ${f}
                    </div>
                    
                    <div id="discuss-collapse-target-${s.id}">
                        <div class="discuss-comment-body">${u}</div>
                        <div class="discuss-flex discuss-gap-2 discuss-items-center" style="flex-wrap:wrap">
                            <button class="discuss-action-btn discuss-reply-btn" data-id="${s.id}">
                                ${m.reply} <span>Reply</span>
                            </button>
                            <button class="discuss-action-btn discuss-share-btn" data-id="${s.id}">
                                ${m.share} <span>Share</span>
                            </button>
                            ${l}
                        </div>

                        <div class="discuss-hidden" id="discuss-reply-form-${s.id}" style="margin-top:1rem">
                            ${this.renderForm(s.id)}
                        </div>

                        ${e<3?g:""}
                    </div>
                </div>
            </div>
        `;return e<3?v:v+g}renderForm(s){let e=this.config.honeypot_question?`<input type="text" name="honeypot_answer_given" placeholder="${this.config.honeypot_question}" style="display:none" tabindex="-1" autocomplete="off">`:"";return`
            <form data-parent="${s}" style="width:100%">
                <div class="discuss-form-container">
                    <textarea name="content" class="discuss-form-textarea" placeholder="Share your thoughts... (*markdown* supported)" required></textarea>
                    
                    <input type="text" name="honeypot_field" style="display:none" tabindex="-1" autocomplete="off">
                    ${e}
                    
                    <div class="discuss-form-bottom">
                        <div class="discuss-form-inputs">
                            <div class="discuss-form-input-wrapper">
                                ${m.user}
                                <input type="text" name="name" class="discuss-form-input" placeholder="Name" required>
                            </div>
                            <div class="discuss-form-input-wrapper">
                                ${m.mail}
                                <input type="email" name="email" class="discuss-form-input" placeholder="Email (optional)">
                            </div>
                        </div>
                        
                        <div class="discuss-form-actions">
                            <button type="submit" class="discuss-btn discuss-btn-primary">
                                ${m.send} Post
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        `}async handleSubmit(s){s.preventDefault();let e=s.target,t=e.dataset.parent,i=e.querySelector('[type="submit"]');i.disabled=!0,i.innerHTML='<span class="discuss-spinner discuss-spinner-sm" style="margin-right:0.5rem"></span> Posting\u2026';let a={name:e.name.value.trim(),email:e.email.value.trim(),content:e.content.value.trim(),post_url:this.postUrl,parent_id:parseInt(t,10),honeypot_field:e.honeypot_field.value,honeypot_answer_given:e.honeypot_answer_given?e.honeypot_answer_given.value:void 0};try{let o=await fetch(`${this.serverUrl}/api/comments`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(a)});if(o.ok){if(e.reset(),parseInt(t,10)!==0){let r=document.getElementById(`discuss-reply-form-${t}`);r&&r.classList.add("discuss-hidden")}this.init()}else{let r=await o.json();alert(r.error||"Failed to post comment.")}}catch(o){console.error("[Discuss]",o),alert("Network error. Please try again.")}finally{i.disabled=!1,i.textContent="Post Comment"}}};window.DiscussWidget=b;var h=document.getElementById("discuss-comments");if(h&&h.dataset.isAdmin!=="true"){let c={container:h};h.dataset.url&&(c.postUrl=h.dataset.url),new b(c)}})();
