import pe from"https://cdn.jsdelivr.net/gh/KooiInc/StringInterpolator@latest/Interpolate.module.min.js";var{default:g,createOrRetrieveShadowRoot:v,setComponentStyleFor:S}=await import("https://kooiinc.github.io/es-webcomponent-factory/Bundle/es-webcomponent-bundle.js").then(e=>e);H();function E(){return l("copyright-slot",{innerHTML:`<span slot="year">${new Date().getFullYear()}</span>`})}function H(){g({componentName:"copyright-slot",onConnect(e){let t=v(e),n=Object.assign(document.createElement("style"),{textContent:`:host{color:#777;display:inline-block;bottom:0.7rem;position:relative;float:right;z-index:2;font-size:12px;.yr{font-weight:bold;color:green;opacity:0.8;display:inline-block;}::slotted(a[target]){text-decoration:none;font-weight:bold;}::slotted(a[target]):before{color:rgba(0,0,238,0.7);font-size:1.1rem;padding-right:2px;vertical-align:baseline;}::slotted(a[target="_blank"]):before{content:"\u2197";}::slotted(a[target="_top"]):before{content:"\u21BA";}::slotted(a[target]):after{content:' | ';color:#000;font-weight:normal;}::slotted(a[target]:last-child):after{content:'';}}`}),o=Object.assign(document.createElement("span"),{innerHTML:'&copy; <span class="yr"><slot name="year"></slot></span> KooiInc <slot name="link"></slot>'});t.append(n,o)}})}function l(e,t={},n={}){let o=Object.assign(document.createElement(e),t);if(n=_({trial:a=>Object.entries(n),whenError:a=>[]}),n.length)for(let[a,i]of n)o.dataset[a]=i;return o}function _({trial:e,whenError:t=n=>console.log(n)}={}){try{if(e?.constructor!==Function)throw new TypeError("maybe: trial parameter not a Function or Lambda");return e()}catch(n){return t?.constructor===Function?t(n):console.error(n)}}var{default:L,createOrRetrieveShadowRoot:T,setComponentStyleFor:j}=await import("https://kooiinc.github.io/es-webcomponent-factory/Bundle/es-webcomponent-bundle.js").then(e=>e);P();function P(){L({componentName:"copyright-slot",onConnect(e){let t=T(e),n=Object.assign(document.createElement("style"),{textContent:`:host{color:#777;display:inline-block;bottom:0.7rem;position:relative;float:right;z-index:2;font-size:12px;.yr{font-weight:bold;color:green;opacity:0.8;display:inline-block;}::slotted(a[target]){text-decoration:none;font-weight:bold;}::slotted(a[target]):before{color:rgba(0,0,238,0.7);font-size:1.1rem;padding-right:2px;vertical-align:baseline;}::slotted(a[target="_blank"]):before{content:"\u2197";}::slotted(a[target="_top"]):before{content:"\u21BA";}::slotted(a[target]):after{content:' | ';color:#000;font-weight:normal;}::slotted(a[target]:last-child):after{content:'';}}`}),o=Object.assign(document.createElement("span"),{innerHTML:'&copy; <span class="yr"><slot name="year"></slot></span> KooiInc <slot name="link"></slot>'});t.append(n,o)}})}function b(e,t={},n={}){let o=Object.assign(document.createElement(e),t);if(n=G({trial:a=>Object.entries(n),whenError:a=>[]}),n.length)for(let[a,i]of n)o.dataset[a]=i;return o}function G({trial:e,whenError:t=n=>console.log(n)}={}){try{if(e?.constructor!==Function)throw new TypeError("maybe: trial parameter not a Function or Lambda");return e()}catch(n){return t?.constructor===Function?t(n):console.error(n)}}function F(e){let t=new CSSStyleSheet;return e?.constructor===String&&e.trim().length>0&&t.replaceSync(e),t}function U(e,t){let n=document.querySelector(`#${e}`),o="";if(!n||(n.rel==="stylesheet"&&n.sheet.cssRules.forEach(i=>o+=i.cssText),o.length<1&&!n?.textContent))return;let a=o.length&&o||n.textContent;t.adoptedStyleSheets.push(F(a))}function W(e,t,n){let o=t.querySelector("style"),a=n.dataset?.externalCssId;if(!(!o&&!a)&&(a&&U(a,e),o)){let i=F(o.textContent);o.remove(),e.adoptedStyleSheets.push(i)}}var V=await ae(),C="expandable-text";customElements.get(C)||L({componentName:C,onConnect:Y});function Y(e){let t=e.content??oe(e);return t?w(e,t):Z(e)}function w(e,t){w.cssCache=w.cssCache||{},e.content=t;let n=T(e);n.adoptedStyleSheets=[j(e,V)],W(n,t,e),K(e,t,n),n.addEventListener("click",J),Q(n)}function K(e,t,n){let o=ne(t,e),a=b("div",{className:"expand-title"},{expanded:0}),i=b("div",{className:"title",textContent:o,title:`${o}`});a.append(i),a.prepend(b("div",{className:"arrow"}));let s=b("div",{className:"expand-content"});e.dataset.preview&&s.classList.add("preview"),s.append(t),n.append(a,s)}function Z(e){return e?.remove(),console.info("\u2714 an empty <expandable-text> element was removed")}function x(e,t=!1,n=!1){let o=e.querySelector("[data-expanded]"),a=+o.dataset.expanded;if(e.querySelector(".expand-content").scrollTop=0,o.dataset.expanded=+!a,t){let i=e.host.getRootNode().host.shadowRoot.querySelector(".expand-content");return D(i,e)}!n&&X(e)}function X(e){let t=e.host.getRootNode().host?.shadowRoot;if(!t)return;let n=t.querySelector(".expand-content");if(n){let o=n.offsetHeight+n.scrollTop,a=e.host.offsetTop>o-30;setTimeout(i=>a&&n.scroll({top:n.scrollTop+150,behavior:"smooth"}),150)}}function J(e){let t=e.target.getRootNode(),n=t.host.closest("[data-collapse-all]"),o=t.host.closest("[data-expand-all]"),a=e.target.closest(".expand-content.preview")?.getRootNode().querySelector("[data-expanded]").dataset.expanded==="0",i=!e.target.closest(".expand-content"),s=!!t.querySelector("[data-expanded='0']"),u=i||a||s,$=!!e.target.closest("[data-collapse-all]")||!!t.host.closest("[data-collapse-all]"),O=!!e.target.closest("[data-expand-all]")||!!t.host.closest("[data-expand-all]");switch(!0){case u:return x(o||t);case $:return ee(n||t);case O:return te(t);default:return}}function Q(e){let t=e.host.getRootNode().host;t&&[...t.shadowRoot.querySelectorAll("expandable-text")].filter(o=>o?.shadowRoot?.querySelector("[data-open-from-id]")).forEach(o=>o.shadowRoot.addEventListener("click",n));function n(o){let a=o.target.getRootNode(),i=o.target.closest("[data-open-from-id]");if(i){let s=a.host.getRootNode().querySelector(`#${i.dataset.openFromId}`)?.shadowRoot,u=a.host.getRootNode().host.shadowRoot.querySelector(".expand-content");if(s)return o.stopImmediatePropagation(),s.querySelector("[data-expanded='0']")&&x(s,!0)||D(u,s)}return!1}}function D(e,t){setTimeout(n=>e&&t&&e.scroll({top:t.host.offsetTop-40,behavior:"smooth"}),150)}function ee(e){[...e.querySelectorAll("expandable-text")].filter(t=>t.shadowRoot?.querySelector(".expand-title").dataset.expanded==="1").forEach(t=>x(t.shadowRoot,!1,!0))}function te(e){[...e.querySelectorAll("expandable-text")].filter(t=>t.shadowRoot?.querySelector(".expand-title").dataset.expanded==="0").forEach(t=>x(t.shadowRoot,!1,!0))}function ne(e,t){let n=e.querySelector(".expand-ttl"),o=(n?.textContent??t.dataset?.title?.trim()?.replace(/\s{2,}/g," ").replace(/\n/g,"")??"").trim();return n?.remove(),o.length>0?o:"--NO TITLE--"}function oe(e){let t=e.querySelector("template")?.cloneNode(!0),n=document.querySelector(`#${e.dataset?.contentId}`),o=e.innerHTML.trim();return e.textContent="",t?t.content:o.length>0?b("div",{innerHTML:o}):n?.content}async function ae(){return Promise.resolve(`:host{display:block;position:relative;.expand-ttl{display:none;} .expand-title{display:block;user-select:none;font-weight:bold;cursor:pointer;position:relative;.title{display:inline-block;font-family:system-ui,"Sans Serif";font-size:1.2rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:90%;height:auto;line-height:normal;} .arrow{display:inline-block;margin:auto;color:#a15a57;font-size:1.3em;text-align:center;vertical-align:super;&:before{font-size:1.3rem;margin-right:5px;text-shadow:-1px 1px 2px #999;content:'\u2198';transition:all 1s ease;display:inline-block;} } &[data-expanded='1'] .title{color:#506988;} &[data-expanded='1'] .arrow:before{transform:rotateX(3.14rad);vertical-align:text-bottom;} &[data-expanded='0'] + .expand-content{overflow:hidden;max-height:0;padding:0;opacity:0;margin:0;transition:all 1s ease;} &[data-expanded='0'] + .expand-content.preview{max-height:80px;opacity:1;mask-image:linear-gradient(#000,transparent);cursor:pointer;} &[data-expanded='1'] + .expand-content{max-height:50vh;max-width:100%;overflow-y:auto;transition:all 1s ease;border:1px dashed #ccc;padding:12px;margin:auto auto 0.7em auto;cursor:default;[data-open-from-id],[data-collapse-all],[data-expand-all]{color:#557492;font-weight:500;cursor:pointer;} } } @media (hover:hover) and (pointer:fine){.expand-title .title:hover{color:#506988;} [data-open-from-id]:hover,[data-collapse-all]:hover,[data-expand-all]:hover{text-decoration:underline;} .expand-title .arrow:hover:after,.expand-title .title:hover:before{color:#000;font-weight:normal;font-size:10pt;line-height:1rem;background-color:white;position:absolute;margin:0.2em auto auto -0.2em;border:1px solid #AAA;padding:3px;z-index:10;opacity:0.9;box-shadow:1px 1px 5px #999;white-space:nowrap;} .expand-title[data-expanded='0'] .arrow:hover:after,.expand-title[data-expanded='0'] .title:hover:before{content:'click to expand';} .expand-title[data-expanded='1'] .arrow:hover:after,.expand-title[data-expanded='1'] .title:hover:before{content:'click to collapse';} }}`)}var y={NL:"heel zwak,zwak,goed,prima,uitstekend".split(","),EN:"very weak,weak,ok,fine,excellent".split(",")};function R(){return function(e,t=h.defaultSettings){e=se(e),h.Sym=t.Sym?t.Symbols:h.Sym,delete t.Symbols;let n=re(t),o=n.length-1,a=[...Array(e)].map(s=>n[m(o)]),i=ie(a,t);return a.length!==e||i.length!==e&&console.log("godgloeiondo en WTF",`
[${a.join("")}]
[${i}]`),i}}var A=e=>String.fromCharCode(e),h={UC:k({start:65,len:26,remap:A}),LC:k({start:97,len:26,remap:A}),Nrs:k(),SymDefault:["!","?","@","#","$","%","^","&","*","=","+","_",";","-"],Sym:[],defaultSettings:{UC:!0,Nrs:!1,Sym:!1,AFrst:!1}};function re(e){let t=Object.entries(e).reduce((n,[o,a])=>e[o]&&h[o]?[...n,...h[o]]:n,[]).flat();return q(t.concat(h.LC))}function ie(e,t){let n=h.Sym;return t.AFrst&&!/[a-z]/i.test(e[0])&&(e[0]=le(!0)),t.Nrs&&!e.find(o=>!isNaN(parseInt(o)))&&(e[1]=m(9)),t.Sym&&n.length&&!e.find(o=>n.findIndex(a=>o===a)>-1)&&(e[1]=n[m(n.length-1)||0]),e=[e[0],...q(e.slice(1))],e[0]===" "&&(e=z(e,!0)),e[e.length-1]===" "&&(e=z(e)),e.join("")}function z(e,t){let n=e.length-1;return e=t?e.slice(1):e.slice(0,-1),e.splice(m(n-1,1),0," "),e}function se(e){return e=parseInt(e),isNaN(e)||e<8?8:e}function le(e){let t=h.LC.concat(e?h.UC:[]);return t[m(t.length-1)]}function q(e){let t=e.length,n=t-1;for(;t--;){let o=m(n);[e[t],e[o]]=[e[o],e[t]]}return e}function m(e,t=0){return[e,t]=[Math.floor(e),Math.ceil(t)],Math.floor([...crypto.getRandomValues(new Uint32Array(1))].shift()/2**32*(e-t+1)+t)}function k({start:e=0,len:t=10,remap:n}={}){return n&&n instanceof Function?[...Array(t)].map((o,a)=>e+a).map(n):[...Array(t)].map((o,a)=>e+a)}function M(e){let t=e.length,n=[...e].reduce((s,u)=>({...s,[u]:(s[u]||0)+1}),{}),o=Object.values(n).reduce((s,u)=>s-u/t*Math.log2(u/t),0)*t,a=o>2?BigInt(2**Math.floor(o)/2):0,i=BigInt(Math.floor(2**Math.floor(o)/2/1e5/86400));return{entropy:o,guessDurationInDays:i,intruderGuessAttempts:a}}function B(e,t="EN"){return e<25?y[t][0]:e<50?y[t][1]:e<70?y[t][2]:e<80?y[t][3]:y[t][4]}var N={buttons:{copy:{EN:"Copy",NL:"Kopieer"},clear:{EN:"Clear",NL:"Maak leeg"}},texts:{cantCopy:{EN:"Copy to clipboard is only possible for a page loaded with http<b>S</b>",NL:"Kopieren naar het klembord kan alleen op een met http<b>S</b> beveiligde pagina"},browserTooOld:{EN:"The browser does not support this. Please update.",NL:"Het internetbladerprogramma is hier te oud voor"},noValue:{EN:"Please supply a password value",NL:"Voer svp een wachtwoord in"},symCBTtl:{EN:"Use selected non-letters (select characters in the 'Include' block)",NL:"Gebruik niet-letters (selecteer tekens in het 'Gebruik'-blokje)"},min8:{EN:"Minimum 8 (enforced)",NL:"Minimum 8 (afgedwongen)"},useNumbers:{EN:"Use numbers",NL:"Gebruik getallen"},symCBText:{EN:"Use non-letters",NL:"Gebruik niet-letters"},useUpperCase:{EN:"Use upper case",NL:"Gebruik hoofdletters"},include:{EN:"Include",NL:"Gebruik"},startWithLetter:{EN:"Start with letter",NL:"Begin met een letter"},all:{EN:"All",NL:"All"},allState:{EN:"All",NL:"Alles"},nonState:{EN:"None",NL:"Niks"},none:{EN:"None",NL:"None"},selectAllNO:{EN:"Select all",NL:"Selecteer alles"},selectAllYES:{EN:"Select none",NL:"Selecteer niks"},allTxt:{EN:"of the above",NL:"hierboven"},createBttnTxt:{EN:"Create",NL:"Maak wachtwoord"},initialSymBttnTxt:{EN:"Initial selection",NL:"Initi\xEBle selectie"},copied:{EN:"Copied!",NL:"Gekopieerd!"},copyFailed:{EN:"Copy failed, sorry for that",NL:"Kopi\xEBren helaas niet gelukt"},placeHolder:{EN:"start typing...",NL:"begin met typen..."},copyTtl:{EN:"copy to clipboard",NL:"kopieer naar klembord"},generatePwd:{EN:"Generate a password",NL:"Maak een wachtwoord"},expand:{EN:"click to expand",NL:"klik om te tonen"},collapse:{EN:"click to collapse",NL:"klik om verbergen"},entropy:{EN:"Shannon entropy (total)",NL:"Shannon entropie (totaal)"},space:{EN:"space",NL:"spatie"}},instruction:{EN:` <div class="p"> Start filling out the input field above or click '<i>Generate a password</i>' to let the application create a 'random' password. </div><div class="p"> The strength of a password needed depends on its use: for a web shop one may need a less strong password (strength: <b>ok</b> to <b>fine</b>) than for online banking (minimal strength <b>fine</b>). </div><div class="p"> Mostly (but not allways) the <i>length</i> of a password is the main factor for its strength. For a strong password it may be wise to use a <i>password <b>line</b></i> that is easy to remember. </div><div><b>Example lines</b> (click a line to check its strength): <ul><li><i>Oh no! I need a password!</i></li><li><i>Passwords are not my forte</i></li><li><i>If only I didn't have to worry about my bank balance</i></li><li><i>Cicero said: the apex of old age is influence.</i></li></ul></div>`,NL:` <div class="p"> Vul het invoerveld hierboven in of klik op '<i>Maak een wachtwoord</i>' om een wachtwoord met onwillekeurige tekens te laten maken. </div><div class="p"> De benodigde sterkte van een wachtwoord is afhankelijk van waar het voor wordt gebruikt: voor een webwinkel is doorgaans een minder sterk wachtwoord (sterkte <b>goed</b> tot <b>prima</b> nodig dan voor een online bankieren (sterkte <b>prima</b> of beter). </div><div class="p"> Veelal (maar niet altijd) is de <i>lengte</i> van een wachtwoord de belangrijkste factor voor de sterkte ervan. Een goed wachtwoord kan prima een hele zin zijn. Dat is veel gemakkelijker te onthouden en een zin van enkele woorden geeft vaak al een heel sterk wachtwoord. </div><div><b>Voorbeelden van wachtwoordzinnen</b> (klik op een zin om de sterkte ervan te testen): <ul><li><i>O help! Ik heb een wachtwoord nodig!</i></li><li><i>Ik kan helemaal niks met wachtwoorden</i></li><li><i>Als ik me nou maar niet steeds zorgen moet maken over mijn banksaldo</i></li><li><i>Cicero zei al: het toppunt van ouderdom is invloed.</i></li></ul></div>`}};N.inWordsLanguage=ce;var r=N,d={thats:{EN:"That's",NL:"Dat is"},what:{EN:"Without a dictionary and at a guess rate of",NL:"Zonder een 'woordenboek' en met een raadfrequentie van"},second:{EN:"second",NL:"seconde"},wouldTake:{EN:"that would take",NL:"zou dat"},years:{EN:"year(s)",NL:"jaar"},days:{EN:"day(s)",NL:"dag(en)"},lessThanADay:{EN:"less than a day",NL:"minder dan een dag"},vergen:{EN:"",NL:"duren"},atLeast:{EN:"A hacker needs to guess <i>at least</i>",NL:"Een hacker heeft <i>tenminste</i>"},times:{EN:"time(s)",NL:"raadpogingen nodig"},and:{EN:"and",NL:"en"}};function ce(e,t,n,o="EN"){let a=t<1&&n<1?`<b><i>${d.lessThanADay[o]}</i></b>`:`${t.toLocaleString(o)} ${d.years[o]} ${d.and[o]} ${n} ${d.days[o]}`;return e.entropy<=2?"":`${d.thats[o]} ${de(e.intruderGuessAttempts,e.entropy,o)}
      ${d.what[o]} ${1e5.toLocaleString(o)} per ${d.second[o]} ${d.wouldTake[o]} ${a} ${d.vergen[o]}`}function de(e,t,n){let o=B(t,n);return t>=2?`<b>${o}</b>. ${d.atLeast[n]} ${e.toLocaleString(n)} ${d.times[n].toLocaleString(n)}.`:`<b>${o}</b>`}var Be=import.meta.resolve("./").replace("index.js",""),c,ue=await Le(),he=await Te(),me=R(),be=()=>l("a",{target:"_blank",href:"//en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength",textContent:r.texts.entropy[c]}),f,p;g({componentName:"password-helper",onConnect:ye});function ye(e){c=e.dataset?.language||"EN";let t=xe(c),n=v(e);n.adoptedStyleSheets=[S(e,he)],n.append(t),f=n.querySelector("#generator").shadowRoot,f.addEventListener("click",fe),p=n,["click","keyup"].forEach(o=>p.addEventListener(o,Se))}function xe(e){let t=l("div",{className:"content"}),n=e==="EN",o=n?"NL":"EN",a=n?"Dutch":"English",i=l("div");return i.append(l("input",{id:"pass",type:"text",placeholder:r.texts.placeHolder[e]}),l("button",{id:"copy",textContent:r.buttons.copy[e],title:r.texts.copyTtl[e]}),l("button",{id:"clear",textContent:r.buttons.clear[e]}),l("button",{id:"switchLang",title:a},{language:o}),l("span",{id:"copied"}),l("div",{className:"entropyBox",textContent:" "}),l("p",{className:"instruction",innerHTML:r.instruction[e]}),E()),t.append(i,l("div",{id:"symCharsClone",className:"hidden"})),t.insertAdjacentHTML("beforeend",Ee(e)),t}function fe(e){let t=e.target,n=t.closest("#generate"),o=t.closest("#AllNone"),a=t.closest("#initialSyms"),i=t.closest("#allSyms"),s=t.closest(".expand-content");switch(!0){case!!o:return we(o,s);case!!n:return ke(s);case!!i:return ge(i,s);case!!a:return ve(a,s);default:return!0}}function ge(e,t){let n=e.dataset.all==="YES";return t.querySelectorAll("#symChars input").forEach(o=>o.checked=!n),e.dataset.all=n?"NO":"YES"}function ve(e,t){t.querySelectorAll("#symChars input").forEach(n=>n.checked=n.dataset.initial==="1"),t.querySelector("#allSyms").dataset.all="NO"}function we(e,t){let n=e.dataset.state==="All";return e.dataset.state=n?r.texts.none[c]:r.texts.all[c],e.dataset.stateLang=n?r.texts.nonState[c]:r.texts.allState[c],t.querySelectorAll(".cbi [type=checkbox]").forEach(o=>o.checked=n)}function ke(e){let t=p.querySelector("#pass"),n=Ne(),o=+e.querySelector("[type=number]").value||8,a=me(o,n);t.value=a,I(a),t.scrollIntoView()}function Ne(){let e=[...f.querySelectorAll(".genLeft .cbi input")].reduce((n,o)=>({...n,[o.id]:o.checked}),{}),t=[...f.querySelectorAll("#symChars .cb input:checked")].map(n=>n.value);return{...e,Symbols:t}}function I(e){let t=M(e),n=BigInt(t.guessDurationInDays),o=n/365n,a=n%365n,i=p.querySelector(".entropyBox");i.classList.remove("copyReport"),i.textContent="";let s=r.inWordsLanguage(t,o,a,c);i.append(be(),l("b",{textContent:` ${Math.round(t.entropy)} bits`}),l("div",{innerHTML:s}))}function Se(e){let t=p.querySelector("#pass");if(e.target.id==="switchLang")return p.host.replaceWith(l("password-helper",{},{language:e.target.dataset.language}));if(e.target.closest("li"))return t.value=e.target.closest("li").textContent,t.click();if(e.target.id==="clear"){let n=p.querySelector("#pass");return n.value="",p.querySelector("#pass").click(),n.focus()}if(e.target.id==="pass")return e.target.value.length<1?p.querySelector(".entropyBox").textContent="":I(e.target.value);if(e.target.id==="copy")return Ce(e.target.getRootNode())}function Ee(e="EN"){return pe(`${ue}`,{symCBTtl:r.texts.symCBTtl[e],symCBText:r.texts.symCBText[e],min8:r.texts.min8[e],useNumbers:r.texts.useNumbers[e],startWithLetter:r.texts.startWithLetter[e],useUpperCase:r.texts.useUpperCase[e],createBttnTxt:r.texts.createBttnTxt[e],all:r.texts.all[e],allState:r.texts.allState[e],allTxt:r.texts.allTxt[e],initialSymBttnTxt:r.texts.initialSymBttnTxt[e],include:r.texts.include[e],generatePwd:r.texts.generatePwd[e],expand:r.texts.expand[e],collapse:r.texts.collapse[e],selectAllNO:r.texts.selectAllNO[e],selectAllYES:r.texts.selectAllYES[e],space:r.texts.space[e]})}async function Ce(){let e=p.querySelector("#pass"),t=p.querySelector(".entropyBox");if(t.classList.add("copyReport"),location.protocol==="http:")return t.innerHTML=r.texts.cantCopy[c];if(!navigator.clipboard)return t.innerHTM=r.texts.browserTooOld[c];if(e.value.trim()==="")return t.innerHTML=r.texts.noValue[c];if(e){let n="text/plain",o=new Blob([e.value],{type:n});navigator.clipboard.write([new ClipboardItem({[n]:o})]).then(a=>t.textContent=r.texts.copied[c]).catch(a=>t.textContent=r.texts.copyFailed[c])}}async function Le(){return Promise.resolve(`<expandable-text id="generator"><style>:host{margin-top:2rem;.expand-title[data-expanded]{.arrow{display:inline-block;margin:auto;color:#a15a57;font-size:1.3em;text-align:center;vertical-align:super;&:before{font-size:1.3rem;margin-right:5px;text-shadow:-1px 1px 2px #999;content:' ';background-repeat:no-repeat;background-size:contain;background-image:url('data:image/svg+xml;utf8,%3Csvg%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022c5.523%200%2010-4.477%2010-10S17.523%202%2012%202%202%206.477%202%2012s4.477%2010%2010%2010Z%22%20fill%3D%22%23000000%22%20fill-opacity%3D%22.16%22%20stroke%3D%22%23000000%22%20stroke-width%3D%221.5%22%20stroke-miterlimit%3D%220%22%2F%3E%3Cpath%20d%3D%22m8%2010%204%204%204-4%22%20stroke%3D%22%23000000%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E');transition:all 1s ease;display:inline-block;width:1em;height:1em;vertical-align:middle;} } .expand-title[data-expanded='1'] .arrow:before{transform:rotate(-0.5turn);} &[data-expanded='0'] + .expand-content{#symChars{display:none;} } &[data-expanded='1'] + .expand-content{text-align:left;max-height:70vh;button{border:2px solid #777;background-color:azure;text-align:center;padding:4px 10px;margin-left:0.3em;display:inline;} button:hover{box-shadow:2px 1px 8px #777;border-color:transparent;} #res button{margin:2px;} #res button#AllNone:before{content:attr(data-state-lang)' ';} #allSyms[data-all='NO']:after{content:'{selectAllNO}';} #allSyms[data-all='YES']:after{content:'{selectAllYES}';} label{cursor:pointer;} [type='number']{width:3rem;outline:none;border:1px solid #999;color:#777;border-radius:4px;font-weight:bold;} .genLeft{float:left;@media (width <= 1400px){float:revert;} } #symChars{padding:8px;font-family:monospace,'Courier New',Courier;font-size:1.1rem;box-shadow:1px 1px 8px #999;border-radius:4px;overflow-y:auto;max-width:65%;float:right;@media (width <= 1400px){float:revert;margin-top:1rem;max-width:98%;} div.cb{display:inline-block;padding:0 2px;} .cb [type='checkbox']{margin-right:3px;margin-left:6px;vertical-align:middle;} span.symbol{color:orangered;font-weight:bold;} div.header{color:cornflowerblue;text-align:center;} div.header{font-size:0.9rem;margin:-8px 0 8px 0;padding:4px 0;border-bottom:1px dashed #999;} div.buttons{margin-bottom:auto;margin-top:12px;padding-top:8px;border-top:1px dashed #999;white-space:nowrap;text-align:center;button{font-size:revert;} } } } } @media (hover:hover) and (pointer:fine){.expand-title[data-expanded='0'] .arrow:hover:after,.expand-title[data-expanded='0'] .title:hover:before{content:'{expand}' !important;} .expand-title[data-expanded='1'] .arrow:hover:after,.expand-title[data-expanded='1'] .title:hover:before{content:'{collapse}' !important;} } } </style><div class="expand-ttl">{generatePwd}</div><div class="genLeft"><div><input type="number" min="8" value="16" title="{min8}"> Length </div><div class="cbi"><input type="checkbox" id="Sym"><label for="Sym" title="{symCBTtl}">{symCBText} </label></div><div class="cbi"><input type="checkbox" id="Nrs"><label for="Nrs">{useNumber}/label></div><div class="cbi"><input type="checkbox" id="UC" checked=""><label for="UC">{useUpperCase}</label></div><div class="cbi"><input type="checkbox" id="AFrst"><label for="AFrst">{startWithLetter}</label></div><div id="res"><button id="AllNone" data-state="{all}" data-state-lang="{allState}">{allTxt}</button><br><button id="generate">{createBttnTxt}</button></div></div><div id="symChars"><div class="header">{include}</div><div class="cb"><input type="checkbox" value="!" checked data-initial="1"><span class="symbol">!</span></div><div class="cb"><input type="checkbox" value="?" checked data-initial="1"><span class="symbol">?</span></div><div class="cb"><input type="checkbox" value="@" checked data-initial="1"><span class="symbol">@</span></div><div class="cb"><input type="checkbox" value="#" checked data-initial="1"><span class="symbol">#</span></div><div class="cb"><input type="checkbox" value="$" checked data-initial="1"><span class="symbol">$</span></div><div class="cb"><input type="checkbox" value="%" checked data-initial="1"><span class="symbol">%</span></div><div class="cb"><input type="checkbox" value="^" checked data-initial="1"><span class="symbol">^</span></div><div class="cb"><input type="checkbox" value="&amp;" checked data-initial="1"><span class="symbol">&amp;</span></div><div class="cb"><input type="checkbox" value="*" checked data-initial="1"><span class="symbol">*</span></div><div class="cb"><input type="checkbox" value="=" checked data-initial="1"><span class="symbol">=</span></div><div class="cb"><input type="checkbox" value="+" checked data-initial="1"><span class="symbol">+</span></div><div class="cb"><input type="checkbox" value="_" checked data-initial="1"><span class="symbol">_</span></div><div class="cb"><input type="checkbox" value=";" checked data-initial="1"><span class="symbol">;</span></div><div class="cb"><input type="checkbox" value="-" checked data-initial="1"><span class="symbol">-</span></div><div class="cb"><input type="checkbox" value="."><span class="symbol">.</span></div><div class="cb"><input type="checkbox" value=","><span class="symbol">,</span></div><div class="cb"><input type="checkbox" value="("><span class="symbol">(</span></div><div class="cb"><input type="checkbox" value=")"><span class="symbol">)</span></div><div class="cb"><input type="checkbox" value="["><span class="symbol">[</span></div><div class="cb"><input type="checkbox" value="]"><span class="symbol">]</span></div><div class="cb"><input type="checkbox" value="|"><span class="symbol">|</span></div><div class="cb"><input type="checkbox" value=""><span class="symbol"></span></div><div class="cb"><input type="checkbox" value="/"><span class="symbol">/</span></div><div class="cb"><input type="checkbox" value=":"><span class="symbol">:</span></div><div class="cb"><input type="checkbox" value="~"><span class="symbol">~</span></div><div class="cb"><input type="checkbox" value=""><span class="symbol">"</span></div><div class="cb"><input type="checkbox" value="'"><span class="symbol">'</span></div><div class="cb"><input type="checkbox" value="<"><span class="symbol">&lt;</span></div><div class="cb"><input type="checkbox" value=">"><span class="symbol">&gt;</span></div><div class="cb"><input type="checkbox" value="{"><span class="symbol">{</span></div><div class="cb"><input type="checkbox" value="}"><span class="symbol">}</span></div><div class="cb"><input type="checkbox" value=" "><span class="symbol">&lt;{space}&gt;</span></div><div class="buttons"><button id="initialSyms">{initialSymBttnTxt}</button><button id="allSyms" data-all="NO"></button></div></div></expandable-text>`)}async function Te(){return Promise.resolve(":host{display:block;font:14px/19px normal Verdana,sans-serif;@media (width <= 1024px){width:80vw;div.content{width:100%;} button{margin-top:0.2rem;&#copy{margin-left:0;} } .entropyBox,#pass{width:100% !important;} } button[data-language]{vertical-align:top;background-size:36px;padding:18px;border:none;background-position-x:center;background-position-y:center;background-repeat:no-repeat;cursor:pointer;background-color:transparent;float:right;} button[data-language='EN']{background-image:url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22flag-icons-gb%22%20viewBox%3D%220%200%20640%20480%22%3E%3Cpath%20fill%3D%22%23012169%22%20d%3D%22M0%200h640v480H0z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22m75%200%20244%20181L562%200h78v62L400%20241l240%20178v61h-80L320%20301%2081%20480H0v-60l239-178L0%2064V0h75z%22%2F%3E%3Cpath%20fill%3D%22%23C8102E%22%20d%3D%22m424%20281%20216%20159v40L369%20281h55zm-184%2020%206%2035L54%20480H0l240-179zM640%200v3L391%20191l2-44L590%200h50zM0%200l239%20176h-60L0%2042V0z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M241%200v480h160V0H241zM0%20160v160h640V160H0z%22%2F%3E%3Cpath%20fill%3D%22%23C8102E%22%20d%3D%22M0%20193v96h640v-96H0zM273%200v480h96V0h-96z%22%2F%3E%3C%2Fsvg%3E);} button[data-language='NL']{background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22flag-icons-nl%22%20viewBox%3D%220%200%20640%20480%22%3E%3Cpath%20fill%3D%22%2321468b%22%20d%3D%22M0%200h640v480H0z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M0%200h640v320H0z%22%2F%3E%3Cpath%20fill%3D%22%23ae1c28%22%20d%3D%22M0%200h640v160H0z%22%2F%3E%3C%2Fsvg%3E') } div.p{margin-bottom:0.6rem;} ul{margin:0.5rem 0 0 -1.5rem;} ul li{margin-top:0.2rem;list-style:'\u2713 ';cursor:pointer;color:#4075a9;} ul li:hover{text-decoration:underline;} ul li:last-child{padding-bottom:0;margin-bottom:0;} button:not([data-language]){border:2px solid #777;background-color:azure;text-align:center;font-size:1.2rem;padding:4px 10px;margin-left:0.3em;} @media (hover:hover) and (pointer:fine){button:not([data-language]):hover{box-shadow:2px 1px 8px #777;border-color:transparent;} } .content{margin:0 auto;padding:1rem 0;} .instruction{padding:0.5rem;border:1px solid #777;} .copyReport{color:red;} #pass{padding:6px;border:1px solid #999;color:#777;border-radius:4px;outline:none;font-weight:bold;font-size:1.2rem;width:20rem;} .entropyBox{margin-top:0.5rem;overflow-wrap:anywhere;} .hidden{display:none;}}")}
