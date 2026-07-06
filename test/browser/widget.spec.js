import { test, expect } from '@playwright/test';
import { mockApi, initWidget, sampleComment } from './helpers.js';

const BASE = '/test/fixtures/base.html';
const AUTO = '/test/fixtures/auto.html';

// ------------------------------------------------------------------
// Rendering
// ------------------------------------------------------------------

test.describe('rendering', () => {
    test('renders the comment form', async ({ page }) => {
        await mockApi(page);
        await page.goto(BASE);
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');

        await expect(page.getByRole('heading', { name: 'Leave a comment' })).toBeVisible();
        await expect(page.getByPlaceholder('Name')).toBeVisible();
        await expect(page.getByPlaceholder('Email (optional)')).toBeVisible();
        await expect(page.getByRole('button', { name: /post/i })).toBeVisible();
    });

    test('renders a custom title', async ({ page }) => {
        await mockApi(page);
        await page.goto(BASE);
        await initWidget(page, { title: 'Join the discussion' });
        await page.waitForSelector('#discuss-comments form');

        await expect(page.getByRole('heading', { name: 'Join the discussion' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Leave a comment' })).toHaveCount(0);
    });

    test('renders empty state with form and no comments', async ({ page }) => {
        await mockApi(page);
        await page.goto(BASE);
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');

        await expect(page.getByRole('heading', { name: 'Leave a comment' })).toBeVisible();
        await expect(page.locator('.discuss-comment-body')).toHaveCount(0);
    });

    test('renders comments returned by the API', async ({ page }) => {
        await page.goto(BASE);
        await mockApi(page, {
            comments: [
                sampleComment({ id: 1, name: 'Alice', content: '<p>Hello from Alice.</p>' }),
                sampleComment({ id: 2, name: 'Bob',   content: '<p>Hello from Bob.</p>' }),
            ],
        });
        await initWidget(page);
        await page.waitForSelector('.discuss-comment-body');

        await expect(page.getByText('Hello from Alice.')).toBeVisible();
        await expect(page.getByText('Hello from Bob.')).toBeVisible();
    });

    test('renders nested replies indented under parent', async ({ page }) => {
        await page.goto(BASE);
        // Widget builds the tree from a flat array using parent_id — pass flat, not nested
        await mockApi(page, {
            comments: [
                sampleComment({ id: 1, name: 'Parent', content: '<p>Top-level.</p>', parent_id: 0 }),
                sampleComment({ id: 2, name: 'Child',  content: '<p>Reply here.</p>', parent_id: 1 }),
            ],
        });
        await initWidget(page);
        await page.waitForSelector('.discuss-comment-body');

        await expect(page.getByText('Top-level.')).toBeVisible();
        await expect(page.getByText('Reply here.')).toBeVisible();

        // Child is rendered inside a .discuss-nested container
        const nested = page.locator('.discuss-nested');
        await expect(nested).toHaveCount(1);
        await expect(nested.getByText('Reply here.')).toBeVisible();
    });

    test('auto-init via script src infers serverUrl and renders', async ({ page }) => {
        await mockApi(page);
        await page.goto(AUTO);
        await page.waitForSelector('#discuss-comments form');

        await expect(page.getByRole('heading', { name: 'Leave a comment' })).toBeVisible();
    });

    test('renders markdown bold and inline code in comment body', async ({ page }) => {
        await page.goto(BASE);
        await mockApi(page, {
            comments: [
                sampleComment({ content: '<p>Say <strong>hello</strong> with <code>greet()</code></p>' }),
            ],
        });
        await initWidget(page);
        await page.waitForSelector('.discuss-comment-body');

        await expect(page.locator('.discuss-comment-body strong')).toContainText('hello');
        await expect(page.locator('.discuss-comment-body code')).toContainText('greet()');
    });
});

// ------------------------------------------------------------------
// Form
// ------------------------------------------------------------------

test.describe('form', () => {
    test.beforeEach(async ({ page }) => {
        await mockApi(page);
        await page.goto(BASE);
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');
    });

    test('name and content are required; email is optional', async ({ page }) => {
        await expect(page.getByPlaceholder('Name')).toHaveAttribute('required', '');
        await expect(page.getByRole('textbox', { name: /content|thoughts/i })).toHaveAttribute('required', '');
        // Email must NOT have required
        const emailAttr = await page.getByPlaceholder('Email (optional)').getAttribute('required');
        expect(emailAttr).toBeNull();
    });

    test('honeypot field is present in DOM but hidden from users', async ({ page }) => {
        const honeypot = page.locator('input[name="honeypot_field"]');
        await expect(honeypot).not.toBeVisible();
        expect(await honeypot.count()).toBe(1);
        // Must have tabindex=-1 so keyboard users cannot reach it
        await expect(honeypot).toHaveAttribute('tabindex', '-1');
    });

    test('placeholder option overrides the default textarea placeholder', async ({ page }) => {
        await page.goto(BASE);
        await mockApi(page);
        await initWidget(page, { placeholder: 'Write something...' });
        await page.waitForSelector('#discuss-comments form');

        await expect(page.locator('textarea[name="content"]'))
            .toHaveAttribute('placeholder', 'Write something...');
    });

    test('honeypot_question config renders a hidden labelled input', async ({ page }) => {
        await page.goto(BASE);
        await mockApi(page, { config: { honeypot_question: 'What colour is the sky?', primary_color: null } });
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');

        const hpInput = page.locator('input[name="honeypot_answer_given"]');
        await expect(hpInput).toHaveCount(1);
        await expect(hpInput).not.toBeVisible();
        await expect(hpInput).toHaveAttribute('placeholder', 'What colour is the sky?');
    });

    test('submit button is disabled while a post is in flight', async ({ page }) => {
        // Delay the POST response so we can observe the disabled state
        await page.route('**/api/comments', async (route) => {
            if (route.request().method() === 'POST') {
                await new Promise((r) => setTimeout(r, 300));
                route.fulfill({ json: { id: 99 } });
            } else {
                route.fulfill({ json: [] });
            }
        });
        await page.goto(BASE);
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');

        await page.getByPlaceholder('Name').fill('Tester');
        await page.getByRole('textbox', { name: /thoughts/i }).fill('Test comment');

        const submitBtn = page.getByRole('button', { name: /post/i });
        await submitBtn.click();

        await expect(submitBtn).toBeDisabled();
    });
});

// ------------------------------------------------------------------
// Interactions
// ------------------------------------------------------------------

test.describe('interactions', () => {
    const COMMENT = sampleComment();

    test.beforeEach(async ({ page }) => {
        await mockApi(page, { comments: [COMMENT] });
        await page.goto(BASE);
        await initWidget(page);
        await page.waitForSelector('.discuss-reply-btn');
    });

    test('reply button shows reply form on first click', async ({ page }) => {
        await expect(page.locator('#discuss-reply-form-1')).toBeHidden();
        await page.locator('.discuss-reply-btn').first().click();
        await expect(page.locator('#discuss-reply-form-1')).toBeVisible();
    });

    test('reply button hides reply form on second click (toggle)', async ({ page }) => {
        await page.locator('.discuss-reply-btn').first().click();
        await expect(page.locator('#discuss-reply-form-1')).toBeVisible();

        await page.locator('.discuss-reply-btn').first().click();
        await expect(page.locator('#discuss-reply-form-1')).toBeHidden();
    });

    test('reply form contains its own submit button', async ({ page }) => {
        await page.locator('.discuss-reply-btn').first().click();
        const replyForm = page.locator('#discuss-reply-form-1');
        await expect(replyForm.getByRole('button', { name: /post/i })).toBeVisible();
    });

    test('collapse button toggles comment body and children visibility', async ({ page }) => {
        const collapseBtn = page.locator('.discuss-collapse-btn').first();
        // Body is visible initially
        await expect(page.locator('.discuss-comment-body').first()).toBeVisible();

        await collapseBtn.click();
        await expect(page.locator('.discuss-comment-body').first()).toBeHidden();

        await collapseBtn.click();
        await expect(page.locator('.discuss-comment-body').first()).toBeVisible();
    });
});

// ------------------------------------------------------------------
// Form submission
// ------------------------------------------------------------------

test.describe('form submission', () => {
    test('successful submit resets the form and re-renders comments', async ({ page }) => {
        // Use stateful mock: initial GET returns [], POST succeeds, next GET returns the comment.
        // This also avoids a hidden reply-form Name input interfering with the fill() selector.
        const postedComment = sampleComment({ id: 99, name: 'Tester', content: '<p>Posted!</p>' });
        let returnComment = false;
        await page.route('**/api/comments*', route => {
            if (route.request().method() === 'GET')
                return route.fulfill({ json: returnComment ? [postedComment] : [] });
            returnComment = true;
            return route.fulfill({ json: { id: 99 } });
        });
        await page.route('**/api/comments/config*', route =>
            route.fulfill({ json: { primary_color: null, honeypot_question: null } })
        );
        await page.goto(BASE);
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');

        await page.getByPlaceholder('Name').fill('Tester');
        await page.getByRole('textbox', { name: /thoughts/i }).fill('Posted!');
        await page.getByRole('button', { name: /post/i }).click();

        // Main form resets after success (form[data-parent="0"] scopes away from hidden reply forms)
        await expect(page.locator('form[data-parent="0"]').getByPlaceholder('Name'))
            .toHaveValue('', { timeout: 3000 });
        // init() re-fetches and renders the posted comment
        await expect(page.getByText('Posted!')).toBeVisible({ timeout: 3000 });
    });

    test('failed submit shows the error message from the API', async ({ page }) => {
        await page.route('**/api/comments*', async route => {
            if (route.request().method() === 'POST')
                return route.fulfill({ status: 422, json: { error: 'Comment too short.' } });
            return route.fulfill({ json: [] });
        });
        await page.route('**/api/comments/config*', route =>
            route.fulfill({ json: { primary_color: null, honeypot_question: null } })
        );
        await page.goto(BASE);
        await initWidget(page);
        await page.waitForSelector('#discuss-comments form');

        let dialogMessage = null;
        page.on('dialog', async dialog => {
            dialogMessage = dialog.message();
            await dialog.dismiss();
        });

        await page.getByPlaceholder('Name').fill('Tester');
        await page.getByRole('textbox', { name: /thoughts/i }).fill('Hi');
        await page.getByRole('button', { name: /post/i }).click();

        await expect.poll(() => dialogMessage, { timeout: 3000 }).toBe('Comment too short.');
    });
});
