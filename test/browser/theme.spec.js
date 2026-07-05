import { test, expect } from '@playwright/test';
import {
    mockApi, initWidget, sampleComment,
    getInlineVar, toggleDarkClassAndWaitForComputedVar,
} from './helpers.js';

const BASE = '/test/fixtures/base.html';
const AUTO = '/test/fixtures/auto.html';

// ------------------------------------------------------------------
// primaryColor option
// ------------------------------------------------------------------

test.describe('primaryColor option', () => {
    test.beforeEach(async ({ page }) => {
        await mockApi(page);
        await page.goto(BASE);
    });

    test('hex value sets all ten palette variables on the container', async ({ page }) => {
        await initWidget(page, { primaryColor: '#d5848e' });

        for (const stop of ['--brand-50','--brand-100','--brand-200','--brand-300','--brand-400',
                            '--brand-500','--brand-600','--brand-700','--brand-800','--brand-900']) {
            const val = await getInlineVar(page, stop);
            expect(val, `${stop} should be a hex colour`).toMatch(/^#[0-9a-fA-F]{6}$/);
        }
    });

    test('per-widget color takes priority over server config', async ({ page }) => {
        // Override config mock for this test only
        await page.route('**/api/comments/config*', route =>
            route.fulfill({ json: { primary_color: '#1d4ed8', honeypot_question: null } })
        );

        await initWidget(page, { primaryColor: '#d5848e' });

        // Value is set synchronously in the constructor before init() fires
        const b600BeforeResponse = await getInlineVar(page, '--brand-600');

        // Wait for the server response to be processed
        await page.waitForSelector('#discuss-comments form');
        const b600After = await getInlineVar(page, '--brand-600');

        // Server config must not have overwritten the per-widget colour
        expect(b600After).toBe(b600BeforeResponse);

        // Verify the server-only colour actually differs (sanity check)
        await page.goto(BASE);
        await page.route('**/api/comments/config*', route =>
            route.fulfill({ json: { primary_color: '#1d4ed8', honeypot_question: null } })
        );
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');
        const b600ServerOnly = await getInlineVar(page, '--brand-600');

        expect(b600BeforeResponse).not.toBe(b600ServerOnly);
    });

    test('server config color applies when no per-widget override', async ({ page }) => {
        await page.route('**/api/comments/config*', route =>
            route.fulfill({ json: { primary_color: '#16a34a', honeypot_question: null } })
        );
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');

        const b600Green = await getInlineVar(page, '--brand-600');
        expect(b600Green).toMatch(/^#[0-9a-fA-F]{6}$/);

        // Confirm a different colour produces a different palette
        await page.goto(BASE);
        await page.route('**/api/comments/config*', route =>
            route.fulfill({ json: { primary_color: '#dc2626', honeypot_question: null } })
        );
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');

        expect(await getInlineVar(page, '--brand-600')).not.toBe(b600Green);
    });

    test('CSS variable resolves to the same palette as the equivalent hex', async ({ page }) => {
        await page.addStyleTag({ content: ':root { --brand: #d5848e; }' });

        // Baseline: direct hex
        await initWidget(page, { primaryColor: '#d5848e' });
        const directB600 = await getInlineVar(page, '--brand-600');

        // Reload and resolve via CSS variable
        await page.goto(BASE);
        await mockApi(page);
        await page.addStyleTag({ content: ':root { --brand: #d5848e; }' });
        await initWidget(page, { primaryColor: 'var(--brand)' });

        expect(await getInlineVar(page, '--brand-600')).toBe(directB600);
    });

    test('hsl() color resolves to a valid hex palette', async ({ page }) => {
        await initWidget(page, { primaryColor: 'hsl(350, 50%, 68%)' });
        expect(await getInlineVar(page, '--brand-600')).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    test('oklch() color resolves to a valid hex palette', async ({ page }) => {
        await initWidget(page, { primaryColor: 'oklch(0.65 0.1 355)' });
        expect(await getInlineVar(page, '--brand-600')).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    test('rgb() color resolves to a valid hex palette', async ({ page }) => {
        await initWidget(page, { primaryColor: 'rgb(213, 132, 142)' });
        expect(await getInlineVar(page, '--brand-600')).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    test('unknown color format sets no palette variables', async ({ page }) => {
        await initWidget(page, { primaryColor: 'not-a-color' });
        expect(await getInlineVar(page, '--brand-600')).toBe('');
    });
});

// ------------------------------------------------------------------
// Dark mode — darkSelector option
// ------------------------------------------------------------------

test.describe('darkSelector option', () => {
    test.beforeEach(async ({ page }) => {
        await mockApi(page);
        await page.goto(BASE);
    });

    test('injected dark tokens change when the selector matches', async ({ page }) => {
        await initWidget(page, { darkSelector: 'html.dark' });
        await page.waitForSelector('#discuss-comments form');

        const t1Light = await page.evaluate(() =>
            getComputedStyle(document.getElementById('discuss-comments'))
                .getPropertyValue('--text-primary').trim()
        );
        expect(t1Light).not.toBe('');

        const t1Dark = await toggleDarkClassAndWaitForComputedVar(page, {
            className: 'dark',
            varName: '--text-primary',
            previousValue: t1Light,
        });

        expect(t1Dark).not.toBe(t1Light);
    });

    test('CSS variable primaryColor re-derives palette on dark toggle', async ({ page }) => {
        await page.addStyleTag({ content: ':root { --brand: #d5848e; } html.dark { --brand: #93c5fd; }' });
        await initWidget(page, { primaryColor: 'var(--brand)', darkSelector: 'html.dark' });

        const b600Light = await getInlineVar(page, '--brand-600');

        // Wait for the MutationObserver re-derivation, not a fixed timeout
        await page.evaluate(() => document.documentElement.classList.add('dark'));
        await page.waitForFunction(
            (prev) => document.getElementById('discuss-comments').style.getPropertyValue('--brand-600') !== prev,
            b600Light
        );

        const b600Dark = await getInlineVar(page, '--brand-600');
        expect(b600Dark).not.toBe(b600Light);
        expect(b600Dark).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    test('data-dark-selector attribute activates dark tokens on auto-init', async ({ page }) => {
        await page.route('**/test/fixtures/auto.html', route =>
            route.fulfill({
                contentType: 'text/html',
                body: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="/public/client.css">
</head>
<body>
  <div id="discuss-comments" data-dark-selector="html.dark"></div>
  <script src="/public/client.js"></script>
</body>
</html>`,
            })
        );

        await page.goto(AUTO);
        await page.waitForSelector('#discuss-comments form');

        const t1Light = await page.evaluate(() =>
            getComputedStyle(document.getElementById('discuss-comments'))
                .getPropertyValue('--text-primary').trim()
        );

        const t1Dark = await toggleDarkClassAndWaitForComputedVar(page, {
            className: 'dark',
            varName: '--text-primary',
            previousValue: t1Light,
        });

        expect(t1Dark).not.toBe(t1Light);
    });

    test('darkSelector using attribute instead of class', async ({ page }) => {
        await initWidget(page, { darkSelector: 'html[data-theme="dark"]' });
        await page.waitForSelector('#discuss-comments form');

        const t1Light = await page.evaluate(() =>
            getComputedStyle(document.getElementById('discuss-comments'))
                .getPropertyValue('--text-primary').trim()
        );

        // Toggle via attribute — NOT a class — verifying generic selector support
        await page.evaluate(() =>
            document.documentElement.setAttribute('data-theme', 'dark')
        );

        await page.waitForFunction(
            (prev) =>
                getComputedStyle(document.getElementById('discuss-comments'))
                    .getPropertyValue('--text-primary').trim() !== prev,
            t1Light
        );

        const t1Dark = await page.evaluate(() =>
            getComputedStyle(document.getElementById('discuss-comments'))
                .getPropertyValue('--text-primary').trim()
        );

        expect(t1Dark).not.toBe(t1Light);
    });
});

// ------------------------------------------------------------------
// Semantic token hierarchy
// ------------------------------------------------------------------

test.describe('semantic token hierarchy', () => {
    const COMMENT = sampleComment();

    test.beforeEach(async ({ page }) => {
        await mockApi(page, { comments: [COMMENT] });
        await page.goto(BASE);
        await initWidget(page);
        await page.waitForSelector('.discuss-comment-body');
    });

    test('commenter name has full primary contrast (--text-primary)', async ({ page }) => {
        const [nameColor, titleColor] = await page.evaluate(() => {
            const name = document.querySelector('.discuss-comment-content span[style*="color"]');
            const title = document.querySelector('#discuss-comments h3');
            return [getComputedStyle(name).color, getComputedStyle(title).color];
        });
        expect(nameColor).toBe(titleColor);
    });

    test('comment body is stepped back from name (--text-secondary vs --text-primary)', async ({ page }) => {
        const [nameColor, bodyColor] = await page.evaluate(() => {
            const name = document.querySelector('.discuss-comment-content span[style*="color"]');
            const body = document.querySelector('.discuss-comment-body');
            return [getComputedStyle(name).color, getComputedStyle(body).color];
        });
        expect(nameColor).not.toBe(bodyColor);
    });

    test('code block keeps dark background in dark mode', async ({ page }) => {
        // Re-init with code block content and darkSelector
        await mockApi(page, {
            comments: [sampleComment({ content: '<pre><code>const x = 1;</code></pre>' })],
        });
        await page.goto(BASE);
        await initWidget(page, { darkSelector: 'html.dark' });
        await page.waitForSelector('.discuss-comment-body pre');

        const t1Light = await page.evaluate(() =>
            getComputedStyle(document.getElementById('discuss-comments'))
                .getPropertyValue('--text-primary').trim()
        );
        await toggleDarkClassAndWaitForComputedVar(page, {
            className: 'dark', varName: '--text-primary', previousValue: t1Light,
        });

        const bgColor = await page.evaluate(() =>
            getComputedStyle(document.querySelector('.discuss-comment-body pre')).backgroundColor
        );
        // The pre-fix bug produced near-white (~rgb(248,250,252)); must now be dark
        const [r, g, b] = bgColor.match(/[\d.]+/g).map(Number);
        expect(r < 80 && g < 80 && b < 80).toBe(true);
    });
});
