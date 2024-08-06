import {createElement} from "../Common/CommonHelpers.js";
import {
  default as CreateComponent,
  createOrRetrieveShadowRoot,
  setComponentStyleFor,
} from "../es-webcomponent-factory/Src/WebComponentFactory.js";

const componentStyle = getStyling();

CreateComponent({componentName: `expandable-text`, onConnect: connectElement});

export default `loaded from base path ${document.querySelector(`base`).href}`;

function connectElement(componentNode) {
  const shadow = createOrRetrieveShadowRoot(componentNode);
  shadow.adoptedStyleSheets = [setComponentStyleFor(componentNode, componentStyle)];
  connectContent(componentNode, shadow);
  shadow.addEventListener(`click`, handleShadowroot);
}

function connectContent(componentNode, shadow) {
  const fullContent = createFullContent(componentNode);
  addCustomStylesheet(shadow, fullContent);
  const titleText = componentNode.dataset.title.trim().replace(/\s{2,}/g, ` `);
  const title = createElement( `div`, { className: `expand-title` }, { expanded: 0, } );
  const titleTextElement =  createElement( `div`, {
    className: `title`,  textContent: titleText, title: `${titleText} - click to expand` } );
  title.append(titleTextElement);
  title.prepend( createElement( `div`, { className: `arrow` }, { isExpanded: 0 }) );
  const content = createElement( `div`, { className: `expand-content` } );
  content.append(fullContent);
  shadow.append(title, content);
}

function createFullContent(componentNode) {
  if (componentNode.html) { return componentNode.html; }
  const fullContent = componentNode.innerHTML.trim().length
    ? createElement(`div`, {innerHTML: componentNode.innerHTML})
    : document.querySelector(`#${componentNode.dataset.contentId}`).content;
  componentNode.innerHTML = ``;
  return fullContent;
}

function addCustomStylesheet(shadow, fullContent) {
  const extraStyling = fullContent.querySelector(`style`);
  
  if (!extraStyling) { return; }
  
  const xtra = extraStyling.innerHTML;
  extraStyling.remove();
  const xtraSheet = new CSSStyleSheet();
  xtraSheet.replaceSync(xtra);
  shadow.adoptedStyleSheets.push(xtraSheet);
}

function handleShadowroot(evt) {
  const headerContainer = evt.target.getRootNode();
  const isFoldElem = evt.target.closest(`.expand-content`);
  
  if (!isFoldElem) {
    const expander = headerContainer.querySelector(`[data-is-expanded]`);
    const headerElem = headerContainer.querySelector(`[data-expanded]`);
    const titleElement = headerElem.querySelector(`.title`);
    
    if (expander.dataset.isExpanded === `0`) {
      headerElem.classList.add(`active`);
      headerElem.dataset.expanded = 1;
      titleElement.title = titleElement.title.replace(`click to expand`, `click to collapse`);
      return expander.dataset.isExpanded = 1;
    }
    
    headerElem.classList.remove(`active`);
    headerElem.dataset.expanded = 0;
    titleElement.title = titleElement.title.replace(`click to collapse`, `click to expand`);
    return expander.dataset.isExpanded = 0;
  }
  
  return true;
}

function getStyling() {
  return `
  :host {
      display: block;
      position: relative;
      margin-top: 1em;
      font: 14px/17px normal system-ui, sans-serif;

    .expand-title {
      display: block;
      user-select: none;
      font-size: 1.2em;
      font-weight: bold;
      cursor: pointer;
      position: relative;
  
      .title {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 90%;
      }
    }
  
    .expand-title [data-is-expanded] {
      display: inline-block;
      margin: auto;
      color: #a15a57;
      font-size: 1.5em;
      text-align: center;
    }
  
    .expand-title [data-is-expanded]::before {
      font-size: 1.3rem;
      margin-right: 5px;
      text-shadow: -1px 1px 2px #999;
    }
  
    .expand-title [data-is-expanded]:hover:after,
    .expand-title [data-is-expanded] ~ .title:hover::before {
      color: #777;
      margin-left: 0.5em;
      font-weight: normal;
      font-size: 10pt;
      line-height: 1rem;
      background-color: white;
      position: absolute;
      margin-top: 0.5em;
      border: 1px solid #AAA;
      padding: 3px;
      z-index: 10;
      opacity: 0.9;
      box-shadow: 1px 1px 5px #999;
      white-space: nowrap;
    }
  
    .expand-title [data-is-expanded='0']:hover:after {
      content: 'click to expand';
    }
  
    .expand-title [data-is-expanded='1']:hover:after {
      content: 'click to collapse';
    }
  
    .expand-title [data-is-expanded='0']:before {
      content: '↘';
    }
  
    .expand-title [data-is-expanded='1']:before {
      content: '↖';
    }
  
    .expand-title [data-is-expanded='1'] {
      margin-bottom: 0.3rem;
      z-index: 10;
      line-height: 1.1rem;
    }
  
    .expand-title [data-is-expanded='1'] ~ .expand-content > div:first-child {
      margin-top: 0;
    }
  
    [data-expanded='0'] ~ .expand-content {
      overflow: hidden;
      max-height: 0;
      max-width: 40vw;
      color: #c0c0c0;
      padding: 0;
      opacity: 0;
      margin: auto auto 0 1.5rem;
      transition: all 1s ease;
    }
  
    [data-expanded='1'] ~ .expand-content {
      max-height: 50vh;
      max-width: inherit;
      overflow-y: auto;
      transition: all 1s ease;
      border: 1px dashed #ccc;
      padding: 8px;
      margin: 0.3em auto 0.7em auto;
    }
  }`;
}