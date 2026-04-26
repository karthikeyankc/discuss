const SPAM_DEFAULTS = [
    'casino','viagra','cialis','porn','xxx','adult','nude','naked',
    'free money','make money fast','click here','buy now','discount',
    'cheap','weight loss','diet pills','crypto','bitcoin','nft',
    'loan','payday','insurance','mortgage','refinance',
];

const app = {
    domains: [],
    currentDomainId: null,
    currentDomainName: null,
    currentPostUrl: null,
    currentInboxStatus: 'all',
    selectedComments: new Set(),
    blockedWords: [],
    currentUsername: null,

    // ── Init ───────────────────────────────────────────────────────────────

    async init() {
        document.getElementById('login-form').addEventListener('submit', this.handleLogin.bind(this));
        document.getElementById('add-domain-form').addEventListener('submit', this.handleAddDomain.bind(this));
        document.getElementById('settings-form').addEventListener('submit', this.handleSaveSettings.bind(this));

        document.addEventListener('click', e => {
            const menu = document.getElementById('user-menu');
            const dropdown = document.getElementById('user-dropdown');
            if (menu && !menu.contains(e.target) && dropdown?.style.visibility === 'visible') {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-4px)';
                dropdown.style.transition = 'opacity 150ms ease-in,transform 150ms ease-in,visibility 0ms 150ms';
                document.getElementById('user-menu-btn')?.setAttribute('aria-expanded', 'false');
            }
        });

        const menuBtn = document.getElementById('menuBtn');
        const sidebarNav = document.getElementById('sidebarNav');
        const backdrop = document.getElementById('sidebarBackdrop');
        const toggleSidebar = () => {
            const open = sidebarNav.style.transform === 'translateX(0)';
            sidebarNav.style.transform = open ? '' : 'translateX(0)';
            backdrop.style.display = open ? 'none' : 'block';
        };
        if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
        if (backdrop) backdrop.addEventListener('click', toggleSidebar);

        window.addEventListener('popstate', () => {
            const section = this._pathSection();
            if (section) this.showSection(section, false);
        });

        try {
            const res = await fetch('/api/admin/domains');
            if (res.ok) {
                this.domains = await res.json();
                this.showSection(this._pathSection() || 'overview');
                fetch('/api/admin/me').then(r => r.ok ? r.json() : null).then(me => { if (me) this.setUser(me.username); });
                this.refreshPendingBadge();
            } else {
                this.showSection('login');
            }
        } catch {
            this.showSection('login');
        }
    },

    setUser(username) {
        this.currentUsername = username;
        const parts    = username.trim().split(/\s+/);
        const initials = parts.length >= 2
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            : username.slice(0, 2).toUpperCase();
        const avatar   = document.getElementById('user-avatar');
        const header   = document.getElementById('user-dropdown-name');
        const divider  = document.getElementById('user-dropdown-divider');
        if (avatar)  { avatar.dataset.initials = initials; }
        if (header)  { header.textContent  = username; header.style.display  = 'block'; }
        if (divider) { divider.style.display = 'block'; }
    },

    toggleUserMenu() {
        const dropdown = document.getElementById('user-dropdown');
        const btn      = document.getElementById('user-menu-btn');
        const isOpen   = btn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(-4px)';
        } else {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
        }
        btn.setAttribute('aria-expanded', !isOpen);
    },

    _pathSection() {
        const parts = window.location.pathname.replace(/\/$/, '').split('/');
        if (parts.includes('settings')) {
            const dIdx = parts.indexOf('domains');
            if (dIdx !== -1) this.currentDomainId = parseInt(parts[dIdx + 1]);
            return 'settings';
        }
        if (parts.includes('comments')) {
            const dIdx = parts.indexOf('domains');
            const pIdx = parts.indexOf('posts');
            if (dIdx !== -1 && pIdx !== -1) {
                this.currentDomainId = parts[dIdx + 1];
                this.currentPostUrl = decodeURIComponent(parts[pIdx + 1]);
            }
            return 'comments';
        }
        if (parts.includes('posts')) {
            const dIdx = parts.indexOf('domains');
            if (dIdx !== -1) this.currentDomainId = parts[dIdx + 1];
            return 'posts';
        }
        if (parts.includes('domains')) return 'domains';
        if (parts.includes('inbox'))   return 'inbox';
        if (parts.includes('overview')) return 'overview';
        return null;
    },

    showSection(sectionId, pushHistory = true) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('app-shell').classList.add('hidden');
        ['overview', 'inbox', 'domains', 'posts', 'comments', 'settings'].forEach(s => {
            document.getElementById(`${s}-section`)?.classList.add('hidden');
        });

        if (sectionId === 'login') {
            document.getElementById('login-section').classList.remove('hidden');
        } else {
            document.getElementById('app-shell').classList.remove('hidden');
            document.getElementById(`${sectionId}-section`)?.classList.remove('hidden');

            if (pushHistory) {
                let path = `/admin/${sectionId}`;
                if (sectionId === 'posts' && this.currentDomainId)
                    path = `/admin/domains/${this.currentDomainId}/posts`;
                else if (sectionId === 'comments' && this.currentDomainId && this.currentPostUrl)
                    path = `/admin/domains/${this.currentDomainId}/posts/${encodeURIComponent(this.currentPostUrl)}/comments`;
                else if (sectionId === 'settings' && this.currentDomainId)
                    path = `/admin/domains/${this.currentDomainId}/settings`;
                history.pushState(null, '', path);
            }

            ['overview', 'inbox', 'domains'].forEach(id => {
                document.getElementById(`nav-${id}`)?.classList.remove('active');
            });
            const navMap = { overview: 'overview', inbox: 'inbox', domains: 'domains', posts: 'domains', comments: 'domains', settings: 'domains' };
            document.getElementById(`nav-${navMap[sectionId]}`)?.classList.add('active');

            if (window.innerWidth < 768) {
                document.getElementById('sidebarNav').style.transform = '';
                document.getElementById('sidebarBackdrop').style.display = 'none';
            }

            if (sectionId === 'overview')  this.loadStats();
            if (sectionId === 'inbox')     this.loadInbox();
            if (sectionId === 'domains')   this.loadDomains();
            if (sectionId === 'posts')     this.loadPosts();
            if (sectionId === 'comments')  this.loadComments();
            if (sectionId === 'settings')  this.loadSettings();
        }

        if (window.lucide) lucide.createIcons();
    },

    // ── Toast ──────────────────────────────────────────────────────────────

    showToast(message, type = 'success', duration = 3500) {
        const container = document.getElementById('toast-container');
        const el = document.createElement('div');
        el.className = `toast toast-${type}`;
        el.innerHTML = `<span>${message}</span><button class="toast-close" aria-label="Dismiss">×</button>`;
        el.querySelector('.toast-close').addEventListener('click', () => dismiss());
        container.appendChild(el);

        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('toast-in')));

        const dismiss = () => {
            el.classList.remove('toast-in');
            el.addEventListener('transitionend', () => el.remove(), { once: true });
        };
        setTimeout(dismiss, duration);
    },

    // ── Confirm modal ──────────────────────────────────────────────────────

    showConfirm({ title = 'Are you sure?', message, confirmLabel = 'Confirm', isDanger = true }) {
        return new Promise(resolve => {
            const modal  = document.getElementById('confirm-modal');
            const okBtn  = document.getElementById('confirm-modal-ok');
            const canBtn = document.getElementById('confirm-modal-cancel');

            document.getElementById('confirm-modal-title').textContent = title;
            document.getElementById('confirm-modal-body').textContent  = message;
            okBtn.textContent  = confirmLabel;
            okBtn.className    = `btn ${isDanger ? 'btn-danger' : 'btn-primary'}`;
            modal.classList.add('open');

            const cleanup = result => {
                modal.classList.remove('open');
                okBtn.removeEventListener('click', onOk);
                canBtn.removeEventListener('click', onCancel);
                modal.removeEventListener('click', onBackdrop);
                resolve(result);
            };
            const onOk      = () => cleanup(true);
            const onCancel  = () => cleanup(false);
            const onBackdrop = e => { if (e.target === e.currentTarget) cleanup(false); };

            okBtn.addEventListener('click', onOk, { once: true });
            canBtn.addEventListener('click', onCancel, { once: true });
            modal.addEventListener('click', onBackdrop);
        });
    },

    // ── Stats ──────────────────────────────────────────────────────────────

    async loadStats() {
        try {
            const res = await fetch('/api/admin/stats');
            if (!res.ok) return;
            const s = await res.json();
            document.getElementById('stat-total').textContent    = s.total_comments;
            document.getElementById('stat-pending').textContent  = s.pending_comments;
            document.getElementById('stat-approved').textContent = s.approved_comments;
            document.getElementById('stat-domains').textContent  = s.domain_count;

            const cta = document.getElementById('overview-cta');
            if (s.pending_comments > 0) {
                document.getElementById('overview-cta-text').textContent =
                    `${s.pending_comments} comment${s.pending_comments !== 1 ? 's' : ''} pending review.`;
                cta.classList.remove('hidden');
                if (window.lucide) lucide.createIcons();
            } else {
                cta.classList.add('hidden');
            }
        } catch (err) { console.error(err); }
    },

    async refreshPendingBadge() {
        try {
            const res = await fetch('/api/admin/stats');
            if (!res.ok) return;
            const { pending_comments } = await res.json();
            const sidebar = document.getElementById('sidebar-pending-badge');
            const inbox   = document.getElementById('inbox-pending-badge');
            if (pending_comments > 0) {
                sidebar.textContent = pending_comments;
                inbox.textContent   = pending_comments;
                sidebar.classList.remove('hidden');
                inbox.classList.remove('hidden');
            } else {
                sidebar.classList.add('hidden');
                inbox.classList.add('hidden');
            }
        } catch (err) { console.error(err); }
    },

    // ── Inbox ──────────────────────────────────────────────────────────────

    async loadInbox(status) {
        if (status !== undefined) this.currentInboxStatus = status;
        this.selectedComments.clear();
        document.getElementById('bulk-bar').style.display = 'none';
        document.getElementById('inbox-select-all').checked = false;

        const list = document.getElementById('inbox-list');
        list.innerHTML = '<div style="padding:3rem;text-align:center;color:var(--t4)"><span class="spinner spinner-md"></span></div>';

        try {
            const res = await fetch(`/api/admin/comments?status=${this.currentInboxStatus}`);
            if (!res.ok) return;
            const comments = await res.json();

            if (comments.length === 0) {
                const msgs = {
                    all:      { icon: 'message-circle', title: 'No comments yet',          desc: 'Comments will appear here once visitors start engaging with your content.' },
                    pending:  { icon: 'check-circle',   title: 'All caught up!',            desc: 'There are no comments pending review.' },
                    approved: { icon: 'thumbs-up',      title: 'No approved comments yet', desc: 'Approved comments will appear here.' },
                };
                const m = msgs[this.currentInboxStatus] || msgs.all;
                list.innerHTML = `
                    <div class="empty-state">
                        <div style="margin-bottom:1rem;color:var(--t4)"><i data-lucide="${m.icon}" style="width:2.5rem;height:2.5rem"></i></div>
                        <div class="empty-title">${m.title}</div>
                        <p class="empty-desc">${m.desc}</p>
                    </div>`;
                if (window.lucide) lucide.createIcons();
                return;
            }

            list.innerHTML = comments.map(c => this.renderInboxItem(c)).join('');
            if (window.lucide) lucide.createIcons();
        } catch (err) {
            console.error(err);
            list.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--danger-fg)">Failed to load comments.</div>';
        }
    },

    switchInboxTab(status) {
        this.currentInboxStatus = status;
        document.querySelectorAll('#inbox-tabs .tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.status === status);
        });
        this.loadInbox(status);
    },

    renderInboxItem(c) {
        const palette = ['#1d4ed8','#16a34a','#b45309','#7c3aed','#dc2626','#0891b2','#be185d','#0369a1'];
        let hash = 0;
        for (let i = 0; i < (c.name || '').length; i++) hash = c.name.charCodeAt(i) + ((hash << 5) - hash);
        const bg = palette[Math.abs(hash) % palette.length];
        const initials = (c.name || 'U').charAt(0).toUpperCase();

        const tmp = document.createElement('div');
        tmp.innerHTML = c.content;
        const plain = (tmp.textContent || tmp.innerText || '').trim();
        const excerpt = plain.length > 160 ? plain.slice(0, 160) + '…' : plain;

        const date = new Date(c.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        const statusBadge = c.is_approved
            ? `<span class="badge badge-success">Approved</span>`
            : `<span class="badge badge-warning">Pending</span>`;

        return `
            <div class="inbox-item" id="inbox-item-${c.id}">
                <input type="checkbox" class="comment-checkbox" value="${c.id}"
                       style="width:1rem;height:1rem;margin-top:0.25rem;flex-shrink:0;cursor:pointer;accent-color:var(--b600)"
                       onchange="app.onCheckboxChange(this)">
                <div class="inbox-avatar" style="background:${bg}">${initials}</div>
                <div style="flex:1;min-width:0">
                    <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.375rem">
                        <span style="font-weight:600;font-size:0.875rem;color:var(--t1)">${c.name}</span>
                        ${statusBadge}
                        <span class="badge badge-neutral">${c.domain}</span>
                        <span style="font-size:0.75rem;color:var(--t4);margin-left:auto;white-space:nowrap">${date}</span>
                    </div>
                    <p class="inbox-excerpt" style="font-size:0.875rem;color:var(--t3);margin:0 0 0.25rem">${excerpt}</p>
                    <div style="font-size:0.75rem;color:var(--t5);margin-bottom:0.625rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.post_url}</div>
                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
                        ${c.is_approved
                            ? `<button class="btn btn-ghost btn-sm" onclick="app.inboxSetApproval(${c.id}, 0)">Unapprove</button>`
                            : `<button class="btn btn-primary btn-sm" onclick="app.inboxSetApproval(${c.id}, 1)">Approve</button>`
                        }
                        <button class="btn btn-ghost btn-sm" style="color:var(--danger-fg)"
                                onclick="app.inboxDeleteOne(${c.id})">Delete</button>
                    </div>
                </div>
            </div>`;
    },

    onCheckboxChange(checkbox) {
        const id = parseInt(checkbox.value);
        if (checkbox.checked) {
            this.selectedComments.add(id);
            document.getElementById(`inbox-item-${id}`)?.classList.add('selected');
        } else {
            this.selectedComments.delete(id);
            document.getElementById(`inbox-item-${id}`)?.classList.remove('selected');
        }
        this.updateBulkBar();
        const all = document.querySelectorAll('.comment-checkbox');
        document.getElementById('inbox-select-all').checked =
            all.length > 0 && all.length === this.selectedComments.size;
    },

    toggleSelectAll(checked) {
        this.selectedComments.clear();
        document.querySelectorAll('.comment-checkbox').forEach(cb => {
            cb.checked = checked;
            const id = parseInt(cb.value);
            if (checked) this.selectedComments.add(id);
            document.getElementById(`inbox-item-${id}`)?.classList.toggle('selected', checked);
        });
        this.updateBulkBar();
    },

    updateBulkBar() {
        const bar = document.getElementById('bulk-bar');
        const n = this.selectedComments.size;
        bar.style.display = n > 0 ? 'flex' : 'none';
        if (n > 0) document.getElementById('bulk-count').textContent = `${n} selected`;
    },

    async handleBulkAction(action) {
        const ids = [...this.selectedComments];
        if (!ids.length) return;
        const n = ids.length;
        const confirmed = await this.showConfirm({
            title: `${action === 'delete' ? 'Delete' : 'Approve'} ${n} comment${n !== 1 ? 's' : ''}?`,
            message: action === 'delete'
                ? `This will permanently remove ${n} comment${n !== 1 ? 's' : ''}. This cannot be undone.`
                : `Mark ${n} comment${n !== 1 ? 's' : ''} as approved.`,
            confirmLabel: action === 'delete' ? 'Delete' : 'Approve',
            isDanger: action === 'delete',
        });
        if (!confirmed) return;

        try {
            await Promise.all(ids.map(id =>
                action === 'delete'
                    ? fetch(`/api/admin/comments/${id}`, { method: 'DELETE' })
                    : fetch(`/api/admin/comments/${id}/approve`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ is_approved: 1 }),
                    })
            ));
            this.showToast(`${n} comment${n !== 1 ? 's' : ''} ${action === 'delete' ? 'deleted' : 'approved'}.`);
            this.loadInbox();
            this.refreshPendingBadge();
        } catch (err) {
            console.error(err);
            this.showToast('Something went wrong. Please try again.', 'error');
        }
    },

    async inboxSetApproval(id, approve) {
        try {
            const res = await fetch(`/api/admin/comments/${id}/approve`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_approved: approve }),
            });
            if (res.ok) {
                this.showToast(approve ? 'Comment approved.' : 'Comment unapproved.');
                this.loadInbox();
                this.refreshPendingBadge();
            } else {
                this.showToast('Failed to update comment.', 'error');
            }
        } catch { this.showToast('Network error.', 'error'); }
    },

    async inboxDeleteOne(id) {
        const confirmed = await this.showConfirm({
            title: 'Delete comment?',
            message: 'This comment will be permanently removed. This cannot be undone.',
            confirmLabel: 'Delete',
            isDanger: true,
        });
        if (!confirmed) return;
        try {
            const res = await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
            if (res.ok) {
                this.showToast('Comment deleted.');
                this.loadInbox();
                this.refreshPendingBadge();
            } else {
                this.showToast('Failed to delete comment.', 'error');
            }
        } catch { this.showToast('Network error.', 'error'); }
    },

    // ── Auth ───────────────────────────────────────────────────────────────

    async handleLogin(e) {
        e.preventDefault();
        const btn = e.target.querySelector('[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Logging in…';
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: document.getElementById('login-username').value,
                    password: document.getElementById('login-password').value,
                }),
            });
            if (res.ok) {
                const data = await res.json();
                this.showSection('overview');
                this.setUser(data.username);
                this.refreshPendingBadge();
            } else {
                this.showToast('Invalid username or password.', 'error');
            }
        } catch { this.showToast('Network error. Please try again.', 'error'); }
        finally { btn.disabled = false; btn.textContent = 'Login'; }
    },

    async logout() {
        await fetch('/api/admin/logout', { method: 'POST' });
        this.currentUsername = null;
        history.replaceState(null, '', '/admin');
        this.showSection('login');
    },

    // ── Domains ────────────────────────────────────────────────────────────

    getDomainName(id) {
        return this.domains.find(d => d.id == id)?.domain || id;
    },

    async loadDomains() {
        try {
            const res = await fetch('/api/admin/domains');
            if (!res.ok) return this.logout();
            this.domains = await res.json();
            const tbody = document.getElementById('domains-tbody');
            tbody.innerHTML = '';

            if (this.domains.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4">
                    <div class="empty-state">
                        <div style="margin-bottom:1rem;color:var(--t4)"><i data-lucide="globe" style="width:2rem;height:2rem"></i></div>
                        <div class="empty-title">No domains yet</div>
                        <p class="empty-desc">Add your first domain above to start collecting comments.</p>
                    </div>
                </td></tr>`;
                if (window.lucide) lucide.createIcons();
                return;
            }

            this.domains.forEach(d => {
                const tr = document.createElement('tr');
                tr.style.cursor = 'pointer';
                tr.onclick = e => { if (!e.target.closest('button')) this.selectDomain(d.id, d.domain); };
                const pending = d.pending_count > 0
                    ? `<span class="badge badge-warning" style="margin-left:0.5rem">${d.pending_count} pending</span>` : '';
                tr.innerHTML = `
                    <td class="font-medium">${d.domain}${pending}</td>
                    <td class="text-neutral-600">${d.site_name}</td>
                    <td class="text-neutral-500">${d.total_count || 0}</td>
                    <td class="text-right" style="white-space:nowrap">
                        <button onclick="app.openSettings(${d.id})" class="btn btn-ghost btn-sm">
                            <i data-lucide="settings"></i> Settings
                        </button>
                        <button onclick="app.deleteDomain(${d.id})" class="btn btn-ghost btn-sm text-danger-600 hover:text-danger-700 hover:bg-danger-50">
                            <i data-lucide="trash-2"></i> Delete
                        </button>
                    </td>`;
                tbody.appendChild(tr);
            });
            if (window.lucide) lucide.createIcons();
        } catch (err) { console.error(err); }
    },

    selectDomain(id, name) {
        this.currentDomainId = id;
        this.currentDomainName = name;
        this.showSection('posts');
    },

    async handleAddDomain(e) {
        e.preventDefault();
        const btn = e.target.querySelector('[type="submit"]');
        btn.disabled = true;
        try {
            const res = await fetch('/api/admin/domains', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    domain: document.getElementById('domain-name').value.trim(),
                    site_name: document.getElementById('domain-site-name').value.trim(),
                    honeypot_question: document.getElementById('domain-hq').value.trim(),
                }),
            });
            if (res.ok) {
                e.target.reset();
                this.loadDomains();
                this.showToast('Domain added successfully.');
            } else {
                const data = await res.json();
                this.showToast(data.error || 'Failed to add domain.', 'error');
            }
        } catch { this.showToast('Network error. Please try again.', 'error'); }
        finally { btn.disabled = false; }
    },

    async deleteDomain(id) {
        const d = this.domains.find(d => d.id === id);
        const confirmed = await this.showConfirm({
            title: 'Delete domain?',
            message: `This will permanently remove "${d?.domain || 'this domain'}" and all its comments. This cannot be undone.`,
            confirmLabel: 'Delete',
            isDanger: true,
        });
        if (!confirmed) return;
        try {
            const res = await fetch(`/api/admin/domains/${id}`, { method: 'DELETE' });
            if (res.ok) {
                this.loadDomains();
                this.showToast('Domain deleted.');
            } else {
                this.showToast('Failed to delete domain.', 'error');
            }
        } catch { this.showToast('Network error. Please try again.', 'error'); }
    },

    // ── Settings Page ──────────────────────────────────────────────────────

    // ── Blocked-words tag input ────────────────────────────────────────────

    initBlockedWordsInput() {
        const field = document.getElementById('blocked-words-field');
        if (!field || field._bwBound) return;
        field._bwBound = true;

        field.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                this._commitBlockedWord(field);
            } else if (e.key === 'Backspace' && field.value === '' && this.blockedWords.length) {
                this.blockedWords.pop();
                this._renderBlockedTags();
            }
        });

        field.addEventListener('blur', () => this._commitBlockedWord(field));

        field.addEventListener('paste', e => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text');
            text.split(/[\s,]+/).forEach(w => {
                const clean = w.trim().toLowerCase();
                if (clean) { this.blockedWords.push(clean); }
            });
            this.blockedWords = [...new Set(this.blockedWords)];
            this._renderBlockedTags();
        });
    },

    _commitBlockedWord(field) {
        const raw = field.value.trim().toLowerCase().replace(/,+$/, '');
        if (raw && !this.blockedWords.includes(raw)) {
            this.blockedWords.push(raw);
            this._renderBlockedTags();
        }
        field.value = '';
    },

    _removeBlockedWord(word) {
        this.blockedWords = this.blockedWords.filter(w => w !== word);
        this._renderBlockedTags();
        document.getElementById('blocked-words-field')?.focus();
    },

    _renderBlockedTags() {
        const container = document.getElementById('blocked-words-input');
        const field = document.getElementById('blocked-words-field');
        if (!container || !field) return;

        container.querySelectorAll('.bw-tag').forEach(el => el.remove());

        this.blockedWords.forEach(word => {
            const tag = document.createElement('span');
            tag.className = 'bw-tag';
            tag.innerHTML = `${word}<button type="button" aria-label="Remove ${word}" onclick="app._removeBlockedWord('${word.replace(/'/g, "\\'")}')">×</button>`;
            container.insertBefore(tag, field);
        });

        field.placeholder = this.blockedWords.length ? '' : 'Type a word and press Enter…';
    },

    openSettings(id) {
        this.currentDomainId = id;
        this.showSection('settings');
    },

    async loadSettings() {
        const id = this.currentDomainId;
        if (!id) return this.showSection('domains');

        // Try local cache first for breadcrumb; fetch full record for primary_color
        const cached = this.domains.find(d => d.id == id);
        if (cached) {
            document.getElementById('settings-breadcrumb-domain').textContent = cached.domain;
        }

        try {
            const res = await fetch(`/api/admin/domains/${id}`);
            if (!res.ok) return this.showSection('domains');
            const d = await res.json();

            document.getElementById('settings-domain-id').value  = d.id;
            document.getElementById('settings-domain').value     = d.domain;
            document.getElementById('settings-site-name').value  = d.site_name;
            document.getElementById('settings-hq').value         = d.honeypot_question || '';
            document.getElementById('settings-breadcrumb-domain').textContent = d.domain;

            const color = d.primary_color || '#2563eb';
            document.getElementById('settings-color-picker').value = color;
            document.getElementById('settings-color-hex').value    = color;
            this._applyColorPreview(color);
            this._updateA11y(color);
            this._updateEmbedSnippet(d.domain, color);

            // Blocked words — seed with saved words, or defaults if none set
            try {
                this.blockedWords = d.blocked_words ? JSON.parse(d.blocked_words) : [...SPAM_DEFAULTS];
            } catch { this.blockedWords = [...SPAM_DEFAULTS]; }
            this.initBlockedWordsInput();
            this._renderBlockedTags();
        } catch (err) {
            console.error(err);
            this.showToast('Failed to load settings.', 'error');
        }
    },

    onColorPickerInput(hex) {
        document.getElementById('settings-color-hex').value = hex;
        this._applyColorPreview(hex);
        this._updateA11y(hex);
        const domain = document.getElementById('settings-domain').value.trim();
        this._updateEmbedSnippet(domain, hex);
    },

    onColorHexInput(raw) {
        const hex = raw.startsWith('#') ? raw : '#' + raw;
        if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
            document.getElementById('settings-color-picker').value = hex;
            this._applyColorPreview(hex);
            this._updateA11y(hex);
            const domain = document.getElementById('settings-domain').value.trim();
            this._updateEmbedSnippet(domain, hex);
        }
    },

    _applyColorPreview(hex) {
        const el = document.getElementById('settings-color-preview');
        if (el) el.style.background = hex;
    },

    // WCAG 2.1 relative luminance → contrast ratio of white text on hex bg
    _wcagContrast(hex) {
        const [r, g, b] = hex.replace('#','').match(/.{2}/g).map(h => parseInt(h, 16) / 255);
        const lin = v => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
        return (1.05) / (L + 0.05); // contrast of white (#fff) against hex
    },

    // Simplified APCA Lc (positive = dark bg, light text)
    _apcaLc(hex) {
        const [r, g, b] = hex.replace('#','').match(/.{2}/g).map(h => parseInt(h, 16) / 255);
        const sRGB = v => Math.pow(v, 2.2);
        const Ybg = 0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b);
        const Ytxt = 1.0; // white
        const Lc = (Math.pow(Ytxt, 0.56) - Math.pow(Ybg, 0.57)) * 1.14 * 100;
        return Math.abs(Lc);
    },

    _updateA11y(hex) {
        if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
        const wcag = this._wcagContrast(hex);
        const apca = this._apcaLc(hex);
        const container = document.getElementById('settings-a11y');
        const inner     = document.getElementById('settings-a11y-inner');

        const wcagAA  = wcag >= 4.5;
        const wcagAAA = wcag >= 7.0;
        const apcaOk  = apca >= 60;

        const pill = (label, ok, title) =>
            `<span title="${title}" style="display:inline-flex;align-items:center;gap:0.3rem;padding:0.25rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:600;background:${ok ? '#dcfce7' : '#fee2e2'};color:${ok ? '#15803d' : '#b91c1c'}">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ok ? '<polyline points="20 6 9 17 4 12"/>' : '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'}</svg>
                ${label}
            </span>`;

        inner.innerHTML =
            pill(`WCAG AA (${wcag.toFixed(1)}:1)`,  wcagAA,  'White text on this background — requires ≥4.5:1 for normal text') +
            pill(`WCAG AAA (${wcag.toFixed(1)}:1)`, wcagAAA, 'Enhanced contrast — requires ≥7:1') +
            pill(`APCA Lc ${apca.toFixed(0)}`,      apcaOk,  'APCA perceptual contrast — Lc ≥60 recommended for UI components');

        container.style.display = 'block';
    },

    _updateEmbedSnippet(domain, hex) {
        const origin = window.location.origin;
        const snippet = `<!-- Discuss comment widget -->
<div id="discuss-comments"></div>
<script src="${origin}/client.js"><\/script>
<script>
  new DiscussWidget({
    container: document.getElementById('discuss-comments'),
    serverUrl: '${origin}',
    primaryColor: '${hex || '#2563eb'}',
  });
<\/script>`;
        const pre = document.getElementById('settings-embed-snippet');
        if (pre) pre.textContent = snippet;
    },

    async copyEmbedSnippet() {
        const pre = document.getElementById('settings-embed-snippet');
        const btn = document.getElementById('settings-copy-btn');
        if (!pre || !btn) return;
        try {
            await navigator.clipboard.writeText(pre.textContent);
            btn.innerHTML = '<i data-lucide="check"></i> Copied!';
            if (window.lucide) lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="copy"></i> Copy';
                if (window.lucide) lucide.createIcons();
            }, 2000);
        } catch {
            this.showToast('Could not copy to clipboard.', 'error');
        }
    },

    async handleSaveSettings(e) {
        e.preventDefault();
        const id  = document.getElementById('settings-domain-id').value;
        const btn = e.target.querySelector('[type="submit"]');
        btn.disabled = true;
        const hex = document.getElementById('settings-color-hex').value.trim();
        try {
            // Commit any partially-typed word still in the input field
            this._commitBlockedWord(document.getElementById('blocked-words-field'));

            const res = await fetch(`/api/admin/domains/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    domain:            document.getElementById('settings-domain').value.trim(),
                    site_name:         document.getElementById('settings-site-name').value.trim(),
                    honeypot_question: document.getElementById('settings-hq').value.trim(),
                    primary_color:     /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : null,
                    blocked_words:     this.blockedWords,
                }),
            });
            if (res.ok) {
                // Refresh local cache
                const updated = await fetch(`/api/admin/domains/${id}`);
                if (updated.ok) {
                    const d = await updated.json();
                    const idx = this.domains.findIndex(x => x.id == id);
                    if (idx !== -1) this.domains[idx] = { ...this.domains[idx], ...d };
                }
                this.showToast('Settings saved.');
            } else {
                const data = await res.json();
                this.showToast(data.error || 'Failed to save settings.', 'error');
            }
        } catch { this.showToast('Network error. Please try again.', 'error'); }
        finally { btn.disabled = false; }
    },

    // ── Posts ──────────────────────────────────────────────────────────────

    async loadPosts() {
        if (!this.currentDomainId) return this.showSection('domains');
        const name = this.getDomainName(this.currentDomainId);
        document.getElementById('posts-breadcrumb-domain').textContent  = name;
        document.getElementById('comments-breadcrumb-domain').textContent = name;

        const tbody = document.getElementById('posts-tbody');
        tbody.innerHTML = `<tr><td colspan="3" style="padding:3rem;text-align:center;color:var(--t4)"><span class="spinner spinner-md"></span></td></tr>`;

        try {
            const res = await fetch(`/api/admin/domains/${this.currentDomainId}/posts`);
            if (!res.ok) return this.showSection('domains');
            const { posts } = await res.json();
            tbody.innerHTML = '';

            if (posts.length === 0) {
                tbody.innerHTML = `<tr><td colspan="3">
                    <div class="empty-state">
                        <div style="margin-bottom:1rem;color:var(--t4)"><i data-lucide="file-text" style="width:2rem;height:2rem"></i></div>
                        <div class="empty-title">No posts yet</div>
                        <p class="empty-desc">Posts will appear here once visitors start leaving comments on <strong>${name}</strong>.</p>
                    </div>
                </td></tr>`;
                if (window.lucide) lucide.createIcons();
                return;
            }

            posts.forEach(p => {
                const tr = document.createElement('tr');
                tr.style.cursor = 'pointer';
                tr.onclick = () => this.selectPost(p.post_url);
                tr.innerHTML = `
                    <td class="font-medium truncate max-w-xs" title="${p.post_url}">${p.post_url}</td>
                    <td class="text-neutral-600">${p.comment_count}</td>
                    <td class="text-neutral-500 text-sm">${new Date(p.last_comment_at).toLocaleString()}</td>`;
                tbody.appendChild(tr);
            });
        } catch (err) { console.error(err); }
    },

    selectPost(postUrl) {
        this.currentPostUrl = postUrl;
        this.showSection('comments');
    },

    // ── Comments (post-specific moderation) ───────────────────────────────

    async loadComments() {
        if (!this.currentDomainId || !this.currentPostUrl) return this.showSection('domains');
        document.getElementById('comments-subtitle').textContent = `Post: ${this.currentPostUrl}`;
        const list = document.getElementById('comments-list');
        list.innerHTML = '<div id="discuss-comments" data-is-admin="true"></div>';
        new window.DiscussWidget({
            container: document.getElementById('discuss-comments'),
            postUrl: this.currentPostUrl,
            fetchUrl: `/api/admin/comments?domain_id=${this.currentDomainId}&post_url=${encodeURIComponent(this.currentPostUrl)}`,
            isAdmin: true,
        });
        if (window.lucide) lucide.createIcons();
    },
};

document.addEventListener('DOMContentLoaded', () => app.init());
