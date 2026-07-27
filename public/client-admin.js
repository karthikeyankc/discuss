(()=>{var u={reply:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>',share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'};var S=document.currentScript,_=S?new URL(S.src).origin:window.location.origin;function A(d){let e=parseInt(d.replace("#",""),16);return[e>>16&255,e>>8&255,e&255]}function x(d,e,s){return"#"+[d,e,s].map(n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0")).join("")}function B(d,e,s){d/=255,e/=255,s/=255;let n=Math.max(d,e,s),t=Math.min(d,e,s),r,i,a=(n+t)/2;if(n===t)r=i=0;else{let o=n-t;switch(i=a>.5?o/(2-n-t):o/(n+t),n){case d:r=((e-s)/o+(e<s?6:0))/6;break;case e:r=((s-d)/o+2)/6;break;default:r=((d-e)/o+4)/6}}return[r*360,i,a]}function M(d,e,s){d/=360;let n=(i,a,o)=>(o<0&&(o+=1),o>1&&(o-=1),o<1/6?i+(a-i)*6*o:o<1/2?a:o<2/3?i+(a-i)*(2/3-o)*6:i);if(e===0){let i=Math.round(s*255);return[i,i,i]}let t=s<.5?s*(1+e):s+e-s*e,r=2*s-t;return[n(r,t,d+1/3),n(r,t,d),n(r,t,d-1/3)].map(i=>Math.round(i*255))}function E(d,e){if(!d)return null;if(d=d.trim(),d.startsWith("var(")||d.startsWith("--")){let r=d.startsWith("var(")?d.slice(4,-1).split(",")[0].trim():d,i=document.createElement("span");i.style.cssText="position:fixed;left:-9999px;top:-9999px;color:var("+r+")",e.appendChild(i);let a=getComputedStyle(i).color;return e.removeChild(i),a?E(a,e):null}if(/^#[0-9a-fA-F]{6}$/.test(d))return d;if(/^#[0-9a-fA-F]{3}$/.test(d)){let[,r,i,a]=d.match(/^#(.)(.)(.)$/);return`#${r}${r}${i}${i}${a}${a}`}let s=d.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(s)return x(+s[1],+s[2],+s[3]);let n=d.match(/^hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(n){let[r,i,a]=M(+n[1],+n[2]/100,+n[3]/100);return x(r,i,a)}let t=d.match(/^oklch\(\s*([\d.]+%?)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(t){let r=parseFloat(t[1]);t[1].includes("%")&&(r/=100);let i=parseFloat(t[2]),a=parseFloat(t[3])*Math.PI/180,o=i*Math.cos(a),l=i*Math.sin(a),c=r+.3963377774*o+.2158037573*l,p=r-.1055613458*o-.0638541728*l,h=r-.0894841775*o-1.291485548*l,y=c**3,m=p**3,g=h**3,$=4.0767416621*y-3.3077115913*m+.2309699292*g,w=-1.2684380046*y+2.6097574011*m-.3413193965*g,v=-.0041960863*y-.7034186147*m+1.707614701*g,b=C=>C<=.0031308?12.92*C:1.055*C**(1/2.4)-.055;return x(Math.round(Math.max(0,Math.min(1,b($)))*255),Math.round(Math.max(0,Math.min(1,b(w)))*255),Math.round(Math.max(0,Math.min(1,b(v)))*255))}return null}function I(d){let[e,s,n]=A(d),[t,r]=B(e,s,n),i={50:.96,100:.93,200:.86,300:.74,400:.6,500:.48,600:.38,700:.3,800:.22,900:.15},a={};for(let[o,l]of Object.entries(i)){let[c,p,h]=M(t,Math.min(r,.85),l);a[o]=x(c,p,h)}return a}var f=class{constructor(e){window.DiscussWidgetInstance=this,this.container=e.container,this.container&&(this.postUrl=e.postUrl||this.container.dataset.url||window.location.pathname,this.serverUrl=e.serverUrl||_,this.fetchUrl=e.fetchUrl||`${this.serverUrl}/api/comments?post_url=${encodeURIComponent(this.postUrl)}`,this.configUrl=e.configUrl||`${this.serverUrl}/api/comments/config`,this.config={},this.primaryColor=e.primaryColor||null,this.domainId=e.domainId||null,this.title=e.title??"Leave a comment",this.placeholder=e.placeholder??"Share your thoughts... (*markdown* supported)",this.darkSelector=e.darkSelector||null,this.icons={name:e.icons?.name!==void 0?e.icons.name:u.user,email:e.icons?.email!==void 0?e.icons.email:u.mail,submit:e.icons?.submit!==void 0?e.icons.submit:u.send},this.editTokens=new Map,this._rawContent=new Map,this.init=this.init.bind(this),this.render=this.render.bind(this),this.renderComment=this.renderComment.bind(this),this.renderForm=this.renderForm.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.primaryColor&&this.applyTheme(this.primaryColor),this.watchPrimaryColor(),this.init())}applyTheme(e){let s=E(e,this.container);if(!s)return;let n=I(s),t=this.container;t.style.setProperty("--brand-50",n[50]),t.style.setProperty("--brand-100",n[100]),t.style.setProperty("--brand-200",n[200]),t.style.setProperty("--brand-300",n[300]),t.style.setProperty("--brand-400",n[400]),t.style.setProperty("--brand-500",n[500]),t.style.setProperty("--brand-600",n[600]),t.style.setProperty("--brand-700",n[700]),t.style.setProperty("--brand-800",n[800]),t.style.setProperty("--brand-900",n[900]),t.style.setProperty("--accent-fg",n[700]),t.style.setProperty("--accent-surface",n[50]),t.style.setProperty("--focus-ring",n[700])}watchPrimaryColor(){if(!this.primaryColor||!this.darkSelector)return;let e=this.primaryColor.trim();if(!e.startsWith("var(")&&!e.startsWith("--"))return;let s=()=>this.applyTheme(this.primaryColor),n=t=>{t&&new MutationObserver(s).observe(t,{attributes:!0,attributeFilter:["class"]})};n(document.documentElement),n(document.body)}injectDarkStyles(){if(!this.darkSelector)return;let e="discuss-dark-style";if(document.getElementById(e))return;let s=document.createElement("style");s.id=e,s.textContent=`${this.darkSelector} #discuss-comments {
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
        }`,document.head.appendChild(s)}async init(){this.injectDarkStyles(),this.container.innerHTML='<div style="padding:1rem;color:#64748b;font-family:inherit">Loading comments\u2026</div>';try{let e=await fetch(this.configUrl);e.ok&&(this.config=await e.json(),this.config.primary_color&&!this.primaryColor&&this.applyTheme(this.config.primary_color));let s=await fetch(this.fetchUrl);if(!s.ok)throw new Error("Failed to load comments");let n=await s.json();this.render(n)}catch(e){this.container.innerHTML='<div style="padding:1rem;color:#dc2626;font-family:inherit">Error loading comments.</div>',console.error("[Discuss]",e)}}buildTree(e){let s={},n=[];return e.forEach(t=>{t.children=[],s[t.id]=t}),e.forEach(t=>{t.parent_id===0||!s[t.parent_id]?n.push(t):s[t.parent_id].children.push(t)}),n}render(e){e.forEach(t=>{t.content_raw&&this._rawContent.set(t.id,t.content_raw)});let s=this.buildTree(e);this.container.innerHTML=`
            <div class="discuss-font-sans" style="color:var(--text-primary)">
                <div class="discuss-mb-10">
                    <h3 class="discuss-text-lg discuss-font-semibold" style="margin:0 0 1.25rem;color:var(--text-primary)">${this.title}</h3>
                    ${this.renderForm(0)}
                </div>
                ${s.length>0?`
                <div>
                    <h4 class="discuss-text-sm discuss-font-semibold discuss-uppercase discuss-tracking-wide" style="margin:0 0 1.25rem;color:var(--text-tertiary)">${s.length} Comment${s.length!==1?"s":""}</h4>
                    <div class="discuss-flex discuss-flex-col discuss-gap-6">
                        ${s.map(t=>this.renderComment(t)).join("")}
                    </div>
                </div>`:""}
            </div>
        `,this.container.querySelectorAll("form[data-parent]").forEach(t=>{t.addEventListener("submit",this.handleSubmit)}),this.container.querySelectorAll(".discuss-reply-tag").forEach(t=>{t.addEventListener("click",r=>{r.preventDefault();let i=r.currentTarget.getAttribute("href"),a=i.startsWith("#")?i.substring(1):i,o=document.getElementById(a);if(o){o.scrollIntoView({behavior:"smooth",block:"center"});let l=o.style.backgroundColor,c=this.darkSelector?!!document.querySelector(this.darkSelector):!1;o.style.backgroundColor=c?"var(--accent-surface)":"var(--brand-50)",o.style.borderRadius="8px",setTimeout(()=>{o.style.transition="background-color 500ms ease",o.style.backgroundColor=l,setTimeout(()=>{o.style.transition="",o.style.borderRadius=""},500)},1500)}})}),this.container.querySelectorAll(".discuss-reply-btn").forEach(t=>{t.addEventListener("click",r=>{let i=r.currentTarget.dataset.id,a=document.getElementById(`discuss-reply-form-${i}`);a&&a.classList.toggle("discuss-hidden")})});let n=t=>{let r=t.currentTarget.dataset.id,i=!1,a=document.getElementById(`discuss-collapse-target-${r}`);a&&(i=a.classList.toggle("discuss-hidden"));let o=document.getElementById(`discuss-children-${r}`);o&&(a?o.classList.toggle("discuss-hidden",i):i=o.classList.toggle("discuss-hidden"));let l=document.querySelector(`.discuss-collapse-btn[data-id="${r}"]`);if(l){let c=l.querySelector("svg");c&&(c.style.transform=i?"rotate(-90deg)":"rotate(0deg)")}};this.container.querySelectorAll(".discuss-collapse-btn, .discuss-collapse-line").forEach(t=>{t.addEventListener("click",n)}),this.container.querySelectorAll(".discuss-edit-btn").forEach(t=>{t.addEventListener("click",r=>{let i=parseInt(r.currentTarget.dataset.id,10);this._startInlineEdit(i)})}),this.container.querySelectorAll(".discuss-share-btn").forEach(t=>{t.addEventListener("click",async r=>{let i=r.currentTarget,a=i.dataset.id,o=`${window.location.origin}${window.location.pathname}#comment-${a}`;if(navigator.share){try{await navigator.share({title:document.title,url:o})}catch(l){if(l.name==="AbortError")return;await this.copyToClipboard(i,o)}return}await this.copyToClipboard(i,o)})})}async copyToClipboard(e,s){try{if(navigator.clipboard)await navigator.clipboard.writeText(s);else{window.prompt("Copy link:",s);return}e.innerHTML=`${u.share} <span>Copied!</span>`,setTimeout(()=>{e.innerHTML=`${u.share} <span>Share</span>`},2e3)}catch{window.prompt("Copy link:",s)}}getInitialsColor(e){let s=["#0d4891","#16a34a","#b45309","#1e40af","#dc2626","#6b21a8","#be185d","#0369a1"],n=0;for(let t=0;t<e.length;t++)n=e.charCodeAt(t)+((n<<5)-n);return s[Math.abs(n)%s.length]}getAvatarHtml(e){let s=e.name?e.name.charAt(0).toUpperCase():"U";return`
            <div style="width:100%;height:100%;background-color:${this.getInitialsColor(e.name||"")};display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:0.875rem;position:relative;overflow:hidden;border-radius:inherit;">
                ${s}
                <img src="${e.avatar}" alt="${e.name}" 
                     onerror="this.style.opacity='0';this.style.visibility='hidden'" 
                     onload="this.style.opacity='1';this.style.visibility='visible'" 
                     style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity 0.2s;" />
            </div>
        `}getAdminBadges(e){return""}getAdminTooltip(e){return""}getAdminControls(e){return""}getEditButton(e){return this.editTokens.has(e.id)?`<button class="discuss-action-btn discuss-edit-btn" data-id="${e.id}">${u.edit} <span>Edit</span></button>`:""}_startInlineEdit(e){let s=document.getElementById(`discuss-collapse-target-${e}`);if(!s)return;let n=s.querySelector(".discuss-comment-body"),t=s.querySelector(".discuss-flex.discuss-gap-2");if(!n||!t)return;let r=n.innerHTML,i=t.innerHTML,a=this._rawContent.get(e)||"",o=document.createElement("textarea");o.className="discuss-form-textarea",o.style.marginBottom="0.5rem",o.value=a,n.innerHTML="",n.appendChild(o);let l=document.createElement("button");l.className="discuss-btn discuss-btn-primary",l.style.cssText="font-size:0.8125rem;padding:0.25rem 0.75rem;margin-right:0.5rem",l.textContent="Save";let c=document.createElement("button");c.className="discuss-action-btn",c.style.cssText="font-size:0.8125rem",c.textContent="Cancel",t.innerHTML="",t.appendChild(l),t.appendChild(c),o.focus(),o.setSelectionRange(o.value.length,o.value.length),l.addEventListener("click",()=>{this._saveEdit(e,o.value,t,r,i)}),c.addEventListener("click",()=>{n.innerHTML=r,t.innerHTML=i,this.container.querySelectorAll(`.discuss-edit-btn[data-id="${e}"]`).forEach(p=>{p.addEventListener("click",()=>this._startInlineEdit(e))})})}async _saveEdit(e,s,n,t,r){let i=this.editTokens.get(e);if(!i||!s.trim())return;let a=n.querySelector("button");a&&(a.disabled=!0,a.textContent="Saving\u2026");try{let o=await fetch(`${this.serverUrl}/api/comments/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json","X-Edit-Token":i},credentials:"include",body:JSON.stringify({content:s.trim()})});if(o.ok)this._rawContent.set(e,s.trim()),this.init();else{let l=await o.json();alert(l.error||"Failed to save edit."),a&&(a.disabled=!1,a.textContent="Save")}}catch(o){console.error("[Discuss]",o),alert("Network error. Please try again."),a&&(a.disabled=!1,a.textContent="Save")}}renderComment(e,s,n,t){s=s||0;let r=e.is_pinned?'<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>':"",i=e.is_author?'<span class="discuss-badge discuss-badge-success" style="margin-left:0.375rem">Author</span>':"",a=e.edited_at?'<span style="margin-left:0.375rem;font-size:0.6875rem;color:var(--text-subtle);font-style:italic">(edited)</span>':"",o=new Date(e.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),l=this.getAdminBadges(e),c=this.getAdminTooltip(e),p=this.getAdminControls(e),h=n?`<a href="#comment-${t}" class="discuss-reply-tag"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>${n}</a>`:"",y=`
            <button class="discuss-collapse-btn" data-id="${e.id}" aria-label="Collapse" style="background:transparent;border:none;padding:0;cursor:pointer;color:var(--text-muted);display:inline-flex;align-items:center;margin-left:0.25rem;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 150ms;"><path d="m6 9 6 6 6-6"/></svg>
            </button>
        `,m="";if(e.children.length>0)if(s>=3){let v=e.children.map(b=>this.renderComment(b,3,e.name,e.id)).join("");m=`
                    <div id="discuss-children-${e.id}" style="display:contents">
                        ${v}
                    </div>
                `}else m=`
                    <div class="discuss-nested discuss-flex discuss-flex-col discuss-gap-4" id="discuss-children-${e.id}">
                        ${e.children.map(v=>this.renderComment(v,s+1)).join("")}
                    </div>
                `;let g=e.content;h&&(g.startsWith("<p>")?g=g.replace("<p>",`<p>${h}`):g=h+g);let $=e.children.length>0&&s<3?`
            <div class="discuss-collapse-line" data-id="${e.id}" aria-label="Collapse thread">
                <div class="discuss-thread-line"></div>
            </div>
        `:"",w=`
            <div class="discuss-flex discuss-comment-row" id="comment-${e.id}">
                ${$}
                <span class="discuss-avatar discuss-avatar-md discuss-flex-shrink-0" style="position:relative;z-index:20;overflow:hidden">
                    ${this.getAvatarHtml(e)}
                </span>
                <div class="discuss-comment-content" style="min-width:0">
                    <div style="display:flex;align-items:center;gap:0.375rem;flex-wrap:wrap;margin-bottom:0.375rem">
                        <span style="font-weight:600;font-size:0.875rem;color:var(--text-primary)">${e.name}</span>
                        ${i}${r}${a}${l}${c}
                        <span style="color:var(--text-subtle);font-size:0.75rem">\xB7</span>
                        <span style="font-size:0.8125rem;color:var(--text-muted)">${o}</span>
                        ${y}
                    </div>
                    
                    <div id="discuss-collapse-target-${e.id}">
                        <div class="discuss-comment-body">${g}</div>
                        <div class="discuss-flex discuss-gap-2 discuss-items-center" style="flex-wrap:wrap">
                            <button class="discuss-action-btn discuss-reply-btn" data-id="${e.id}">
                                ${u.reply} <span>Reply</span>
                            </button>
                            <button class="discuss-action-btn discuss-share-btn" data-id="${e.id}">
                                ${u.share} <span>Share</span>
                            </button>
                            ${this.getEditButton(e)}
                            ${p}
                        </div>

                        <div class="discuss-hidden" id="discuss-reply-form-${e.id}" style="margin-top:1rem">
                            ${this.renderForm(e.id)}
                        </div>

                        ${s<3?m:""}
                    </div>
                </div>
            </div>
        `;return s<3?w:w+m}renderForm(e){let s=this.config.honeypot_question?`<input type="text" name="honeypot_answer_given" placeholder="${this.config.honeypot_question}" style="display:none" tabindex="-1" autocomplete="off">`:"";return`
            <form data-parent="${e}" style="width:100%">
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
        `}async handleSubmit(e){e.preventDefault();let s=e.target,n=s.dataset.parent,t=s.querySelector('[type="submit"]');t.disabled=!0,t.innerHTML='<span class="discuss-spinner discuss-spinner-sm" style="margin-right:0.5rem"></span> Posting\u2026';let r={name:s.name.value.trim(),email:s.email.value.trim(),content:s.content.value.trim(),post_url:this.postUrl,parent_id:parseInt(n,10),honeypot_field:s.honeypot_field.value,honeypot_answer_given:s.honeypot_answer_given?s.honeypot_answer_given.value:void 0,...this.domainId?{domain_id:this.domainId}:{}};try{let i=await fetch(`${this.serverUrl}/api/comments`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(r)});if(i.ok){let a=await i.json();if(a.editToken&&this.editTokens.set(a.id,a.editToken),s.reset(),parseInt(n,10)!==0){let o=document.getElementById(`discuss-reply-form-${n}`);o&&o.classList.add("discuss-hidden")}this.init()}else{let a=await i.json();alert(a.error||"Failed to post comment.")}}catch(i){console.error("[Discuss]",i),alert("Network error. Please try again.")}finally{t.disabled=!1,t.textContent="Post Comment"}}};window.DiscussWidget=f;var k=document.getElementById("discuss-comments");k&&k.dataset.isAdmin!=="true"&&new f({container:k,darkSelector:k.dataset.darkSelector||null});var T=class extends f{constructor(e){super(e),this.isAdmin=!0}getAdminBadges(e){return e.is_approved?"":'<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>'}getAdminTooltip(e){return e.email?`
            <span style="position:relative;display:inline-flex;align-items:center;color:var(--text-subtle);cursor:help;padding:0.125rem;line-height:0;margin-left:0.25rem"
                  onmouseenter="this.querySelector('.em-tip').style.opacity='1';this.querySelector('.em-tip').style.visibility='visible'"
                  onmouseleave="this.querySelector('.em-tip').style.opacity='0';this.querySelector('.em-tip').style.visibility='hidden'">
                <span style="width:0.875rem;height:0.875rem;pointer-events:none;display:inline-flex">${u.mail}</span>
                <span class="em-tip" style="opacity:0;visibility:hidden;transition:opacity 120ms;position:absolute;bottom:calc(100% + 5px);left:50%;transform:translateX(-50%);background:#1e293b;color:#f8fafc;font-size:0.6875rem;padding:3px 7px;border-radius:4px;white-space:nowrap;z-index:100;pointer-events:none;line-height:normal">${e.email}</span>
            </span>
        `:""}getAdminControls(e){let s=(e.content_raw||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),n=new Date(e.created_at).toISOString().slice(0,16);return`
            <div style="width:1px;height:12px;background:var(--border-subtle);margin:0 0.25rem"></div>
            <button class="discuss-action-btn" ${e.is_approved?"":'style="color:#16a34a"'}
                    onclick="window.DiscussWidgetInstance.toggleApprove(${e.id}, ${e.is_approved})">
                ${e.is_approved?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> <span>Unapprove</span>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Approve</span>'}
            </button>
            <button class="discuss-action-btn" onclick="window.DiscussWidgetInstance.togglePin(${e.id}, ${e.is_pinned})">
                ${e.is_pinned?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <span>Unpin</span>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg> <span>Pin</span>'}
            </button>
            <button class="discuss-action-btn" onclick="window.DiscussWidgetInstance.toggleEditForm(${e.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
                <span>Edit</span>
            </button>
            <button class="discuss-action-btn" style="color:#ef4444"
                    onclick="window.DiscussWidgetInstance.deleteComment(${e.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                <span>Delete</span>
            </button>

            <!-- Inline edit form -->
            <div id="discuss-edit-form-${e.id}"
                 style="display:none;width:100%;margin-top:0.75rem;padding:1rem;border:1px solid var(--border-subtle);border-radius:8px;background:var(--surface-inset)">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:0.75rem">
                    <div>
                        <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--text-secondary);margin-bottom:0.25rem">Name</label>
                        <input type="text" id="discuss-edit-name-${e.id}"
                               style="width:100%;padding:0.5rem 0.625rem;border:1px solid var(--border-control);border-radius:6px;font-size:0.875rem;color:var(--text-primary);background:var(--surface-base)"
                               value="${(e.name||"").replace(/"/g,"&quot;")}">
                    </div>
                    <div>
                        <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--text-secondary);margin-bottom:0.25rem">Email</label>
                        <input type="email" id="discuss-edit-email-${e.id}"
                               style="width:100%;padding:0.5rem 0.625rem;border:1px solid var(--border-control);border-radius:6px;font-size:0.875rem;color:var(--text-primary);background:var(--surface-base)"
                               value="${(e.email||"").replace(/"/g,"&quot;")}">
                    </div>
                </div>
                <div style="margin-bottom:0.75rem">
                    <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--text-secondary);margin-bottom:0.25rem">Published date</label>
                    <input type="datetime-local" id="discuss-edit-date-${e.id}"
                           style="width:100%;padding:0.5rem 0.625rem;border:1px solid var(--border-control);border-radius:6px;font-size:0.875rem;color:var(--text-primary);background:var(--surface-base)"
                           value="${n}">
                </div>
                <div style="margin-bottom:0.75rem">
                    <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--text-secondary);margin-bottom:0.25rem">Content (Markdown)</label>
                    <textarea id="discuss-edit-content-${e.id}" rows="5"
                              style="width:100%;padding:0.5rem 0.625rem;border:1px solid var(--border-control);border-radius:6px;font-size:0.875rem;font-family:monospace;color:var(--text-primary);background:var(--surface-base);resize:vertical">${s}</textarea>
                </div>
                <div style="display:flex;gap:0.5rem">
                    <button class="discuss-action-btn" style="background:var(--brand-600);color:#fff;padding:0.375rem 0.75rem;border-radius:6px"
                            onclick="window.DiscussWidgetInstance.saveEdit(${e.id})">Save</button>
                    <button class="discuss-action-btn"
                            onclick="window.DiscussWidgetInstance.toggleEditForm(${e.id})">Cancel</button>
                </div>
            </div>
        `}toggleEditForm(e){let s=document.getElementById(`discuss-edit-form-${e}`);s&&(s.style.display=s.style.display==="none"?"block":"none")}async saveEdit(e){let s=document.getElementById(`discuss-edit-name-${e}`)?.value.trim(),n=document.getElementById(`discuss-edit-email-${e}`)?.value.trim(),t=document.getElementById(`discuss-edit-content-${e}`)?.value,r=document.getElementById(`discuss-edit-date-${e}`)?.value,i=r?new Date(r).getTime():null;if(!s||!t){window.app?.showToast("Name and content are required.","error");return}try{let a=await fetch(`/api/admin/comments/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:s,email:n,content:t,created_at:i})});if(!a.ok){let m=await a.json();window.app?.showToast(m.error||"Failed to save.","error");return}let{content:o,avatar:l}=await a.json(),c=document.querySelector(`#comment-${e} .discuss-comment-body`);c&&(c.innerHTML=o);let p=document.querySelector(`#comment-${e} span[style*="font-weight:600"]`);p&&(p.textContent=s);let h=document.querySelector(`#comment-${e} .em-tip`);h&&(h.textContent=n);let y=document.querySelector(`#comment-${e} .discuss-avatar img`);if(y&&l&&(y.style.opacity="0",y.style.visibility="hidden",y.src=l),r){let m=document.querySelector(`#comment-${e} span[style*="color:var(--text-muted)"]`);m&&(m.textContent=new Date(r).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}))}this.toggleEditForm(e),window.app?.showToast("Comment updated.")}catch{window.app?.showToast("Network error.","error")}}async toggleApprove(e,s){try{if((await fetch(`/api/admin/comments/${e}/approve`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({is_approved:s?0:1})})).ok){let t=s?0:1,r=document.querySelector(`.discuss-action-btn[onclick*="toggleApprove(${e}"]`);r&&(r.setAttribute("onclick",`window.DiscussWidgetInstance.toggleApprove(${e}, ${t})`),t?(r.style.color="",r.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> <span>Unapprove</span>',document.querySelector(`#comment-${e} .discuss-badge-warning`)?.remove()):(r.style.color="#16a34a",r.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Approve</span>',document.querySelector(`#comment-${e} span[style*="font-weight:600"]`)?.insertAdjacentHTML("afterend",'<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>'))),window.app?.refreshPendingBadge()}else window.app?.showToast("Failed to update status.","error")}catch{window.app?.showToast("Network error.","error")}}async togglePin(e,s){try{if((await fetch(`/api/admin/comments/${e}/pin`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({is_pinned:s?0:1})})).ok){let t=s?0:1,r=document.querySelector(`.discuss-action-btn[onclick*="togglePin(${e}"]`);r&&(r.setAttribute("onclick",`window.DiscussWidgetInstance.togglePin(${e}, ${t})`),t?(r.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <span>Unpin</span>',document.querySelector(`#comment-${e} span[style*="font-weight:600"]`)?.insertAdjacentHTML("afterend",'<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>')):(r.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg> <span>Pin</span>',document.querySelector(`#comment-${e} .discuss-badge-info`)?.remove()))}else window.app?.showToast("Failed to update pin.","error")}catch{window.app?.showToast("Network error.","error")}}async deleteComment(e){if(await window.app?.showConfirm({title:"Delete comment?",message:"This will permanently remove the comment. This cannot be undone.",confirmLabel:"Delete",isDanger:!0}))try{if((await fetch(`/api/admin/comments/${e}`,{method:"DELETE"})).ok){let t=document.getElementById(`comment-${e}`);t&&(t.style.transition="opacity 300ms ease, transform 300ms ease",t.style.opacity="0",t.style.transform="translateY(-8px)",setTimeout(()=>t.remove(),300)),window.app?.refreshPendingBadge()}else window.app?.showToast("Failed to delete comment.","error")}catch{window.app?.showToast("Network error.","error")}}};window.DiscussWidget=T;})();
