var{default:S,createOrRetrieveShadowRoot:x,setComponentStyleFor:F}=await import("https://kooiinc.github.io/es-webcomponent-factory/Bundle/es-webcomponent-bundle.js").then(l=>l);P();function P(){S({componentName:"copyright-slot",onConnect(l){let s=x(l),c=Object.assign(document.createElement("style"),{textContent:`:host{color:#777;display:inline-block;bottom:0.7rem;position:relative;float:right;z-index:2;font-size:12px;.yr{font-weight:bold;color:green;opacity:0.8;display:inline-block;}::slotted(a[target]){text-decoration:none;font-weight:bold;}::slotted(a[target]):before{color:rgba(0,0,238,0.7);font-size:1.1rem;padding-right:2px;vertical-align:baseline;}::slotted(a[target="_blank"]):before{content:"\u2197";}::slotted(a[target="_top"]):before{content:"\u21BA";}::slotted(a[target]):after{content:' | ';color:#000;font-weight:normal;}::slotted(a[target]:last-child):after{content:'';}}`}),a=Object.assign(document.createElement("span"),{innerHTML:'&copy; <span class="yr"><slot name="year"></slot></span> KooiInc <slot name="link"></slot>'});s.append(c,a)}})}function g(l,s={},c={}){let a=Object.assign(document.createElement(l),s);if(c=U({trial:r=>Object.entries(c),whenError:r=>[]}),c.length)for(let[r,i]of c)a.dataset[r]=i;return a}function v(){let l=r=>r?.constructor!==Array&&(+r).constructor===Number&&!isNaN(+r)&&+r!=1/0,s=(r,i)=>l(r)?+r:l(i)?+i:0;return{NR:s,gte:(r,i)=>(r=s(r,-1),i=s(i),r>=i?r:i),inRange:(r,i,p)=>(r=s(r,-1),i=s(i),p=s(p),r>=i&&r<=p)}}function U({trial:l,whenError:s=c=>console.log(c)}={}){try{if(l?.constructor!==Function)throw new TypeError("maybe: trial parameter not a Function or Lambda");return l()}catch(c){return s?.constructor===Function?s(c):console.error(c)}}var tt=X;function X({min:l,max:s,nDefault:c}={}){let{NR:a,inRange:r,gte:i}=v(),{componentName:p,componentStyle:A,createStar:b,limits:h,appStrings:I}=J({min:l,max:s,nDefault:c}),[C,w,k,L,O,y,T,q,R,j,N,Q,D,z,_]=I;if(customElements.get(p))return console.info(_);S({componentName:p,onConnect:M});function M(t){let e=x(t),n=H(t);e.append(n),e.adoptedStyleSheets=[F(t,A)],e.addEventListener("click",$)}function $(t){let e=t.target,n=e.getRootNode(),o=n.host,u=n.querySelector(Q),f=a(e.dataset.setScore,-1),d=f>=0?f:Y(u,e);return a(d,-1)>=0&&a(o.dataset.score)!==d?E(u,o,d):!0}function H(t){K(t);let e=a(t.dataset.score),n=a(t.dataset.stars,h.nDefault),o=g(y,{className:T}),u=g(y,{className:q},{max:n,score:e});return o.append(u),o.append(g(y,{title:R,className:R},{setScore:0,stars:n})),o.append(g(y,{title:j,className:N},{setScore:e,stars:n})),E(u,t,e)}function K(t){let e=a(+t.dataset?.stars,h.nDefault),n=a(+t.dataset.initial,0),o=n>0?n:a(t.dataset.score,0);e=r(e,h.min,h.max)?e:h.nDefault,t.dataset.stars=e,t.dataset.initial=+n<=e?n:0,t.dataset.score=+o<=e?o:0}function W(t,e){let n=[];for(let o=0;o<t;o+=1)n.push(b(!0));for(let o=0;o<e-t;o+=1)n.push(b());return n}function Y(t,e){if(t===e)return 0;let n=1;for(let o of t.querySelectorAll(D)){if(o===e)return n;n+=1}}function E(t,e,n){let o=W(n,+t.dataset.max),u=t.querySelectorAll(D),f=o.length,d=t.closest(z);for(let m=0;m<f;m+=1)u.length<1?t.append(o[m]):u[m].replaceWith(o[m]);return e.dataset.score=t.dataset.score=n,B(d,n,a(e.dataset.initial)),d}function B(t,e,n){let o=e<1?C:w,u=n===0||n>0&&e===n?C:w;t.querySelector(L).classList[o](k),t.querySelector(O).classList[u](k)}function G(t,e){let n=a(t.nDefault,e.nDefault),o={min:i(a(t.min,e.min),e.min),max:a(t.max,e.max)};return{...o,nDefault:r(n,o.min,o.max)?n:e.nDefault}}function J(t){let e={min:3,max:10,nDefault:5},n="star-rater",o="\u2714 The <star-rater> web component can only be created once. It already exists and is ready for use. Enjoy!",u=["add","remove","inactive",".reset",".initial"],f=["div","starContainer","stars","reset","revert to initial","initial",".stars",".star",".starContainer"];return{limits:G(t,e),appStrings:u.concat(f).concat(o),componentName:n,componentStyle:":host{font-weight:normal;display:block;font-style:normal;.initial:after,.reset:after{letter-spacing:initial;font-weight:bold;color:#c45525;background-color:#EEE;padding:2px 4px;position:relative;text-align:center;margin-left:5px;top:-5px;cursor:pointer;min-width:48px;}.starContainer{padding:0.4rem 0;display:inline-block;.initial,.reset{display:inline-block;}.reset:after{content:'\u21B6 'attr(data-set-score)'/'attr(data-stars);}.initial:after{content:'\u21BA 'attr(data-set-score)'/'attr(data-stars);}.reset.inactive,.initial.inactive{display:none;}.stars{display:inline-block;cursor:pointer;letter-spacing:2px;.star{font-size:2rem;-webkit-text-stroke:1px #999;text-shadow:1px 1px 4px #999;color:white;&:before{content:'\u2605';} &.rated:before{color:gold;}&:hover:before{color:gold;-webkit-text-stroke:1px #c45525;text-shadow:1px 1px 4px #c45525;}}}}}",createStar(d){return g("span",{className:`star${d?" rated":""}`})}}}}export{tt as default};
