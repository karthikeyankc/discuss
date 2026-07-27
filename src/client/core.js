import { ICONS } from './icons.js';

const currentScript = document.currentScript;
const defaultServerUrl = currentScript ? new URL(currentScript.src).origin : window.location.origin;

// Convert hex (#rrggbb) to [r, g, b] 0–255
function hexToRgb(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Convert [r,g,b] to hex string
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}

// Convert [r,g,b] to [h 0-360, s 0-1, l 0-1]
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            default: h = ((r - g) / d + 4) / 6;
        }
    }
    return [h * 360, s, l];
}

function hslToRgb(h, s, l) {
    h /= 360;
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };
    if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return [hue2rgb(p, q, h + 1/3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1/3)].map(v => Math.round(v * 255));
}

// Resolve any CSS color value to #rrggbb, or null if unrecognised.
// Accepts: #rrggbb, #rgb, rgb(), hsl(), oklch(), var(--foo), --foo
function resolveColor(value, el) {
    if (!value) return null;
    value = value.trim();

    // CSS variable: var(--foo) or bare --foo
    // Apply to a temp element and read back the computed color so the browser
    // resolves light-dark(), relative oklch(), and any other complex syntax.
    if (value.startsWith('var(') || value.startsWith('--')) {
        const prop = value.startsWith('var(')
            ? value.slice(4, -1).split(',')[0].trim()
            : value;
        const tmp = document.createElement('span');
        tmp.style.cssText = 'position:fixed;left:-9999px;top:-9999px;color:var(' + prop + ')';
        el.appendChild(tmp);
        const computed = getComputedStyle(tmp).color;
        el.removeChild(tmp);
        return computed ? resolveColor(computed, el) : null;
    }

    // #rrggbb
    if (/^#[0-9a-fA-F]{6}$/.test(value)) return value;

    // #rgb shorthand → expand
    if (/^#[0-9a-fA-F]{3}$/.test(value)) {
        const [, r, g, b] = value.match(/^#(.)(.)(.)$/);
        return `#${r}${r}${g}${g}${b}${b}`;
    }

    // rgb(r, g, b) or rgb(r g b)
    const rgbM = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    if (rgbM) return rgbToHex(+rgbM[1], +rgbM[2], +rgbM[3]);

    // hsl(h, s%, l%) or hsl(h s% l%)
    const hslM = value.match(/^hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);
    if (hslM) {
        const [r, g, b] = hslToRgb(+hslM[1], +hslM[2] / 100, +hslM[3] / 100);
        return rgbToHex(r, g, b);
    }

    // oklch(L C H) — L is 0–1 or percentage, H is degrees
    const oklchM = value.match(/^oklch\(\s*([\d.]+%?)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    if (oklchM) {
        let L = parseFloat(oklchM[1]);
        if (oklchM[1].includes('%')) L /= 100;
        const C = parseFloat(oklchM[2]);
        const H = parseFloat(oklchM[3]) * Math.PI / 180;
        const a = C * Math.cos(H), b_ = C * Math.sin(H);
        const l_ = L + 0.3963377774 * a + 0.2158037573 * b_;
        const m_ = L - 0.1055613458 * a - 0.0638541728 * b_;
        const s_ = L - 0.0894841775 * a - 1.2914855480 * b_;
        const l3 = l_ ** 3, m3 = m_ ** 3, s3 = s_ ** 3;
        const rL =  4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
        const gL = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
        const bL = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;
        const gamma = c => c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
        return rgbToHex(
            Math.round(Math.max(0, Math.min(1, gamma(rL))) * 255),
            Math.round(Math.max(0, Math.min(1, gamma(gL))) * 255),
            Math.round(Math.max(0, Math.min(1, gamma(bL))) * 255)
        );
    }

    return null;
}

// Derive a 9-stop scale (50→900) from a single brand hex
function deriveColorScale(hex) {
    const [r, g, b] = hexToRgb(hex);
    const [h, s] = rgbToHsl(r, g, b);
    // lightness targets per stop
    const stops = { 50: 0.96, 100: 0.93, 200: 0.86, 300: 0.74, 400: 0.60, 500: 0.48, 600: 0.38, 700: 0.30, 800: 0.22, 900: 0.15 };
    const result = {};
    for (const [stop, l] of Object.entries(stops)) {
        const [cr, cg, cb] = hslToRgb(h, Math.min(s, 0.85), l);
        result[stop] = rgbToHex(cr, cg, cb);
    }
    return result;
}

export class DiscussWidget {
    constructor(options) {
        window.DiscussWidgetInstance = this;
        this.container = options.container;
        if (!this.container) return;
        this.postUrl = options.postUrl
            || this.container.dataset.url
            || window.location.pathname;
        this.serverUrl = options.serverUrl || defaultServerUrl;
        this.fetchUrl = options.fetchUrl || `${this.serverUrl}/api/comments?post_url=${encodeURIComponent(this.postUrl)}`;
        this.configUrl = options.configUrl || `${this.serverUrl}/api/comments/config`;
        this.config = {};
        this.primaryColor = options.primaryColor || null;
        this.domainId = options.domainId || null;
        this.title = options.title ?? 'Leave a comment';
        this.placeholder = options.placeholder ?? 'Share your thoughts... (*markdown* supported)';
        this.darkSelector = options.darkSelector || null;
        this.icons = {
            name:   options.icons?.name   !== undefined ? options.icons.name   : ICONS.user,
            email:  options.icons?.email  !== undefined ? options.icons.email  : ICONS.mail,
            submit: options.icons?.submit !== undefined ? options.icons.submit : ICONS.send,
        };

        this.editTokens = new Map();
        this._rawContent = new Map();

        this.init = this.init.bind(this);
        this.render = this.render.bind(this);
        this.renderComment = this.renderComment.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // Apply embed-snippet colour immediately so there's no flash
        if (this.primaryColor) this.applyTheme(this.primaryColor);

        this.watchPrimaryColor();
        this.init();
    }

    applyTheme(value) {
        const hex = resolveColor(value, this.container);
        if (!hex) return;
        const scale = deriveColorScale(hex);
        const el = this.container;
        el.style.setProperty('--brand-50',  scale[50]);
        el.style.setProperty('--brand-100', scale[100]);
        el.style.setProperty('--brand-200', scale[200]);
        el.style.setProperty('--brand-300', scale[300]);
        el.style.setProperty('--brand-400', scale[400]);
        el.style.setProperty('--brand-500', scale[500]);
        el.style.setProperty('--brand-600', scale[600]);
        el.style.setProperty('--brand-700', scale[700]);
        el.style.setProperty('--brand-800', scale[800]);
        el.style.setProperty('--brand-900', scale[900]);
        el.style.setProperty('--accent-fg',      scale[700]);
        el.style.setProperty('--accent-surface',  scale[50]);
        el.style.setProperty('--focus-ring',      scale[700]);
    }

    watchPrimaryColor() {
        if (!this.primaryColor || !this.darkSelector) return;
        const val = this.primaryColor.trim();
        if (!val.startsWith('var(') && !val.startsWith('--')) return;
        const reapply = () => this.applyTheme(this.primaryColor);
        const observe = (el) => {
            if (el) new MutationObserver(reapply).observe(el, { attributes: true, attributeFilter: ['class'] });
        };
        observe(document.documentElement);
        observe(document.body);
    }

    injectDarkStyles() {
        if (!this.darkSelector) return;
        const id = 'discuss-dark-style';
        if (document.getElementById(id)) return;
        const style = document.createElement('style');
        style.id = id;
        style.textContent = `${this.darkSelector} #discuss-comments {
            --text-primary: #f8fafc; --text-secondary: #e2e8f0; --text-tertiary: #cbd5e1; --text-muted: #94a3b8; --text-subtle: #64748b;
            --surface-base: #111827; --surface-inset: #0a1120; --surface-overlay: #1e293b;
            --border-default: #475569; --border-subtle: #334155; --border-control: #475569; --border-button: #334155; --border-strong: #94a3b8;
            --accent-fg: #93c5fd;
            --accent-surface: color-mix(in srgb, #1e40af 32%, #111827);
            --focus-ring: #93c5fd;
        }
        ${this.darkSelector} #discuss-comments .discuss-comment-body pre {
            background: var(--surface-base);
            color: var(--text-secondary);
        }`;
        document.head.appendChild(style);
    }

    async init() {
        this.injectDarkStyles();
        this.container.innerHTML = '<div style="padding:1rem;color:#64748b;font-family:inherit">Loading comments…</div>';

        try {
            const configRes = await fetch(this.configUrl);
            if (configRes.ok) {
                this.config = await configRes.json();
                // Server colour is the fallback; per-widget primaryColor takes priority
                if (this.config.primary_color && !this.primaryColor) this.applyTheme(this.config.primary_color);
            }

            const commentsRes = await fetch(this.fetchUrl);
            if (!commentsRes.ok) throw new Error('Failed to load comments');
            const comments = await commentsRes.json();

            this.render(comments);
        } catch (err) {
            this.container.innerHTML = '<div style="padding:1rem;color:#dc2626;font-family:inherit">Error loading comments.</div>';
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
        comments.forEach(c => { if (c.content_raw) this._rawContent.set(c.id, c.content_raw); });
        const roots = this.buildTree(comments);

        this.container.innerHTML = `
            <div class="discuss-font-sans" style="color:var(--text-primary)">
                <div class="discuss-mb-10">
                    <h3 class="discuss-text-lg discuss-font-semibold" style="margin:0 0 1.25rem;color:var(--text-primary)">${this.title}</h3>
                    ${this.renderForm(0)}
                </div>
                ${roots.length > 0 ? `
                <div>
                    <h4 class="discuss-text-sm discuss-font-semibold discuss-uppercase discuss-tracking-wide" style="margin:0 0 1.25rem;color:var(--text-tertiary)">${roots.length} Comment${roots.length !== 1 ? 's' : ''}</h4>
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
                    const isDark = this.darkSelector ? !!document.querySelector(this.darkSelector) : false;
                    targetEl.style.backgroundColor = isDark ? 'var(--accent-surface)' : 'var(--brand-50)';
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

        this.container.querySelectorAll('.discuss-edit-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = parseInt(e.currentTarget.dataset.id, 10);
                this._startInlineEdit(id);
            });
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

    // Edit Hooks
    getEditButton(c) {
        if (!this.editTokens.has(c.id)) return '';
        return `<button class="discuss-action-btn discuss-edit-btn" data-id="${c.id}">${ICONS.edit} <span>Edit</span></button>`;
    }

    _startInlineEdit(id) {
        const collapseTarget = document.getElementById(`discuss-collapse-target-${id}`);
        if (!collapseTarget) return;
        const body = collapseTarget.querySelector('.discuss-comment-body');
        const actionsRow = collapseTarget.querySelector('.discuss-flex.discuss-gap-2');
        if (!body || !actionsRow) return;

        const originalHtml = body.innerHTML;
        const raw = this._rawContent.get(id) || '';

        // Reuse form CSS — same structure as renderForm(), content-only (no name/email)
        const formDiv = document.createElement('div');
        formDiv.className = 'discuss-form-container';

        const textarea = document.createElement('textarea');
        textarea.className = 'discuss-form-textarea';
        textarea.value = raw;

        const bottom = document.createElement('div');
        bottom.className = 'discuss-form-bottom';
        bottom.style.justifyContent = 'flex-end';

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'discuss-form-actions';

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'discuss-action-btn';
        cancelBtn.textContent = 'Cancel';

        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.className = 'discuss-btn discuss-btn-primary';
        saveBtn.textContent = 'Save';

        actionsDiv.appendChild(cancelBtn);
        actionsDiv.appendChild(saveBtn);
        bottom.appendChild(actionsDiv);
        formDiv.appendChild(textarea);
        formDiv.appendChild(bottom);

        body.innerHTML = '';
        body.appendChild(formDiv);
        actionsRow.style.display = 'none';

        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);

        saveBtn.addEventListener('click', () => {
            this._saveEdit(id, textarea.value, saveBtn, body, actionsRow, originalHtml);
        });
        cancelBtn.addEventListener('click', () => {
            body.innerHTML = originalHtml;
            actionsRow.style.display = '';
            this.container.querySelectorAll(`.discuss-edit-btn[data-id="${id}"]`).forEach(btn => {
                btn.addEventListener('click', () => this._startInlineEdit(id));
            });
        });
    }

    async _saveEdit(id, content, saveBtn, body, actionsRow, originalHtml) {
        const token = this.editTokens.get(id);
        if (!token || !content.trim()) return;

        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving…';

        try {
            const res = await fetch(`${this.serverUrl}/api/comments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'X-Edit-Token': token },
                credentials: 'include',
                body: JSON.stringify({ content: content.trim() })
            });

            if (res.ok) {
                this._rawContent.set(id, content.trim());
                this.init();
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to save edit.');
                saveBtn.disabled = false;
                saveBtn.textContent = 'Save';
            }
        } catch (err) {
            console.error('[Discuss]', err);
            alert('Network error. Please try again.');
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save';
        }
    }

    renderComment(c, depth, replyToName, replyToId) {
        depth = depth || 0;
        const pinBadge = c.is_pinned ? `<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>` : '';
        const authorBadge = c.is_author ? `<span class="discuss-badge discuss-badge-success" style="margin-left:0.375rem">Author</span>` : '';
        const editedBadge = c.edited_at ? `<span style="margin-left:0.375rem;font-size:0.6875rem;color:var(--text-subtle);font-style:italic">(edited)</span>` : '';
        const dateStr = new Date(c.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

        const adminBadges = this.getAdminBadges(c);
        const adminTooltip = this.getAdminTooltip(c);
        const adminControls = this.getAdminControls(c);

        const replyTag = replyToName ? `<a href="#comment-${replyToId}" class="discuss-reply-tag"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>${replyToName}</a>` : '';

        const chevron = `
            <button class="discuss-collapse-btn" data-id="${c.id}" aria-label="Collapse" style="background:transparent;border:none;padding:0;cursor:pointer;color:var(--text-muted);display:inline-flex;align-items:center;margin-left:0.25rem;">
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
                        <span style="font-weight:600;font-size:0.875rem;color:var(--text-primary)">${c.name}</span>
                        ${authorBadge}${pinBadge}${editedBadge}${adminBadges}${adminTooltip}
                        <span style="color:var(--text-subtle);font-size:0.75rem">·</span>
                        <span style="font-size:0.8125rem;color:var(--text-muted)">${dateStr}</span>
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
                            ${this.getEditButton(c)}
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
                    <textarea name="content" class="discuss-form-textarea" placeholder="${this.placeholder}" required></textarea>
                    
                    <input type="text" name="honeypot_field" style="display:none" tabindex="-1" autocomplete="off">
                    ${hpInput}
                    
                    <div class="discuss-form-bottom">
                        <div class="discuss-form-inputs">
                            <div class="discuss-form-input-wrapper${this.icons.name === '' ? ' discuss-input-no-icon' : ''}">
                                ${this.icons.name}
                                <input type="text" name="name" class="discuss-form-input" placeholder="Name" required>
                            </div>
                            <div class="discuss-form-input-wrapper${this.icons.email === '' ? ' discuss-input-no-icon' : ''}">
                                ${this.icons.email}
                                <input type="email" name="email" class="discuss-form-input" placeholder="Email (optional)">
                            </div>
                        </div>

                        <div class="discuss-form-actions">
                            <button type="submit" class="discuss-btn discuss-btn-primary">
                                ${this.icons.submit} Post
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
            honeypot_answer_given: form.honeypot_answer_given ? form.honeypot_answer_given.value : undefined,
            ...(this.domainId ? { domain_id: this.domainId } : {})
        };

        try {
            const res = await fetch(`${this.serverUrl}/api/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const data = await res.json();
                if (data.editToken) this.editTokens.set(data.id, data.editToken);
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
    new DiscussWidget({
        container: autoContainer,
        darkSelector: autoContainer.dataset.darkSelector || null,
    });
}
