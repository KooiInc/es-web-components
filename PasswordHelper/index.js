import { createElement, importComponentModule } from "../Common/CommonHelpers.js";
import "../ExpandableText/index.js";
import {
  default as passGenerator,
  calculateEntropy,
  entropyInWords} from "./PassWordFactory.js";
await importComponentModule();
const pwdGeneratorTemplate = await preloadGeneratorElement();
const defaultStyling = await preloadStyling();
const generateRandomPWD = passGenerator();
const entropyLink = createElement( `a`, {
  target: `_blank`,
  href: `//en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength`,
  textContent: `Entropy`} );
let generatorComponent, me, copiedTO;
CreateComponent({componentName: `password-helper`, onConnect: connectElement});

function connectElement(componentNode) {
  const contentElem = createContent();
  const shadow = createOrRetrieveShadowRoot(componentNode);
  shadow.adoptedStyleSheets = [setComponentStyleFor(componentNode, defaultStyling)];
  shadow.append(contentElem);
  generatorComponent = shadow.querySelector(`#generator`).shadowRoot;
  generatorComponent.addEventListener(`click`, handleGenerator);
  me = shadow;
  [`click`, `keyup`].forEach( e => me.addEventListener(e, handleManualPasswordEntry) );
}

function createContent() {
  const inputContent = createElement(`div`, {className: `content`});
  const inputDiv = createElement(`div`);
  inputDiv.append(
    createElement(`input`, {id: `pass`, type: `text`, placeholder: `start typing...`}),
    createElement(`button`, {id: `copy`, textContent: `Copy`, title: `copy to clipboard`}),
    createElement(`button`, {id: `clear`, textContent: `Clear`}),
    createElement(`span`, {id: `copied`}),
    createElement(`div`, {className: `entropyBox`, textContent: ` `}),
    createElement(`p`, {className: `instruction`, innerHTML: instructionText()}),
  );
  inputContent.append(
    inputDiv,
    createElement(`div`, {id: `symCharsClone`, className: `hidden`}),
  );
  inputContent.insertAdjacentHTML(`beforeend`, pwdGeneratorTemplate);
  return inputContent;
}

/* Handling generator START */
function handleGenerator(evt) {
  const origin = evt.target;
  const generateBttn = origin.closest(`#generate`);
  const allNoneBttn =  origin.closest(`#AllNone`);
  const initialSymsBttn = origin.closest(`#initialSyms`);
  const allSymsBttn = origin.closest(`#allSyms`);
  const root = origin.closest(`.expand-content`);
  
  switch(true) {
    case !!allNoneBttn: return checkAllOrNoneUsesState(allNoneBttn, root);
    case !!generateBttn: return generatePwd(root);
    case !!allSymsBttn: return checkAllSyms(allSymsBttn, root);
    case !!initialSymsBttn: return checkInitialSyms(initialSymsBttn, root);
    default: return true;
  }
}

function checkAllSyms(bttn, root) {
  const allSelected = bttn.dataset.all === `YES`;
  root.querySelectorAll(`#symChars input`)
      .forEach(cb => cb.checked = !allSelected);
  
  return bttn.dataset.all = allSelected ? `NO` : `YES`;
}

function checkInitialSyms(bttn, root) {
  root.querySelectorAll(`#symChars input`)
    .forEach(cb => cb.checked = cb.dataset.initial === `1`);
  root.querySelector(`#allSyms`).dataset.all = `NO`
}

function checkAllOrNoneUsesState(bttn, root) {
  const currentStateIsAll = bttn.dataset.state === `All`;
  bttn.dataset.state = currentStateIsAll ? `None` : `All`;
  return root.querySelectorAll(`.cbi [type=checkbox]`)
    .forEach(cb => cb.checked = currentStateIsAll);
}

function generatePwd(root) {
  const passField = me.querySelector(`#pass`);
  const preferences = getSelectedPreferencesForPasswordGenerator();
  const len = +root.querySelector(`[type=number]`).value || 8;
  const pwdGenerated = generateRandomPWD( len, preferences );
  passField.value = pwdGenerated;
  reportEntropy(pwdGenerated);
  passField.scrollIntoView();
}

function getSelectedPreferencesForPasswordGenerator() {
  const uses = [...generatorComponent.querySelectorAll(`.genLeft .cbi input`)]
    .reduce((acc, inp) => ( {...acc, [inp.id]: inp.checked} ), {});
  const syms = [...generatorComponent.querySelectorAll(`#symChars .cb input:checked`)]
    .map(inp => inp.value);
  return {...uses, Sym: uses.Sym ? syms : false};
}
/* Handling END */

/* Generic Handling START */
function reportEntropy(value) {
  const calculated = calculateEntropy(value);
  const guessDuration = BigInt(calculated.guessDurationInDays);
  const years = (guessDuration/365n).toLocaleString();
  const days = (guessDuration % 365n).toLocaleString();
  const report = me.querySelector(`.entropyBox`);
  report.classList.remove(`copyReport`);
  report.textContent = ``;
  const text = calculated.entropy <= 2
    ? ``
    :  `that's ${ inWords(calculated.intruderGuessAttempts, calculated.entropy) },
        which - without a dictionary and at a guess rate of ${(100_000).toLocaleString()}/second -
        would take ${years} year(s) and ${days} day(s).`
  report.append(
    entropyLink,
    createElement(`b`, { textContent: ` ${Math.round(calculated.entropy)} bits` }),
    createElement(`div`, { innerHTML: text } )
  );
}

function inWords(intruderGuessAttempts, entropy) {
  return entropy >= 2
    ? `<b>${entropyInWords(entropy)}</b> (a hacker needs to guess <i>at least</i> ${
        intruderGuessAttempts.toLocaleString()} times)`
    : `<b>${entropyInWords(entropy)}</b>`;
}
/* Generic Handling END */

/* Pass entry handling START */
function handleManualPasswordEntry(evt) {
  const inp = me.querySelector(`#pass`);
  if (evt.target.closest(`li`)) {
    inp.value = evt.target.closest(`li`).textContent;
    return inp.click();
  }
  
  if (evt.target.id === `clear`) {
    const inp = me.querySelector(`#pass`);
    inp.value = ``;
    me.querySelector(`#pass`).click();
    return inp.focus();
  }
  
  if (evt.target.id === `pass`) {
    if (evt.target.value.length < 1) {
      return me.querySelector(`.entropyBox`).textContent = ``;
    }
    
    return reportEntropy(evt.target.value);
  }
  
  if (evt.target.id === `copy`) {
    return copyPwd2Clipboard(evt.target.getRootNode());
  }
  
}
/* Pass entry handling END */

async function preloadGeneratorElement() {
  const loadPath = import.meta.resolve(`./`).replace(`index.js`, ``);
  return await fetch(`${loadPath}GeneratorTemplate.html`).then(r => r.text());
}

async function preloadStyling() {
  const loadPath = import.meta.resolve(`./`).replace(`index.js`, ``);
  return await fetch(`${loadPath}PasswordHelper.css`).then(r => r.text());
}

async function copyPwd2Clipboard() {
  const pwdField = me.querySelector(`#pass`);
  const reportCopy = me.querySelector(`.entropyBox`);
  reportCopy.classList.add(`copyReport`)
  
  if (location.protocol === `http:`) {
    return reportCopy.textContent = `Copy to clipboard: only for a securely loaded page (https:)`;
  }
  
  if (!navigator.clipboard) {
    return reportCopy.textContent = `The browser does not support this. Please update.`;
  }
  
  if (pwdField.value.trim() === ``) {
    return reportCopy.textContent = `Please supply a password value`;
  }
  
  if (pwdField) {
    const type = `text/plain`;
    const value = new Blob([pwdField.value], { type });
    navigator.clipboard.write([new ClipboardItem({[type]: value})])
      .then(_ => reportCopy.textContent = `Copied!`)
      .catch(err => reportCopy.textContent = `Copy failed, sorry for that` + err.message);
  }
  return;
}

function instructionText() {
  return `
    <div class="p">
      Start filling out the input field above or click
      '<i>Generate a password</i>' to create a 'random' password.
    </div>
    <div class="p">
      The strength of a password needed depends on its use: for a web shop one may need a less strong
      password (strength: <b>ok</b> to <b>fine</b>) than for online banking (minimal strength <b>fine</b>).
    </div>
    <div class="p">
      In general the <i>length</i> of a password is the main factor for its strength. For a strong
      password it may be wise to use a <i>password <b>line</b></i> that is easy to remember.
    </div>
    <div>
      <b>Example lines</b> (click a line to check its strength):
      
      <ul>
      <li><i>Oh no! I need a password!</i></li>
      <li><i>Passwords are not my forte</i></li>
      <li><i>If only I didn't have to worry about my bank balance</i></li>
      <li><i>Cicero said: the apex of old age is influence.</i></li>
      </ul>
      
    </div>`
  
}