import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

// html: true lets commenters use <abbr>, <kbd> etc. directly.
// sanitize-html is the strict XSS gate — only the allowlist below passes through.
const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

const ALLOWED_TAGS = [
    'p', 'br',
    'strong', 'em', 's', 'del', 'ins', 'mark', 'kbd', 'abbr', 'cite', 'sup', 'sub',
    'a',
    'ul', 'ol', 'li',
    'code', 'pre',
    'blockquote',
];

const ALLOWED_ATTRIBUTES = {
    'a':    ['href', 'title', 'rel', 'target'],
    'abbr': ['title'],
    '*':    ['lang'],
};

export function renderMarkdown(raw) {
    const html = md.render(raw);
    return sanitizeHtml(html, {
        allowedTags: ALLOWED_TAGS,
        allowedAttributes: ALLOWED_ATTRIBUTES,
        transformTags: {
            a(tagName, attribs) {
                return {
                    tagName: 'a',
                    attribs: {
                        ...attribs,
                        rel: 'nofollow noopener',
                        target: '_blank',
                    },
                };
            },
        },
    });
}
