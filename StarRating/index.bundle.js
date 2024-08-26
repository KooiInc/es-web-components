var{default:D,createOrRetrieveShadowRoot:A,setComponentStyleFor:E}=await import("https://kooiinc.github.io/es-webcomponent-factory/Bundle/es-webcomponent-bundle.js").then(u=>u);function S(u,i={},c={}){let o=Object.assign(document.createElement(u),i);if(c=U({trial:a=>Object.entries(c),whenError:a=>[]}),c.length)for(let[a,s]of c)o.dataset[a]=s;return o}function q(){let u=a=>a?.constructor!==Array&&(+a).constructor===Number&&!isNaN(+a)&&+a!=1/0,i=(a,s)=>u(a)?+a:u(s)?+s:0;return{NR:i,gte:(a,s)=>(a=i(a,-1),s=i(s),a>=s?a:s),inRange:(a,s,p)=>(a=i(a,-1),s=i(s),p=i(p),a>=s&&a<=p)}}function U({trial:u,whenError:i=c=>console.log(c)}={}){try{if(u?.constructor!==Function)throw new TypeError("maybe: trial parameter not a Function or Lambda");return u()}catch(c){return i?.constructor===Function?i(c):console.error(c)}}var V=X;function X({min:u,max:i,nDefault:c}={}){let{NR:o,inRange:a,gte:s}=q(),{componentName:p,componentStyle:v,createStar:h,limits:y,appStrings:F}=P({min:u,max:i,nDefault:c}),[g,C,b,I,L,x,O,N,w,Q,T,j,k,M,_]=F;if(customElements.get(p))return console.info(_);D({componentName:p,onConnect:$});function $(t){let e=A(t),n=B(t);e.append(n),e.adoptedStyleSheets=[E(t,v)],e.addEventListener("click",z)}function z(t){let e=t.target,n=e.getRootNode(),r=n.host,l=n.querySelector(j),f=o(e.dataset.setScore,-1),d=f>=0?f:G(l,e);return o(d,-1)>=0&&o(r.dataset.score)!==d?R(l,r,d):!0}function B(t){H(t);let e=o(t.dataset.score),n=o(t.dataset.stars,y.nDefault),r=S(x,{className:O}),l=S(x,{className:N},{max:n,score:e});return r.append(l),r.append(S(x,{title:w,className:w},{setScore:0,stars:n})),r.append(S(x,{title:Q,className:T},{setScore:e,stars:n})),R(l,t,e)}function H(t){let e=o(+t.dataset?.stars,y.nDefault),n=o(+t.dataset.initial,0),r=n>0?n:o(t.dataset.score,0);e=a(e,y.min,y.max)?e:y.nDefault,t.dataset.stars=e,t.dataset.initial=+n<=e?n:0,t.dataset.score=+r<=e?r:0}function W(t,e){let n=[];for(let r=0;r<t;r+=1)n.push(h(!0));for(let r=0;r<e-t;r+=1)n.push(h());return n}function G(t,e){if(t===e)return 0;let n=1;for(let r of t.querySelectorAll(k)){if(r===e)return n;n+=1}}function R(t,e,n){let r=W(n,+t.dataset.max),l=t.querySelectorAll(k),f=r.length,d=t.closest(M);for(let m=0;m<f;m+=1)l.length<1?t.append(r[m]):l[m].replaceWith(r[m]);return e.dataset.score=t.dataset.score=n,J(d,n,o(e.dataset.initial)),d}function J(t,e,n){let r=e<1?g:C,l=n===0||n>0&&e===n?g:C;t.querySelector(I).classList[r](b),t.querySelector(L).classList[l](b)}function K(t,e){let n=o(t.nDefault,e.nDefault),r={min:s(o(t.min,e.min),e.min),max:o(t.max,e.max)};return{...r,nDefault:a(n,r.min,r.max)?n:e.nDefault}}function P(t){let e={min:3,max:10,nDefault:5},n="star-rater",r="\u2714 The <star-rater> web component can only be created once. It already exists and is ready for use. Enjoy!",l=["add","remove","inactive",".reset",".initial"],f=["div","starContainer","stars","reset","revert to initial","initial",".stars",".star",".starContainer"];return{limits:K(t,e),appStrings:l.concat(f).concat(r),componentName:n,componentStyle:`
          :host {
            font-weight: normal;
            display: block;
            font-style: normal;
            .initial:after, .reset:after {
              letter-spacing: initial;
              font-weight: bold;
              color: #c45525;
              background-color: #EEE;
              padding: 2px 4px;
              position: relative;
              text-align: center;
              margin-left: 5px;
              top: -5px;
              cursor: pointer;
              min-width: 48px;
            }
            .starContainer {
              padding: 0.4rem 0;
              display: inline-block;
              .initial, .reset { display: inline-block; }
              .reset:after { content: '\u21B6 'attr(data-set-score)'/'attr(data-stars); }
              .initial:after { content: '\u21BA 'attr(data-set-score)'/'attr(data-stars); }
              .reset.inactive, .initial.inactive { display: none;  }
              .stars {
                display: inline-block;
                cursor: pointer;
                letter-spacing: 2px;
                .star {
                  font-size: 2rem;
                  -webkit-text-stroke: 1px #999;
                  text-shadow: 1px 1px 4px #999;
                  color: white;
                  &:before { content: '\u2605'; }
                  &.rated:before { color: gold; }
                  &:hover:before {
                    color: gold;
                    -webkit-text-stroke: 1px #c45525;
                    text-shadow: 1px 1px 4px #c45525;
                  }
                }
              }
            }
          }`,createStar(d){return S("span",{className:`star${d?" rated":""}`})}}}}export{V as default};
