/**
 * build-client-css.cjs
 * Produces public/client.css for the embeddable widget:
 *
 *   Default mode (no env vars):
 *     Reads the already-compiled public/client.css (committed to the repo),
 *     strips admin-shell component classes, and appends src/client/widget.css.
 *     Does NOT require the ken-design-system package.
 *
 *   Full rebuild mode (FULL_BUILD=1):
 *     Re-runs the full Tailwind + PostCSS pipeline from src/design-system/client.css.
 *     Requires ken-design-system to be installed locally (npm link or local path dep).
 *     Use this when upgrading the design system tokens or base CSS reset.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const designSystemPath = path.join(ROOT, 'src/design-system/client.css');
const widgetPath       = path.join(ROOT, 'src/client/widget.css');
const outputPath       = path.join(ROOT, 'public/client.css');

// Sentinel that marks the boundary between design-system CSS and widget CSS.
// Lets us re-run the script idempotently without double-appending.
const WIDGET_SENTINEL = '/* ── Widget component styles (src/client/widget.css) ── */';

// Rename the design-system's internal shorthand tokens to explicit semantic names.
// Longest patterns first so shorter ones don't partially match longer ones (e.g. --bd before --bds).
const TOKEN_RENAMES = [
    ['--bd-control', '--border-control'],
    ['--bd-button',  '--border-button'],
    ['--bd-strong',  '--border-strong'],
    ['--bds',        '--border-subtle'],
    ['--bd',         '--border-default'],
    ['--t1',  '--text-primary'],
    ['--t2',  '--text-secondary'],
    ['--t3',  '--text-tertiary'],
    ['--t4',  '--text-muted'],
    ['--t5',  '--text-subtle'],
    ['--s1',  '--surface-base'],
    ['--s2',  '--surface-inset'],
    ['--s3',  '--surface-overlay'],
    ['--b900', '--brand-900'],
    ['--b800', '--brand-800'],
    ['--b700', '--brand-700'],
    ['--b600', '--brand-600'],
    ['--b500', '--brand-500'],
    ['--b400', '--brand-400'],
    ['--b300', '--brand-300'],
    ['--b200', '--brand-200'],
    ['--b100', '--brand-100'],
    ['--b50',  '--brand-50'],
];

function renameDesignTokens(css) {
    let result = css;
    for (const [from, to] of TOKEN_RENAMES) result = result.replaceAll(from, to);
    return result;
}

// Admin-shell class FAMILIES — any selector that contains one of these strings
// as a class name is admin-only and should be stripped from the widget bundle.
const ADMIN_FAMILIES = [
    'discuss-navbar',
    'discuss-stat-card',
    'discuss-breadcrumb',
    'discuss-app-sidebar',
    'discuss-page-container',
];

// Admin-shell classes that require an EXACT match (not a prefix),
// to avoid colliding with widget classes like .discuss-section-title.
const ADMIN_EXACT = ['.discuss-section', '.discuss-row'];

function isAdminSelector(selector) {
    const inner = selector.replace(/^#discuss-comments\s*/, '');
    // Remove any class that belongs to an admin-only family (covers -child variants too)
    if (ADMIN_FAMILIES.some(f => inner.includes('.' + f))) return true;
    // Remove exact admin-only classes (avoid false-positives like .discuss-section-title)
    return ADMIN_EXACT.some(cls => {
        const idx = inner.indexOf(cls);
        if (idx === -1) return false;
        const next = inner[idx + cls.length];
        return !next || /^[:, {]/.test(next);
    });
}

function stripAdminShell(css) {
    const postcss = require('postcss');
    const root = postcss.parse(css);
    root.walk(node => {
        if (node.type === 'rule') {
            const selectors = node.selectors || [node.selector];
            if (selectors.some(isAdminSelector)) node.remove();
        }
    });
    return root.toResult().css;
}

function buildOutput(designSystemCss) {
    const widget   = fs.readFileSync(widgetPath, 'utf8');
    const stripped = renameDesignTokens(stripAdminShell(designSystemCss));
    return stripped + '\n\n' + WIDGET_SENTINEL + '\n' + widget;
}

// ── Full rebuild (requires ken-design-system) ──────────────────────────────
if (process.env.FULL_BUILD === '1') {
    const postcss        = require('postcss');
    const tailwindcss    = require('@tailwindcss/postcss');
    const autoprefixer   = require('autoprefixer');
    const prefixSelector = require('postcss-prefix-selector');

    function stripAdminPlugin() {
        return {
            postcssPlugin: 'strip-admin-components',
            Rule(rule) {
                if (rule.selectors && rule.selectors.some(isAdminSelector)) rule.remove();
            },
        };
    }
    stripAdminPlugin.postcss = true;

    const input = fs.readFileSync(designSystemPath, 'utf8');

    postcss([
        tailwindcss(),
        autoprefixer(),
        prefixSelector({
            prefix: '#discuss-comments',
            transform(prefix, selector) {
                if (selector.includes('#discuss-comments')) return selector;
                if (['html', 'body', ':root'].includes(selector)) return '#discuss-comments';
                if (selector.startsWith('.')) {
                    const cls = selector.slice(1);
                    const finalCls = cls.startsWith('discuss-') ? cls : 'discuss-' + cls;
                    return `${prefix} .${finalCls}`;
                }
                return `${prefix} ${selector}`;
            },
        }),
        stripAdminPlugin(),
    ])
        .process(input, { from: designSystemPath, to: outputPath })
        .then(result => {
            const widget   = fs.readFileSync(widgetPath, 'utf8');
            const combined = renameDesignTokens(result.css) + '\n\n' + WIDGET_SENTINEL + '\n' + widget;
            fs.writeFileSync(outputPath, combined);
            const kb = (combined.length / 1024).toFixed(1);
            console.log(`✓ client.css rebuilt from source — ${kb} KB`);
        })
        .catch(err => {
            console.error('✗ CSS build failed:', err.message || err);
            process.exit(1);
        });

} else {
    // ── Default: strip existing compiled CSS + append widget.css ────────────
    if (!fs.existsSync(outputPath)) {
        console.error('✗ public/client.css not found. Run with FULL_BUILD=1 to compile from source.');
        process.exit(1);
    }

    const current = fs.readFileSync(outputPath, 'utf8');

    // If the sentinel is present, use only the design-system portion as the base
    // so we can re-run this script idempotently.
    const sentinelIdx = current.indexOf(WIDGET_SENTINEL);
    const base = sentinelIdx >= 0 ? current.slice(0, sentinelIdx).trim() : current;

    const combined = buildOutput(base);
    fs.writeFileSync(outputPath, combined);

    const origKb  = (current.length / 1024).toFixed(1);
    const finalKb = (combined.length / 1024).toFixed(1);
    console.log(`✓ client.css processed — ${origKb} KB → ${finalKb} KB (admin-shell stripped, widget styles appended)`);
}
