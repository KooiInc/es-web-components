import "../index.js";
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
  $.editCssRules(`pre {margin: 0.2rem auto;}`, `.hidden {display: none;}`);
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