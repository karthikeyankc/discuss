/**
 * Shared Playwright helpers for browser tests.
 *
 * All helpers are pure functions that take `page` as the first argument so
 * tests stay readable without a class-based Page Object — the widget is simple
 * enough that a function-based approach is the right level of abstraction.
 */

// ------------------------------------------------------------------
// Network mocking
// ------------------------------------------------------------------

/**
 * Register API route mocks before page navigation.
 * Call this before page.goto() so that the widget's init() fetch is caught.
 */
export function mockApi(page, { config = {}, comments = [] } = {}) {
    return Promise.all([
        page.route('**/api/comments/config*', route =>
            route.fulfill({
                json: { primary_color: null, honeypot_question: null, ...config },
            })
        ),
        page.route('**/api/comments*', (route) => {
            if (route.request().method() === 'GET') {
                route.fulfill({ json: comments });
            } else {
                route.fulfill({ json: { id: 99, ...comments[0] } });
            }
        }),
    ]);
}

// ------------------------------------------------------------------
// Widget initialisation
// ------------------------------------------------------------------

/**
 * Initialise the widget manually in a fixture page that has data-is-admin="true".
 * Options are serialised to the browser context via page.evaluate(), so they
 * must be JSON-serialisable (no functions).
 */
export async function initWidget(page, opts = {}) {
    await page.evaluate((options) => {
        const el = document.getElementById('discuss-comments');
        el.removeAttribute('data-is-admin');
        new window.DiscussWidget({ container: el, ...options });
    }, opts);
}

// ------------------------------------------------------------------
// Fixture data
// ------------------------------------------------------------------

/**
 * Return a single well-formed comment object accepted by the mock API.
 * Pass overrides to customise individual fields.
 */
export function sampleComment(overrides = {}) {
    return {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        content: '<p>A sample comment.</p>',
        created_at: '2026-07-01T12:00:00.000Z',
        approved: true,
        parent_id: null,
        children: [],
        ...overrides,
    };
}

// ------------------------------------------------------------------
// CSS variable helpers
// ------------------------------------------------------------------

/** Read an inline CSS variable set by applyTheme() on the widget container. */
export function getInlineVar(page, name) {
    return page.evaluate(
        (n) => document.getElementById('discuss-comments').style.getPropertyValue(n),
        name
    );
}

/**
 * Toggle a dark-mode class/attribute on <html> and wait until the given inline
 * CSS variable actually changes value — no fixed sleeps.
 *
 * For CSS-cascade-only changes (e.g. --text-primary from an injected <style>), use
 * waitForComputedVarChange() instead.
 */
export async function toggleDarkAndWaitForVar(page, { selector, attribute, varName, previousValue }) {
    if (attribute) {
        await page.evaluate(
            ({ sel, attr }) => document.querySelector(sel).setAttribute(attr, 'true'),
            { sel: selector, attr: attribute }
        );
    } else {
        await page.evaluate(
            (cls) => document.documentElement.classList.add(cls),
            selector.replace(/^[^.]*\./, '')  // strip leading element selector, get class name
        );
    }

    await page.waitForFunction(
        ({ varN, prev }) =>
            document.getElementById('discuss-comments').style.getPropertyValue(varN) !== prev,
        { varN: varName, prev: previousValue }
    );

    return getInlineVar(page, varName);
}

/**
 * Toggle dark mode via class and wait until a computed CSS variable changes.
 * Used for CSS-cascade changes (injected <style> tag) rather than inline styles.
 */
export async function toggleDarkClassAndWaitForComputedVar(page, { className = 'dark', varName, previousValue }) {
    await page.evaluate((cls) => document.documentElement.classList.add(cls), className);

    await page.waitForFunction(
        ({ varN, prev }) =>
            getComputedStyle(document.getElementById('discuss-comments'))
                .getPropertyValue(varN)
                .trim() !== prev,
        { varN: varName, prev: previousValue }
    );

    return page.evaluate(
        (varN) =>
            getComputedStyle(document.getElementById('discuss-comments'))
                .getPropertyValue(varN)
                .trim(),
        varName
    );
}
