import "../index.js";
import {$, logFactory} from "//cdn.jsdelivr.net/gh/KooiInc/SBHelpers@main/index.browser.js?version=makeitso";
let examples = [];
let loremIpsum;
const log2Screen = initialize();
const wrapHTML = html => `<pre class="language-markup"><code class="language-html">${
   html.replace(/</g, `&lt;`)}</code></pre>`;
log2Screen(`!!<h2>Examples</h2>`);
examples.forEach( example => log2Screen(`${example}<div class="htmlHeader">HTML for the above</div>${
  wrapHTML(example)}</div>`) );
Prism.highlightAllUnder(document.querySelector(`.start`)
  .shadowRoot.querySelector(`expandable-text`)
    .shadowRoot.querySelector(`#styleHtml`));
$(`.container`).append(`<p>&nbsp;</p>`);

function initialize() {
  const {log: log2Screen, logTop} = logFactory();
  
  $.editCssRules(
  `.container {
      inset: 0;
      position: absolute;
      
      #log2screen {
        margin: 0 auto;
        margin-bottom: 2rem;
      }
      
      #log2screen li div.htmlHeader:not([class*='language-']) {
        font-weight: bold;
        color: #888;
        margin-top: 1em;
        font-size: 1.1em;
      }

      @media(width <= 3200px) {
        #log2screen {
          max-width: 40vw;
        }
      }

      @media(width <= 2400px) {
        #log2screen {
          max-width: 60vw;
        }
      }

      @media(width <= 1024px) {
        #log2screen {
          max-width: 90vw;
        }
      }
    }`,
  `.head div:first-child {
      color: #777;
      font-weight: normal;
      margin-top: -0.5rem;
    }`,
  `#log2screen li div {
      margin-top: 0
    }`,
  `.head ul {
      margin-left: -0.5rem;
    }`,
  `#log2screen li div.q div:not(.head, .qResult) {
      margin-top: 0.3rem;
      font-style: italic;
    }`,
  `#log2screen li div.q div.head { margin-bottom: 1rem; }`,
  `.qResult {
      font-weight: bold;
      color: #607ca1;
      min-width: 320px;
      max-width: 360px;
      white-space: nowrap;
      padding: 4px;
      background-color: #EEE;
    }`,
  `.q h3 { margin: 0.3em; }`,
  `expandable-text.start { margin-top: 2em; }`,
  `#log2screen li { vertical-align: top; }`
  );
  $.allowTag(`template`);
  loremIpsum = `<div>Hi, let's lorem</div>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
    <div>Curabitur pretium tincidunt lacus, ut dapibus purus tincidunt a. Nulla facilisi...</div>`;
  $(`<template id="loremExternal">${loremIpsum}</template>`);
  examples = [
`<expandable-text data-title="A default element with html inside">
    ${loremIpsum}
</expandable-text>`,
`<expandable-text data-title="A default element with a template inside">
  <template>
    ${loremIpsum}
  </template>
</expandable-text>`,
`<expandable-text
  data-title="A default element with a template outside (#loremExternal)"
  data-content-id="loremExternal">
</expandable-text>`,
`<expandable-text>
  <template>
    <style>
      /* styling always should be within :host */
      /* nested */
      :host {
        .title { color: rgba(242, 19, 19, 0.6); font-style: italic;}
        .expand-content div:last-child { margin-top: 1rem; color: green; }
        [data-expanded='1'] ~ .expand-content { font-size: 1.2rem; }
      }
      /* not nested */
      :host .expand-content div:first-child {
        color: blue;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      :host .expand-title [data-is-expanded]:before {
        content: '▼';
      }
      :host .expand-title [data-is-expanded='1']:before {
        transform: rotate(0deg) rotateX(3.14rad);
      }
    </style>
    </style>
    <div class="expand-ttl">A default element with a template inside and some styling</div>
    <!-- ^ title from element -->
    ${loremIpsum}
  </template>
</expandable-text>`,
`<expandable-text data-preview="1">
  <template>
    <div class="expand-ttl">An element with a default preview area</div>
    ${loremIpsum}
  </template>
</expandable-text>`  ];
  const logScreen = $(`#log2screen`);
  $(`<div class="container">`).append(logScreen);
  logScreen.prepend($(`<li class="head">`).append($(`expandable-text`)));
  logTop(`!!<p>
      ${/stackblitz/i.test(top.location.href) ?
  `<a target="_blank" href="//stackblitz.com/@KooiInc"
          >All my projects</a><br>` : ``}
      ${/kooiinc\.github\.io/i.test(top.location.href) ?
  `<a target="_top" href="https://github.com/KooiInc/es-web-components/tree/main/ExpandableText"
            >GitHub</a><br>` : ``}
      <a target="_blank" href="//github.com/KooiInc/es-webcomponent-factory"
        >Web component factory module @GitHub</a>
     </p>`);
  
  return log2Screen;
}