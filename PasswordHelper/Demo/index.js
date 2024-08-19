import {$} from "//cdn.jsdelivr.net/gh/KooiInc/SBHelpers@latest/index.browser.js";
import "../index.js";

$.editCssRules(
  `body {
    font: normal 14px/19px verdana, arial, sans-serif;
  }`,
  `.container {
    position: absolute;
    inset: 0;
    
    .pageContent {
      width: 50vw;
      padding-top: 2rem;
      margin: 0 auto;
    }
    
    @media(width <= 3200px) {
      .pageContent {
        width: 33vw;
      }
    }

    @media(width <= 2400px) {
      .pageContent {
        width: 43vw;
      }
    }

    @media(width <= 1024px) {
      .pageContent {
        width: 90vw;
      }
    }
  }`
);

$(`.container .pageContent`).prepend(
  $(`<p>
      ${/kooiinc\.github\.io/i.test(top.location.href) ?
    `<a target="_top" href="https://github.com/KooiInc/es-web-components/">GitHub</a><br>` : ``}
      <a target="_blank" href="//github.com/KooiInc/es-webcomponent-factory"
        >Web component module @GitHub</a>
    </p>`)
);