const app = {
    currentDomainId: null,
    currentDomainName: null,
    currentPostUrl: null,
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
                this.domains = await res.json();
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
        const path = window.location.pathname.replace(/\/$/, '');
        const parts = path.split('/');
        
        if (parts.includes('comments')) {
            const dIdx = parts.indexOf('domains');
            const pIdx = parts.indexOf('posts');
            if (dIdx !== -1 && pIdx !== -1) {
                this.currentDomainId = parts[dIdx + 1];
                this.currentPostUrl = decodeURIComponent(parts[pIdx + 1]);
            }
            return 'comments';
        } else if (parts.includes('posts')) {
            const dIdx = parts.indexOf('domains');
            if (dIdx !== -1) {
                this.currentDomainId = parts[dIdx + 1];
            }
            return 'posts';
        } else if (parts.includes('domains')) {
            return 'domains';
        }
        return null;
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
        document.getElementById('posts-section').classList.add('hidden');
        document.getElementById('comments-section').classList.add('hidden');
        
        if (sectionId === 'login') {
            document.getElementById('login-section').classList.remove('hidden');
        } else {
            document.getElementById('app-shell').classList.remove('hidden');
            document.getElementById(`${sectionId}-section`).classList.remove('hidden');

            // Update URL to the real path so sections are bookmarkable / survive reload
            if (pushHistory) {
                let path = `/admin/${sectionId}`;
                if (sectionId === 'posts' && this.currentDomainId) {
                    path = `/admin/domains/${this.currentDomainId}/posts`;
                } else if (sectionId === 'comments' && this.currentDomainId && this.currentPostUrl) {
                    path = `/admin/domains/${this.currentDomainId}/posts/${encodeURIComponent(this.currentPostUrl)}/comments`;
                }
                history.pushState(null, '', path);
            }
            
            // Update active nav item (always highlight domains since comments/posts are nested inside it)
            document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
            const activeNav = document.getElementById('nav-domains');
            if (activeNav) activeNav.classList.add('active');

            // Close mobile sidebar if open
            const sidebarNav = document.getElementById('sidebarNav');
            const backdrop = document.getElementById('sidebarBackdrop');
            if (window.innerWidth < 768) {
                sidebarNav.style.transform = '';
                backdrop.style.display = 'none';
            }

            if (sectionId === 'domains') this.loadDomains();
            if (sectionId === 'posts') this.loadPosts();
            if (sectionId === 'comments') this.loadComments();
        }
    },

    getDomainName(id) {
        if (!this.domains) return id;
        const d = this.domains.find(d => d.id == id);
        return d ? d.domain : id;
    },

    async loadDomains() {
        try {
            const res = await fetch('/api/admin/domains');
            if (!res.ok) return this.logout();
            this.domains = await res.json();
            const tbody = document.querySelector('#domains-table tbody');
            tbody.innerHTML = '';
            this.domains.forEach(d => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors cursor-pointer';
                tr.onclick = (e) => {
                    if (!e.target.closest('button')) {
                        this.selectDomain(d.id, d.domain);
                    }
                };
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

    selectDomain(id, name) {
        this.currentDomainId = id;
        this.currentDomainName = name;
        this.showSection('posts');
    },

    async loadPosts() {
        if (!this.currentDomainId) {
            this.showSection('domains');
            return;
        }

        const domainName = this.getDomainName(this.currentDomainId);
        document.getElementById('posts-breadcrumb-domain').textContent = domainName;
        document.getElementById('comments-breadcrumb-domain').textContent = domainName;

        try {
            const res = await fetch(`/api/admin/domains/${this.currentDomainId}/posts`);
            if (!res.ok) return this.showSection('domains');
            const data = await res.json();
            
            const tbody = document.querySelector('#posts-table tbody');
            tbody.innerHTML = '';
            
            if (data.posts.length === 0) {
                tbody.innerHTML = `<tr><td colspan="3" class="p-8 text-center text-neutral-500">No posts found for this domain yet.</td></tr>`;
                return;
            }

            data.posts.forEach(p => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors cursor-pointer';
                tr.onclick = () => this.selectPost(p.post_url);
                tr.innerHTML = `
                    <td class="p-3 text-neutral-900 font-medium truncate max-w-xs" title="${p.post_url}">${p.post_url}</td>
                    <td class="p-3 text-neutral-600">${p.comment_count}</td>
                    <td class="p-3 text-neutral-500 text-sm">${new Date(p.last_comment_at).toLocaleString()}</td>
                `;
                tbody.appendChild(tr);
            });
        } catch (err) {
            console.error(err);
        }
    },

    selectPost(postUrl) {
        this.currentPostUrl = postUrl;
        this.showSection('comments');
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
        if (!this.currentDomainId || !this.currentPostUrl) {
            this.showSection('domains');
            return;
        }

        document.getElementById('comments-subtitle').textContent = `Post: ${this.currentPostUrl}`;

        try {
            const list = document.getElementById('comments-list');
            list.innerHTML = '<div id="discuss-comments" data-is-admin="true"></div>';

            new window.DiscussWidget({
                container: document.getElementById('discuss-comments'),
                postUrl: this.currentPostUrl,
                fetchUrl: `/api/admin/comments?domain_id=${this.currentDomainId}&post_url=${encodeURIComponent(this.currentPostUrl)}`,
                isAdmin: true
            });

            if (window.lucide) lucide.createIcons();
        } catch (err) {
            console.error(err);
        }
    }
}; 

document.addEventListener('DOMContentLoaded', () => app.init());
