import { ICONS } from './icons.js';

const scripts = document.getElementsByTagName('script');
const currentScript = scripts[scripts.length - 1];
const defaultServerUrl = currentScript ? new URL(currentScript.src).origin : window.location.origin;

const injectedCss = typeof INJECTED_CSS_CONTENT !== 'undefined' ? INJECTED_CSS_CONTENT : "";

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

function injectStyles() {
    if (document.getElementById('discuss-styles')) return;
    const style = document.createElement('style');
    style.id = 'discuss-styles';
    style.textContent = cssContent;
    document.head.appendChild(style);
}

export class DiscussWidget {
    constructor(options) {
        window.DiscussWidgetInstance = this;
        this.container = options.container;
        if (!this.container) return;
        this.postUrl = options.postUrl || window.location.pathname;
        this.serverUrl = options.serverUrl || defaultServerUrl;
        this.fetchUrl = options.fetchUrl || `${this.serverUrl}/api/comments?post_url=${encodeURIComponent(this.postUrl)}`;
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

                if (navigator.share) {
                    try {
                        await navigator.share({ title: document.title, url });
                    } catch (err) {
                        if (err.name === 'AbortError') return;
                        await this.copyToClipboard(shareBtn, url);
                    }
                    return;
                }

                await this.copyToClipboard(shareBtn, url);
            });
        });
    }

    async copyToClipboard(btn, url) {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
            } else {
                window.prompt('Copy link:', url);
                return;
            }
            btn.innerHTML = `${ICONS.share} <span>Copied!</span>`;
            setTimeout(() => { btn.innerHTML = `${ICONS.share} <span>Share</span>`; }, 2000);
        } catch (err) {
            window.prompt('Copy link:', url);
        }
    }

    getInitialsColor(name) {
        const colors = [
            '#0d4891', '#16a34a', '#b45309', '#1e40af', 
            '#dc2626', '#6b21a8', '#be185d', '#0369a1'
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    getAvatarHtml(c) {
        const initials = c.name ? c.name.charAt(0).toUpperCase() : 'U';
        const bgColor = this.getInitialsColor(c.name || '');
        return `
            <div style="width:100%;height:100%;background-color:${bgColor};display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:0.875rem;position:relative;overflow:hidden;border-radius:inherit;">
                ${initials}
                <img src="${c.avatar}" alt="${c.name}" 
                     onerror="this.style.opacity='0';this.style.visibility='hidden'" 
                     onload="this.style.opacity='1';this.style.visibility='visible'" 
                     style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity 0.2s;" />
            </div>
        `;
    }

    // Admin Hooks
    getAdminBadges(c) { return ''; }
    getAdminTooltip(c) { return ''; }
    getAdminControls(c) { return ''; }

    renderComment(c, depth, replyToName, replyToId) {
        depth = depth || 0;
        const pinBadge = c.is_pinned ? `<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>` : '';
        const authorBadge = c.is_author ? `<span class="discuss-badge discuss-badge-success" style="margin-left:0.375rem">Author</span>` : '';
        const dateStr = new Date(c.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

        const adminBadges = this.getAdminBadges(c);
        const adminTooltip = this.getAdminTooltip(c);
        const adminControls = this.getAdminControls(c);

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

        const mainHtml = `
            <div class="discuss-flex discuss-comment-row" id="comment-${c.id}">
                ${threadLine}
                <span class="discuss-avatar discuss-avatar-md discuss-flex-shrink-0" style="position:relative;z-index:20;overflow:hidden">
                    ${this.getAvatarHtml(c)}
                </span>
                <div class="discuss-comment-content" style="min-width:0">
                    <div style="display:flex;align-items:center;gap:0.375rem;flex-wrap:wrap;margin-bottom:0.375rem">
                        <span style="font-weight:600;font-size:0.875rem;color:var(--t1)">${c.name}</span>
                        ${authorBadge}${pinBadge}${adminBadges}${adminTooltip}
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
}

window.DiscussWidget = DiscussWidget;

// Auto-init for public facing sites
const autoContainer = document.getElementById('discuss-comments');
if (autoContainer && autoContainer.dataset.isAdmin !== 'true') {
    new DiscussWidget({ container: autoContainer });
}
