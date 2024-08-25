import "../index.js";
import {$} from "https://cdn.jsdelivr.net/gh/KooiInc/SBHelpers@latest/index.browser.bundled.js";
buildPage();

function buildPage() {
  $.editCssRules(`pre {margin: 0.2rem auto;}`, `.hidden {display: none;}`);
  const body = $(document.body).addClass(`hidden`);
  fetch(`./demoPrefix.html`)
    .then(r => r.text())
    .then(createElements)
    .then(_ =>
      fetch(`./demoPageStyle.css`)
        .then(r => r.text())
        .then(r => $.node(`head`).insertAdjacentHTML(`beforeend`, `<style id="local">${r}</style>`))
        .then(_ => body.removeClass(`hidden`) )
    );
}

function createElements(template) {
  $.allowTag(`template`);
  $(`<div class="container">
        <div class="pageContent">${template}</div>
     </div`);
  $(`.pageContent`).prepend($(`
      <p>
        ${/kooiinc\.github\.io/i.test(top.location.href) ?
    `<a target="_top" href="https://github.com/KooiInc/es-web-components/">GitHub</a><br>` : ``}
        <a target="_blank" href="//github.com/KooiInc/es-webcomponent-factory">Web component module @GitHub</a>
      </p>`) );
  $(`.container`).append($(`password-helper`));
  $.node(`expandable-text#prefix`).shadowRoot.addEventListener('click', handle);
}

function handle(evt) {
  if (evt.target.dataset.click) {
    const styling = $.node(`#local`);
    $.Popup.show( {
      content: $(`<pre>${
        styling.innerHTML
          .replace(/password-helper/g, `<b style="color:red">password-helper</b>`)
          .trim()}</pre>`)} );
  }
}