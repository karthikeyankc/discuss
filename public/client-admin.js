(()=>{var h={reply:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>',share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>'};var T=document.currentScript,A=T?new URL(T.src).origin:window.location.origin;function I(d){let e=parseInt(d.replace("#",""),16);return[e>>16&255,e>>8&255,e&255]}function k(d,e,t){return"#"+[d,e,t].map(n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0")).join("")}function B(d,e,t){d/=255,e/=255,t/=255;let n=Math.max(d,e,t),s=Math.min(d,e,t),i,r,a=(n+s)/2;if(n===s)i=r=0;else{let o=n-s;switch(r=a>.5?o/(2-n-s):o/(n+s),n){case d:i=((e-t)/o+(e<t?6:0))/6;break;case e:i=((t-d)/o+2)/6;break;default:i=((d-e)/o+4)/6}}return[i*360,r,a]}function M(d,e,t){d/=360;let n=(r,a,o)=>(o<0&&(o+=1),o>1&&(o-=1),o<1/6?r+(a-r)*6*o:o<1/2?a:o<2/3?r+(a-r)*(2/3-o)*6:r);if(e===0){let r=Math.round(t*255);return[r,r,r]}let s=t<.5?t*(1+e):t+e-t*e,i=2*t-s;return[n(i,s,d+1/3),n(i,s,d),n(i,s,d-1/3)].map(r=>Math.round(r*255))}function E(d,e){if(!d)return null;if(d=d.trim(),d.startsWith("var(")||d.startsWith("--")){let i=d.startsWith("var(")?d.slice(4,-1).split(",")[0].trim():d,r=document.createElement("span");r.style.cssText="position:fixed;left:-9999px;top:-9999px;color:var("+i+")",e.appendChild(r);let a=getComputedStyle(r).color;return e.removeChild(r),a?E(a,e):null}if(/^#[0-9a-fA-F]{6}$/.test(d))return d;if(/^#[0-9a-fA-F]{3}$/.test(d)){let[,i,r,a]=d.match(/^#(.)(.)(.)$/);return`#${i}${i}${r}${r}${a}${a}`}let t=d.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(t)return k(+t[1],+t[2],+t[3]);let n=d.match(/^hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(n){let[i,r,a]=M(+n[1],+n[2]/100,+n[3]/100);return k(i,r,a)}let s=d.match(/^oklch\(\s*([\d.]+%?)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);if(s){let i=parseFloat(s[1]);s[1].includes("%")&&(i/=100);let r=parseFloat(s[2]),a=parseFloat(s[3])*Math.PI/180,o=r*Math.cos(a),l=r*Math.sin(a),m=i+.3963377774*o+.2158037573*l,u=i-.1055613458*o-.0638541728*l,y=i-.0894841775*o-1.291485548*l,p=m**3,c=u**3,f=y**3,b=4.0767416621*p-3.3077115913*c+.2309699292*f,v=-1.2684380046*p+2.6097574011*c-.3413193965*f,x=-.0041960863*p-.7034186147*c+1.707614701*f,$=C=>C<=.0031308?12.92*C:1.055*C**(1/2.4)-.055;return k(Math.round(Math.max(0,Math.min(1,$(b)))*255),Math.round(Math.max(0,Math.min(1,$(v)))*255),Math.round(Math.max(0,Math.min(1,$(x)))*255))}return null}function _(d){let[e,t,n]=I(d),[s,i]=B(e,t,n),r={50:.96,100:.93,200:.86,300:.74,400:.6,500:.48,600:.38,700:.3,800:.22,900:.15},a={};for(let[o,l]of Object.entries(r)){let[m,u,y]=M(s,Math.min(i,.85),l);a[o]=k(m,u,y)}return a}var g=class{constructor(e){window.DiscussWidgetInstance=this,this.container=e.container,this.container&&(this.postUrl=e.postUrl||this.container.dataset.url||window.location.pathname,this.serverUrl=e.serverUrl||A,this.fetchUrl=e.fetchUrl||`${this.serverUrl}/api/comments?post_url=${encodeURIComponent(this.postUrl)}`,this.configUrl=e.configUrl||`${this.serverUrl}/api/comments/config`,this.config={},this.primaryColor=e.primaryColor||null,this.domainId=e.domainId||null,this.title=e.title??"Leave a comment",this.placeholder=e.placeholder??"Share your thoughts... (*markdown* supported)",this.darkSelector=e.darkSelector||null,this.icons={name:e.icons?.name!==void 0?e.icons.name:h.user,email:e.icons?.email!==void 0?e.icons.email:h.mail,submit:e.icons?.submit!==void 0?e.icons.submit:h.send},this.init=this.init.bind(this),this.render=this.render.bind(this),this.renderComment=this.renderComment.bind(this),this.renderForm=this.renderForm.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.primaryColor&&this.applyTheme(this.primaryColor),this.watchPrimaryColor(),this.init())}applyTheme(e){let t=E(e,this.container);if(!t)return;let n=_(t),s=this.container;s.style.setProperty("--brand-50",n[50]),s.style.setProperty("--brand-100",n[100]),s.style.setProperty("--brand-200",n[200]),s.style.setProperty("--brand-300",n[300]),s.style.setProperty("--brand-400",n[400]),s.style.setProperty("--brand-500",n[500]),s.style.setProperty("--brand-600",n[600]),s.style.setProperty("--brand-700",n[700]),s.style.setProperty("--brand-800",n[800]),s.style.setProperty("--brand-900",n[900]),s.style.setProperty("--accent-fg",n[700]),s.style.setProperty("--accent-surface",n[50]),s.style.setProperty("--focus-ring",n[700])}watchPrimaryColor(){if(!this.primaryColor||!this.darkSelector)return;let e=this.primaryColor.trim();if(!e.startsWith("var(")&&!e.startsWith("--"))return;let t=()=>this.applyTheme(this.primaryColor),n=s=>{s&&new MutationObserver(t).observe(s,{attributes:!0,attributeFilter:["class"]})};n(document.documentElement),n(document.body)}injectDarkStyles(){if(!this.darkSelector)return;let e="discuss-dark-style";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=`${this.darkSelector} #discuss-comments {
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
        }`,document.head.appendChild(t)}async init(){this.injectDarkStyles(),this.container.innerHTML='<div style="padding:1rem;color:#64748b;font-family:inherit">Loading comments\u2026</div>';try{let e=await fetch(this.configUrl);e.ok&&(this.config=await e.json(),this.config.primary_color&&!this.primaryColor&&this.applyTheme(this.config.primary_color));let t=await fetch(this.fetchUrl);if(!t.ok)throw new Error("Failed to load comments");let n=await t.json();this.render(n)}catch(e){this.container.innerHTML='<div style="padding:1rem;color:#dc2626;font-family:inherit">Error loading comments.</div>',console.error("[Discuss]",e)}}buildTree(e){let t={},n=[];return e.forEach(s=>{s.children=[],t[s.id]=s}),e.forEach(s=>{s.parent_id===0||!t[s.parent_id]?n.push(s):t[s.parent_id].children.push(s)}),n}render(e){let t=this.buildTree(e);this.container.innerHTML=`
            <div class="discuss-font-sans" style="color:var(--text-primary)">
                <div class="discuss-mb-10">
                    <h3 class="discuss-text-lg discuss-font-semibold" style="margin:0 0 1.25rem;color:var(--text-primary)">${this.title}</h3>
                    ${this.renderForm(0)}
                </div>
                ${t.length>0?`
                <div>
                    <h4 class="discuss-text-sm discuss-font-semibold discuss-uppercase discuss-tracking-wide" style="margin:0 0 1.25rem;color:var(--text-tertiary)">${t.length} Comment${t.length!==1?"s":""}</h4>
                    <div class="discuss-flex discuss-flex-col discuss-gap-6">
                        ${t.map(s=>this.renderComment(s)).join("")}
                    </div>
                </div>`:""}
            </div>
        `,this.container.querySelectorAll("form[data-parent]").forEach(s=>{s.addEventListener("submit",this.handleSubmit)}),this.container.querySelectorAll(".discuss-reply-tag").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();let r=i.currentTarget.getAttribute("href"),a=r.startsWith("#")?r.substring(1):r,o=document.getElementById(a);if(o){o.scrollIntoView({behavior:"smooth",block:"center"});let l=o.style.backgroundColor,m=this.darkSelector?!!document.querySelector(this.darkSelector):!1;o.style.backgroundColor=m?"var(--accent-surface)":"var(--brand-50)",o.style.borderRadius="8px",setTimeout(()=>{o.style.transition="background-color 500ms ease",o.style.backgroundColor=l,setTimeout(()=>{o.style.transition="",o.style.borderRadius=""},500)},1500)}})}),this.container.querySelectorAll(".discuss-reply-btn").forEach(s=>{s.addEventListener("click",i=>{let r=i.currentTarget.dataset.id,a=document.getElementById(`discuss-reply-form-${r}`);a&&a.classList.toggle("discuss-hidden")})});let n=s=>{let i=s.currentTarget.dataset.id,r=!1,a=document.getElementById(`discuss-collapse-target-${i}`);a&&(r=a.classList.toggle("discuss-hidden"));let o=document.getElementById(`discuss-children-${i}`);o&&(a?o.classList.toggle("discuss-hidden",r):r=o.classList.toggle("discuss-hidden"));let l=document.querySelector(`.discuss-collapse-btn[data-id="${i}"]`);if(l){let m=l.querySelector("svg");m&&(m.style.transform=r?"rotate(-90deg)":"rotate(0deg)")}};this.container.querySelectorAll(".discuss-collapse-btn, .discuss-collapse-line").forEach(s=>{s.addEventListener("click",n)}),this.container.querySelectorAll(".discuss-share-btn").forEach(s=>{s.addEventListener("click",async i=>{let r=i.currentTarget,a=r.dataset.id,o=`${window.location.origin}${window.location.pathname}#comment-${a}`;if(navigator.share){try{await navigator.share({title:document.title,url:o})}catch(l){if(l.name==="AbortError")return;await this.copyToClipboard(r,o)}return}await this.copyToClipboard(r,o)})})}async copyToClipboard(e,t){try{if(navigator.clipboard)await navigator.clipboard.writeText(t);else{window.prompt("Copy link:",t);return}e.innerHTML=`${h.share} <span>Copied!</span>`,setTimeout(()=>{e.innerHTML=`${h.share} <span>Share</span>`},2e3)}catch{window.prompt("Copy link:",t)}}getInitialsColor(e){let t=["#0d4891","#16a34a","#b45309","#1e40af","#dc2626","#6b21a8","#be185d","#0369a1"],n=0;for(let s=0;s<e.length;s++)n=e.charCodeAt(s)+((n<<5)-n);return t[Math.abs(n)%t.length]}getAvatarHtml(e){let t=e.name?e.name.charAt(0).toUpperCase():"U";return`
            <div style="width:100%;height:100%;background-color:${this.getInitialsColor(e.name||"")};display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:0.875rem;position:relative;overflow:hidden;border-radius:inherit;">
                ${t}
                <img src="${e.avatar}" alt="${e.name}" 
                     onerror="this.style.opacity='0';this.style.visibility='hidden'" 
                     onload="this.style.opacity='1';this.style.visibility='visible'" 
                     style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;visibility:hidden;transition:opacity 0.2s;" />
            </div>
        `}getAdminBadges(e){return""}getAdminTooltip(e){return""}getAdminControls(e){return""}renderComment(e,t,n,s){t=t||0;let i=e.is_pinned?'<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>':"",r=e.is_author?'<span class="discuss-badge discuss-badge-success" style="margin-left:0.375rem">Author</span>':"",a=new Date(e.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),o=this.getAdminBadges(e),l=this.getAdminTooltip(e),m=this.getAdminControls(e),u=n?`<a href="#comment-${s}" class="discuss-reply-tag"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>${n}</a>`:"",y=`
            <button class="discuss-collapse-btn" data-id="${e.id}" aria-label="Collapse" style="background:transparent;border:none;padding:0;cursor:pointer;color:var(--text-muted);display:inline-flex;align-items:center;margin-left:0.25rem;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 150ms;"><path d="m6 9 6 6 6-6"/></svg>
            </button>
        `,p="";if(e.children.length>0)if(t>=3){let v=e.children.map(x=>this.renderComment(x,3,e.name,e.id)).join("");p=`
                    <div id="discuss-children-${e.id}" style="display:contents">
                        ${v}
                    </div>
                `}else p=`
                    <div class="discuss-nested discuss-flex discuss-flex-col discuss-gap-4" id="discuss-children-${e.id}">
                        ${e.children.map(v=>this.renderComment(v,t+1)).join("")}
                    </div>
                `;let c=e.content;u&&(c.startsWith("<p>")?c=c.replace("<p>",`<p>${u}`):c=u+c);let f=e.children.length>0&&t<3?`
            <div class="discuss-collapse-line" data-id="${e.id}" aria-label="Collapse thread">
                <div class="discuss-thread-line"></div>
            </div>
        `:"",b=`
            <div class="discuss-flex discuss-comment-row" id="comment-${e.id}">
                ${f}
                <span class="discuss-avatar discuss-avatar-md discuss-flex-shrink-0" style="position:relative;z-index:20;overflow:hidden">
                    ${this.getAvatarHtml(e)}
                </span>
                <div class="discuss-comment-content" style="min-width:0">
                    <div style="display:flex;align-items:center;gap:0.375rem;flex-wrap:wrap;margin-bottom:0.375rem">
                        <span style="font-weight:600;font-size:0.875rem;color:var(--text-primary)">${e.name}</span>
                        ${r}${i}${o}${l}
                        <span style="color:var(--text-subtle);font-size:0.75rem">\xB7</span>
                        <span style="font-size:0.8125rem;color:var(--text-muted)">${a}</span>
                        ${y}
                    </div>
                    
                    <div id="discuss-collapse-target-${e.id}">
                        <div class="discuss-comment-body">${c}</div>
                        <div class="discuss-flex discuss-gap-2 discuss-items-center" style="flex-wrap:wrap">
                            <button class="discuss-action-btn discuss-reply-btn" data-id="${e.id}">
                                ${h.reply} <span>Reply</span>
                            </button>
                            <button class="discuss-action-btn discuss-share-btn" data-id="${e.id}">
                                ${h.share} <span>Share</span>
                            </button>
                            ${m}
                        </div>

                        <div class="discuss-hidden" id="discuss-reply-form-${e.id}" style="margin-top:1rem">
                            ${this.renderForm(e.id)}
                        </div>

                        ${t<3?p:""}
                    </div>
                </div>
            </div>
        `;return t<3?b:b+p}renderForm(e){let t=this.config.honeypot_question?`<input type="text" name="honeypot_answer_given" placeholder="${this.config.honeypot_question}" style="display:none" tabindex="-1" autocomplete="off">`:"";return`
            <form data-parent="${e}" style="width:100%">
                <div class="discuss-form-container">
                    <textarea name="content" class="discuss-form-textarea" placeholder="${this.placeholder}" required></textarea>
                    
                    <input type="text" name="honeypot_field" style="display:none" tabindex="-1" autocomplete="off">
                    ${t}
                    
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
        `}async handleSubmit(e){e.preventDefault();let t=e.target,n=t.dataset.parent,s=t.querySelector('[type="submit"]');s.disabled=!0,s.innerHTML='<span class="discuss-spinner discuss-spinner-sm" style="margin-right:0.5rem"></span> Posting\u2026';let i={name:t.name.value.trim(),email:t.email.value.trim(),content:t.content.value.trim(),post_url:this.postUrl,parent_id:parseInt(n,10),honeypot_field:t.honeypot_field.value,honeypot_answer_given:t.honeypot_answer_given?t.honeypot_answer_given.value:void 0,...this.domainId?{domain_id:this.domainId}:{}};try{let r=await fetch(`${this.serverUrl}/api/comments`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(i)});if(r.ok){if(t.reset(),parseInt(n,10)!==0){let a=document.getElementById(`discuss-reply-form-${n}`);a&&a.classList.add("discuss-hidden")}this.init()}else{let a=await r.json();alert(a.error||"Failed to post comment.")}}catch(r){console.error("[Discuss]",r),alert("Network error. Please try again.")}finally{s.disabled=!1,s.textContent="Post Comment"}}};window.DiscussWidget=g;var w=document.getElementById("discuss-comments");w&&w.dataset.isAdmin!=="true"&&new g({container:w,darkSelector:w.dataset.darkSelector||null});var S=class extends g{constructor(e){super(e),this.isAdmin=!0}getAdminBadges(e){return e.is_approved?"":'<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>'}getAdminTooltip(e){return e.email?`
            <span style="position:relative;display:inline-flex;align-items:center;color:var(--text-subtle);cursor:help;padding:0.125rem;line-height:0;margin-left:0.25rem"
                  onmouseenter="this.querySelector('.em-tip').style.opacity='1';this.querySelector('.em-tip').style.visibility='visible'"
                  onmouseleave="this.querySelector('.em-tip').style.opacity='0';this.querySelector('.em-tip').style.visibility='hidden'">
                <span style="width:0.875rem;height:0.875rem;pointer-events:none;display:inline-flex">${h.mail}</span>
                <span class="em-tip" style="opacity:0;visibility:hidden;transition:opacity 120ms;position:absolute;bottom:calc(100% + 5px);left:50%;transform:translateX(-50%);background:#1e293b;color:#f8fafc;font-size:0.6875rem;padding:3px 7px;border-radius:4px;white-space:nowrap;z-index:100;pointer-events:none;line-height:normal">${e.email}</span>
            </span>
        `:""}getAdminControls(e){let t=(e.content_raw||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),n=new Date(e.created_at).toISOString().slice(0,16);return`
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
                              style="width:100%;padding:0.5rem 0.625rem;border:1px solid var(--border-control);border-radius:6px;font-size:0.875rem;font-family:monospace;color:var(--text-primary);background:var(--surface-base);resize:vertical">${t}</textarea>
                </div>
                <div style="display:flex;gap:0.5rem">
                    <button class="discuss-action-btn" style="background:var(--brand-600);color:#fff;padding:0.375rem 0.75rem;border-radius:6px"
                            onclick="window.DiscussWidgetInstance.saveEdit(${e.id})">Save</button>
                    <button class="discuss-action-btn"
                            onclick="window.DiscussWidgetInstance.toggleEditForm(${e.id})">Cancel</button>
                </div>
            </div>
        `}toggleEditForm(e){let t=document.getElementById(`discuss-edit-form-${e}`);t&&(t.style.display=t.style.display==="none"?"block":"none")}async saveEdit(e){let t=document.getElementById(`discuss-edit-name-${e}`)?.value.trim(),n=document.getElementById(`discuss-edit-email-${e}`)?.value.trim(),s=document.getElementById(`discuss-edit-content-${e}`)?.value,i=document.getElementById(`discuss-edit-date-${e}`)?.value,r=i?new Date(i).getTime():null;if(!t||!s){window.app?.showToast("Name and content are required.","error");return}try{let a=await fetch(`/api/admin/comments/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:n,content:s,created_at:r})});if(!a.ok){let c=await a.json();window.app?.showToast(c.error||"Failed to save.","error");return}let{content:o,avatar:l}=await a.json(),m=document.querySelector(`#comment-${e} .discuss-comment-body`);m&&(m.innerHTML=o);let u=document.querySelector(`#comment-${e} span[style*="font-weight:600"]`);u&&(u.textContent=t);let y=document.querySelector(`#comment-${e} .em-tip`);y&&(y.textContent=n);let p=document.querySelector(`#comment-${e} .discuss-avatar img`);if(p&&l&&(p.style.opacity="0",p.style.visibility="hidden",p.src=l),i){let c=document.querySelector(`#comment-${e} span[style*="color:var(--text-muted)"]`);c&&(c.textContent=new Date(i).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}))}this.toggleEditForm(e),window.app?.showToast("Comment updated.")}catch{window.app?.showToast("Network error.","error")}}async toggleApprove(e,t){try{if((await fetch(`/api/admin/comments/${e}/approve`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({is_approved:t?0:1})})).ok){let s=t?0:1,i=document.querySelector(`.discuss-action-btn[onclick*="toggleApprove(${e}"]`);i&&(i.setAttribute("onclick",`window.DiscussWidgetInstance.toggleApprove(${e}, ${s})`),s?(i.style.color="",i.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> <span>Unapprove</span>',document.querySelector(`#comment-${e} .discuss-badge-warning`)?.remove()):(i.style.color="#16a34a",i.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Approve</span>',document.querySelector(`#comment-${e} span[style*="font-weight:600"]`)?.insertAdjacentHTML("afterend",'<span class="discuss-badge discuss-badge-warning" style="margin-left:0.375rem">Pending</span>'))),window.app?.refreshPendingBadge()}else window.app?.showToast("Failed to update status.","error")}catch{window.app?.showToast("Network error.","error")}}async togglePin(e,t){try{if((await fetch(`/api/admin/comments/${e}/pin`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({is_pinned:t?0:1})})).ok){let s=t?0:1,i=document.querySelector(`.discuss-action-btn[onclick*="togglePin(${e}"]`);i&&(i.setAttribute("onclick",`window.DiscussWidgetInstance.togglePin(${e}, ${s})`),s?(i.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <span>Unpin</span>',document.querySelector(`#comment-${e} span[style*="font-weight:600"]`)?.insertAdjacentHTML("afterend",'<span class="discuss-badge discuss-badge-info" style="margin-left:0.375rem">Pinned</span>')):(i.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg> <span>Pin</span>',document.querySelector(`#comment-${e} .discuss-badge-info`)?.remove()))}else window.app?.showToast("Failed to update pin.","error")}catch{window.app?.showToast("Network error.","error")}}async deleteComment(e){if(await window.app?.showConfirm({title:"Delete comment?",message:"This will permanently remove the comment. This cannot be undone.",confirmLabel:"Delete",isDanger:!0}))try{if((await fetch(`/api/admin/comments/${e}`,{method:"DELETE"})).ok){let s=document.getElementById(`comment-${e}`);s&&(s.style.transition="opacity 300ms ease, transform 300ms ease",s.style.opacity="0",s.style.transform="translateY(-8px)",setTimeout(()=>s.remove(),300)),window.app?.refreshPendingBadge()}else window.app?.showToast("Failed to delete comment.","error")}catch{window.app?.showToast("Network error.","error")}}};window.DiscussWidget=S;})();
