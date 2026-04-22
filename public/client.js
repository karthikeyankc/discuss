(function () {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const defaultServerUrl = currentScript ? new URL(currentScript.src).origin : window.location.origin;

    /* INJECT_CSS_START */
    const injectedCss = "#discuss-comments *, #discuss-comments ::before, #discuss-comments ::after {\n    --tw-border-spacing-x: 0;\n    --tw-border-spacing-y: 0;\n    --tw-translate-x: 0;\n    --tw-translate-y: 0;\n    --tw-rotate: 0;\n    --tw-skew-x: 0;\n    --tw-skew-y: 0;\n    --tw-scale-x: 1;\n    --tw-scale-y: 1;\n    --tw-pan-x:  ;\n    --tw-pan-y:  ;\n    --tw-pinch-zoom:  ;\n    --tw-scroll-snap-strictness: proximity;\n    --tw-gradient-from-position:  ;\n    --tw-gradient-via-position:  ;\n    --tw-gradient-to-position:  ;\n    --tw-ordinal:  ;\n    --tw-slashed-zero:  ;\n    --tw-numeric-figure:  ;\n    --tw-numeric-spacing:  ;\n    --tw-numeric-fraction:  ;\n    --tw-ring-inset:  ;\n    --tw-ring-offset-width: 0px;\n    --tw-ring-offset-color: #fff;\n    --tw-ring-color: rgb(59 130 246 / 0.5);\n    --tw-ring-offset-shadow: 0 0 #0000;\n    --tw-ring-shadow: 0 0 #0000;\n    --tw-shadow: 0 0 #0000;\n    --tw-shadow-colored: 0 0 #0000;\n    --tw-blur:  ;\n    --tw-brightness:  ;\n    --tw-contrast:  ;\n    --tw-grayscale:  ;\n    --tw-hue-rotate:  ;\n    --tw-invert:  ;\n    --tw-saturate:  ;\n    --tw-sepia:  ;\n    --tw-drop-shadow:  ;\n    --tw-backdrop-blur:  ;\n    --tw-backdrop-brightness:  ;\n    --tw-backdrop-contrast:  ;\n    --tw-backdrop-grayscale:  ;\n    --tw-backdrop-hue-rotate:  ;\n    --tw-backdrop-invert:  ;\n    --tw-backdrop-opacity:  ;\n    --tw-backdrop-saturate:  ;\n    --tw-backdrop-sepia:  ;\n    --tw-contain-size:  ;\n    --tw-contain-layout:  ;\n    --tw-contain-paint:  ;\n    --tw-contain-style:  ;\n}\n#discuss-comments ::backdrop {\n    --tw-border-spacing-x: 0;\n    --tw-border-spacing-y: 0;\n    --tw-translate-x: 0;\n    --tw-translate-y: 0;\n    --tw-rotate: 0;\n    --tw-skew-x: 0;\n    --tw-skew-y: 0;\n    --tw-scale-x: 1;\n    --tw-scale-y: 1;\n    --tw-pan-x:  ;\n    --tw-pan-y:  ;\n    --tw-pinch-zoom:  ;\n    --tw-scroll-snap-strictness: proximity;\n    --tw-gradient-from-position:  ;\n    --tw-gradient-via-position:  ;\n    --tw-gradient-to-position:  ;\n    --tw-ordinal:  ;\n    --tw-slashed-zero:  ;\n    --tw-numeric-figure:  ;\n    --tw-numeric-spacing:  ;\n    --tw-numeric-fraction:  ;\n    --tw-ring-inset:  ;\n    --tw-ring-offset-width: 0px;\n    --tw-ring-offset-color: #fff;\n    --tw-ring-color: rgb(59 130 246 / 0.5);\n    --tw-ring-offset-shadow: 0 0 #0000;\n    --tw-ring-shadow: 0 0 #0000;\n    --tw-shadow: 0 0 #0000;\n    --tw-shadow-colored: 0 0 #0000;\n    --tw-blur:  ;\n    --tw-brightness:  ;\n    --tw-contrast:  ;\n    --tw-grayscale:  ;\n    --tw-hue-rotate:  ;\n    --tw-invert:  ;\n    --tw-saturate:  ;\n    --tw-sepia:  ;\n    --tw-drop-shadow:  ;\n    --tw-backdrop-blur:  ;\n    --tw-backdrop-brightness:  ;\n    --tw-backdrop-contrast:  ;\n    --tw-backdrop-grayscale:  ;\n    --tw-backdrop-hue-rotate:  ;\n    --tw-backdrop-invert:  ;\n    --tw-backdrop-opacity:  ;\n    --tw-backdrop-saturate:  ;\n    --tw-backdrop-sepia:  ;\n    --tw-contain-size:  ;\n    --tw-contain-layout:  ;\n    --tw-contain-paint:  ;\n    --tw-contain-style:  ;\n}\n  #discuss-comments {\n    /* Brand scale mirrors tailwind.config.js so CSS variable consumers stay in sync\n       when the primary palette is replaced at build time. */\n    --b50: #ecf0f5;\n    --b100: #dee7f3;\n    --b200: #c7d9f0;\n    --b300: #abc9ef;\n    --b400: #86b5ef;\n    --b500: #589bed;\n    --b600: #0d4891;\n    --b700: #10417f;\n    --b800: #143b6c;\n    --b900: #193557;\n\n    /* Semantic light-theme defaults. Apps can override these directly or swap them\n       at runtime when they implement deriveThemeTokens()-style dark mode logic. */\n    --t1: #111827;\n    --t2: #334155;\n    --t3: #475569;\n    --t4: #64748b;\n    --t5: #94a3b8;\n\n    --s1: #ffffff;\n    --s2: #f8fafc;\n    --s3: #f1f5f9;\n\n    --bd: #cbd5e1;\n    --bds: #e2e8f0;\n    --bd-control: #cbd5e1;\n    --bd-button: #e2e8f0;\n    --bd-strong: #94a3b8;\n    --shell-divider: #e2e8f0;\n\n    --accent-fg: #10417f;\n    --accent-surface: #ecf0f5;\n    --focus-ring: #10417f;\n\n    --success-fill: #16a34a;\n    --success-fill-hover: #15803d;\n    --danger-fg: #dc2626;\n    --danger-border: #dc2626;\n\n    --on-primary: #ffffff;\n    --on-success: #ffffff;\n    --on-danger: #ffffff;\n\n    --surface-shadow: 0 0 0 1px rgba(15,23,42,0.04),0 1px 2px -0.5px rgba(15,23,42,0.06),0 2px 4px rgba(15,23,42,0.035);\n    --surface-shadow-md: 0 0 0 1px rgba(15,23,42,0.05),0 4px 8px -2px rgba(15,23,42,0.08),0 8px 16px rgba(15,23,42,0.055);\n    --surface-shadow-lg: 0 0 0 1px rgba(15,23,42,0.05),0 8px 16px -4px rgba(15,23,42,0.10),0 16px 32px rgba(15,23,42,0.07);\n\n    --tooltip-bg: #111827;\n    --tooltip-fg: #ffffff;\n    --toast-bg: #111827;\n    --toast-fg: #ffffff;\n    --modal-backdrop: rgba(0, 0, 0, 0.45);\n  }\n\n  /* Fallback dark token set for the default blue theme. Apps with runtime token\n     derivation can still override these variables after toggling .dark. */\n\n  #discuss-comments *, #discuss-comments *::before, #discuss-comments *::after { box-sizing: border-box; }\n\n  #discuss-comments {\n    /* #f8fafc — neutral-50 cool-tinted canvas. Coheres with the cool blue-gray\n       neutral palette used for text, borders, and surfaces. */\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif;\n    font-size: 1rem;\n    line-height: 1.5rem;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    color: var(--t1);\n    background-color: var(--s2);\n  }\n\n  /* Headings: font sizes now on the 8px grid (32/40/48px for 3xl/4xl/5xl).\n     Line-heights come from tailwind.config fontSize — no leading-* override needed. */\n  #discuss-comments h1 {\n    font-size: 2.25rem;\n    line-height: 2.5rem;\n    font-weight: 600; color: var(--t1);\n}  /* 40px / lh 44px */\n  #discuss-comments h2 {\n    font-size: 1.875rem;\n    line-height: 2.25rem;\n    font-weight: 600; color: var(--t1);\n}  /* 32px / lh 40px */\n  #discuss-comments h3 {\n    font-size: 1.5rem;\n    line-height: 2rem;\n    font-weight: 600; color: var(--t1);\n}  /* 24px / lh 32px */\n  #discuss-comments h4 {\n    font-size: 1.25rem;\n    line-height: 1.75rem;\n    font-weight: 600; color: var(--t1);\n}  /* 20px / lh 28px */\n  #discuss-comments h5 {\n    font-size: 1.125rem;\n    line-height: 1.75rem;\n    font-weight: 500; color: var(--t1);\n}    /* 18px / lh 26px */\n  #discuss-comments h6 {\n    font-size: 1rem;\n    line-height: 1.5rem;\n    font-weight: 500; color: var(--t1);\n}   /* 16px / lh 26px */\n\n  /* WCAG 1.4.8 (AAA): max line length ≤ 80ch. Best practice: 45–75ch.\n     Use max-w-prose (65ch) on containers holding long-form text. */\n  #discuss-comments p {\n    line-height: 1.625;\n}\n\n  #discuss-comments a {\n    color: var(--accent-fg);\n    text-decoration: none;\n  }\n  #discuss-comments a:hover { text-decoration: underline; }\n\n  #discuss-comments strong {\n    font-weight: 600;\n}\n\n  #discuss-comments code {\n    border-radius: 6px;\n    padding-left: 0.375rem;\n    padding-right: 0.375rem;\n    padding-top: 0.125rem;\n    padding-bottom: 0.125rem;\n    font-family: \"SFMono-Regular\", Consolas, \"Liberation Mono\", Menlo, monospace;\n    font-size: 0.75rem;\n    line-height: 1rem;\n    background-color: var(--s3);\n    color: var(--t2);\n}\n\n  #discuss-comments pre {\n    overflow-x: auto;\n    border-radius: 8px;\n    padding: 1rem;\n    font-family: \"SFMono-Regular\", Consolas, \"Liberation Mono\", Menlo, monospace;\n    font-size: 0.75rem;\n    line-height: 1rem;\n    background-color: var(--t1);\n    color: var(--s2);\n}\n  #discuss-comments pre code {\n    border-radius: 0;\n    background-color: transparent;\n    padding: 0px;\n    color: inherit;\n}\n\n  #discuss-comments hr {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n    border-width: 0px;\n    border-top-width: 1px;\n    border-color: var(--bds);\n}\n#discuss-comments .discuss-\\!container {\n    width: 100% !important;\n}\n#discuss-comments .discuss-container {\n    width: 100%;\n}\n@media (min-width: 640px) {\n    #discuss-comments .discuss-\\!container {\n        max-width: 640px !important;\n    }\n    #discuss-comments .discuss-container {\n        max-width: 640px;\n    }\n}\n@media (min-width: 768px) {\n    #discuss-comments .discuss-\\!container {\n        max-width: 768px !important;\n    }\n    #discuss-comments .discuss-container {\n        max-width: 768px;\n    }\n}\n@media (min-width: 1024px) {\n    #discuss-comments .discuss-\\!container {\n        max-width: 1024px !important;\n    }\n    #discuss-comments .discuss-container {\n        max-width: 1024px;\n    }\n}\n@media (min-width: 1280px) {\n    #discuss-comments .discuss-\\!container {\n        max-width: 1280px !important;\n    }\n    #discuss-comments .discuss-container {\n        max-width: 1280px;\n    }\n}\n@media (min-width: 1536px) {\n    #discuss-comments .discuss-\\!container {\n        max-width: 1536px !important;\n    }\n    #discuss-comments .discuss-container {\n        max-width: 1536px;\n    }\n}\n/* ── Button ─────────────────────── */\n/*\n   * Scale from web standards (8px grid, iOS-safe 16px floor):\n   *   sm  → 14px font, 32px height  (py-2    + leading-4)\n   *   md  → 16px font, 40px height  (py-3    + leading-4)  ← default\n   *   lg  → 18px font, 48px height  (py-4    + leading-4)\n   * Inputs share the same md scale so they sit flush side-by-side.\n   */\n#discuss-comments .discuss-btn {\n    display: inline-flex;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n            user-select: none;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    white-space: nowrap;\n    border-radius: 6px;\n    border-width: 1px;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 0.75rem;\n    padding-bottom: 0.75rem;\n    font-size: 1rem;\n    font-weight: 500;\n    line-height: 1rem;\n    transition-property: background-color,border-color,box-shadow,transform;\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transition-duration: 120ms;\n    transition-timing-function: cubic-bezier(0.4,0,0.2,1);\n}\n#discuss-comments .discuss-btn:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n}\n#discuss-comments .discuss-btn:active:not(:disabled) { transform: scale(0.97); transition-duration: 75ms; }\n#discuss-comments .discuss-btn:focus-visible {\n    box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);\n    outline: none;\n  }\n#discuss-comments .discuss-btn svg,\n  #discuss-comments .discuss-btn i[data-lucide] {\n    width: 1em;\n    height: 1em;\n    flex-shrink: 0;\n  }\n#discuss-comments i[data-lucide] { display: inline-flex; }\n/* ── Form ───────────────────────── */\n#discuss-comments .discuss-label {\n    margin-bottom: 0.25rem;\n    display: block;\n    font-size: 0.875rem;\n    line-height: 1.25rem;\n    font-weight: 500;\n    color: var(--t2);\n}\n/* Overline / section group label.\n     0.75rem + neutral-600 = ~5.5:1 vs white, ~5:1 vs #f5f5f5 — passes WCAG AA.\n     0.7rem (11.2px) would fail the WCAG 12px floor — never go below xs (0.75rem). */\n/* ── Label mono — monospace class/token reference label ── */\n/* ── Section title / description ─────────────────────── */\n/* 16px font = iOS auto-zoom safe. py-3 + leading-4 = 40px, flush with .btn default. */\n#discuss-comments .discuss-input {\n    display: block;\n    width: 100%;\n    border-radius: 6px;\n    border-width: 1px;\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n    padding-top: 0.75rem;\n    padding-bottom: 0.75rem;\n    font-size: 1rem;\n    line-height: 1rem;\n    transition-property: border-color,box-shadow;\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transition-duration: 120ms;\n    transition-timing-function: cubic-bezier(0.4,0,0.2,1);\n}\n#discuss-comments .discuss-input:disabled {\n    cursor: not-allowed;\n}\n#discuss-comments .discuss-input {\n    color: var(--t1);\n    background-color: var(--s1);\n    border-color: var(--bd-control);\n  }\n#discuss-comments .discuss-input::-moz-placeholder { color: var(--t5); }\n#discuss-comments .discuss-input::placeholder { color: var(--t5); }\n#discuss-comments .discuss-input:focus,\n  #discuss-comments .discuss-input:focus-visible {\n    border-color: var(--focus-ring);\n    box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);\n    outline: none;\n  }\n#discuss-comments .discuss-input:disabled {\n    background-color: var(--s2);\n    color: var(--t5);\n  }\n#discuss-comments .discuss-textarea {\n    min-height: 80px;\n    resize: vertical;\n}\n/* Animated checkbox — checkmark draws in via stroke-dashoffset */\n/* position:relative is required — .checkbox-input is sr-only (position:absolute) and anchors\n     to the nearest positioned ancestor. Without it the browser scrolls the document to reveal\n     the hidden input on focus, shifting the layout unexpectedly. */\n/* Animated radio — inner dot scales in with spring */\n/* Same position:relative requirement as .checkbox-label — see note above. */\n/* ── Card ───────────────────────── */\n/* shadow-sm = three-layer resting shadow. No border. See CLAUDE.md. */\n/* ── Badge ──────────────────────── */\n/* badge-info uses fixed blue — semantic signal must hold regardless of brand hue */\n/* ── Alert ──────────────────────── */\n#discuss-comments .discuss-alert {\n    display: flex;\n    gap: 0.75rem;\n    border-radius: 8px;\n    border-width: 1px;\n    padding-left: 1rem;\n    padding-right: 1rem;\n    padding-top: 0.75rem;\n    padding-bottom: 0.75rem;\n    font-size: 0.875rem;\n    line-height: 1.25rem;\n}\n/* alert-info uses fixed blue — same reason as badge-info */\n/* ── Table ──────────────────────── */\n/* ── Avatar ─────────────────────── */\n#discuss-comments .discuss-avatar {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    border-radius: 9999px;\n    font-weight: 500;\n    background-color: var(--s3);\n    color: var(--t3);\n}\n/* ── Spinner ────────────────────── */\n/* ── Skeleton ───────────────────── */\n/* ── Divider ────────────────────── */\n/* ── Tooltip (CSS-only) ─────────── */\n/* ── Tabs with sliding indicator ─── */\n/* Single element slides between tabs — set left/width via JS */\n/* ── Dropdown ─────────────────────── */\n/* ── Page layout helpers ─────────── */\n/* ── Composite components ───────── */\n#discuss-comments .discuss-block {\n    display: block;\n}\n#discuss-comments .discuss-flex {\n    display: flex;\n}\n#discuss-comments .discuss-w-full {\n    width: 100%;\n}\n#discuss-comments .discuss-flex-shrink {\n    flex-shrink: 1;\n}\n#discuss-comments .discuss-flex-wrap {\n    flex-wrap: wrap;\n}\n#discuss-comments .discuss-border {\n    border-width: 1px;\n}\n#discuss-comments .discuss-transition {\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transition-duration: 150ms;\n}\n\n/* ═══════════════════════════════════\n   BASE\n═══════════════════════════════════ */\n\n/* ═══════════════════════════════════\n   COMPONENTS\n═══════════════════════════════════ */\n\n/* ── Motion keyframes ─────────────────────────────────── */\n@keyframes checkbox-pop {\n  0%   { transform: scale(0.8); }\n  60%  { transform: scale(1.12); }\n  100% { transform: scale(1); }\n}\n\n#discuss-comments .discuss-dark .badge-info    { background: #1e1b4b; color: #93c5fd; }\n#discuss-comments .discuss-dark .badge-neutral { background: #1e293b; color: #94a3b8; }\n#discuss-comments .discuss-dark .badge-success { background: #14532d; color: #4ade80; }\n#discuss-comments .discuss-dark .badge-warning { background: #451a03; color: #fbbf24; }\n#discuss-comments .discuss-dark .badge-danger  { background: #450a0a; color: #f87171; }\n\n#discuss-comments .discuss-dark .alert-info    { background: #1e1b4b; border-color: #312e81; color: #93c5fd; }\n#discuss-comments .discuss-dark .alert-success { background: #14532d; border-color: #166534; color: #4ade80; }\n#discuss-comments .discuss-dark .alert-warning { background: #451a03; border-color: #78350f; color: #fbbf24; }\n#discuss-comments .discuss-dark .alert-danger  { background: #450a0a; border-color: #7f1d1d; color: #f87171; }\n#discuss-comments .discuss-dark .dropdown-item.danger:hover { background: #450a0a; }\n\n/* ── Accessibility: reduced motion (WCAG 2.3.3 AAA) ─── */\n/* Respect the OS-level prefers-reduced-motion: reduce signal.\n   Kill transitions and slow spinner to near-stop. Skeleton loses pulse\n   (static skeleton is acceptable — content is still indicated). */\n@media (prefers-reduced-motion: reduce) {\n  #discuss-comments *, #discuss-comments *::before, #discuss-comments *::after {\n    animation-duration:       0.01ms !important;\n    animation-iteration-count: 1     !important;\n    transition-duration:       0.01ms !important;\n  }\n}\n";
    /* INJECT_CSS_END */

    // Extra scoped resets + rules that Tailwind's scanner can't detect due to the discuss- prefix
    const cssContent = injectedCss + `
        #discuss-comments { text-align: left; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background-color: transparent; }
        #discuss-comments * { box-sizing: inherit; }
        
        #discuss-comments .em-tip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border-width: 4px; border-style: solid; border-color: #1e293b transparent transparent transparent; }
        #discuss-comments .discuss-badge-warning { background: #fef3c7; color: #b45309; }

        /* ── Visibility utilities (Tailwind purges these because it sees discuss-hidden, not hidden) ── */
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

        /* ── Button variants (Tailwind only generates .btn, not .discuss-btn-primary) ── */
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

        /* ── Responsive Avatar & Thread Spacing ── */
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

        /* ── Comment content column: min-width:0 is required for text to wrap in flex ── */
        #discuss-comments .discuss-comment-content {
            min-width: 0;
            flex: 1;
        }

        /* ── Comment body prose ── */
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

        /* ── Badge (also purged by scanner) ── */
        /* ── Badge — exact DS spec: inline-flex gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full ── */
        #discuss-comments .discuss-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;          /* gap-1 */
            padding: 0.125rem 0.625rem; /* py-0.5 px-2.5 */
            font-size: 0.75rem;    /* text-xs */
            line-height: 1rem;     /* text-xs — critical: without this it inherits 1.5rem from parent */
            font-weight: 500;      /* font-medium */
            border-radius: 9999px; /* rounded-full */
        }
        #discuss-comments .discuss-badge-info    { background: #dbeafe; color: #1e40af; }
        #discuss-comments .discuss-badge-success { background: #dcfce7; color: #15803d; }

        /* ── Reply Tag ── */
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

        /* ── New Comment Form UI ── */
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


        /* ── Nested comment indent ── */
        #discuss-comments .discuss-nested {
            margin-top: 1rem;
            /* Indentation is now naturally handled by flex gaps and missing left borders */
        }

        /* ── Thread line (Clickable) ── */
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

        /* ── Action buttons (Reply / Share) ── */
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

        /* ── Comment Row Target Highlight ── */
        #discuss-comments .discuss-comment-row:target {
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 25%, transparent);
            border-radius: 0.5rem;
            transition: box-shadow 300ms ease;
        }
    `;

    // SVG Icons — exact Lucide paths (reply + forward), stroke-width 2.5 for solid/bold weight
    const ICONS = {
        // Lucide "reply" — https://lucide.dev/icons/reply
        reply: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>`,
        // Lucide "forward" — https://lucide.dev/icons/forward (the curved-right-arrow share icon)
        share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`,
        user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
        send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`
    };

    function injectStyles() {
        if (document.getElementById('discuss-styles')) return;
        const style = document.createElement('style');
        style.id = 'discuss-styles';
        style.textContent = cssContent;
        document.head.appendChild(style);
    }

    window.DiscussWidget = class {
        constructor(options) {
            window.DiscussWidgetInstance = this; // Store global reference for inline handlers
            this.container = options.container;
            if (!this.container) return;
            this.postUrl = options.postUrl || window.location.pathname;
            this.serverUrl = options.serverUrl || defaultServerUrl;
            this.fetchUrl = options.fetchUrl || `${this.serverUrl}/api/comments?post_url=${encodeURIComponent(this.postUrl)}`;
            this.isAdmin = options.isAdmin || false;
            this.config = {};
            
            this.init = this.init.bind(this);
            this.render = this.render.bind(this);
            this.renderComment = this.renderComment.bind(this);
            this.renderForm = this.renderForm.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

            this.init();
        }

        async init() {
            injectStyles();
            this.container.innerHTML = '<div style="padding:1rem;color:#64748b;font-family:sans-serif">Loading comments…</div>';

            try {
                const configRes = await fetch(`${this.serverUrl}/api/comments/config`);
                if (configRes.ok) this.config = await configRes.json();

                const commentsRes = await fetch(this.fetchUrl);
                if (!commentsRes.ok) throw new Error('Failed to load comments');
                const comments = await commentsRes.json();

                this.render(comments);
            } catch (err) {
                this.container.innerHTML = '<div style="padding:1rem;color:#dc2626;font-family:sans-serif">Error loading comments.</div>';
                console.error('[Discuss]', err);
            }
        }

        buildTree(comments) {
            const map = {};
            const roots = [];
            comments.forEach(c => { c.children = []; map[c.id] = c; });
            comments.forEach(c => {
                if (c.parent_id === 0 || !map[c.parent_id]) {
                    roots.push(c);
                } else {
                    map[c.parent_id].children.push(c);
                }
            });
            return roots;
        }

        render(comments) {
            const roots = this.buildTree(comments);

            this.container.innerHTML = `
                <div class="discuss-font-sans" style="color:var(--t1)">
                    <div class="discuss-mb-10">
                        <h3 class="discuss-text-lg discuss-font-semibold" style="margin:0 0 1.25rem;color:var(--t1)">Leave a comment</h3>
                        ${this.renderForm(0)}
                    </div>
                    ${roots.length > 0 ? `
                    <div>
                        <h4 class="discuss-text-sm discuss-font-semibold discuss-uppercase discuss-tracking-wide" style="margin:0 0 1.25rem;color:var(--t4)">${roots.length} Comment${roots.length !== 1 ? 's' : ''}</h4>
                        <div class="discuss-flex discuss-flex-col discuss-gap-6">
                            ${roots.map(c => this.renderComment(c)).join('')}
                        </div>
                    </div>` : ''}
                </div>
            `;

            // Bind events
            this.container.querySelectorAll('form[data-parent]').forEach(form => {
                form.addEventListener('submit', this.handleSubmit);
            });

            this.container.querySelectorAll('.discuss-reply-tag').forEach(tag => {
                tag.addEventListener('click', e => {
                    e.preventDefault();
                    const href = e.currentTarget.getAttribute('href');
                    const targetId = href.startsWith('#') ? href.substring(1) : href;
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        const originalBg = targetEl.style.backgroundColor;
                        const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
                        targetEl.style.backgroundColor = isDark ? '#1e293b' : 'var(--b50)';
                        targetEl.style.borderRadius = '8px';
                        setTimeout(() => {
                            targetEl.style.transition = 'background-color 500ms ease';
                            targetEl.style.backgroundColor = originalBg;
                            setTimeout(() => { targetEl.style.transition = ''; targetEl.style.borderRadius = ''; }, 500);
                        }, 1500);
                    }
                });
            });

            this.container.querySelectorAll('.discuss-reply-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    const id = e.currentTarget.dataset.id;
                    const wrapper = document.getElementById(`discuss-reply-form-${id}`);
                    if (wrapper) wrapper.classList.toggle('discuss-hidden');
                });
            });

            // Add collapse functionality
            const collapseAction = (e) => {
                const id = e.currentTarget.dataset.id;
                let isHidden = false;
                
                const targetDiv = document.getElementById(`discuss-collapse-target-${id}`);
                if (targetDiv) {
                    isHidden = targetDiv.classList.toggle('discuss-hidden');
                }
                
                const childrenDiv = document.getElementById(`discuss-children-${id}`);
                if (childrenDiv) {
                    if (!targetDiv) {
                        isHidden = childrenDiv.classList.toggle('discuss-hidden');
                    } else {
                        childrenDiv.classList.toggle('discuss-hidden', isHidden);
                    }
                }
                
                const btn = document.querySelector(`.discuss-collapse-btn[data-id="${id}"]`);
                if (btn) {
                    const svg = btn.querySelector('svg');
                    if (svg) {
                        svg.style.transform = isHidden ? 'rotate(-90deg)' : 'rotate(0deg)';
                    }
                }
            };

            this.container.querySelectorAll('.discuss-collapse-btn, .discuss-collapse-line').forEach(el => {
                el.addEventListener('click', collapseAction);
            });

            this.container.querySelectorAll('.discuss-share-btn').forEach(btn => {
            btn.addEventListener('click', async e => {
                const shareBtn = e.currentTarget;
                const id = shareBtn.dataset.id;
                const url = `${window.location.origin}${window.location.pathname}#comment-${id}`;

                // Web Share API: works on iOS, Android, macOS Safari/Chrome, Windows Chrome
                if (navigator.share) {
                    try {
                        await navigator.share({ title: document.title, url });
                    } catch (err) {
                        if (err.name === 'AbortError') return; // user cancelled sheet — do nothing
                        // share() threw for another reason — fall through to clipboard
                        await copyToClipboard(shareBtn, url);
                    }
                    return;
                }

                // Desktop fallback: copy to clipboard
                await copyToClipboard(shareBtn, url);
            });
        });

        async function copyToClipboard(btn, url) {
            try {
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(url);
                } else {
                    // Ancient browser / insecure context
                    window.prompt('Copy link:', url);
                    return;
                }
                btn.innerHTML = `${ICONS.share} <span>Copied!</span>`;
                setTimeout(() => { btn.innerHTML = `${ICONS.share} <span>Share</span>`; }, 2000);
            } catch (err) {
                window.prompt('Copy link:', url);
            }
        }
    }

        renderComment(c, depth, replyToName, replyToId) {
            depth = depth || 0;
            const pinBadge = c.is_pinned ? `<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>` : '';
            const authorBadge = c.is_author ? `<span class="discuss-badge discuss-badge-success" style="margin-left:0.375rem">Author</span>` : '';
            const dateStr = new Date(c.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

            const pendingBadge = (this.isAdmin && !c.is_approved) ? `<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>` : '';
            const emailTooltip = (this.isAdmin && c.email) ? `
                <span style="position:relative;display:inline-flex;align-items:center;color:var(--t5);cursor:help;padding:0.125rem;line-height:0;margin-left:0.25rem"
                      onmouseenter="this.querySelector('.em-tip').style.opacity='1';this.querySelector('.em-tip').style.visibility='visible'"
                      onmouseleave="this.querySelector('.em-tip').style.opacity='0';this.querySelector('.em-tip').style.visibility='hidden'">
                    <span style="width:0.875rem;height:0.875rem;pointer-events:none;display:inline-flex">${ICONS.mail}</span>
                    <span class="em-tip" style="opacity:0;visibility:hidden;transition:opacity 120ms;position:absolute;bottom:calc(100% + 5px);left:50%;transform:translateX(-50%);background:#1e293b;color:#f8fafc;font-size:0.6875rem;padding:3px 7px;border-radius:4px;white-space:nowrap;z-index:100;pointer-events:none;line-height:normal">${c.email}</span>
                </span>
            ` : '';

            const replyTag = replyToName ? `<a href="#comment-${replyToId}" class="discuss-reply-tag"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>${replyToName}</a>` : '';

            const chevron = `
                <button class="discuss-collapse-btn" data-id="${c.id}" aria-label="Collapse" style="background:transparent;border:none;padding:0;cursor:pointer;color:var(--t4);display:inline-flex;align-items:center;margin-left:0.25rem;">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 150ms;"><path d="m6 9 6 6 6-6"/></svg>
                </button>
            `;

            let childrenHtml = '';
            if (c.children.length > 0) {
                if (depth >= 3) {
                    const flattenedHtml = c.children.map(child => this.renderComment(child, 3, c.name, c.id)).join('');
                    childrenHtml = `
                        <div id="discuss-children-${c.id}" style="display:contents">
                            ${flattenedHtml}
                        </div>
                    `;
                } else {
                    childrenHtml = `
                        <div class="discuss-nested discuss-flex discuss-flex-col discuss-gap-4" id="discuss-children-${c.id}">
                            ${c.children.map(child => this.renderComment(child, depth + 1)).join('')}
                        </div>
                    `;
                }
            }

            let contentHtml = c.content;
            if (replyTag) {
                if (contentHtml.startsWith('<p>')) {
                    contentHtml = contentHtml.replace('<p>', `<p>${replyTag}`);
                } else {
                    contentHtml = replyTag + contentHtml;
                }
            }

            const threadLine = (c.children.length > 0 && depth < 3) ? `
                <div class="discuss-collapse-line" data-id="${c.id}" aria-label="Collapse thread">
                    <div class="discuss-thread-line"></div>
                </div>
            ` : '';

            let adminControls = '';
            if (this.isAdmin) {
                adminControls = `
                    <div style="width:1px;height:12px;background:var(--bds);margin:0 0.25rem"></div>
                    <button class="discuss-action-btn" ${!c.is_approved ? 'style="color:#16a34a"' : ''} onclick="window.DiscussWidgetInstance.toggleApprove(${c.id}, ${c.is_approved})">
                        ${c.is_approved ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> <span>Unapprove</span>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Approve</span>'}
                    </button>
                    <button class="discuss-action-btn" onclick="window.DiscussWidgetInstance.togglePin(${c.id}, ${c.is_pinned})">
                        ${c.is_pinned ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <span>Unpin</span>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg> <span>Pin</span>'}
                    </button>
                    <button class="discuss-action-btn" style="color:#ef4444" onclick="if(confirm('Delete comment?')) window.DiscussWidgetInstance.deleteComment(${c.id})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        <span>Delete</span>
                    </button>
                `;
            }

            const mainHtml = `
                <div class="discuss-flex discuss-comment-row" id="comment-${c.id}">
                    ${threadLine}
                    <span class="discuss-avatar discuss-avatar-md discuss-flex-shrink-0" style="position:relative;z-index:20;">
                        <img src="${c.avatar}" alt="${c.name}" />
                    </span>
                    <div class="discuss-comment-content" style="min-width:0">
                        <div style="display:flex;align-items:center;gap:0.375rem;flex-wrap:wrap;margin-bottom:0.375rem">
                            <span style="font-weight:600;font-size:0.875rem;color:var(--t1)">${c.name}</span>
                            ${authorBadge}${pinBadge}${pendingBadge}${emailTooltip}
                            <span style="color:var(--t5);font-size:0.75rem">·</span>
                            <span style="font-size:0.8125rem;color:var(--t4)">${dateStr}</span>
                            ${chevron}
                        </div>
                        
                        <div id="discuss-collapse-target-${c.id}">
                            <div class="discuss-comment-body">${contentHtml}</div>
                            <div class="discuss-flex discuss-gap-2 discuss-items-center" style="flex-wrap:wrap">
                                <button class="discuss-action-btn discuss-reply-btn" data-id="${c.id}">
                                    ${ICONS.reply} <span>Reply</span>
                                </button>
                                <button class="discuss-action-btn discuss-share-btn" data-id="${c.id}">
                                    ${ICONS.share} <span>Share</span>
                                </button>
                                ${adminControls}
                            </div>

                            <div class="discuss-hidden" id="discuss-reply-form-${c.id}" style="margin-top:1rem">
                                ${this.renderForm(c.id)}
                            </div>

                            ${depth < 3 ? childrenHtml : ''}
                        </div>
                    </div>
                </div>
            `;

            return depth < 3 ? mainHtml : mainHtml + childrenHtml;
        }

        renderForm(parentId) {
            const hpInput = this.config.honeypot_question
                ? `<input type="text" name="honeypot_answer_given" placeholder="${this.config.honeypot_question}" style="display:none" tabindex="-1" autocomplete="off">`
                : '';

            return `
                <form data-parent="${parentId}" style="width:100%">
                    <div class="discuss-form-container">
                        <textarea name="content" class="discuss-form-textarea" placeholder="Share your thoughts... (*markdown* supported)" required></textarea>
                        
                        <input type="text" name="honeypot_field" style="display:none" tabindex="-1" autocomplete="off">
                        ${hpInput}
                        
                        <div class="discuss-form-bottom">
                            <div class="discuss-form-inputs">
                                <div class="discuss-form-input-wrapper">
                                    ${ICONS.user}
                                    <input type="text" name="name" class="discuss-form-input" placeholder="Name" required>
                                </div>
                                <div class="discuss-form-input-wrapper">
                                    ${ICONS.mail}
                                    <input type="email" name="email" class="discuss-form-input" placeholder="Email (optional)">
                                </div>
                            </div>
                            
                            <div class="discuss-form-actions">
                                <button type="submit" class="discuss-btn discuss-btn-primary">
                                    ${ICONS.send} Post
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            `;
        }

        async handleSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const parentId = form.dataset.parent;
            const btn = form.querySelector('[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<span class="discuss-spinner discuss-spinner-sm" style="margin-right:0.5rem"></span> Posting…';

            const payload = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                content: form.content.value.trim(),
                post_url: this.postUrl,
                parent_id: parseInt(parentId, 10),
                honeypot_field: form.honeypot_field.value,
                honeypot_answer_given: form.honeypot_answer_given ? form.honeypot_answer_given.value : undefined
            };

            try {
                const res = await fetch(`${this.serverUrl}/api/comments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    form.reset();
                    if (parseInt(parentId, 10) !== 0) {
                        const wrapper = document.getElementById(`discuss-reply-form-${parentId}`);
                        if (wrapper) wrapper.classList.add('discuss-hidden');
                    }
                    this.init();
                } else {
                    const err = await res.json();
                    alert(err.error || 'Failed to post comment.');
                }
            } catch (err) {
                console.error('[Discuss]', err);
                alert('Network error. Please try again.');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Post Comment';
            }
        }

        async toggleApprove(id, currentStatus) {
            try {
                const res = await fetch(`/api/admin/comments/${id}/approve`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_approved: currentStatus ? 0 : 1 })
                });
                if (res.ok) {
                    const btn = document.querySelector(`.discuss-action-btn[onclick*="toggleApprove(${id}"]`);
                    if (btn) {
                        const newStatus = currentStatus ? 0 : 1;
                        btn.setAttribute('onclick', `window.DiscussWidgetInstance.toggleApprove(${id}, ${newStatus})`);
                        if (newStatus) {
                            btn.style.color = '';
                            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> <span>Unapprove</span>';
                            const row = document.getElementById(`comment-${id}`);
                            if (row) {
                                const badge = row.querySelector('.discuss-badge-warning');
                                if (badge) badge.remove();
                            }
                        } else {
                            btn.style.color = '#16a34a';
                            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Approve</span>';
                            const row = document.getElementById(`comment-${id}`);
                            if (row) {
                                const authorSpan = row.querySelector('span[style*="font-weight:600"]');
                                if (authorSpan) authorSpan.insertAdjacentHTML('afterend', `<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>`);
                            }
                        }
                    }
                } else alert('Failed to update status');
            } catch (err) { console.error(err); }
        }

        async togglePin(id, currentStatus) {
            try {
                const res = await fetch(`/api/admin/comments/${id}/pin`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_pinned: currentStatus ? 0 : 1 })
                });
                if (res.ok) {
                    const btn = document.querySelector(`.discuss-action-btn[onclick*="togglePin(${id}"]`);
                    if (btn) {
                        const newStatus = currentStatus ? 0 : 1;
                        btn.setAttribute('onclick', `window.DiscussWidgetInstance.togglePin(${id}, ${newStatus})`);
                        if (newStatus) {
                            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <span>Unpin</span>';
                            const row = document.getElementById(`comment-${id}`);
                            if (row) {
                                const authorSpan = row.querySelector('span[style*="font-weight:600"]');
                                if (authorSpan) authorSpan.insertAdjacentHTML('afterend', `<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>`);
                            }
                        } else {
                            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg> <span>Pin</span>';
                            const row = document.getElementById(`comment-${id}`);
                            if (row) {
                                const badge = row.querySelector('.discuss-badge-info');
                                if (badge) badge.remove();
                            }
                        }
                    }
                } else alert('Failed to update pin');
            } catch (err) { console.error(err); }
        }

        async deleteComment(id) {
            try {
                const res = await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    const row = document.getElementById(`comment-${id}`);
                    if (row) {
                        row.style.transition = 'opacity 300ms ease, transform 300ms ease';
                        row.style.opacity = '0';
                        row.style.transform = 'translateY(-10px)';
                        setTimeout(() => row.remove(), 300);
                    }
                } else alert('Failed to delete comment');
            } catch (err) { console.error(err); }
        }
    };

    // Auto-init for public facing sites
    const autoContainer = document.getElementById('discuss-comments');
    if (autoContainer && autoContainer.dataset.isAdmin !== 'true') {
        new window.DiscussWidget({ container: autoContainer });
    }
})();
