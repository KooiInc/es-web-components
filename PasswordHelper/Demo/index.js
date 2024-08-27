import "../Bundle/password-helper.bundle.js";
//import "../index.js"; // for debugging
import $ from "https://cdn.jsdelivr.net/gh/KooiInc/JQL@latest/Bundle/jql.min.js";
buildPage();

function buildPage() {
  fetch(`./demoPrefix.html`).then(async r =>
    createElements(await r.text(), $(document.body).addClass(`hidden`)));
}

function createElements(template, body) {
  $.allowTag(`template`);
  const repoBackLink = /kooiinc\.github\.io/i.test(top.location.href) ?
    `<a target="_top" href="https://github.com/KooiInc/es-web-components/">GitHub</a><br>` : ``
  $(`<div class="container"><div class="pageContent">${template}</div></div`);
  $(`.pageContent`).prepend($(`
      <p>${repoBackLink}<a target="_blank" href="//github.com/KooiInc/es-webcomponent-factory"
        >Web component module @GitHub</a></p>`) );
  $(`.container`).append($(`<password-helper data-language="EN">`));
  $.node(`expandable-text#prefix`).shadowRoot.addEventListener('click', handle);
  styleIt();
  fetch(`./demoPageStyle.css`)
    .then(async r => $(`head`).append($(`<style id="local">${await r.text()}</style>`)))
    .then(_ => (body.removeClass(`hidden`), console.info(`✓ Demo page done`)) );
}

function handle(evt) {
  if (evt.target.dataset.click) {
    $.Popup.show( {
      content: $(`<pre>${
        $(`#local`).html()
          .replace(/password-helper/g, `<b style="color:red">password-helper</b>`)
          .trim()}</pre>`)} );
  }
}

function styleIt() {
  $.editCssRules(
    `pre {margin: 0.2rem auto;}`,
    `.hidden {display: none;}`,
    `a {text-decoration:none; font-weight:bold;}`,
    `a:hover {text-decoration: underline;}`,
    `a[target]:before, a.internalLink:before, a.externalLink:before {
      color: rgba(0,0,238,0.7);
      font-size: 1.1rem;
      padding-right: 4px;
      vertical-align: baseline;
     }`,
    `a[target="_blank"]:before, a.externalLink:before {
      content: '\\2197 ';
     }`,
    `a[data-top]:before, a.internalLink:before, a[target="_top"]:before {
      content: '\\21BA ';
     }`);
}