(()=>{var p={reply:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>',share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'};var S=document.currentScript,M=S?new URL(S.src).origin:window.location.origin;function _(d){let t=parseInt(d.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}function k(d,t,s){return"#"+[d,t,s].map(i=>Math.round(Math.max(0,Math.min(255,i))).toString(16).padStart(2,"0")).join("")}function L(d,t,s){d/=255,t/=255,s/=255;let i=Math.max(d,t,s),e=Math.min(d,t,s),a,n,o=(i+e)/2;if(i===e)a=n=0;else{let r=i-e;switch(n=o>.5?r/(2-i-e):r/(i+e),i){case d:a=((t-s)/r+(t<s?6:0))/6;break;case t:a=((s-d)/r+2)/6;break;default:a=((d-t)/r+4)/6}}return[a*360,n,o]}function E(d,t,s){d/=360;let i=(n,o,r)=>(r<0&&(r+=1),r>1&&(r-=1),r<1/6?n+(o-n)*6*r:r<1/2?o:r<2/3?n+(o-n)*(2/3-r)*6:n);if(t===0){let n=Math.round(s*255);return[n,n,n]}let e=s<.5?s*(1+t):s+t-s*t,a=2*s-e;return[i(a,e,d+1/3),i(a,e,d),i(a,e,d-1/3)].map(n=>Math.round(n*255))}function T(d,t){if(!d)return null;if(d=d.trim(),d.startsWith("var(")||d.startsWith("--")){let a=d.startsWith("var(")?d.slice(4,-1).split(",")[0].trim():d,n=document.createElement("span");n.style.cssText="position:fixed;left:-9999px;top:-9999px;color:var("+a+")",t.appendChild(n);let o=getComputedStyle(n).color;return t.removeChild(n),o?T(o,t):null}if(/^#[0-9a-fA-F]{6}$/.test(d))return d;if(/^#[0-9a-fA-F]{3}$/.test(d)){let[,a,n,o]=d.match(/^#(.)(.)(.)$/);return`#${a}${a}${n}${n}${o}${o}`}let s=d.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(s)return k(+s[1],+s[2],+s[3]);let i=d.match(/^hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(i){let[a,n,o]=E(+i[1],+i[2]/100,+i[3]/100);return k(a,n,o)}let e=d.match(/^oklch\(\s*([\d.]+%?)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(e){let a=parseFloat(e[1]);e[1].includes("%")&&(a/=100);let n=parseFloat(e[2]),o=parseFloat(e[3])*Math.PI/180,r=n*Math.cos(o),c=n*Math.sin(o),l=a+.3963377774*r+.2158037573*c,h=a-.1055613458*r-.0638541728*c,u=a-.0894841775*r-1.291485548*c,y=l**3,f=h**3,m=u**3,x=4.0767416621*y-3.3077115913*f+.2309699292*m,v=-1.2684380046*y+2.6097574011*f-.3413193965*m,g=-.0041960863*y-.7034186147*f+1.707614701*m,b=C=>C<=.0031308?12.92*C:1.055*C**(1/2.4)-.055;return k(Math.round(Math.max(0,Math.min(1,b(x)))*255),Math.round(Math.max(0,Math.min(1,b(v)))*255),Math.round(Math.max(0,Math.min(1,b(g)))*255))}return null}function I(d){let[t,s,i]=_(d),[e,a]=L(t,s,i),n={50:.96,100:.93,200:.86,300:.74,400:.6,500:.48,600:.38,700:.3,800:.22,900:.15},o={};for(let[r,c]of Object.entries(n)){let[l,h,u]=E(e,Math.min(a,.85),c);o[r]=k(l,h,u)}return o}var $=class{constructor(t){window.DiscussWidgetInstance=this,this.container=t.container,this.container&&(this.postUrl=t.postUrl||this.container.dataset.url||window.location.pathname,this.serverUrl=t.serverUrl||M,this.fetchUrl=t.fetchUrl||`${this.serverUrl}/api/comments?post_url=${encodeURIComponent(this.postUrl)}`,this.configUrl=t.configUrl||`${this.serverUrl}/api/comments/config`,this.config={},this.primaryColor=t.primaryColor||null,this.domainId=t.domainId||null,this.title=t.title??"Leave a comment",this.placeholder=t.placeholder??"Share your thoughts... (*markdown* supported)",this.darkSelector=t.darkSelector||null,this.icons={name:t.icons?.name!==void 0?t.icons.name:p.user,email:t.icons?.email!==void 0?t.icons.email:p.mail,submit:t.icons?.submit!==void 0?t.icons.submit:p.send},this.editTokens=new Map,this._rawContent=new Map,this.init=this.init.bind(this),this.render=this.render.bind(this),this.renderComment=this.renderComment.bind(this),this.renderForm=this.renderForm.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.primaryColor&&this.applyTheme(this.primaryColor),this.watchPrimaryColor(),this.init())}applyTheme(t){let s=T(t,this.container);if(!s)return;let i=I(s),e=this.container;e.style.setProperty("--brand-50",i[50]),e.style.setProperty("--brand-100",i[100]),e.style.setProperty("--brand-200",i[200]),e.style.setProperty("--brand-300",i[300]),e.style.setProperty("--brand-400",i[400]),e.style.setProperty("--brand-500",i[500]),e.style.setProperty("--brand-600",i[600]),e.style.setProperty("--brand-700",i[700]),e.style.setProperty("--brand-800",i[800]),e.style.setProperty("--brand-900",i[900]),e.style.setProperty("--accent-fg",i[700]),e.style.setProperty("--accent-surface",i[50]),e.style.setProperty("--focus-ring",i[700])}watchPrimaryColor(){if(!this.primaryColor||!this.darkSelector)return;let t=this.primaryColor.trim();if(!t.startsWith("var(")&&!t.startsWith("--"))return;let s=()=>this.applyTheme(this.primaryColor),i=e=>{e&&new MutationObserver(s).observe(e,{attributes:!0,attributeFilter:["class"]})};i(document.documentElement),i(document.body)}injectDarkStyles(){if(!this.darkSelector)return;let t="discuss-dark-style";if(document.getElementById(t))return;let s=document.createElement("style");s.id=t,s.textContent=`${this.darkSelector} #discuss-comments {
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
        }`,document.head.appendChild(s)}async init(){this.injectDarkStyles(),this.container.innerHTML='<div style="padding:1rem;color:#64748b;font-family:inherit">Loading comments\u2026</div>';try{let t=await fetch(this.configUrl);t.ok&&(this.config=await t.json(),this.config.primary_color&&!this.primaryColor&&this.applyTheme(this.config.primary_color));let s=await fetch(this.fetchUrl);if(!s.ok)throw new Error("Failed to load comments");let i=await s.json();this.render(i)}catch(t){this.container.innerHTML='<div style="padding:1rem;color:#dc2626;font-family:inherit">Error loading comments.</div>',console.error("[Discuss]",t)}}buildTree(t){let s={},i=[];return t.forEach(e=>{e.children=[],s[e.id]=e}),t.forEach(e=>{e.parent_id===0||!s[e.parent_id]?i.push(e):s[e.parent_id].children.push(e)}),i}render(t){t.forEach(e=>{e.content_raw&&this._rawContent.set(e.id,e.content_raw)});let s=this.buildTree(t);this.container.innerHTML=`
            <div class="discuss-font-sans" style="color:var(--text-primary)">
                <div class="discuss-mb-10">
                    <h3 class="discuss-text-lg discuss-font-semibold" style="margin:0 0 1.25rem;color:var(--text-primary)">${this.title}</h3>
                    ${this.renderForm(0)}
                </div>
                ${s.length>0?`
                <div>
                    <h4 class="discuss-text-sm discuss-font-semibold discuss-uppercase discuss-tracking-wide" style="margin:0 0 1.25rem;color:var(--text-tertiary)">${s.length} Comment${s.length!==1?"s":""}</h4>
                    <div class="discuss-flex discuss-flex-col discuss-gap-6">
                        ${s.map(e=>this.renderComment(e)).join("")}
                    </div>
                </div>`:""}
            </div>
        `,this.container.querySelectorAll("form[data-parent]").forEach(e=>{e.addEventListener("submit",this.handleSubmit)}),this.container.querySelectorAll(".discuss-reply-tag").forEach(e=>{e.addEventListener("click",a=>{a.preventDefault();let n=a.currentTarget.getAttribute("href"),o=n.startsWith("#")?n.substring(1):n,r=document.getElementById(o);if(r){r.scrollIntoView({behavior:"smooth",block:"center"});let c=r.style.backgroundColor,l=this.darkSelector?!!document.querySelector(this.darkSelector):!1;r.style.backgroundColor=l?"var(--accent-surface)":"var(--brand-50)",r.style.borderRadius="8px",setTimeout(()=>{r.style.transition="background-color 500ms ease",r.style.backgroundColor=c,setTimeout(()=>{r.style.transition="",r.style.borderRadius=""},500)},1500)}})}),this.container.querySelectorAll(".discuss-reply-btn").forEach(e=>{e.addEventListener("click",a=>{let n=a.currentTarget.dataset.id,o=document.getElementById(`discuss-reply-form-${n}`);o&&o.classList.toggle("discuss-hidden")})});let i=e=>{let a=e.currentTarget.dataset.id,n=!1,o=document.getElementById(`discuss-collapse-target-${a}`);o&&(n=o.classList.toggle("discuss-hidden"));let r=document.getElementById(`discuss-children-${a}`);r&&(o?r.classList.toggle("discuss-hidden",n):n=r.classList.toggle("discuss-hidden"));let c=document.querySelector(`.discuss-collapse-btn[data-id="${a}"]`);if(c){let l=c.querySelector("svg");l&&(l.style.transform=n?"rotate(-90deg)":"rotate(0deg)")}};this.container.querySelectorAll(".discuss-collapse-btn, .discuss-collapse-line").forEach(e=>{e.addEventListener("click",i)}),this.container.querySelectorAll(".discuss-edit-btn").forEach(e=>{e.addEventListener("click",a=>{let n=parseInt(a.currentTarget.dataset.id,10);this._startInlineEdit(n)})}),this.container.querySelectorAll(".discuss-share-btn").forEach(e=>{e.addEventListener("click",async a=>{let n=a.currentTarget,o=n.dataset.id,r=`${window.location.origin}${window.location.pathname}#comment-${o}`;if(navigator.share){try{await navigator.share({title:document.title,url:r})}catch(c){if(c.name==="AbortError")return;await this.copyToClipboard(n,r)}return}await this.copyToClipboard(n,r)})})}async copyToClipboard(t,s){try{if(navigator.clipboard)await navigator.clipboard.writeText(s);else{window.prompt("Copy link:",s);return}t.innerHTML=`${p.share} <span>Copied!</span>`,setTimeout(()=>{t.innerHTML=`${p.share} <span>Share</span>`},2e3)}catch{window.prompt("Copy link:",s)}}getInitialsColor(t){let s=["#0d4891","#16a34a","#b45309","#1e40af","#dc2626","#6b21a8","#be185d","#0369a1"],i=0;for(let e=0;e<t.length;e++)i=t.charCodeAt(e)+((i<<5)-i);return s[Math.abs(i)%s.length]}getAvatarHtml(t){let s=t.name?t.name.charAt(0).toUpperCase():"U";return`
            <div style="width:100%;height:100%;background-color:${this.getInitialsColor(t.name||"")};display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:0.875rem;position:relative;overflow:hidden;border-radius:inherit;">
                ${s}
                <img src="${t.avatar}" alt="${t.name}" 
                     onerror="this.style.opacity='0';this.style.visibility='hidden'" 
                     onload="this.style.opacity='1';this.style.visibility='visible'" 
                     style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity 0.2s;" />
            </div>
        `}getAdminBadges(t){return""}getAdminTooltip(t){return""}getAdminControls(t){return""}getEditButton(t){return this.editTokens.has(t.id)?`<button class="discuss-action-btn discuss-edit-btn" data-id="${t.id}">${p.edit} <span>Edit</span></button>`:""}_startInlineEdit(t){let s=document.getElementById(`discuss-collapse-target-${t}`);if(!s)return;let i=s.querySelector(".discuss-comment-body"),e=s.querySelector(".discuss-flex.discuss-gap-2");if(!i||!e)return;let a=i.innerHTML,n=this._rawContent.get(t)||"",o=document.createElement("div");o.className="discuss-form-container";let r=document.createElement("textarea");r.className="discuss-form-textarea",r.value=n;let c=document.createElement("div");c.className="discuss-form-bottom",c.style.justifyContent="flex-end";let l=document.createElement("div");l.className="discuss-form-actions discuss-gap-2";let h=document.createElement("button");h.type="button",h.className="discuss-action-btn",h.textContent="Cancel";let u=document.createElement("button");u.type="button",u.className="discuss-btn discuss-btn-primary",u.textContent="Save",l.appendChild(h),l.appendChild(u),c.appendChild(l),o.appendChild(r),o.appendChild(c),i.innerHTML="",i.appendChild(o),e.style.display="none",r.focus(),r.setSelectionRange(r.value.length,r.value.length),u.addEventListener("click",()=>{this._saveEdit(t,r.value,u,i,e,a)}),h.addEventListener("click",()=>{i.innerHTML=a,e.style.display="",this.container.querySelectorAll(`.discuss-edit-btn[data-id="${t}"]`).forEach(y=>{y.addEventListener("click",()=>this._startInlineEdit(t))})})}async _saveEdit(t,s,i,e,a,n){let o=this.editTokens.get(t);if(!(!o||!s.trim())){i.disabled=!0,i.textContent="Saving\u2026";try{let r=await fetch(`${this.serverUrl}/api/comments/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json","X-Edit-Token":o},credentials:"include",body:JSON.stringify({content:s.trim()})});if(r.ok)this._rawContent.set(t,s.trim()),this.init();else{let c=await r.json();alert(c.error||"Failed to save edit."),i.disabled=!1,i.textContent="Save"}}catch(r){console.error("[Discuss]",r),alert("Network error. Please try again."),i.disabled=!1,i.textContent="Save"}}}renderComment(t,s,i,e){s=s||0;let a=t.is_pinned?'<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>':"",n=t.is_author?'<span class="discuss-badge discuss-badge-success" style="margin-left:0.375rem">Author</span>':"",o=t.edited_at?'<span style="font-size:0.8125rem;color:var(--text-muted)">(edited)</span>':"",r=new Date(t.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),c=this.getAdminBadges(t),l=this.getAdminTooltip(t),h=this.getAdminControls(t),u=i?`<a href="#comment-${e}" class="discuss-reply-tag"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>${i}</a>`:"",y=`
            <button class="discuss-collapse-btn" data-id="${t.id}" aria-label="Collapse" style="background:transparent;border:none;padding:0;cursor:pointer;color:var(--text-muted);display:inline-flex;align-items:center;margin-left:0.25rem;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 150ms;"><path d="m6 9 6 6 6-6"/></svg>
            </button>
        `,f="";if(t.children.length>0)if(s>=3){let g=t.children.map(b=>this.renderComment(b,3,t.name,t.id)).join("");f=`
                    <div id="discuss-children-${t.id}" style="display:contents">
                        ${g}
                    </div>
                `}else f=`
                    <div class="discuss-nested discuss-flex discuss-flex-col discuss-gap-4" id="discuss-children-${t.id}">
                        ${t.children.map(g=>this.renderComment(g,s+1)).join("")}
                    </div>
                `;let m=t.content;u&&(m.startsWith("<p>")?m=m.replace("<p>",`<p>${u}`):m=u+m);let x=t.children.length>0&&s<3?`
            <div class="discuss-collapse-line" data-id="${t.id}" aria-label="Collapse thread">
                <div class="discuss-thread-line"></div>
            </div>
        `:"",v=`
            <div class="discuss-flex discuss-comment-row" id="comment-${t.id}">
                ${x}
                <span class="discuss-avatar discuss-avatar-md discuss-flex-shrink-0" style="position:relative;z-index:20;overflow:hidden">
                    ${this.getAvatarHtml(t)}
                </span>
                <div class="discuss-comment-content" style="min-width:0">
                    <div style="display:flex;align-items:center;gap:0.375rem;flex-wrap:wrap;margin-bottom:0.375rem">
                        <span style="font-weight:600;font-size:0.875rem;color:var(--text-primary)">${t.name}</span>
                        ${n}${a}${o}${c}${l}
                        <span style="color:var(--text-subtle);font-size:0.75rem">\xB7</span>
                        <span style="font-size:0.8125rem;color:var(--text-muted)">${r}</span>
                        ${y}
                    </div>
                    
                    <div id="discuss-collapse-target-${t.id}">
                        <div class="discuss-comment-body">${m}</div>
                        <div class="discuss-flex discuss-gap-2 discuss-items-center" style="flex-wrap:wrap">
                            <button class="discuss-action-btn discuss-reply-btn" data-id="${t.id}">
                                ${p.reply} <span>Reply</span>
                            </button>
                            <button class="discuss-action-btn discuss-share-btn" data-id="${t.id}">
                                ${p.share} <span>Share</span>
                            </button>
                            ${this.getEditButton(t)}
                            ${h}
                        </div>

                        <div class="discuss-hidden" id="discuss-reply-form-${t.id}" style="margin-top:1rem">
                            ${this.renderForm(t.id)}
                        </div>

                        ${s<3?f:""}
                    </div>
                </div>
            </div>
        `;return s<3?v:v+f}renderForm(t){let s=this.config.honeypot_question?`<input type="text" name="honeypot_answer_given" placeholder="${this.config.honeypot_question}" style="display:none" tabindex="-1" autocomplete="off">`:"";return`
            <form data-parent="${t}" style="width:100%">
                <div class="discuss-form-container">
                    <textarea name="content" class="discuss-form-textarea" placeholder="${this.placeholder}" required></textarea>
                    
                    <input type="text" name="honeypot_field" style="display:none" tabindex="-1" autocomplete="off">
                    ${s}
                    
                    <div class="discuss-form-bottom">
                        <div class="discuss-form-inputs">
                            <div class="discuss-form-input-wrapper${this.icons.name===""?" discuss-input-no-icon":""}">
                                ${this.icons.name}
                                <input type="text" name="name" class="discuss-form-input" placeholder="Name" required>
                            </div>
                            <div class="discuss-form-input-wrapper${this.icons.email===""?" discuss-input-no-icon":""}">
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
        `}async handleSubmit(t){t.preventDefault();let s=t.target,i=s.dataset.parent,e=s.querySelector('[type="submit"]');e.disabled=!0,e.innerHTML='<span class="discuss-spinner discuss-spinner-sm" style="margin-right:0.5rem"></span> Posting\u2026';let a={name:s.name.value.trim(),email:s.email.value.trim(),content:s.content.value.trim(),post_url:this.postUrl,parent_id:parseInt(i,10),honeypot_field:s.honeypot_field.value,honeypot_answer_given:s.honeypot_answer_given?s.honeypot_answer_given.value:void 0,...this.domainId?{domain_id:this.domainId}:{}};try{let n=await fetch(`${this.serverUrl}/api/comments`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(a)});if(n.ok){let o=await n.json();if(o.editToken&&this.editTokens.set(o.id,o.editToken),s.reset(),parseInt(i,10)!==0){let r=document.getElementById(`discuss-reply-form-${i}`);r&&r.classList.add("discuss-hidden")}this.init()}else{let o=await n.json();alert(o.error||"Failed to post comment.")}}catch(n){console.error("[Discuss]",n),alert("Network error. Please try again.")}finally{e.disabled=!1,e.textContent="Post Comment"}}};window.DiscussWidget=$;var w=document.getElementById("discuss-comments");w&&w.dataset.isAdmin!=="true"&&new $({container:w,darkSelector:w.dataset.darkSelector||null});})();
