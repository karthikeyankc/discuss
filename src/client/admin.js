import { DiscussWidget } from './core.js';
import { ICONS } from './icons.js';

export class DiscussAdminWidget extends DiscussWidget {
    constructor(options) {
        super(options);
        this.isAdmin = true;
    }

    getAdminBadges(c) {
        return !c.is_approved
            ? `<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>`
            : '';
    }

    getAdminTooltip(c) {
        if (!c.email) return '';
        return `
            <span style="position:relative;display:inline-flex;align-items:center;color:var(--t5);cursor:help;padding:0.125rem;line-height:0;margin-left:0.25rem"
                  onmouseenter="this.querySelector('.em-tip').style.opacity='1';this.querySelector('.em-tip').style.visibility='visible'"
                  onmouseleave="this.querySelector('.em-tip').style.opacity='0';this.querySelector('.em-tip').style.visibility='hidden'">
                <span style="width:0.875rem;height:0.875rem;pointer-events:none;display:inline-flex">${ICONS.mail}</span>
                <span class="em-tip" style="opacity:0;visibility:hidden;transition:opacity 120ms;position:absolute;bottom:calc(100% + 5px);left:50%;transform:translateX(-50%);background:#1e293b;color:#f8fafc;font-size:0.6875rem;padding:3px 7px;border-radius:4px;white-space:nowrap;z-index:100;pointer-events:none;line-height:normal">${c.email}</span>
            </span>
        `;
    }

    getAdminControls(c) {
        const rawForEdit = (c.content_raw || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const isoDate = new Date(c.created_at).toISOString().slice(0, 16);

        return `
            <div style="width:1px;height:12px;background:var(--bds);margin:0 0.25rem"></div>
            <button class="discuss-action-btn" ${!c.is_approved ? 'style="color:#16a34a"' : ''}
                    onclick="window.DiscussWidgetInstance.toggleApprove(${c.id}, ${c.is_approved})">
                ${c.is_approved
                    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> <span>Unapprove</span>`
                    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Approve</span>`}
            </button>
            <button class="discuss-action-btn" onclick="window.DiscussWidgetInstance.togglePin(${c.id}, ${c.is_pinned})">
                ${c.is_pinned
                    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <span>Unpin</span>`
                    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg> <span>Pin</span>`}
            </button>
            <button class="discuss-action-btn" onclick="window.DiscussWidgetInstance.toggleEditForm(${c.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
                <span>Edit</span>
            </button>
            <button class="discuss-action-btn" style="color:#ef4444"
                    onclick="window.DiscussWidgetInstance.deleteComment(${c.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                <span>Delete</span>
            </button>

            <!-- Inline edit form -->
            <div id="discuss-edit-form-${c.id}"
                 style="display:none;width:100%;margin-top:0.75rem;padding:1rem;border:1px solid var(--bds);border-radius:8px;background:var(--s2)">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:0.75rem">
                    <div>
                        <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--t2);margin-bottom:0.25rem">Name</label>
                        <input type="text" id="discuss-edit-name-${c.id}"
                               style="width:100%;padding:0.5rem 0.625rem;border:1px solid var(--bd-control);border-radius:6px;font-size:0.875rem;color:var(--t1);background:var(--s1)"
                               value="${(c.name || '').replace(/"/g, '&quot;')}">
                    </div>
                    <div>
                        <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--t2);margin-bottom:0.25rem">Email</label>
                        <input type="email" id="discuss-edit-email-${c.id}"
                               style="width:100%;padding:0.5rem 0.625rem;border:1px solid var(--bd-control);border-radius:6px;font-size:0.875rem;color:var(--t1);background:var(--s1)"
                               value="${(c.email || '').replace(/"/g, '&quot;')}">
                    </div>
                </div>
                <div style="margin-bottom:0.75rem">
                    <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--t2);margin-bottom:0.25rem">Published date</label>
                    <input type="datetime-local" id="discuss-edit-date-${c.id}"
                           style="width:100%;padding:0.5rem 0.625rem;border:1px solid var(--bd-control);border-radius:6px;font-size:0.875rem;color:var(--t1);background:var(--s1)"
                           value="${isoDate}">
                </div>
                <div style="margin-bottom:0.75rem">
                    <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--t2);margin-bottom:0.25rem">Content (Markdown)</label>
                    <textarea id="discuss-edit-content-${c.id}" rows="5"
                              style="width:100%;padding:0.5rem 0.625rem;border:1px solid var(--bd-control);border-radius:6px;font-size:0.875rem;font-family:monospace;color:var(--t1);background:var(--s1);resize:vertical">${rawForEdit}</textarea>
                </div>
                <div style="display:flex;gap:0.5rem">
                    <button class="discuss-action-btn" style="background:var(--b600);color:#fff;padding:0.375rem 0.75rem;border-radius:6px"
                            onclick="window.DiscussWidgetInstance.saveEdit(${c.id})">Save</button>
                    <button class="discuss-action-btn"
                            onclick="window.DiscussWidgetInstance.toggleEditForm(${c.id})">Cancel</button>
                </div>
            </div>
        `;
    }

    toggleEditForm(id) {
        const form = document.getElementById(`discuss-edit-form-${id}`);
        if (!form) return;
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }

    async saveEdit(id) {
        const name     = document.getElementById(`discuss-edit-name-${id}`)?.value.trim();
        const email    = document.getElementById(`discuss-edit-email-${id}`)?.value.trim();
        const content  = document.getElementById(`discuss-edit-content-${id}`)?.value;
        const dateVal  = document.getElementById(`discuss-edit-date-${id}`)?.value;
        const created_at = dateVal ? new Date(dateVal).getTime() : null;

        if (!name || !content) {
            window.app?.showToast('Name and content are required.', 'error');
            return;
        }

        try {
            const res = await fetch(`/api/admin/comments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, content, created_at }),
            });
            if (!res.ok) {
                const d = await res.json();
                window.app?.showToast(d.error || 'Failed to save.', 'error');
                return;
            }
            const { content: rendered } = await res.json();

            // Update rendered body in-place
            const body = document.querySelector(`#comment-${id} .discuss-comment-body`);
            if (body) body.innerHTML = rendered;

            // Update displayed name
            const nameEl = document.querySelector(`#comment-${id} span[style*="font-weight:600"]`);
            if (nameEl) nameEl.textContent = name;

            // Update displayed date
            if (dateVal) {
                const dateEl = document.querySelector(`#comment-${id} span[style*="color:var(--t4)"]`);
                if (dateEl) dateEl.textContent = new Date(dateVal).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
            }

            this.toggleEditForm(id);
            window.app?.showToast('Comment updated.');
        } catch {
            window.app?.showToast('Network error.', 'error');
        }
    }

    async toggleApprove(id, currentStatus) {
        try {
            const res = await fetch(`/api/admin/comments/${id}/approve`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_approved: currentStatus ? 0 : 1 }),
            });
            if (res.ok) {
                const newStatus = currentStatus ? 0 : 1;
                const btn = document.querySelector(`.discuss-action-btn[onclick*="toggleApprove(${id}"]`);
                if (btn) {
                    btn.setAttribute('onclick', `window.DiscussWidgetInstance.toggleApprove(${id}, ${newStatus})`);
                    if (newStatus) {
                        btn.style.color = '';
                        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> <span>Unapprove</span>`;
                        document.querySelector(`#comment-${id} .discuss-badge-warning`)?.remove();
                    } else {
                        btn.style.color = '#16a34a';
                        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Approve</span>`;
                        const nameSpan = document.querySelector(`#comment-${id} span[style*="font-weight:600"]`);
                        nameSpan?.insertAdjacentHTML('afterend', `<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>`);
                    }
                }
                window.app?.refreshPendingBadge();
            } else {
                window.app?.showToast('Failed to update status.', 'error');
            }
        } catch { window.app?.showToast('Network error.', 'error'); }
    }

    async togglePin(id, currentStatus) {
        try {
            const res = await fetch(`/api/admin/comments/${id}/pin`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_pinned: currentStatus ? 0 : 1 }),
            });
            if (res.ok) {
                const newStatus = currentStatus ? 0 : 1;
                const btn = document.querySelector(`.discuss-action-btn[onclick*="togglePin(${id}"]`);
                if (btn) {
                    btn.setAttribute('onclick', `window.DiscussWidgetInstance.togglePin(${id}, ${newStatus})`);
                    if (newStatus) {
                        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <span>Unpin</span>`;
                        const nameSpan = document.querySelector(`#comment-${id} span[style*="font-weight:600"]`);
                        nameSpan?.insertAdjacentHTML('afterend', `<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>`);
                    } else {
                        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg> <span>Pin</span>`;
                        document.querySelector(`#comment-${id} .discuss-badge-info`)?.remove();
                    }
                }
            } else {
                window.app?.showToast('Failed to update pin.', 'error');
            }
        } catch { window.app?.showToast('Network error.', 'error'); }
    }

    async deleteComment(id) {
        const confirmed = await window.app?.showConfirm({
            title: 'Delete comment?',
            message: 'This will permanently remove the comment. This cannot be undone.',
            confirmLabel: 'Delete',
            isDanger: true,
        });
        if (!confirmed) return;
        try {
            const res = await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
            if (res.ok) {
                const row = document.getElementById(`comment-${id}`);
                if (row) {
                    row.style.transition = 'opacity 300ms ease, transform 300ms ease';
                    row.style.opacity = '0';
                    row.style.transform = 'translateY(-8px)';
                    setTimeout(() => row.remove(), 300);
                }
                window.app?.refreshPendingBadge();
            } else {
                window.app?.showToast('Failed to delete comment.', 'error');
            }
        } catch { window.app?.showToast('Network error.', 'error'); }
    }
}

window.DiscussWidget = DiscussAdminWidget;
