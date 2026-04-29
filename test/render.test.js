import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown } from '../src/lib/render.js';

// --- Markdown rendering ---

test('renders bold text', () => {
    assert.match(renderMarkdown('**hello**'), /<strong>hello<\/strong>/);
});

test('renders italic text', () => {
    assert.match(renderMarkdown('_hello_'), /<em>hello<\/em>/);
});

test('renders inline code', () => {
    assert.match(renderMarkdown('`code`'), /<code>code<\/code>/);
});

test('renders code block', () => {
    const out = renderMarkdown('```\nconst x = 1;\n```');
    assert.match(out, /<pre><code>/);
});

test('renders unordered list', () => {
    const out = renderMarkdown('- item one\n- item two');
    assert.match(out, /<ul>/);
    assert.match(out, /<li>item one<\/li>/);
});

test('renders ordered list', () => {
    const out = renderMarkdown('1. first\n2. second');
    assert.match(out, /<ol>/);
    assert.match(out, /<li>first<\/li>/);
});

test('renders blockquote', () => {
    assert.match(renderMarkdown('> quote'), /<blockquote>/);
});

test('renders strikethrough', () => {
    assert.match(renderMarkdown('~~del~~'), /<s>del<\/s>/);
});

test('renders links with nofollow and target blank', () => {
    const out = renderMarkdown('[click](https://example.com)');
    assert.match(out, /rel="nofollow noopener"/);
    assert.match(out, /target="_blank"/);
    assert.match(out, /href="https:\/\/example\.com"/);
});

// --- XSS sanitization ---

test('strips script tags', () => {
    const out = renderMarkdown('<script>alert(1)</script>');
    assert.doesNotMatch(out, /<script>/);
    assert.doesNotMatch(out, /alert\(1\)/);
});

test('strips onclick attributes', () => {
    const out = renderMarkdown('<p onclick="alert(1)">hi</p>');
    assert.doesNotMatch(out, /onclick/);
});

test('strips iframe', () => {
    const out = renderMarkdown('<iframe src="https://evil.com"></iframe>');
    assert.doesNotMatch(out, /<iframe/);
});

test('strips img tags', () => {
    const out = renderMarkdown('<img src="x" onerror="alert(1)">');
    assert.doesNotMatch(out, /<img/);
});

test('strips javascript: href — rendered as plain text, not a live link', () => {
    const out = renderMarkdown('[xss](javascript:alert(1))');
    // markdown-it renders this as a link but sanitize-html strips the href leaving just the text
    assert.doesNotMatch(out, /<a[^>]+href="javascript:/);
});

test('strips style attributes', () => {
    const out = renderMarkdown('<p style="color:red">hi</p>');
    assert.doesNotMatch(out, /style=/);
});

test('strips div tags', () => {
    const out = renderMarkdown('<div>content</div>');
    assert.doesNotMatch(out, /<div/);
});

test('allows abbr with title', () => {
    const out = renderMarkdown('<abbr title="HyperText">HTML</abbr>');
    assert.match(out, /<abbr title="HyperText">HTML<\/abbr>/);
});

test('allows kbd tag', () => {
    const out = renderMarkdown('<kbd>Ctrl+C</kbd>');
    assert.match(out, /<kbd>Ctrl\+C<\/kbd>/);
});

test('empty string returns empty or whitespace', () => {
    const out = renderMarkdown('');
    assert.equal(out.trim(), '');
});

test('plain text is wrapped in paragraph', () => {
    assert.match(renderMarkdown('hello world'), /<p>hello world<\/p>/);
});
