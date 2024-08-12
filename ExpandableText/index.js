import {createElement} from "../Common/CommonHelpers.js";
import {
  default as CreateComponent,
  createOrRetrieveShadowRoot,
  setComponentStyleFor,
} from "../es-webcomponent-factory/Src/WebComponentFactory.js";

const componentStyle = getDefaultStyling();

CreateComponent({componentName: `expandable-text`, onConnect: connectElement});

function connectElement(componentNode) {
  const fullContent = componentNode.content ?? createFullContent(componentNode);
  return !fullContent ? emptyComponent() : doConnect(componentNode, fullContent);
}

function doConnect(componentNode, fullContent) {
  componentNode.content = componentNode.content ?? fullContent;
  const shadow = createOrRetrieveShadowRoot(componentNode);
  shadow.adoptedStyleSheets = [setComponentStyleFor(componentNode, componentStyle)];
  addCustomCssAndMaybeExternals(shadow, fullContent, componentNode);
  connectContent(componentNode, fullContent, shadow);
  shadow.addEventListener(`click`, handleShadowroot);
}

function connectContent(componentNode, fullContent, shadow) {
  const titleText = getTitle(fullContent, componentNode);
  const title = createElement(`div`, {className: `expand-title`}, {expanded: 0,});
  const titleTextElement = createElement(`div`, {
    className: `title`, textContent: titleText, title: `${titleText}`
  });
  title.append(titleTextElement);
  title.prepend(createElement(`div`, {className: `arrow`}));
  const content = createElement(`div`, {className: `expand-content`});
  
  if (componentNode.dataset.preview) {
    content.classList.add(`preview`);
  }
  
  content.append(fullContent);
  shadow.append(title, content);
}

function emptyComponent(componentNode) {
  componentNode.remove();
  return console.info(`✔ an empty <expandable-text> element was removed`);
}

function getTitle(fullContent, componentNode) {
  const titleInTemplate = fullContent.querySelector(`.expand-ttl`);
  const titleText = (titleInTemplate?.textContent ??
      componentNode.dataset?.title?.trim()?.replace(/\s{2,}/g, ` `).replace(/\n/g, ``) ?? ``)
    .trim();
  titleInTemplate?.remove();
  return titleText.length > 0 ? titleText : `--NO TITLE--`;
}

function createFullContent(componentNode) {
  const embeddedTemplate = componentNode.querySelector(`template`)?.cloneNode(true);
  const maybeTemplate = document.querySelector(`#${componentNode.dataset?.contentId}`);
  const maybeHtml = componentNode.innerHTML.trim();
  componentNode.textContent = ``;
  
  return embeddedTemplate
    ? embeddedTemplate.content
      : maybeHtml.length > 0
        ? createElement(`div`, {innerHTML: maybeHtml})
        : maybeTemplate?.content;
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

function handleShadowroot(evt) {
  const shadowRoot = evt.target.getRootNode();
  const canExpand = !!!evt.target.closest(`.expand-content`) || shadowRoot.querySelector(`[data-expanded='0']`);
  
  if (canExpand) {
    const headerElem = shadowRoot.querySelector(`[data-expanded]`);
    const expandedState = +headerElem.dataset.expanded;
    shadowRoot.querySelector('.expand-content').scrollTop = 0;
    return headerElem.dataset.expanded = +(!!!expandedState);
  }
  
  return true;
}

function getDefaultStyling() {
  return `
  :host {
    display: block;
    position: relative;
    margin-top: 1em;
    font: 14px/17px system-ui, sans-serif;
    
    .expand-ttl { display: none; }
    
    .expand-title {
      display: block;
      user-select: none;
      font-weight: bold;
      cursor: pointer;
      position: relative;
  
      .title {
        display: inline-block;
        overflow: hidden;
        font-size: 14pt;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 90%;
        height: 1.4em;
        vertical-align: middle;
      }
    }
  
    .expand-title[data-expanded] .arrow {
      display: inline-block;
      margin: auto;
      color: #a15a57;
      font-size: 1.3em;
      text-align: center;
    }
    
    .expand-title .title:hover {
      color: green;
    }
    
    .expand-title[data-expanded] .arrow:hover:after,
    .expand-title .title:hover:before {
      color: #333;
      margin-left: 0.5em;
      font-weight: normal;
      font-size: 10pt;
      line-height: 1rem;
      background-color: white;
      position: absolute;
      margin: -0.2em auto auto -0.2em;
      border: 1px solid #AAA;
      padding: 3px;
      z-index: 10;
      opacity: 0.9;
      box-shadow: 1px 1px 5px #999;
      white-space: nowrap;
    }
    
    .expand-title[data-expanded='0'] .arrow:hover:after,
    .expand-title[data-expanded='0'] .title:hover:before {
      content: 'click to expand';
    }
  
    .expand-title[data-expanded='1'] .arrow:hover:after,
    .expand-title[data-expanded='1'] .title:hover:before {
      content: 'click to collapse';
    }
    
    .expand-title[data-expanded] .arrow:before {
      font-size: 1.3rem;
      margin-right: 5px;
      text-shadow: -1px 1px 2px #999;
      content: '↘';
      transition: all 1s ease;
      display: inline-block;
    }
  
    .expand-title[data-expanded='1'] .arrow:before {
      transform: rotateX(3.14rad);
      vertical-align: text-bottom;
    }
   
    [data-expanded='0'] ~ .expand-content {
      margin-top: -0.4em;
      overflow: hidden;
      max-height: 0;
      padding: 0;
      opacity: 0;
      transition: all 1s ease;
    }
    
    [data-expanded='0'] ~ .expand-content.preview {
      max-height: 80px;
      opacity: 1;
      mask-image: linear-gradient(#000, transparent);
      cursor: pointer;
    }
  
    [data-expanded='1'] ~ .expand-content {
      max-height: 50vh;
      max-width: 100%;
      overflow-y: auto;
      transition: all 1s ease;
      border: 1px dashed #ccc;
      padding: 8px;
      margin: 0.3em auto 0.7em auto;
      .ellipsis { display: none; }
      cursor: default;
    }
  }`;
}
