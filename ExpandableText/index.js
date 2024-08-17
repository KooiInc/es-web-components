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
  return !fullContent ? emptyComponent(componentNode) : doConnect(componentNode, fullContent);
}

function doConnect(componentNode, fullContent) {
  componentNode.content = fullContent;
  const shadow = createOrRetrieveShadowRoot(componentNode);
  shadow.adoptedStyleSheets = [setComponentStyleFor(componentNode, defaultStyling)];
  addCustomCssAndMaybeExternals(shadow, fullContent, componentNode);
  connectContent(componentNode, fullContent, shadow);
  shadow.addEventListener(`click`, handleShadowroot);
  checkForAndHandleSublinks(shadow);
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
  componentNode?.remove();
  return console.info(`✔ an empty <expandable-text> element was removed`);
}

function doExpand(shadowRoot, scrollIntoView = false, all = false) {
  const headerElem = shadowRoot.querySelector(`[data-expanded]`);
  const expandedState = +headerElem.dataset.expanded;
  shadowRoot.querySelector('.expand-content').scrollTop = 0;
  headerElem.dataset.expanded = +(!!!expandedState);
  
  if (scrollIntoView ) {
    const parentContent = shadowRoot.host.getRootNode()
      .host.shadowRoot.querySelector(`.expand-content`);
    return scrollIntoViewPort(parentContent, shadowRoot);
  }
  
  !all && maybePositionIntoViewport(shadowRoot);
}

function maybePositionIntoViewport(shadowRoot) {
  const parent = shadowRoot.host.getRootNode().host?.shadowRoot;
  
  if (!parent) { return; }
  
  const parentContent = parent.querySelector(`.expand-content`);
  const parentSize = parentContent.offsetHeight + parentContent.scrollTop;
  const myTop = shadowRoot.host.offsetTop;
  
  setTimeout(_ => {
      if (myTop + 20 >= parentSize) {
        parentContent.scroll({top: parentContent.scrollTop + 150, behavior: `smooth`});
      }
    }, 150);
}

function handleShadowroot(evt) {
  const shadowRoot = evt.target.getRootNode();
  const isPreviewAndClosed = evt.target.closest(`.expand-content.preview`)?.getRootNode()
    .querySelector(`[data-expanded]`).dataset.expanded === '0';
  const isContent = !!!evt.target.closest(`.expand-content`);
  const isCollapsed = !!shadowRoot.querySelector(`[data-expanded='0']`);
  const canExpand =  isContent || isPreviewAndClosed || isCollapsed;
  const collapseAll = !!evt.target.closest(`[data-collapse-all]`);
  const expandAll = !!evt.target.closest(`[data-expand-all]`);
  
  switch(true) {
    case canExpand: return doExpand(shadowRoot);
    case collapseAll: return collapseAllSubs(shadowRoot);
    case expandAll: return expandAllSubs(shadowRoot);
    default: return;
  }
}

function checkForAndHandleSublinks(shadow) {
  const parentHost = shadow.host.getRootNode().host;
  
  if (parentHost) {
    [...parentHost.shadowRoot.querySelectorAll(`expandable-text`)]
      .filter(et => et?.shadowRoot?.querySelector(`[data-open-from-id]`) )
      .forEach(expText => expText.shadowRoot.addEventListener(`click`, clickOpener));
  }
  
  function clickOpener(evt) {
    const shadowRoot = evt.target.getRootNode();
    const opener = evt.target.closest(`[data-open-from-id]`);
    
    if (opener) {
      const ET2Open = shadowRoot.host.getRootNode().querySelector(`#${opener.dataset.openFromId}`)?.shadowRoot;
      const parentContent = shadowRoot.host.getRootNode().host.shadowRoot.querySelector(`.expand-content`);
      
      if (ET2Open) {
        evt.stopImmediatePropagation();
        return ET2Open.querySelector(`[data-expanded='0']`) &&
          doExpand(ET2Open, true) || scrollIntoViewPort(parentContent, ET2Open);
      }
    }
    return false;
  }
}

function scrollIntoViewPort(parentContent, ET) {
  if (parentContent && ET) {
    setTimeout( _ => parentContent.scroll({top: ET.host.offsetTop - 40, behavior: `smooth`}), 150);
  }
}

function collapseAllSubs(shadowRoot) {
  [...shadowRoot.querySelectorAll(`expandable-text`)]
    .filter( et => et.shadowRoot?.querySelector(`.expand-title`).dataset.expanded === `1` )
    .forEach( etOpen => doExpand(etOpen.shadowRoot, false, true) );
}

function expandAllSubs(shadowRoot) {
  [...shadowRoot.querySelectorAll(`expandable-text`)]
    .filter( et => et.shadowRoot?.querySelector(`.expand-title`).dataset.expanded === `0` )
    .forEach( etOpen => doExpand(etOpen.shadowRoot, false, true) );
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

async function preloadStyling() {
  const loadPath = import.meta.resolve(`./`).replace(`index.js`, ``);
  return await fetch(`${loadPath}ExpandableText.css`).then(r => r.text());
}