import { DiscussWidget } from './core.js';
import { ICONS } from './icons.js';

export class DiscussAdminWidget extends DiscussWidget {
    constructor(options) {
        super(options);
        this.isAdmin = true;
    }

    getAdminBadges(c) {
        return !c.is_approved ? `<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>` : '';
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
        return `
            <div style="width:1px;height:12px;background:var(--bds);margin:0 0.25rem"></div>
            <button class="discuss-action-btn" ${!c.is_approved ? 'style="color:#16a34a"' : ''} onclick="window.DiscussWidgetInstance.toggleApprove(${c.id}, ${c.is_approved})">
                ${c.is_approved ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> <span>Unapprove</span>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Approve</span>'}
            </button>
            <button class="discuss-action-btn" onclick="window.DiscussWidgetInstance.togglePin(${c.id}, ${c.is_pinned})">
                ${c.is_pinned ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <span>Unpin</span>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg> <span>Pin</span>'}
            </button>
            <button class="discuss-action-btn" style="color:#ef4444" onclick="if(confirm('Delete comment?')) window.DiscussWidgetInstance.deleteComment(${c.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                <span>Delete</span>
            </button>
        `;
    }

    async toggleApprove(id, currentStatus) {
        try {
            const res = await fetch(`/api/admin/comments/${id}/approve`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_approved: currentStatus ? 0 : 1 })
            });
            if (res.ok) {
                const btn = document.querySelector(`.discuss-action-btn[onclick*="toggleApprove(${id}"]`);
                if (btn) {
                    const newStatus = currentStatus ? 0 : 1;
                    btn.setAttribute('onclick', `window.DiscussWidgetInstance.toggleApprove(${id}, ${newStatus})`);
                    if (newStatus) {
                        btn.style.color = '';
                        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> <span>Unapprove</span>';
                        const row = document.getElementById(`comment-${id}`);
                        if (row) {
                            const badge = row.querySelector('.discuss-badge-warning');
                            if (badge) badge.remove();
                        }
                    } else {
                        btn.style.color = '#16a34a';
                        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Approve</span>';
                        const row = document.getElementById(`comment-${id}`);
                        if (row) {
                            const authorSpan = row.querySelector('span[style*="font-weight:600"]');
                            if (authorSpan) authorSpan.insertAdjacentHTML('afterend', `<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>`);
                        }
                    }
                }
            } else alert('Failed to update status');
        } catch (err) { console.error(err); }
    }

    async togglePin(id, currentStatus) {
        try {
            const res = await fetch(`/api/admin/comments/${id}/pin`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_pinned: currentStatus ? 0 : 1 })
            });
            if (res.ok) {
                const btn = document.querySelector(`.discuss-action-btn[onclick*="togglePin(${id}"]`);
                if (btn) {
                    const newStatus = currentStatus ? 0 : 1;
                    btn.setAttribute('onclick', `window.DiscussWidgetInstance.togglePin(${id}, ${newStatus})`);
                    if (newStatus) {
                        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <span>Unpin</span>';
                        const row = document.getElementById(`comment-${id}`);
                        if (row) {
                            const authorSpan = row.querySelector('span[style*="font-weight:600"]');
                            if (authorSpan) authorSpan.insertAdjacentHTML('afterend', `<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>`);
                        }
                    } else {
                        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg> <span>Pin</span>';
                        const row = document.getElementById(`comment-${id}`);
                        if (row) {
                            const badge = row.querySelector('.discuss-badge-info');
                            if (badge) badge.remove();
                        }
                    }
                }
            } else alert('Failed to update pin');
        } catch (err) { console.error(err); }
    }

    async deleteComment(id) {
        try {
            const res = await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
            if (res.ok) {
                const row = document.getElementById(`comment-${id}`);
                if (row) {
                    row.style.transition = 'opacity 300ms ease, transform 300ms ease';
                    row.style.opacity = '0';
                    row.style.transform = 'translateY(-10px)';
                    setTimeout(() => row.remove(), 300);
                }
            } else alert('Failed to delete comment');
        } catch (err) { console.error(err); }
    }
}

window.DiscussWidget = DiscussAdminWidget;

const adminContainer = document.getElementById('discuss-comments');
if (adminContainer && adminContainer.dataset.isAdmin === 'true') {
    new DiscussAdminWidget({ container: adminContainer });
}
