import {$} from "//cdn.jsdelivr.net/gh/KooiInc/SBHelpers@latest/index.browser.js";
import {importComponentModule} from "../../Common/CommonHelpers.js";
import "../index.js";

await importComponentModule();

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
)