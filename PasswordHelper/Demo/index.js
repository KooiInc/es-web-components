import {$} from "//cdn.jsdelivr.net/gh/KooiInc/SBHelpers@latest/index.browser.js";
$.editCssRules(

);

import "../index.js";

$(`.container .pageContent`).prepend(
  $(`<p>
      ${/kooiinc\.github\.io/i.test(top.location.href) ?
    `<a target="_top" href="https://github.com/KooiInc/es-web-components/">GitHub</a><br>` : ``}
      <a target="_blank" href="//github.com/KooiInc/es-webcomponent-factory"
        >Web component module @GitHub</a>
    </p>`)
);