(()=>{var u={reply:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>',share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>'};var w=document.currentScript,C=w?new URL(w.src).origin:window.location.origin;function x(d){let t=parseInt(d.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}function T(d,t,e){return"#"+[d,t,e].map(s=>Math.round(Math.max(0,Math.min(255,s))).toString(16).padStart(2,"0")).join("")}function S(d,t,e){d/=255,t/=255,e/=255;let s=Math.max(d,t,e),i=Math.min(d,t,e),a,n,o=(s+i)/2;if(s===i)a=n=0;else{let r=s-i;switch(n=o>.5?r/(2-s-i):r/(s+i),s){case d:a=((t-e)/r+(t<e?6:0))/6;break;case t:a=((e-d)/r+2)/6;break;default:a=((d-t)/r+4)/6}}return[a*360,n,o]}function _(d,t,e){d/=360;let s=(n,o,r)=>(r<0&&(r+=1),r>1&&(r-=1),r<1/6?n+(o-n)*6*r:r<1/2?o:r<2/3?n+(o-n)*(2/3-r)*6:n);if(t===0){let n=Math.round(e*255);return[n,n,n]}let i=e<.5?e*(1+t):e+t-e*t,a=2*e-i;return[s(a,i,d+1/3),s(a,i,d),s(a,i,d-1/3)].map(n=>Math.round(n*255))}function E(d){let[t,e,s]=x(d),[i,a]=S(t,e,s),n={50:.96,100:.93,200:.86,300:.74,400:.6,500:.48,600:.38,700:.3,800:.22,900:.15},o={};for(let[r,l]of Object.entries(n)){let[c,m,f]=_(i,Math.min(a,.85),l);o[r]=T(c,m,f)}return o}var y=class{constructor(t){window.DiscussWidgetInstance=this,this.container=t.container,this.container&&(this.postUrl=t.postUrl||this.container.dataset.url||window.location.pathname,this.serverUrl=t.serverUrl||C,this.fetchUrl=t.fetchUrl||`${this.serverUrl}/api/comments?post_url=${encodeURIComponent(this.postUrl)}`,this.configUrl=t.configUrl||`${this.serverUrl}/api/comments/config`,this.config={},this.primaryColor=t.primaryColor||null,this.domainId=t.domainId||null,this.title=t.title??"Leave a comment",this.icons={name:t.icons?.name!==void 0?t.icons.name:u.user,email:t.icons?.email!==void 0?t.icons.email:u.mail,submit:t.icons?.submit!==void 0?t.icons.submit:u.send},this.init=this.init.bind(this),this.render=this.render.bind(this),this.renderComment=this.renderComment.bind(this),this.renderForm=this.renderForm.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.primaryColor&&this.applyTheme(this.primaryColor),this.init())}applyTheme(t){if(!t||!/^#[0-9a-fA-F]{6}$/.test(t))return;let e=E(t),s=this.container;s.style.setProperty("--b50",e[50]),s.style.setProperty("--b100",e[100]),s.style.setProperty("--b200",e[200]),s.style.setProperty("--b300",e[300]),s.style.setProperty("--b400",e[400]),s.style.setProperty("--b500",e[500]),s.style.setProperty("--b600",e[600]),s.style.setProperty("--b700",e[700]),s.style.setProperty("--b800",e[800]),s.style.setProperty("--b900",e[900]),s.style.setProperty("--accent-fg",e[700]),s.style.setProperty("--accent-surface",e[50]),s.style.setProperty("--focus-ring",e[700])}async init(){this.container.innerHTML='<div style="padding:1rem;color:#64748b;font-family:inherit">Loading comments\u2026</div>';try{let t=await fetch(this.configUrl);t.ok&&(this.config=await t.json(),this.config.primary_color&&this.applyTheme(this.config.primary_color));let e=await fetch(this.fetchUrl);if(!e.ok)throw new Error("Failed to load comments");let s=await e.json();this.render(s)}catch(t){this.container.innerHTML='<div style="padding:1rem;color:#dc2626;font-family:inherit">Error loading comments.</div>',console.error("[Discuss]",t)}}buildTree(t){let e={},s=[];return t.forEach(i=>{i.children=[],e[i.id]=i}),t.forEach(i=>{i.parent_id===0||!e[i.parent_id]?s.push(i):e[i.parent_id].children.push(i)}),s}render(t){let e=this.buildTree(t);this.container.innerHTML=`
            <div class="discuss-font-sans" style="color:var(--t1)">
                <div class="discuss-mb-10">
                    <h3 class="discuss-text-lg discuss-font-semibold" style="margin:0 0 1.25rem;color:var(--t1)">${this.title}</h3>
                    ${this.renderForm(0)}
                </div>
                ${e.length>0?`
                <div>
                    <h4 class="discuss-text-sm discuss-font-semibold discuss-uppercase discuss-tracking-wide" style="margin:0 0 1.25rem;color:var(--t4)">${e.length} Comment${e.length!==1?"s":""}</h4>
                    <div class="discuss-flex discuss-flex-col discuss-gap-6">
                        ${e.map(i=>this.renderComment(i)).join("")}
                    </div>
                </div>`:""}
            </div>
        `,this.container.querySelectorAll("form[data-parent]").forEach(i=>{i.addEventListener("submit",this.handleSubmit)}),this.container.querySelectorAll(".discuss-reply-tag").forEach(i=>{i.addEventListener("click",a=>{a.preventDefault();let n=a.currentTarget.getAttribute("href"),o=n.startsWith("#")?n.substring(1):n,r=document.getElementById(o);if(r){r.scrollIntoView({behavior:"smooth",block:"center"});let l=r.style.backgroundColor,c=document.documentElement.classList.contains("dark")||document.body.classList.contains("dark");r.style.backgroundColor=c?"#1e293b":"var(--b50)",r.style.borderRadius="8px",setTimeout(()=>{r.style.transition="background-color 500ms ease",r.style.backgroundColor=l,setTimeout(()=>{r.style.transition="",r.style.borderRadius=""},500)},1500)}})}),this.container.querySelectorAll(".discuss-reply-btn").forEach(i=>{i.addEventListener("click",a=>{let n=a.currentTarget.dataset.id,o=document.getElementById(`discuss-reply-form-${n}`);o&&o.classList.toggle("discuss-hidden")})});let s=i=>{let a=i.currentTarget.dataset.id,n=!1,o=document.getElementById(`discuss-collapse-target-${a}`);o&&(n=o.classList.toggle("discuss-hidden"));let r=document.getElementById(`discuss-children-${a}`);r&&(o?r.classList.toggle("discuss-hidden",n):n=r.classList.toggle("discuss-hidden"));let l=document.querySelector(`.discuss-collapse-btn[data-id="${a}"]`);if(l){let c=l.querySelector("svg");c&&(c.style.transform=n?"rotate(-90deg)":"rotate(0deg)")}};this.container.querySelectorAll(".discuss-collapse-btn, .discuss-collapse-line").forEach(i=>{i.addEventListener("click",s)}),this.container.querySelectorAll(".discuss-share-btn").forEach(i=>{i.addEventListener("click",async a=>{let n=a.currentTarget,o=n.dataset.id,r=`${window.location.origin}${window.location.pathname}#comment-${o}`;if(navigator.share){try{await navigator.share({title:document.title,url:r})}catch(l){if(l.name==="AbortError")return;await this.copyToClipboard(n,r)}return}await this.copyToClipboard(n,r)})})}async copyToClipboard(t,e){try{if(navigator.clipboard)await navigator.clipboard.writeText(e);else{window.prompt("Copy link:",e);return}t.innerHTML=`${u.share} <span>Copied!</span>`,setTimeout(()=>{t.innerHTML=`${u.share} <span>Share</span>`},2e3)}catch{window.prompt("Copy link:",e)}}getInitialsColor(t){let e=["#0d4891","#16a34a","#b45309","#1e40af","#dc2626","#6b21a8","#be185d","#0369a1"],s=0;for(let i=0;i<t.length;i++)s=t.charCodeAt(i)+((s<<5)-s);return e[Math.abs(s)%e.length]}getAvatarHtml(t){let e=t.name?t.name.charAt(0).toUpperCase():"U";return`
            <div style="width:100%;height:100%;background-color:${this.getInitialsColor(t.name||"")};display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:0.875rem;position:relative;overflow:hidden;border-radius:inherit;">
                ${e}
                <img src="${t.avatar}" alt="${t.name}" 
                     onerror="this.style.opacity='0';this.style.visibility='hidden'" 
                     onload="this.style.opacity='1';this.style.visibility='visible'" 
                     style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity 0.2s;" />
            </div>
        `}getAdminBadges(t){return""}getAdminTooltip(t){return""}getAdminControls(t){return""}renderComment(t,e,s,i){e=e||0;let a=t.is_pinned?'<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>':"",n=t.is_author?'<span class="discuss-badge discuss-badge-success" style="margin-left:0.375rem">Author</span>':"",o=new Date(t.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),r=this.getAdminBadges(t),l=this.getAdminTooltip(t),c=this.getAdminControls(t),m=s?`<a href="#comment-${i}" class="discuss-reply-tag"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>${s}</a>`:"",f=`
            <button class="discuss-collapse-btn" data-id="${t.id}" aria-label="Collapse" style="background:transparent;border:none;padding:0;cursor:pointer;color:var(--t4);display:inline-flex;align-items:center;margin-left:0.25rem;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 150ms;"><path d="m6 9 6 6 6-6"/></svg>
            </button>
        `,p="";if(t.children.length>0)if(e>=3){let g=t.children.map(k=>this.renderComment(k,3,t.name,t.id)).join("");p=`
                    <div id="discuss-children-${t.id}" style="display:contents">
                        ${g}
                    </div>
                `}else p=`
                    <div class="discuss-nested discuss-flex discuss-flex-col discuss-gap-4" id="discuss-children-${t.id}">
                        ${t.children.map(g=>this.renderComment(g,e+1)).join("")}
                    </div>
                `;let h=t.content;m&&(h.startsWith("<p>")?h=h.replace("<p>",`<p>${m}`):h=m+h);let $=t.children.length>0&&e<3?`
            <div class="discuss-collapse-line" data-id="${t.id}" aria-label="Collapse thread">
                <div class="discuss-thread-line"></div>
            </div>
        `:"",b=`
            <div class="discuss-flex discuss-comment-row" id="comment-${t.id}">
                ${$}
                <span class="discuss-avatar discuss-avatar-md discuss-flex-shrink-0" style="position:relative;z-index:20;overflow:hidden">
                    ${this.getAvatarHtml(t)}
                </span>
                <div class="discuss-comment-content" style="min-width:0">
                    <div style="display:flex;align-items:center;gap:0.375rem;flex-wrap:wrap;margin-bottom:0.375rem">
                        <span style="font-weight:600;font-size:0.875rem;color:var(--t1)">${t.name}</span>
                        ${n}${a}${r}${l}
                        <span style="color:var(--t5);font-size:0.75rem">\xB7</span>
                        <span style="font-size:0.8125rem;color:var(--t4)">${o}</span>
                        ${f}
                    </div>
                    
                    <div id="discuss-collapse-target-${t.id}">
                        <div class="discuss-comment-body">${h}</div>
                        <div class="discuss-flex discuss-gap-2 discuss-items-center" style="flex-wrap:wrap">
                            <button class="discuss-action-btn discuss-reply-btn" data-id="${t.id}">
                                ${u.reply} <span>Reply</span>
                            </button>
                            <button class="discuss-action-btn discuss-share-btn" data-id="${t.id}">
                                ${u.share} <span>Share</span>
                            </button>
                            ${c}
                        </div>

                        <div class="discuss-hidden" id="discuss-reply-form-${t.id}" style="margin-top:1rem">
                            ${this.renderForm(t.id)}
                        </div>

                        ${e<3?p:""}
                    </div>
                </div>
            </div>
        `;return e<3?b:b+p}renderForm(t){let e=this.config.honeypot_question?`<input type="text" name="honeypot_answer_given" placeholder="${this.config.honeypot_question}" style="display:none" tabindex="-1" autocomplete="off">`:"";return`
            <form data-parent="${t}" style="width:100%">
                <div class="discuss-form-container">
                    <textarea name="content" class="discuss-form-textarea" placeholder="Share your thoughts... (*markdown* supported)" required></textarea>
                    
                    <input type="text" name="honeypot_field" style="display:none" tabindex="-1" autocomplete="off">
                    ${e}
                    
                    <div class="discuss-form-bottom">
                        <div class="discuss-form-inputs">
                            <div class="discuss-form-input-wrapper">
                                ${this.icons.name}
                                <input type="text" name="name" class="discuss-form-input" placeholder="Name" required>
                            </div>
                            <div class="discuss-form-input-wrapper">
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
        `}async handleSubmit(t){t.preventDefault();let e=t.target,s=e.dataset.parent,i=e.querySelector('[type="submit"]');i.disabled=!0,i.innerHTML='<span class="discuss-spinner discuss-spinner-sm" style="margin-right:0.5rem"></span> Posting\u2026';let a={name:e.name.value.trim(),email:e.email.value.trim(),content:e.content.value.trim(),post_url:this.postUrl,parent_id:parseInt(s,10),honeypot_field:e.honeypot_field.value,honeypot_answer_given:e.honeypot_answer_given?e.honeypot_answer_given.value:void 0,...this.domainId?{domain_id:this.domainId}:{}};try{let n=await fetch(`${this.serverUrl}/api/comments`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(a)});if(n.ok){if(e.reset(),parseInt(s,10)!==0){let o=document.getElementById(`discuss-reply-form-${s}`);o&&o.classList.add("discuss-hidden")}this.init()}else{let o=await n.json();alert(o.error||"Failed to post comment.")}}catch(n){console.error("[Discuss]",n),alert("Network error. Please try again.")}finally{i.disabled=!1,i.textContent="Post Comment"}}};window.DiscussWidget=y;var v=document.getElementById("discuss-comments");v&&v.dataset.isAdmin!=="true"&&new y({container:v});})();
