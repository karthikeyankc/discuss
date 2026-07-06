/**
 * Shared Playwright helpers for admin UI tests.
 */

// ------------------------------------------------------------------
// Fixture data
// ------------------------------------------------------------------

export const DOMAIN = {
    id: 1,
    domain: 'example.com',
    site_name: 'Example Site',
    primary_color: '#2563eb',
    honeypot_question: '',
    allowed_origins: '',
    blocked_words: '[]',
    smtp_host: '',
    smtp_port: 587,
    smtp_secure: false,
    smtp_user: '',
    smtp_from: '',
    smtp_pass_set: false,
    notify_email: '',
    notify_on_comment: false,
    notify_on_reply: false,
    total_count: 3,
    pending_count: 1,
};

export const STATS = {
    total_comments: 12,
    pending_comments: 3,
    approved_comments: 9,
    domain_count: 2,
};

export function sampleComment(overrides = {}) {
    return {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        content: '<p>A sample comment.</p>',
        content_raw: 'A sample comment.',
        created_at: '2026-07-01T12:00:00.000Z',
        is_approved: true,
        is_pinned: false,
        is_author: false,
        parent_id: null,
        domain: 'example.com',
        post_url: '/blog/post',
        reply_count: 0,
        ...overrides,
    };
}

// ------------------------------------------------------------------
// API mocking
// ------------------------------------------------------------------

/**
 * Register all admin API route mocks. Call before page.goto().
 *
 * opts.authenticated: if false, /api/admin/domains returns 401 (login wall).
 * opts.domain: domain object to return from GET /api/admin/domains/:id.
 * opts.comments: array to return from GET /api/admin/comments.
 * opts.stats: stats object.
 * opts.onPatch: callback(body) called when PATCH /api/admin/domains/:id fires.
 * opts.onCommentPatch: callback(id, body) called when PATCH /api/admin/comments/:id fires.
 * opts.onCommentDelete: callback(id) called when DELETE /api/admin/comments/:id fires.
 * opts.onLogin: callback(body) — if provided, POST /api/admin/login calls it and returns ok.
 */
export async function mockAdminApi(page, opts = {}) {
    const {
        authenticated = true,
        domain = DOMAIN,
        comments = [sampleComment()],
        stats = STATS,
        onPatch = null,
        onCommentPatch = null,
        onCommentDelete = null,
        onLogin = null,
    } = opts;

    // Version + GitHub update check — silence both to keep tests deterministic
    await page.route('**/api/version', route =>
        route.fulfill({ json: { version: '0.5.7' } })
    );
    await page.route('**/api.github.com/**', route =>
        route.fulfill({ json: { tag_name: 'v0.5.6' } })
    );

    // Auth
    await page.route('**/api/admin/login', async route => {
        const body = JSON.parse(route.request().postData() || '{}');
        if (onLogin) {
            onLogin(body);
            return route.fulfill({ json: { username: 'admin' } });
        }
        if (body.password === 'correct') {
            return route.fulfill({ json: { username: 'admin' } });
        }
        return route.fulfill({ status: 401, json: { error: 'Invalid credentials' } });
    });
    await page.route('**/api/admin/logout', route => route.fulfill({ status: 200 }));
    await page.route('**/api/admin/me', route =>
        route.fulfill({ json: { username: 'admin' } })
    );

    // Domains list — controls auth gate
    await page.route('**/api/admin/domains', async route => {
        if (route.request().method() === 'POST') {
            const body = JSON.parse(route.request().postData() || '{}');
            return route.fulfill({ status: 201, json: { id: 99, domain: body.domain, site_name: body.site_name } });
        }
        if (!authenticated) {
            return route.fulfill({ status: 401, json: { error: 'Unauthorized' } });
        }
        return route.fulfill({ json: [domain] });
    });

    // Single domain (settings)
    await page.route(/\/api\/admin\/domains\/\d+$/, async route => {
        const method = route.request().method();
        if (method === 'PATCH') {
            const body = JSON.parse(route.request().postData() || '{}');
            if (onPatch) onPatch(body);
            return route.fulfill({ json: { ...domain, ...body } });
        }
        if (method === 'DELETE') {
            return route.fulfill({ status: 200 });
        }
        return route.fulfill({ json: domain });
    });

    // Stats
    await page.route('**/api/admin/stats', route =>
        route.fulfill({ json: stats })
    );

    // Comments list
    await page.route(/\/api\/admin\/comments(\?.*)?$/, async route => {
        if (route.request().method() === 'GET') {
            return route.fulfill({ json: comments });
        }
        return route.fulfill({ status: 200 });
    });

    // Comment approve
    await page.route(/\/api\/admin\/comments\/(\d+)\/approve$/, async route => {
        return route.fulfill({ status: 200 });
    });

    // Comment pin
    await page.route(/\/api\/admin\/comments\/(\d+)\/pin$/, async route => {
        return route.fulfill({ status: 200 });
    });

    // Single comment PATCH / DELETE
    await page.route(/\/api\/admin\/comments\/\d+$/, async route => {
        const method = route.request().method();
        const id = route.request().url().match(/\/comments\/(\d+)/)?.[1];
        if (method === 'DELETE') {
            if (onCommentDelete) onCommentDelete(id);
            return route.fulfill({ status: 200 });
        }
        if (method === 'PATCH') {
            const body = JSON.parse(route.request().postData() || '{}');
            if (onCommentPatch) onCommentPatch(id, body);
            return route.fulfill({ json: { ...sampleComment(), ...body } });
        }
        return route.fulfill({ status: 200 });
    });

    // Posts list
    await page.route(/\/api\/admin\/domains\/\d+\/posts$/, route =>
        route.fulfill({ json: [] })
    );
}

// ------------------------------------------------------------------
// Navigation helpers
// ------------------------------------------------------------------

/** Navigate to admin, already authenticated (domains API returns 200). */
export async function gotoAdmin(page, opts = {}) {
    await mockAdminApi(page, { authenticated: true, ...opts });
    await page.goto('/admin');
    await page.waitForSelector('#overview-section:not(.hidden)', { timeout: 5000 });
}

/** Navigate to admin login wall (domains API returns 401). */
export async function gotoAdminLogin(page) {
    await mockAdminApi(page, { authenticated: false });
    await page.goto('/admin');
    await page.waitForSelector('#login-section:not(.hidden)', { timeout: 5000 });
}

/** Navigate to the Settings section for domain 1. */
export async function gotoSettings(page, opts = {}) {
    await gotoAdmin(page, opts);
    await page.evaluate(() => {
        app.currentDomainId = 1;
        app.showSection('settings');
    });
    await page.waitForSelector('#settings-section:not(.hidden)', { timeout: 5000 });
}

/** Navigate to the Inbox section. */
export async function gotoInbox(page, opts = {}) {
    await gotoAdmin(page, opts);
    await page.evaluate(() => app.showSection('inbox'));
    await page.waitForSelector('#inbox-section:not(.hidden)', { timeout: 5000 });
}
