const app = {
    async init() {
        document.getElementById('login-form').addEventListener('submit', this.handleLogin.bind(this));
        document.getElementById('add-domain-form').addEventListener('submit', this.handleAddDomain.bind(this));

        // Mobile sidebar toggle
        const menuBtn = document.getElementById('menuBtn');
        const sidebarNav = document.getElementById('sidebarNav');
        const backdrop = document.getElementById('sidebarBackdrop');

        const toggleSidebar = () => {
            const isOpen = sidebarNav.style.transform === 'translateX(0px)';
            if (isOpen) {
                sidebarNav.style.transform = '';
                backdrop.style.display = 'none';
            } else {
                sidebarNav.style.transform = 'translateX(0)';
                backdrop.style.display = 'block';
            }
        };

        if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
        if (backdrop) backdrop.addEventListener('click', toggleSidebar);

        // Path-based routing: back/forward navigation within the admin SPA
        window.addEventListener('popstate', () => {
            const section = this._pathSection();
            if (section) this.showSection(section, false); // false = don't push another history entry
        });

        // admin_token is httpOnly — JS can't read it. We verify the session by
        // calling a protected endpoint; the browser sends the cookie automatically.
        // JWT verification is pure crypto in the middleware (no DB lookup).
        // The domains data returned here is what we'd load on this screen anyway.
        try {
            const res = await fetch('/api/admin/domains');
            if (res.ok) {
                // Land on whatever section the URL path says, defaulting to domains
                this.showSection(this._pathSection() || 'domains');
            } else {
                this.showSection('login');
            }
        } catch {
            this.showSection('login');
        }
    },

    // Returns the section name from the current path, or null if unrecognised
    _pathSection() {
        const parts = window.location.pathname.replace(/\/$/, '').split('/');
        const last = parts[parts.length - 1];
        return ['domains', 'comments'].includes(last) ? last : null;
    },

    async handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                this.showSection('domains');
            } else {
                alert('Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error logging in');
        }
    },

    async logout() {
        await fetch('/api/admin/logout', { method: 'POST' });
        history.replaceState(null, '', '/admin');
        this.showSection('login');
    },

    showSection(sectionId, pushHistory = true) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('app-shell').classList.add('hidden');
        document.getElementById('domains-section').classList.add('hidden');
        document.getElementById('comments-section').classList.add('hidden');
        
        if (sectionId === 'login') {
            document.getElementById('login-section').classList.remove('hidden');
        } else {
            document.getElementById('app-shell').classList.remove('hidden');
            document.getElementById(`${sectionId}-section`).classList.remove('hidden');

            // Update URL to the real path so sections are bookmarkable / survive reload
            if (pushHistory) {
                history.pushState(null, '', `/admin/${sectionId}`);
            }
            
            // Update active nav item
            document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
            const activeNav = document.getElementById(`nav-${sectionId}`);
            if (activeNav) activeNav.classList.add('active');

            // Close mobile sidebar if open
            const sidebarNav = document.getElementById('sidebarNav');
            const backdrop = document.getElementById('sidebarBackdrop');
            if (window.innerWidth < 768) {
                sidebarNav.style.transform = '';
                backdrop.style.display = 'none';
            }

            if (sectionId === 'domains') this.loadDomains();
            if (sectionId === 'comments') this.loadComments();
        }
    },

    async loadDomains() {
        try {
            const res = await fetch('/api/admin/domains');
            if (!res.ok) return this.logout();
            const domains = await res.json();
            const tbody = document.querySelector('#domains-table tbody');
            tbody.innerHTML = '';
            domains.forEach(d => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors';
                tr.innerHTML = `
                    <td class="p-3 text-neutral-900">${d.domain}</td>
                    <td class="p-3 text-neutral-600">${d.site_name}</td>
                    <td class="p-3 text-right">
                        <button onclick="app.deleteDomain(${d.id})" class="btn btn-ghost btn-sm text-danger-600 hover:text-danger-700 hover:bg-danger-50">
                            <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            if (window.lucide) lucide.createIcons();
        } catch (err) {
            console.error(err);
        }
    },

    async handleAddDomain(e) {
        e.preventDefault();
        const domain = document.getElementById('domain-name').value;
        const site_name = document.getElementById('domain-site-name').value;
        const honeypot_question = document.getElementById('domain-hq').value;
        const honeypot_answer = document.getElementById('domain-ha').value;

        try {
            const res = await fetch('/api/admin/domains', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain, site_name, honeypot_question, honeypot_answer })
            });
            if (res.ok) {
                e.target.reset();
                this.loadDomains();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to add domain');
            }
        } catch (err) {
            console.error(err);
        }
    },

    async deleteDomain(id) {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`/api/admin/domains/${id}`, { method: 'DELETE' });
            this.loadDomains();
        } catch (err) {
            console.error(err);
        }
    },

    async loadComments() {
        try {
            const res = await fetch('/api/admin/comments');
            if (!res.ok) return this.logout();
            const comments = await res.json();
            const list = document.getElementById('comments-list');
            list.innerHTML = '';

            if (comments.length === 0) {
                list.innerHTML = `
                    <div class="empty-state py-12">
                        <div class="empty-icon text-4xl mb-3 opacity-50">📭</div>
                        <div class="empty-title text-lg font-semibold text-neutral-900">No comments yet</div>
                        <div class="empty-desc text-neutral-500">Comments will appear here once users post them.</div>
                    </div>
                `;
                return;
            }

            // Build a flat id→comment map so replies can reference their parent's name
            const commentMap = new Map(comments.map(c => [c.id, c]));

            // Group by post_url, preserving insertion order of latest comment per group
            const grouped = new Map();
            comments.forEach(c => {
                if (!grouped.has(c.post_url)) grouped.set(c.post_url, { domain: c.domain, comments: [] });
                grouped.get(c.post_url).comments.push(c);
            });

            // Sort groups by the most recent comment in each
            const sortedGroups = [...grouped.entries()].sort((a, b) => {
                const latestA = Math.max(...a[1].comments.map(c => new Date(c.created_at).getTime()));
                const latestB = Math.max(...b[1].comments.map(c => new Date(c.created_at).getTime()));
                return latestB - latestA;
            });

            sortedGroups.forEach(([postUrl, { domain, comments: group }], idx) => {
                const pendingCount = group.filter(c => !c.is_approved).length;
                const isOpen = idx === 0;

                const urlDisplay = postUrl.length > 70 ? postUrl.slice(0, 70) + '…' : postUrl;

                const groupEl = document.createElement('div');
                groupEl.className = 'card mb-4';
                groupEl.innerHTML = `
                    <button class="post-group-header card-header flex justify-between items-center w-full text-left"
                            aria-expanded="${isOpen}"
                            style="cursor:pointer;user-select:none">
                        <div class="flex items-center gap-3" style="min-width:0">
                            <i data-lucide="file-text" class="w-4 h-4 flex-shrink-0 text-neutral-400"></i>
                            <div style="min-width:0">
                                <div class="text-sm font-medium text-neutral-900" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${urlDisplay}</div>
                                <div class="text-xs text-neutral-400">${domain}</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 flex-shrink-0 ml-4">
                            ${pendingCount > 0 ? `<span class="badge badge-warning">${pendingCount} pending</span>` : ''}
                            <span class="badge badge-neutral">${group.length} comment${group.length !== 1 ? 's' : ''}</span>
                            <a href="${postUrl}" target="_blank"
                               onclick="event.stopPropagation()"
                               class="btn btn-ghost btn-sm text-neutral-400 hover:text-primary-600"
                               title="Open post">
                                <i data-lucide="external-link" class="w-3 h-3"></i>
                            </a>
                            <i data-lucide="chevron-down" class="w-4 h-4 text-neutral-400 flex-shrink-0 group-chevron" style="transition:transform 200ms;${isOpen ? 'transform:rotate(180deg)' : ''}"></i>
                        </div>
                    </button>
                    <div class="post-group-body${isOpen ? '' : ' hidden'}">
                        ${group.map((c, i) => this.renderCommentRow(c, i === group.length - 1, commentMap)).join('')}
                    </div>
                `;

                groupEl.querySelector('.post-group-header').addEventListener('click', () => {
                    const body = groupEl.querySelector('.post-group-body');
                    const chevron = groupEl.querySelector('.group-chevron');
                    const btn = groupEl.querySelector('.post-group-header');
                    const willOpen = body.classList.contains('hidden');
                    body.classList.toggle('hidden');
                    chevron.style.transform = willOpen ? 'rotate(180deg)' : '';
                    btn.setAttribute('aria-expanded', String(willOpen));
                });

                list.appendChild(groupEl);
            });

            if (window.lucide) lucide.createIcons();
        } catch (err) {
            console.error(err);
        }
    },

    renderCommentRow(c, isLast, commentMap) {
        const approved = c.is_approved;
        const pinned   = c.is_pinned;
        const date = new Date(c.created_at).toLocaleString(undefined, {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const statusBadge = approved
            ? '<span class="badge badge-success">Approved</span>'
            : '<span class="badge badge-warning">Pending</span>';
        const pinnedBadge = pinned
            ? '<span class="badge badge-info">Pinned</span>'
            : '';

        // Inline "Replying to" shown after date with a middot prefix
        const parent = (c.parent_id && commentMap) ? commentMap.get(c.parent_id) : null;
        const replyRef = parent ? `
            <span style="color:var(--t5);font-size:0.75rem;margin:0 0.125rem">&middot;</span>
            <span style="display:inline-flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:var(--t4)">
                <i data-lucide="corner-up-left" style="width:0.6875rem;height:0.6875rem;flex-shrink:0"></i>
                Replying to <strong style="color:var(--t3);font-weight:600">${parent.name}</strong>
            </span>` : '';

        return `
            <div style="display:flex;gap:0.875rem;padding:1.125rem 1.25rem;${isLast ? '' : 'border-bottom:1px solid var(--bds)'}">

                <!-- Avatar -->
                <img src="${c.avatar}" alt="${c.name}"
                     style="width:2.25rem;height:2.25rem;border-radius:50%;object-fit:cover;flex-shrink:0;margin-top:0.125rem;background:var(--s3)">

                <!-- Body -->
                <div style="flex:1;min-width:0">

                    <!-- Single meta line: name · [✉] · badges · · date [· ↩ reply] -->
                    <div style="display:flex;align-items:center;gap:0.375rem;flex-wrap:wrap;margin-bottom:0.4rem">
                        <span style="font-weight:600;font-size:0.875rem;color:var(--t1)">${c.name}</span>
                        <span style="position:relative;display:inline-flex;align-items:center;color:var(--t5);cursor:help;padding:0.125rem;line-height:0"
                              onmouseenter="this.querySelector('.em-tip').style.opacity='1';this.querySelector('.em-tip').style.visibility='visible'"
                              onmouseleave="this.querySelector('.em-tip').style.opacity='0';this.querySelector('.em-tip').style.visibility='hidden'">
                            <i data-lucide="mail" style="width:0.8125rem;height:0.8125rem;pointer-events:none"></i>
                            <span class="em-tip" style="opacity:0;visibility:hidden;transition:opacity 120ms;position:absolute;bottom:calc(100% + 5px);left:50%;transform:translateX(-50%);background:#1e293b;color:#f8fafc;font-size:0.6875rem;padding:3px 7px;border-radius:4px;white-space:nowrap;z-index:100;pointer-events:none">${c.email}</span>
                        </span>
                        ${statusBadge}
                        ${pinnedBadge}
                        <span style="color:var(--t5);font-size:0.75rem;margin:0 0.125rem">&middot;</span>
                        <span style="font-size:0.8125rem;color:var(--t4)">${date}</span>
                        ${replyRef}
                    </div>

                    <!-- Comment body -->
                    <div style="font-size:0.875rem;color:var(--t2);line-height:1.6;margin-bottom:0.625rem">${c.content}</div>

                    <!-- Action bar -->
                    <div style="display:flex;align-items:center;gap:0.125rem">
                        <button onclick="app.toggleApprove(${c.id}, ${!approved})"
                                class="btn btn-ghost btn-sm ${approved ? '' : 'text-success-600'}"
                                style="padding-left:0.5rem;padding-right:0.625rem">
                            <i data-lucide="${approved ? 'x' : 'check'}" class="w-3.5 h-3.5 mr-1"></i>
                            ${approved ? 'Unapprove' : 'Approve'}
                        </button>
                        <button onclick="app.togglePin(${c.id}, ${!pinned})"
                                class="btn btn-ghost btn-sm"
                                style="padding-left:0.5rem;padding-right:0.625rem">
                            <i data-lucide="${pinned ? 'pin-off' : 'pin'}" class="w-3.5 h-3.5 mr-1"></i>
                            ${pinned ? 'Unpin' : 'Pin'}
                        </button>
                        <button onclick="app.deleteComment(${c.id})"
                                class="btn btn-ghost btn-sm text-danger-600"
                                style="padding-left:0.5rem;padding-right:0.625rem">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5 mr-1"></i>
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        `;
    },


    async toggleApprove(id, is_approved) {
        try {
            await fetch(`/api/admin/comments/${id}/approve`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_approved })
            });
            this.loadComments();
        } catch (err) {
            console.error(err);
        }
    },

    async togglePin(id, is_pinned) {
        try {
            await fetch(`/api/admin/comments/${id}/pin`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_pinned })
            });
            this.loadComments();
        } catch (err) {
            console.error(err);
        }
    },

    async deleteComment(id) {
        if (!confirm('Are you sure you want to delete this comment?')) return;
        try {
            await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
            this.loadComments();
        } catch (err) {
            console.error(err);
        }
    }
}; 

document.addEventListener('DOMContentLoaded', () => app.init());
