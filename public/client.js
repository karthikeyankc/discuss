(()=>{var m={reply:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>',share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>'};var S=document.currentScript,_=S?new URL(S.src).origin:window.location.origin;function E(d){let t=parseInt(d.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}function w(d,t,e){return"#"+[d,t,e].map(i=>Math.round(Math.max(0,Math.min(255,i))).toString(16).padStart(2,"0")).join("")}function L(d,t,e){d/=255,t/=255,e/=255;let i=Math.max(d,t,e),s=Math.min(d,t,e),o,r,a=(i+s)/2;if(i===s)o=r=0;else{let n=i-s;switch(r=a>.5?n/(2-i-s):n/(i+s),i){case d:o=((t-e)/n+(t<e?6:0))/6;break;case t:o=((e-d)/n+2)/6;break;default:o=((d-t)/n+4)/6}}return[o*360,r,a]}function M(d,t,e){d/=360;let i=(r,a,n)=>(n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(a-r)*6*n:n<1/2?a:n<2/3?r+(a-r)*(2/3-n)*6:r);if(t===0){let r=Math.round(e*255);return[r,r,r]}let s=e<.5?e*(1+t):e+t-e*t,o=2*e-s;return[i(o,s,d+1/3),i(o,s,d),i(o,s,d-1/3)].map(r=>Math.round(r*255))}function T(d,t){if(!d)return null;if(d=d.trim(),d.startsWith("var(")||d.startsWith("--")){let o=d.startsWith("var(")?d.slice(4,-1).split(",")[0].trim():d,r=document.createElement("span");r.style.cssText="position:fixed;left:-9999px;top:-9999px;color:var("+o+")",t.appendChild(r);let a=getComputedStyle(r).color;return t.removeChild(r),a?T(a,t):null}if(/^#[0-9a-fA-F]{6}$/.test(d))return d;if(/^#[0-9a-fA-F]{3}$/.test(d)){let[,o,r,a]=d.match(/^#(.)(.)(.)$/);return`#${o}${o}${r}${r}${a}${a}`}let e=d.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(e)return w(+e[1],+e[2],+e[3]);let i=d.match(/^hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(i){let[o,r,a]=M(+i[1],+i[2]/100,+i[3]/100);return w(o,r,a)}let s=d.match(/^oklch\(\s*([\d.]+%?)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(s){let o=parseFloat(s[1]);s[1].includes("%")&&(o/=100);let r=parseFloat(s[2]),a=parseFloat(s[3])*Math.PI/180,n=r*Math.cos(a),c=r*Math.sin(a),l=o+.3963377774*n+.2158037573*c,p=o-.1055613458*n-.0638541728*c,f=o-.0894841775*n-1.291485548*c,u=l**3,h=p**3,y=f**3,b=4.0767416621*u-3.3077115913*h+.2309699292*y,g=-1.2684380046*u+2.6097574011*h-.3413193965*y,x=-.0041960863*u-.7034186147*h+1.707614701*y,k=C=>C<=.0031308?12.92*C:1.055*C**(1/2.4)-.055;return w(Math.round(Math.max(0,Math.min(1,k(b)))*255),Math.round(Math.max(0,Math.min(1,k(g)))*255),Math.round(Math.max(0,Math.min(1,k(x)))*255))}return null}function I(d){let[t,e,i]=E(d),[s,o]=L(t,e,i),r={50:.96,100:.93,200:.86,300:.74,400:.6,500:.48,600:.38,700:.3,800:.22,900:.15},a={};for(let[n,c]of Object.entries(r)){let[l,p,f]=M(s,Math.min(o,.85),c);a[n]=w(l,p,f)}return a}var $=class{constructor(t){window.DiscussWidgetInstance=this,this.container=t.container,this.container&&(this.postUrl=t.postUrl||this.container.dataset.url||window.location.pathname,this.serverUrl=t.serverUrl||_,this.fetchUrl=t.fetchUrl||`${this.serverUrl}/api/comments?post_url=${encodeURIComponent(this.postUrl)}`,this.configUrl=t.configUrl||`${this.serverUrl}/api/comments/config`,this.config={},this.primaryColor=t.primaryColor||null,this.domainId=t.domainId||null,this.title=t.title??"Leave a comment",this.placeholder=t.placeholder??"Share your thoughts... (*markdown* supported)",this.darkSelector=t.darkSelector||null,this.icons={name:t.icons?.name!==void 0?t.icons.name:m.user,email:t.icons?.email!==void 0?t.icons.email:m.mail,submit:t.icons?.submit!==void 0?t.icons.submit:m.send},this.init=this.init.bind(this),this.render=this.render.bind(this),this.renderComment=this.renderComment.bind(this),this.renderForm=this.renderForm.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.primaryColor&&this.applyTheme(this.primaryColor),this.watchPrimaryColor(),this.init())}applyTheme(t){let e=T(t,this.container);if(!e)return;let i=I(e),s=this.container;s.style.setProperty("--brand-50",i[50]),s.style.setProperty("--brand-100",i[100]),s.style.setProperty("--brand-200",i[200]),s.style.setProperty("--brand-300",i[300]),s.style.setProperty("--brand-400",i[400]),s.style.setProperty("--brand-500",i[500]),s.style.setProperty("--brand-600",i[600]),s.style.setProperty("--brand-700",i[700]),s.style.setProperty("--brand-800",i[800]),s.style.setProperty("--brand-900",i[900]),s.style.setProperty("--accent-fg",i[700]),s.style.setProperty("--accent-surface",i[50]),s.style.setProperty("--focus-ring",i[700])}watchPrimaryColor(){if(!this.primaryColor||!this.darkSelector)return;let t=this.primaryColor.trim();if(!t.startsWith("var(")&&!t.startsWith("--"))return;let e=()=>this.applyTheme(this.primaryColor),i=s=>{s&&new MutationObserver(e).observe(s,{attributes:!0,attributeFilter:["class"]})};i(document.documentElement),i(document.body)}injectDarkStyles(){if(!this.darkSelector)return;let t="discuss-dark-style";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=`${this.darkSelector} #discuss-comments {
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
        }`,document.head.appendChild(e)}async init(){this.injectDarkStyles(),this.container.innerHTML='<div style="padding:1rem;color:#64748b;font-family:inherit">Loading comments\u2026</div>';try{let t=await fetch(this.configUrl);t.ok&&(this.config=await t.json(),this.config.primary_color&&!this.primaryColor&&this.applyTheme(this.config.primary_color));let e=await fetch(this.fetchUrl);if(!e.ok)throw new Error("Failed to load comments");let i=await e.json();this.render(i)}catch(t){this.container.innerHTML='<div style="padding:1rem;color:#dc2626;font-family:inherit">Error loading comments.</div>',console.error("[Discuss]",t)}}buildTree(t){let e={},i=[];return t.forEach(s=>{s.children=[],e[s.id]=s}),t.forEach(s=>{s.parent_id===0||!e[s.parent_id]?i.push(s):e[s.parent_id].children.push(s)}),i}render(t){let e=this.buildTree(t);this.container.innerHTML=`
            <div class="discuss-font-sans" style="color:var(--text-primary)">
                <div class="discuss-mb-10">
                    <h3 class="discuss-text-lg discuss-font-semibold" style="margin:0 0 1.25rem;color:var(--text-primary)">${this.title}</h3>
                    ${this.renderForm(0)}
                </div>
                ${e.length>0?`
                <div>
                    <h4 class="discuss-text-sm discuss-font-semibold discuss-uppercase discuss-tracking-wide" style="margin:0 0 1.25rem;color:var(--text-tertiary)">${e.length} Comment${e.length!==1?"s":""}</h4>
                    <div class="discuss-flex discuss-flex-col discuss-gap-6">
                        ${e.map(s=>this.renderComment(s)).join("")}
                    </div>
                </div>`:""}
            </div>
        `,this.container.querySelectorAll("form[data-parent]").forEach(s=>{s.addEventListener("submit",this.handleSubmit)}),this.container.querySelectorAll(".discuss-reply-tag").forEach(s=>{s.addEventListener("click",o=>{o.preventDefault();let r=o.currentTarget.getAttribute("href"),a=r.startsWith("#")?r.substring(1):r,n=document.getElementById(a);if(n){n.scrollIntoView({behavior:"smooth",block:"center"});let c=n.style.backgroundColor,l=this.darkSelector?!!document.querySelector(this.darkSelector):!1;n.style.backgroundColor=l?"var(--accent-surface)":"var(--brand-50)",n.style.borderRadius="8px",setTimeout(()=>{n.style.transition="background-color 500ms ease",n.style.backgroundColor=c,setTimeout(()=>{n.style.transition="",n.style.borderRadius=""},500)},1500)}})}),this.container.querySelectorAll(".discuss-reply-btn").forEach(s=>{s.addEventListener("click",o=>{let r=o.currentTarget.dataset.id,a=document.getElementById(`discuss-reply-form-${r}`);a&&a.classList.toggle("discuss-hidden")})});let i=s=>{let o=s.currentTarget.dataset.id,r=!1,a=document.getElementById(`discuss-collapse-target-${o}`);a&&(r=a.classList.toggle("discuss-hidden"));let n=document.getElementById(`discuss-children-${o}`);n&&(a?n.classList.toggle("discuss-hidden",r):r=n.classList.toggle("discuss-hidden"));let c=document.querySelector(`.discuss-collapse-btn[data-id="${o}"]`);if(c){let l=c.querySelector("svg");l&&(l.style.transform=r?"rotate(-90deg)":"rotate(0deg)")}};this.container.querySelectorAll(".discuss-collapse-btn, .discuss-collapse-line").forEach(s=>{s.addEventListener("click",i)}),this.container.querySelectorAll(".discuss-share-btn").forEach(s=>{s.addEventListener("click",async o=>{let r=o.currentTarget,a=r.dataset.id,n=`${window.location.origin}${window.location.pathname}#comment-${a}`;if(navigator.share){try{await navigator.share({title:document.title,url:n})}catch(c){if(c.name==="AbortError")return;await this.copyToClipboard(r,n)}return}await this.copyToClipboard(r,n)})})}async copyToClipboard(t,e){try{if(navigator.clipboard)await navigator.clipboard.writeText(e);else{window.prompt("Copy link:",e);return}t.innerHTML=`${m.share} <span>Copied!</span>`,setTimeout(()=>{t.innerHTML=`${m.share} <span>Share</span>`},2e3)}catch{window.prompt("Copy link:",e)}}getInitialsColor(t){let e=["#0d4891","#16a34a","#b45309","#1e40af","#dc2626","#6b21a8","#be185d","#0369a1"],i=0;for(let s=0;s<t.length;s++)i=t.charCodeAt(s)+((i<<5)-i);return e[Math.abs(i)%e.length]}getAvatarHtml(t){let e=t.name?t.name.charAt(0).toUpperCase():"U";return`
            <div style="width:100%;height:100%;background-color:${this.getInitialsColor(t.name||"")};display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:0.875rem;position:relative;overflow:hidden;border-radius:inherit;">
                ${e}
                <img src="${t.avatar}" alt="${t.name}" 
                     onerror="this.style.opacity='0';this.style.visibility='hidden'" 
                     onload="this.style.opacity='1';this.style.visibility='visible'" 
                     style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity 0.2s;" />
            </div>
        `}getAdminBadges(t){return""}getAdminTooltip(t){return""}getAdminControls(t){return""}renderComment(t,e,i,s){e=e||0;let o=t.is_pinned?'<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>':"",r=t.is_author?'<span class="discuss-badge discuss-badge-success" style="margin-left:0.375rem">Author</span>':"",a=new Date(t.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),n=this.getAdminBadges(t),c=this.getAdminTooltip(t),l=this.getAdminControls(t),p=i?`<a href="#comment-${s}" class="discuss-reply-tag"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>${i}</a>`:"",f=`
            <button class="discuss-collapse-btn" data-id="${t.id}" aria-label="Collapse" style="background:transparent;border:none;padding:0;cursor:pointer;color:var(--text-muted);display:inline-flex;align-items:center;margin-left:0.25rem;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 150ms;"><path d="m6 9 6 6 6-6"/></svg>
            </button>
        `,u="";if(t.children.length>0)if(e>=3){let g=t.children.map(x=>this.renderComment(x,3,t.name,t.id)).join("");u=`
                    <div id="discuss-children-${t.id}" style="display:contents">
                        ${g}
                    </div>
                `}else u=`
                    <div class="discuss-nested discuss-flex discuss-flex-col discuss-gap-4" id="discuss-children-${t.id}">
                        ${t.children.map(g=>this.renderComment(g,e+1)).join("")}
                    </div>
                `;let h=t.content;p&&(h.startsWith("<p>")?h=h.replace("<p>",`<p>${p}`):h=p+h);let y=t.children.length>0&&e<3?`
            <div class="discuss-collapse-line" data-id="${t.id}" aria-label="Collapse thread">
                <div class="discuss-thread-line"></div>
            </div>
        `:"",b=`
            <div class="discuss-flex discuss-comment-row" id="comment-${t.id}">
                ${y}
                <span class="discuss-avatar discuss-avatar-md discuss-flex-shrink-0" style="position:relative;z-index:20;overflow:hidden">
                    ${this.getAvatarHtml(t)}
                </span>
                <div class="discuss-comment-content" style="min-width:0">
                    <div style="display:flex;align-items:center;gap:0.375rem;flex-wrap:wrap;margin-bottom:0.375rem">
                        <span style="font-weight:600;font-size:0.875rem;color:var(--text-primary)">${t.name}</span>
                        ${r}${o}${n}${c}
                        <span style="color:var(--text-subtle);font-size:0.75rem">\xB7</span>
                        <span style="font-size:0.8125rem;color:var(--text-muted)">${a}</span>
                        ${f}
                    </div>
                    
                    <div id="discuss-collapse-target-${t.id}">
                        <div class="discuss-comment-body">${h}</div>
                        <div class="discuss-flex discuss-gap-2 discuss-items-center" style="flex-wrap:wrap">
                            <button class="discuss-action-btn discuss-reply-btn" data-id="${t.id}">
                                ${m.reply} <span>Reply</span>
                            </button>
                            <button class="discuss-action-btn discuss-share-btn" data-id="${t.id}">
                                ${m.share} <span>Share</span>
                            </button>
                            ${l}
                        </div>

                        <div class="discuss-hidden" id="discuss-reply-form-${t.id}" style="margin-top:1rem">
                            ${this.renderForm(t.id)}
                        </div>

                        ${e<3?u:""}
                    </div>
                </div>
            </div>
        `;return e<3?b:b+u}renderForm(t){let e=this.config.honeypot_question?`<input type="text" name="honeypot_answer_given" placeholder="${this.config.honeypot_question}" style="display:none" tabindex="-1" autocomplete="off">`:"";return`
            <form data-parent="${t}" style="width:100%">
                <div class="discuss-form-container">
                    <textarea name="content" class="discuss-form-textarea" placeholder="${this.placeholder}" required></textarea>
                    
                    <input type="text" name="honeypot_field" style="display:none" tabindex="-1" autocomplete="off">
                    ${e}
                    
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
        `}async handleSubmit(t){t.preventDefault();let e=t.target,i=e.dataset.parent,s=e.querySelector('[type="submit"]');s.disabled=!0,s.innerHTML='<span class="discuss-spinner discuss-spinner-sm" style="margin-right:0.5rem"></span> Posting\u2026';let o={name:e.name.value.trim(),email:e.email.value.trim(),content:e.content.value.trim(),post_url:this.postUrl,parent_id:parseInt(i,10),honeypot_field:e.honeypot_field.value,honeypot_answer_given:e.honeypot_answer_given?e.honeypot_answer_given.value:void 0,...this.domainId?{domain_id:this.domainId}:{}};try{let r=await fetch(`${this.serverUrl}/api/comments`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(o)});if(r.ok){if(e.reset(),parseInt(i,10)!==0){let a=document.getElementById(`discuss-reply-form-${i}`);a&&a.classList.add("discuss-hidden")}this.init()}else{let a=await r.json();alert(a.error||"Failed to post comment.")}}catch(r){console.error("[Discuss]",r),alert("Network error. Please try again.")}finally{s.disabled=!1,s.textContent="Post Comment"}}};window.DiscussWidget=$;var v=document.getElementById("discuss-comments");v&&v.dataset.isAdmin!=="true"&&new $({container:v,darkSelector:v.dataset.darkSelector||null});})();
