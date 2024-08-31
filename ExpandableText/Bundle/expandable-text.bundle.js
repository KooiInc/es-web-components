var{default:d,createOrRetrieveShadowRoot:p,setComponentStyleFor:x}=await import("https://kooiinc.github.io/es-webcomponent-factory/Bundle/es-webcomponent-bundle.js").then(e=>e);w();function S(){return s("copyright-slot",{innerHTML:`<span slot="year">${new Date().getFullYear()}</span>`})}function w(){d({componentName:"copyright-slot",onConnect(e){let t=p(e),o=Object.assign(document.createElement("style"),{textContent:`:host{color:#777;display:inline-block;bottom:0.7rem;position:relative;float:right;z-index:2;font-size:12px;.yr{font-weight:bold;color:green;opacity:0.8;display:inline-block;}::slotted(a[target]){text-decoration:none;font-weight:bold;}::slotted(a[target]):before{color:rgba(0,0,238,0.7);font-size:1.1rem;padding-right:2px;vertical-align:baseline;}::slotted(a[target="_blank"]):before{content:"\u2197";}::slotted(a[target="_top"]):before{content:"\u21BA";}::slotted(a[target]):after{content:' | ';color:#000;font-weight:normal;}::slotted(a[target]:last-child):after{content:'';}}`}),n=Object.assign(document.createElement("span"),{innerHTML:'&copy; <span class="yr"><slot name="year"></slot></span> KooiInc <slot name="link"></slot>'});t.append(o,n)}})}function s(e,t={},o={}){let n=Object.assign(document.createElement(e),t);if(o=C({trial:a=>Object.entries(o),whenError:a=>[]}),o.length)for(let[a,r]of o)n.dataset[a]=r;return n}function C({trial:e,whenError:t=o=>console.log(o)}={}){try{if(e?.constructor!==Function)throw new TypeError("maybe: trial parameter not a Function or Lambda");return e()}catch(o){return t?.constructor===Function?t(o):console.error(o)}}function u(e){let t=new CSSStyleSheet;return e?.constructor===String&&e.trim().length>0&&t.replaceSync(e),t}function v(e,t){let o=document.querySelector(`#${e}`),n="";if(!o||(o.rel==="stylesheet"&&o.sheet.cssRules.forEach(r=>n+=r.cssText),n.length<1&&!o?.textContent))return;let a=n.length&&n||o.textContent;t.adoptedStyleSheets.push(u(a))}function f(e,t,o){let n=t.querySelector("style"),a=o.dataset?.externalCssId;if(!(!n&&!a)&&(a&&v(a,e),n)){let r=u(n.textContent);n.remove(),e.adoptedStyleSheets.push(r)}}var R=await z(),m="expandable-text";customElements.get(m)||d({componentName:m,onConnect:E});function E(e){let t=e.content??O(e);return t?h(e,t):k(e)}function h(e,t){h.cssCache=h.cssCache||{},e.content=t;let o=p(e);o.adoptedStyleSheets=[x(e,R)],f(o,t,e),T(e,t,o),o.addEventListener("click",A),F(o)}function T(e,t,o){let n=N(t,e),a=s("div",{className:"expand-title"},{expanded:0}),r=s("div",{className:"title",textContent:n,title:`${n}`});a.append(r),a.prepend(s("div",{className:"arrow"}));let l=s("div",{className:"expand-content"});e.dataset.preview&&l.classList.add("preview"),l.append(t),o.append(a,l)}function k(e){return e?.remove(),console.info("\u2714 an empty <expandable-text> element was removed")}function c(e,t=!1,o=!1){let n=e.querySelector("[data-expanded]"),a=+n.dataset.expanded;if(e.querySelector(".expand-content").scrollTop=0,n.dataset.expanded=+!a,t){let r=e.host.getRootNode().host.shadowRoot.querySelector(".expand-content");return g(r,e)}!o&&q(e)}function q(e){let t=e.host.getRootNode().host?.shadowRoot;if(!t)return;let o=t.querySelector(".expand-content");if(o){let n=o.offsetHeight+o.scrollTop,a=e.host.offsetTop>n-30;setTimeout(r=>a&&o.scroll({top:o.scrollTop+150,behavior:"smooth"}),150)}}function A(e){let t=e.target.getRootNode(),o=t.host.closest("[data-collapse-all]"),n=t.host.closest("[data-expand-all]"),a=e.target.closest(".expand-content.preview")?.getRootNode().querySelector("[data-expanded]").dataset.expanded==="0",r=!e.target.closest(".expand-content"),l=!!t.querySelector("[data-expanded='0']"),i=r||a||l,y=!!e.target.closest("[data-collapse-all]")||!!t.host.closest("[data-collapse-all]"),b=!!e.target.closest("[data-expand-all]")||!!t.host.closest("[data-expand-all]");switch(!0){case i:return c(n||t);case y:return I(o||t);case b:return L(t);default:return}}function F(e){let t=e.host.getRootNode().host;t&&[...t.shadowRoot.querySelectorAll("expandable-text")].filter(n=>n?.shadowRoot?.querySelector("[data-open-from-id]")).forEach(n=>n.shadowRoot.addEventListener("click",o));function o(n){let a=n.target.getRootNode(),r=n.target.closest("[data-open-from-id]");if(r){let l=a.host.getRootNode().querySelector(`#${r.dataset.openFromId}`)?.shadowRoot,i=a.host.getRootNode().host.shadowRoot.querySelector(".expand-content");if(l)return n.stopImmediatePropagation(),l.querySelector("[data-expanded='0']")&&c(l,!0)||g(i,l)}return!1}}function g(e,t){setTimeout(o=>e&&t&&e.scroll({top:t.host.offsetTop-40,behavior:"smooth"}),150)}function I(e){[...e.querySelectorAll("expandable-text")].filter(t=>t.shadowRoot?.querySelector(".expand-title").dataset.expanded==="1").forEach(t=>c(t.shadowRoot,!1,!0))}function L(e){[...e.querySelectorAll("expandable-text")].filter(t=>t.shadowRoot?.querySelector(".expand-title").dataset.expanded==="0").forEach(t=>c(t.shadowRoot,!1,!0))}function N(e,t){let o=e.querySelector(".expand-ttl"),n=(o?.textContent??t.dataset?.title?.trim()?.replace(/\s{2,}/g," ").replace(/\n/g,"")??"").trim();return o?.remove(),n.length>0?n:"--NO TITLE--"}function O(e){let t=e.querySelector("template")?.cloneNode(!0),o=document.querySelector(`#${e.dataset?.contentId}`),n=e.innerHTML.trim();return e.textContent="",t?t.content:n.length>0?s("div",{innerHTML:n}):o?.content}async function z(){return Promise.resolve(`:host{display:block;position:relative;.expand-ttl{display:none;} .expand-title{display:block;user-select:none;font-weight:bold;cursor:pointer;position:relative;.title{display:inline-block;font-family:system-ui,"Sans Serif";font-size:1.2rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:90%;height:auto;line-height:normal;} .arrow{display:inline-block;margin:auto;color:#a15a57;font-size:1.3em;text-align:center;vertical-align:super;&:before{font-size:1.3rem;margin-right:5px;text-shadow:-1px 1px 2px #999;content:'\u2198';transition:all 1s ease;display:inline-block;} } &[data-expanded='1'] .title{color:#506988;} &[data-expanded='1'] .arrow:before{transform:rotateX(3.14rad);vertical-align:text-bottom;} &[data-expanded='0'] + .expand-content{overflow:hidden;max-height:0;padding:0;opacity:0;margin:0;transition:all 1s ease;} &[data-expanded='0'] + .expand-content.preview{max-height:80px;opacity:1;mask-image:linear-gradient(#000,transparent);cursor:pointer;} &[data-expanded='1'] + .expand-content{max-height:50vh;max-width:100%;overflow-y:auto;transition:all 1s ease;border:1px dashed #ccc;padding:12px;margin:auto auto 0.7em auto;cursor:default;[data-open-from-id],[data-collapse-all],[data-expand-all]{color:#557492;font-weight:500;cursor:pointer;} } } @media (hover:hover) and (pointer:fine){.expand-title .title:hover{color:#506988;} [data-open-from-id]:hover,[data-collapse-all]:hover,[data-expand-all]:hover{text-decoration:underline;} .expand-title .arrow:hover:after,.expand-title .title:hover:before{color:#000;font-weight:normal;font-size:10pt;line-height:1rem;background-color:white;position:absolute;margin:0.2em auto auto -0.2em;border:1px solid #AAA;padding:3px;z-index:10;opacity:0.9;box-shadow:1px 1px 5px #999;white-space:nowrap;} .expand-title[data-expanded='0'] .arrow:hover:after,.expand-title[data-expanded='0'] .title:hover:before{content:'click to expand';} .expand-title[data-expanded='1'] .arrow:hover:after,.expand-title[data-expanded='1'] .title:hover:before{content:'click to collapse';} }}`)}export{S as copyRight,u as createStylesheet};
