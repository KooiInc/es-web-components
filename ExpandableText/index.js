import {createElement} from "../Common/CommonHelpers.js";
import {
  default as CreateComponent,
  createOrRetrieveShadowRoot,
  setComponentStyleFor,
} from "../es-webcomponent-factory/Src/WebComponentFactory.js";

const defaultStyling = await preloadStyling();
CreateComponent({componentName: `expandable-text`, onConnect: connectElement});

function connectElement(componentNode) {
  const fullContent = componentNode.content ?? createFullContent(componentNode);
  return !fullContent ? emptyComponent() : doConnect(componentNode, fullContent);
}

function doConnect(componentNode, fullContent) {
  componentNode.content = componentNode.content ?? fullContent;
  const shadow = createOrRetrieveShadowRoot(componentNode);
  shadow.adoptedStyleSheets = [setComponentStyleFor(componentNode, defaultStyling)];
  connectContent(componentNode, fullContent, shadow);
  addCustomCssAndMaybeExternals(shadow, fullContent, componentNode);
  shadow.addEventListener(`click`, handleShadowroot);
}

function connectContent(componentNode, fullContent, shadow) {
  const titleText = getTitle(fullContent, componentNode);
  const title = createElement(`div`, {className: `expand-title`}, {expanded: 0,});
  const titleTextElement = createElement(`div`, {
    className: `title`, textContent: titleText, title: `${titleText}` } );
  title.append(titleTextElement);
  title.prepend(createElement(`div`, {className: `arrow`}));
  const content = createElement(`div`, {className: `expand-content`});
  
  if (componentNode.dataset.preview) { content.classList.add(`preview`); }
  
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

async function preloadStyling() {
  const loadPath = import.meta.resolve(`./`).replace(`index.js`, ``);
  return await fetch(`${loadPath}ExpandableText.css`).then(r => r.text());
}