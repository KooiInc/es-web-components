const  {default: CreateComponent, createOrRetrieveShadowRoot, setComponentStyleFor} =
  await import("https://kooiinc.github.io/es-webcomponent-factory/Bundle/es-webcomponent-bundle.js")
    .then(r => r);

connectCopyrightComponent();

export {
  createElement,
  numberFactory,
  maybe,
  addCustomCssAndMaybeExternals,
  CreateComponent,
  createOrRetrieveShadowRoot,
  setComponentStyleFor,
  copyRight,
}

function copyRight() {
  return createElement(
    `copyright-slot`, {
    innerHTML: `<span slot="year">${new Date().getFullYear()}</span>` } );
}

function connectCopyrightComponent() {
  CreateComponent( {
    componentName: `copyright-slot`,
    onConnect(elem) {
      const shadow = createOrRetrieveShadowRoot(elem);
      const componentStyle = Object.assign(
        document.createElement("style"),
        { textContent: `:host{color:#777;display:inline-block;bottom:0.7rem;position:relative;float:right;z-index:2;font-size:12px;.yr{font-weight:bold;color:green;opacity:0.8;display:inline-block;}::slotted(a[target]){text-decoration:none;font-weight:bold;}::slotted(a[target]):before{color:rgba(0,0,238,0.7);font-size:1.1rem;padding-right:2px;vertical-align:baseline;}::slotted(a[target="_blank"]):before{content:"↗";}::slotted(a[target="_top"]):before{content:"↺";}::slotted(a[target]):after{content:' | ';color:#000;font-weight:normal;}::slotted(a[target]:last-child):after{content:'';}}` } );
      const content = Object.assign(
        document.createElement(`span`), { innerHTML: `&copy; <span class="yr"><slot name="year"></slot></span> KooiInc <slot name="link"></slot>`});
      shadow.append(componentStyle, content);
    }
  });
}

function createElement(name, props = {}, data = {}) {
  const elem = Object.assign(document.createElement(name), props);
  data = maybe( {trial: _ => Object.entries(data), whenError: _ => [] } );
  
  if (data.length) {
    for (let [key, value] of data) {
      elem.dataset[key] = value;
    }
  }
  
  return elem;
}

function numberFactory() {
  const isNumber = v => v?.constructor !== Array && (+v).constructor === Number && !isNaN(+v) && +v !== Infinity;
  const numberOrDefault = (v, defaultValue2Return) =>
    isNumber(v) ? +v : isNumber(defaultValue2Return) ? +defaultValue2Return : 0;
  const gte = (v, gtv) => {
    v = numberOrDefault(v, -1); gtv = numberOrDefault(gtv);
    return v >= gtv ? v : gtv;
  };
  const inRange = (v, min, max) => {
    v = numberOrDefault(v, -1); min = numberOrDefault(min); max = numberOrDefault(max);
    return v >= min && v <= max;
  };
  
  return { NR: numberOrDefault, gte, inRange, };
}

function maybe({trial, whenError = err => console.log(err)} = {}) {
  try {
    if (trial?.constructor !== Function) {
      throw new TypeError(`maybe: trial parameter not a Function or Lambda`);
    }
    
    return trial();
  } catch (err) {
    return whenError?.constructor === Function ? whenError(err) : console.error(err);
  }
}

function addCustomCssAndMaybeExternals(shadow, fullContent, componentNode) {
  const extraStyling = fullContent.querySelector(`style`);
  const externalStylingId = componentNode.dataset?.externalCssId;
  
  if (!extraStyling && !externalStylingId) { return; }
  
  if (externalStylingId) {
    shadow.append(document.querySelector(`#${externalStylingId}`).cloneNode(true));
  }
  
  if (extraStyling) {
    const xtraSheet = new CSSStyleSheet();
    xtraSheet.replaceSync(extraStyling.innerHTML);
    extraStyling.remove();
    shadow.adoptedStyleSheets.push(xtraSheet);
  }
}