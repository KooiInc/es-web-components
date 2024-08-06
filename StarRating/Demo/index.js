const importPath = `../../ExpandableText/index.js`;
await import(importPath);
import {$, logFactory} from "//cdn.jsdelivr.net/gh/KooiInc/SBHelpers@main/index.browser.js?version=makeitso";
import createStarRatingComponent from "../index.js";

createStarRatingComponent();

const log2Screen = initialize();
log2Screen(`!!<h2>Examples</h2>`);
log2Screen(
  `<star-rater
      data-stars="4">
     </star-rater>`,
  
  // data-initial="N" sets initial score to N
  // data-button="1" creates button (reset to initial)
  `<star-rater
      data-stars="6"
      data-initial="4"
      data-button="1">
     </star-rater>`,
  
  `!!<b>No or invalid <code>data-stars</code> values, defaults to 5 stars (see <code>limitsContract</code> in module code)</b>`,
  
  // no data-[stars/initial/button]: use defaults
  `<star-rater/></star-rater>`,
  
  // data-stars not numeric (will revert to 5)
  // data-initial out of bounds (will revert to 0)
  `<star-rater
      data-stars="not a number"
      data-initial="20">
    </star-rater>`,
  
  // data-stars and data-initial out of bounds
  `<star-rater
      data-initial="13"
      data-stars="15">
    </star-rater>`,
  
  // data-stars out of bounds
  `<star-rater
     data-stars="2"
     data-initial="3">
   </star-rater>`,
  
  `!!<b>How do you like it so far?</b>`,
  
  // data-button="1" creates button (reset to initial)
  // (because data-initial has a value)
  `<star-rater
    data-stars="10"
    data-initial="7"
    data-button="1">
   </star-rater>`,
  
  `<star-rater
    data-stars="10">
  </star-rater>`,
);

log2Screen(`!!<h2>A Questionnaire</h2>`, questionnaire());
$.node(`[data-monitor]`).click();

function questionnaire() {
  const rater = `<star-rater data-stars="10" data-buttons="1" data-monitor="1"></star-rater>`;
  const questions = [
    `How much do you like programming?`,
    `How much do you prefer ES20xx?`,
    `Do you think ES20xx class syntax rocks?`,
    `How's life today?` ];
  const qDiv = $.virtual(`
    <div class="q">
      <div class="head">
        Feel free to rate the following questions
        (less to more, zero stars = don't know)
      </div>
      </div>`);
  questions.forEach( q => qDiv.append(`<div>${q}${rater}</div>`));
  qDiv.append(`<div class="qResult">Total: 0</div>`).append(`<p>&nbsp;</p>`);
  
  return qDiv.HTML.get(1);
}

function handleQ() {
  const scores = $(`[data-monitor]`).collection;
  const nQuestions = scores.length;
  const nQuestionTotal = nQuestions * 10;
  const score = scores.reduce( (acc, el) => acc + +el.dataset.score, 0);
  document.querySelector(`.qResult`).textContent = `Total: ${score}/${
    nQuestionTotal} (accumulated score: ${(+(score/nQuestions).toFixed(2)).toLocaleString()})`;
}

function initialize() {
  const {log: log2Screen, logTop} = logFactory();
  $.delegate(`click`, `[data-monitor]`, handleQ);
  $.editCssRules(
    `.container {
      inset: 0;
      position: absolute;
      
      #log2screen {
        margin: 0 auto;
        margin-bottom: 2rem;
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
      max-width: 50vw;
      white-space: nowrap;
      padding: 4px;
      background-color: #EEE;
    }`,
    `.q h3 { margin: 0.3em; }`
  );
  
  const logScreen = $(`#log2screen`);
  $(`<div class="container">`).append(logScreen);
  logScreen.prepend($(`<li class="head">`).append($(`expandable-text`)));
  logTop(`!!<p>
      ${/stackblitz/i.test(top.location.href) ?
    `<a target="_blank" href="//stackblitz.com/@KooiInc"
          >All my projects</a><br>` : ``}
      ${/kooiinc\.github\.io/i.test(top.location.href) ?
    `<a target="_top" href="https://github.com/KooiInc/es-web-components"
            >GitHub repository</a><br>` : ``}
      <a target="_blank" href="//github.com/KooiInc/es-webcomponent-factory"
        >Web component module @GitHub</a>
     </p>`);
  
  return log2Screen;
}
