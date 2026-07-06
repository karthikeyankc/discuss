import { test, expect } from '@playwright/test';
import {
    mockAdminApi,
    gotoAdmin,
    gotoAdminLogin,
    gotoSettings,
    gotoInbox,
    DOMAIN,
    STATS,
    sampleComment,
} from './adminHelpers.js';

// ------------------------------------------------------------------
// Auth
// ------------------------------------------------------------------

test.describe('auth', () => {
    test('shows login form when not authenticated', async ({ page }) => {
        await gotoAdminLogin(page);
        await expect(page.locator('#login-section')).toBeVisible();
        await expect(page.locator('#app-shell')).toHaveClass(/hidden/);
    });

    test('failed login shows error toast', async ({ page }) => {
        await gotoAdminLogin(page);
        await page.fill('#login-username', 'admin');
        await page.fill('#login-password', 'wrong');
        await page.click('#login-form [type="submit"]');
        await expect(page.locator('.toast-error')).toContainText('Invalid username or password.');
    });

    test('successful login transitions to overview', async ({ page }) => {
        // Start unauthenticated, then make /domains return ok after login
        await mockAdminApi(page, { authenticated: false });
        await page.route('**/api/admin/login', route =>
            route.fulfill({ json: { username: 'admin' } })
        );
        // After login, domains must return something for the redirect to work
        let loginDone = false;
        await page.route('**/api/admin/domains', async route => {
            if (route.request().method() !== 'GET') return route.continue();
            if (loginDone) return route.fulfill({ json: [DOMAIN] });
            return route.fulfill({ status: 401 });
        });

        await page.goto('/admin');
        await page.waitForSelector('#login-section:not(.hidden)');

        loginDone = true;
        await page.fill('#login-username', 'admin');
        await page.fill('#login-password', 'correct');
        await page.click('#login-form [type="submit"]');

        await expect(page.locator('#overview-section')).not.toHaveClass(/hidden/, { timeout: 5000 });
    });

    test('logout returns to login screen', async ({ page }) => {
        await gotoAdmin(page);
        await page.evaluate(() => app.logout());
        await expect(page.locator('#login-section')).not.toHaveClass(/hidden/, { timeout: 3000 });
    });
});

// ------------------------------------------------------------------
// Overview
// ------------------------------------------------------------------

test.describe('overview', () => {
    test('displays stats from the API', async ({ page }) => {
        await gotoAdmin(page, { stats: STATS });
        await expect(page.locator('#stat-total')).toHaveText(String(STATS.total_comments));
        await expect(page.locator('#stat-pending')).toHaveText(String(STATS.pending_comments));
        await expect(page.locator('#stat-approved')).toHaveText(String(STATS.approved_comments));
        await expect(page.locator('#stat-domains')).toHaveText(String(STATS.domain_count));
    });

    test('shows pending CTA when there are pending comments', async ({ page }) => {
        await gotoAdmin(page, { stats: { ...STATS, pending_comments: 5 } });
        await expect(page.locator('#overview-cta')).not.toHaveClass(/hidden/);
        await expect(page.locator('#overview-cta-text')).toContainText('5 comments pending');
    });

    test('hides pending CTA when no comments are pending', async ({ page }) => {
        await gotoAdmin(page, { stats: { ...STATS, pending_comments: 0 } });
        await expect(page.locator('#overview-cta')).toHaveClass(/hidden/);
    });
});

// ------------------------------------------------------------------
// Inbox
// ------------------------------------------------------------------

test.describe('inbox', () => {
    test('renders comment list', async ({ page }) => {
        const comment = sampleComment({ name: 'Bob', content: '<p>Hello world.</p>' });
        await gotoInbox(page, { comments: [comment] });
        await expect(page.locator('.inbox-item')).toHaveCount(1);
        await expect(page.locator('.inbox-item')).toContainText('Bob');
    });

    test('approve button sends PATCH and shows success toast', async ({ page }) => {
        let approveUrl = null;
        await gotoInbox(page, { comments: [sampleComment({ id: 7, is_approved: false })] });
        await page.route(/\/api\/admin\/comments\/7\/approve$/, route => {
            approveUrl = route.request().url();
            return route.fulfill({ status: 200 });
        });
        await page.waitForSelector('.inbox-item');

        await page.evaluate(() => app.inboxSetApproval(7, true));
        await expect.poll(() => approveUrl).toContain('/comments/7/approve');
        await expect(page.locator('.toast-success')).toContainText('Comment approved.');
    });

    test('delete shows confirm dialog and sends DELETE on confirm', async ({ page }) => {
        let deleted = false;
        await gotoInbox(page, { comments: [sampleComment({ id: 5 })] });

        // After delete, inboxDeleteOne calls loadInbox() — make that re-fetch return empty
        // so we can assert the item is removed from the UI.
        await page.route(/\/api\/admin\/comments(\?.*)?$/, route =>
            route.fulfill({ json: [] })
        );
        await page.route(/\/api\/admin\/comments\/5$/, route => {
            if (route.request().method() === 'DELETE') deleted = true;
            return route.fulfill({ status: 200 });
        });

        // Fire without awaiting — inboxDeleteOne waits for the modal click; awaiting
        // here would deadlock the test.
        page.evaluate(() => { void app.inboxDeleteOne(5); });
        await expect(page.locator('#confirm-modal')).toBeVisible({ timeout: 3000 });
        await page.click('#confirm-modal-ok');
        await expect.poll(() => deleted).toBe(true);
        await expect(page.locator('.toast-success')).toContainText('Comment deleted.');
        await expect(page.locator('.inbox-item')).toHaveCount(0);
    });

    test('cancel delete does not send DELETE', async ({ page }) => {
        let deleted = false;
        await gotoInbox(page, { comments: [sampleComment({ id: 5 })] });
        await page.route(/\/api\/admin\/comments\/5$/, route => {
            if (route.request().method() === 'DELETE') deleted = true;
            return route.fulfill({ status: 200 });
        });

        page.evaluate(() => { void app.inboxDeleteOne(5); });
        await expect(page.locator('#confirm-modal')).toBeVisible({ timeout: 3000 });
        await page.click('#confirm-modal-cancel');
        await expect(page.locator('#confirm-modal')).toBeHidden();
        expect(deleted).toBe(false);
    });

    test('pin button sends PATCH with is_pinned 1 for unpinned comment', async ({ page }) => {
        let pinBody = null;
        await gotoInbox(page, { comments: [sampleComment({ id: 3, is_pinned: false })] });
        await page.route(/\/api\/admin\/comments\/3\/pin$/, route => {
            pinBody = JSON.parse(route.request().postData() || '{}');
            return route.fulfill({ status: 200 });
        });

        await page.evaluate(() => app.inboxTogglePin(3, false));
        await expect.poll(() => pinBody?.is_pinned).toBe(1);
    });

    test('unpin sends PATCH with is_pinned 0 for pinned comment', async ({ page }) => {
        let pinBody = null;
        await gotoInbox(page, { comments: [sampleComment({ id: 3, is_pinned: true })] });
        await page.route(/\/api\/admin\/comments\/3\/pin$/, route => {
            pinBody = JSON.parse(route.request().postData() || '{}');
            return route.fulfill({ status: 200 });
        });

        await page.evaluate(() => app.inboxTogglePin(3, true));
        await expect.poll(() => pinBody?.is_pinned).toBe(0);
    });

    test('edit form toggle shows and hides the inline edit panel', async ({ page }) => {
        await gotoInbox(page, { comments: [sampleComment({ id: 1 })] });
        await page.waitForSelector('.inbox-item');

        await page.evaluate(() => app.inboxToggleEdit(1));
        await expect(page.locator('#inbox-edit-form-1')).toBeVisible();

        await page.evaluate(() => app.inboxToggleEdit(1));
        await expect(page.locator('#inbox-edit-form-1')).toBeHidden();
    });

    test('save edit sends PATCH with updated name, email, content', async ({ page }) => {
        let patchBody = null;
        await gotoInbox(page, {
            comments: [sampleComment({ id: 1 })],
            onCommentPatch: (_, body) => { patchBody = body; },
        });
        await page.waitForSelector('.inbox-item');

        await page.evaluate(() => app.inboxToggleEdit(1));
        await page.fill('#inbox-edit-name-1', 'Edited Name');
        await page.fill('#inbox-edit-email-1', 'edited@example.com');
        await page.fill('#inbox-edit-content-1', 'Edited content');
        await page.evaluate(() => app.inboxSaveEdit(1));

        await expect(page.locator('.toast')).toBeVisible();
        expect(patchBody?.name).toBe('Edited Name');
        expect(patchBody?.email).toBe('edited@example.com');
        expect(patchBody?.content).toBe('Edited content');
    });

    test('bulk approve sends approve PATCH for all selected comments', async ({ page }) => {
        const approved = [];
        await gotoInbox(page, {
            comments: [sampleComment({ id: 1 }), sampleComment({ id: 2, name: 'Bob' })],
        });
        await page.route(/\/api\/admin\/comments\/(\d+)\/approve$/, route => {
            const id = route.request().url().match(/\/comments\/(\d+)/)?.[1];
            approved.push(id);
            return route.fulfill({ status: 200 });
        });

        page.evaluate(() => {
            app.selectedComments = new Set([1, 2]);
            void app.handleBulkAction('approve');
        });
        await expect(page.locator('#confirm-modal')).toBeVisible({ timeout: 3000 });
        await page.click('#confirm-modal-ok');
        await expect.poll(() => approved.length).toBe(2);
        expect(approved.sort()).toEqual(['1', '2'].sort());
    });

    test('bulk delete sends DELETE for all selected comments', async ({ page }) => {
        const deleted = [];
        await gotoInbox(page, {
            comments: [sampleComment({ id: 1 }), sampleComment({ id: 2, name: 'Bob' })],
        });
        await page.route(/\/api\/admin\/comments\/(\d+)$/, route => {
            if (route.request().method() === 'DELETE') {
                const id = route.request().url().match(/\/comments\/(\d+)/)?.[1];
                deleted.push(id);
            }
            return route.fulfill({ status: 200 });
        });

        page.evaluate(() => {
            app.selectedComments = new Set([1, 2]);
            void app.handleBulkAction('delete');
        });
        await expect(page.locator('#confirm-modal')).toBeVisible({ timeout: 3000 });
        await page.click('#confirm-modal-ok');
        await expect.poll(() => deleted.length).toBe(2);
        expect(deleted.sort()).toEqual(['1', '2'].sort());
    });

    test('switching to Pending tab fetches comments with status=pending', async ({ page }) => {
        let lastStatus = null;
        await gotoInbox(page);
        await page.route(/\/api\/admin\/comments[?]/, route => {
            const url = new URL(route.request().url());
            lastStatus = url.searchParams.get('status');
            return route.fulfill({ json: [] });
        });

        await page.click('[data-status="pending"]');
        await expect.poll(() => lastStatus, { timeout: 3000 }).toBe('pending');
        await expect(page.locator('[data-status="pending"]')).toHaveClass(/active/);
    });
});

// ------------------------------------------------------------------
// Domain settings — color
// ------------------------------------------------------------------

test.describe('settings — color', () => {
    test('loads saved primary_color into both inputs', async ({ page }) => {
        await gotoSettings(page, { domain: { ...DOMAIN, primary_color: '#d5848e' } });
        await page.evaluate(() => app.switchSettingsTab('appearance'));
        await expect(page.locator('#settings-color-hex')).toHaveValue('#d5848e');
        await expect(page.locator('#settings-color-picker')).toHaveValue('#d5848e');
    });

    test('typing in color picker syncs the hex field', async ({ page }) => {
        await gotoSettings(page);
        await page.evaluate(() => {
            app.switchSettingsTab('appearance');
            app.onColorPickerInput('#ff0000');
        });
        await expect(page.locator('#settings-color-hex')).toHaveValue('#ff0000');
    });

    test('hex input without # normalises the field value', async ({ page }) => {
        await gotoSettings(page);
        await page.evaluate(() => app.switchSettingsTab('appearance'));
        await page.fill('#settings-color-hex', '2563eb');
        await page.dispatchEvent('#settings-color-hex', 'input');
        await expect(page.locator('#settings-color-hex')).toHaveValue('#2563eb');
    });

    test('hex input with # leaves the field value unchanged', async ({ page }) => {
        await gotoSettings(page);
        await page.evaluate(() => app.switchSettingsTab('appearance'));
        await page.fill('#settings-color-hex', '#2563eb');
        await page.dispatchEvent('#settings-color-hex', 'input');
        await expect(page.locator('#settings-color-hex')).toHaveValue('#2563eb');
    });

    test('hex without # is saved with # prepended', async ({ page }) => {
        let patchBody = null;
        await gotoSettings(page, { onPatch: body => { patchBody = body; } });
        await page.evaluate(() => app.switchSettingsTab('appearance'));

        await page.fill('#settings-color-hex', 'd5848e');
        await page.dispatchEvent('#settings-color-hex', 'input');
        await page.click('#settings-form [type="submit"]');

        await expect(page.locator('.toast')).toBeVisible();
        expect(patchBody?.primary_color).toBe('#d5848e');
    });

    test('valid hex with # saves primary_color correctly', async ({ page }) => {
        let patchBody = null;
        await gotoSettings(page, { onPatch: body => { patchBody = body; } });
        await page.evaluate(() => app.switchSettingsTab('appearance'));

        await page.fill('#settings-color-hex', '#ff5733');
        await page.dispatchEvent('#settings-color-hex', 'input');
        await page.click('#settings-form [type="submit"]');

        await expect(page.locator('.toast')).toBeVisible();
        expect(patchBody?.primary_color).toBe('#ff5733');
    });

    test('invalid hex sends null as primary_color', async ({ page }) => {
        let patchBody = null;
        await gotoSettings(page, { onPatch: body => { patchBody = body; } });

        // Bypass the input handler to set an invalid raw value
        await page.evaluate(() => {
            document.getElementById('settings-color-hex').value = 'notacolor';
        });
        await page.click('#settings-form [type="submit"]');

        await expect(page.locator('.toast')).toBeVisible();
        expect(patchBody?.primary_color).toBeNull();
    });

    test('color preview updates when hex is typed', async ({ page }) => {
        await gotoSettings(page);
        await page.evaluate(() => app.switchSettingsTab('appearance'));
        await page.fill('#settings-color-hex', '#ff0000');
        await page.dispatchEvent('#settings-color-hex', 'input');
        const bg = await page.evaluate(() =>
            document.getElementById('settings-color-preview').style.background
        );
        expect(bg).toBe('rgb(255, 0, 0)');
    });

    test('a11y indicators appear after valid hex is entered', async ({ page }) => {
        await gotoSettings(page);
        await page.evaluate(() => app.switchSettingsTab('appearance'));
        await page.fill('#settings-color-hex', '#000000');
        await page.dispatchEvent('#settings-color-hex', 'input');
        await expect(page.locator('#settings-a11y')).not.toHaveCSS('display', 'none');
    });
});

// ------------------------------------------------------------------
// Domain settings — general fields
// ------------------------------------------------------------------

test.describe('settings — general', () => {
    test('loads domain name and site name into form', async ({ page }) => {
        await gotoSettings(page, {
            domain: { ...DOMAIN, domain: 'mysite.com', site_name: 'My Site' },
        });
        await expect(page.locator('#settings-domain')).toHaveValue('mysite.com');
        await expect(page.locator('#settings-site-name')).toHaveValue('My Site');
    });

    test('save sends updated site name in PATCH body', async ({ page }) => {
        let patchBody = null;
        await gotoSettings(page, { onPatch: body => { patchBody = body; } });

        await page.fill('#settings-site-name', 'Updated Name');
        await page.click('#settings-form [type="submit"]');

        await expect(page.locator('.toast')).toBeVisible();
        expect(patchBody?.site_name).toBe('Updated Name');
    });

    test('save sends honeypot_question in PATCH body', async ({ page }) => {
        let patchBody = null;
        await gotoSettings(page, { onPatch: body => { patchBody = body; } });
        await page.evaluate(() => app.switchSettingsTab('spam'));

        await page.fill('#settings-hq', 'What is 2 + 2?');
        await page.click('#settings-form [type="submit"]');

        await expect(page.locator('.toast')).toBeVisible();
        expect(patchBody?.honeypot_question).toBe('What is 2 + 2?');
    });

    test('save sends allowed_origins in PATCH body', async ({ page }) => {
        let patchBody = null;
        await gotoSettings(page, { onPatch: body => { patchBody = body; } });

        await page.fill('#settings-allowed-origins', 'http://localhost:3000');
        await page.click('#settings-form [type="submit"]');

        await expect(page.locator('.toast')).toBeVisible();
        expect(patchBody?.allowed_origins).toBe('http://localhost:3000');
    });

    test('shows success toast on save', async ({ page }) => {
        await gotoSettings(page);
        await page.click('#settings-form [type="submit"]');
        await expect(page.locator('.toast-success')).toBeVisible();
    });
});

// ------------------------------------------------------------------
// Domain list
// ------------------------------------------------------------------

test.describe('domains', () => {
    test('renders domain list', async ({ page }) => {
        await gotoAdmin(page, {
            domain: { ...DOMAIN, domain: 'myblog.com', site_name: 'My Blog' },
        });
        await page.evaluate(() => app.showSection('domains'));
        await page.waitForSelector('#domains-section:not(.hidden)');
        await expect(page.locator('#domains-tbody')).toContainText('myblog.com');
    });

    test('add domain form submits with domain and site_name', async ({ page }) => {
        let posted = null;
        await mockAdminApi(page);
        await page.route('**/api/admin/domains', async route => {
            if (route.request().method() === 'POST') {
                posted = JSON.parse(route.request().postData() || '{}');
                return route.fulfill({ status: 201, json: { id: 99, ...posted } });
            }
            return route.fulfill({ json: [DOMAIN] });
        });

        await page.goto('/admin');
        await page.waitForSelector('#overview-section:not(.hidden)');
        await page.evaluate(() => app.showSection('domains'));
        await page.waitForSelector('#domains-section:not(.hidden)');

        // Reveal the add-domain panel before filling the form
        await page.evaluate(() => app.showAddDomainForm());
        await page.fill('#domain-name', 'newsite.com');
        await page.fill('#domain-site-name', 'New Site');
        await page.click('#add-domain-form [type="submit"]');

        await expect(page.locator('.toast')).toBeVisible();
        expect(posted?.domain).toBe('newsite.com');
        expect(posted?.site_name).toBe('New Site');
    });

    test('settings button navigates to settings section for that domain', async ({ page }) => {
        await gotoAdmin(page);
        await page.evaluate(() => app.showSection('domains'));
        await page.waitForSelector('#domains-section:not(.hidden)');

        await page.evaluate(() => {
            app.currentDomainId = 1;
            app.showSection('settings');
        });
        await page.waitForSelector('#settings-section:not(.hidden)');
        await expect(page.locator('#settings-section')).not.toHaveClass(/hidden/);
    });
});

// ------------------------------------------------------------------
// Search
// ------------------------------------------------------------------

test.describe('search', () => {
    test('search returns and renders results', async ({ page }) => {
        const result = sampleComment({ id: 10, name: 'SearchResult', content: '<p>Found it.</p>' });
        await gotoInbox(page);
        await page.route(/\/api\/admin\/search[?]/, route =>
            route.fulfill({ json: [result] })
        );

        await page.fill('#inbox-search', 'SearchResult');
        await expect(page.locator('.inbox-item')).toContainText('SearchResult', { timeout: 2000 });
    });

    test('search with no results shows empty state', async ({ page }) => {
        await gotoInbox(page);
        await page.route(/\/api\/admin\/search[?]/, route =>
            route.fulfill({ json: [] })
        );

        await page.fill('#inbox-search', 'noresults');
        await expect(page.locator('#inbox-list')).toContainText('No results for', { timeout: 2000 });
    });

    test('short query (<2 chars) does not trigger a search request', async ({ page }) => {
        await gotoInbox(page);

        // Resolve true if a search request fires within 500 ms, false if it times out.
        const searchFired = page.waitForRequest(/\/api\/admin\/search[?]/, { timeout: 500 })
            .then(() => true)
            .catch(() => false);

        await page.fill('#inbox-search', 'a');
        expect(await searchFired).toBe(false);
    });

    test('search API failure shows error message', async ({ page }) => {
        await gotoInbox(page);
        await page.route(/\/api\/admin\/search[?]/, route =>
            route.fulfill({ status: 500 })
        );

        await page.fill('#inbox-search', 'brokenquery');
        await expect(page.locator('#inbox-list')).toContainText('Search failed', { timeout: 2000 });
    });
});
