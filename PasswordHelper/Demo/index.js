import {$} from "https://cdn.jsdelivr.net/gh/KooiInc/SBHelpers@latest/index.browser.bundled.js";
import "../index.js";
$(`.container .pageContent`).prepend(
  $(`<p>
      ${/kooiinc\.github\.io/i.test(top.location.href) ?
    `<a target="_top" href="https://github.com/KooiInc/es-web-components/">GitHub</a><br>` : ``}
      <a target="_blank" href="//github.com/KooiInc/es-webcomponent-factory"
        >Web component module @GitHub</a>
    </p>`)
);
$.editCssRule(`pre {margin: 0.2rem auto;}`);
document.querySelector(`expandable-text`).shadowRoot.addEventListener('click', handle);

function handle(evt) {
  if (evt.target.dataset.click) {
    const styling = $.node(`#local`);
    $.Popup.show( {
      content: $(`<pre>${
        styling.innerHTML
          .replace(/\n {4}/g, `\n`)
          .replace(/password-helper/g, `<b style="color:red">password-helper</b>`)
          .trim()}</pre>`)} );
  }
}