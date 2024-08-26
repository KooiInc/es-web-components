const loadPath = import.meta.resolve(`./`).replace(`index.js`, ``);
import interpolate from "https://cdn.jsdelivr.net/gh/KooiInc/StringInterpolator@latest/Interpolate.module.min.js";
import {
  createElement,
  CreateComponent,
  setComponentStyleFor,
  createOrRetrieveShadowRoot, } from "../Common/CommonHelpers.js";
import "./expandable-text.bundle.js";
import appText from "./AppText.js";
import {
  default as passGenerator,
  calculateEntropy,
} from "./PassWordFactory.js";

let language;
const pwdGeneratorTemplate = await preloadGeneratorElement();
const defaultStyling = await preloadStyling();
const generateRandomPWD = passGenerator();
const entropyLink = () => createElement(`a`, {
  target: `_blank`,
  href: `//en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength`,
  textContent: appText.texts.entropy[language],
});

let generatorComponent, me;

CreateComponent({componentName: `password-helper`, onConnect: connectElement});

function connectElement(componentNode) {
  language = componentNode.dataset?.language || `EN`;
  const contentElem = createContent(language);
  const shadow = createOrRetrieveShadowRoot(componentNode);
  shadow.adoptedStyleSheets = [setComponentStyleFor(componentNode, defaultStyling)];
  shadow.append(contentElem);
  generatorComponent = shadow.querySelector(`#generator`).shadowRoot;
  generatorComponent.addEventListener(`click`, handleGenerator);
  me = shadow;
  [`click`, `keyup`].forEach(e => me.addEventListener(e, handleManualPasswordEntry));
}

function createContent(language) {
  const inputContent = createElement(`div`, {className: `content`});
  const isEN = language === `EN`;
  const bttnLanguage = isEN ? `NL` : `EN`
  const bttnLanguageTtl = isEN ? `Dutch` : `English`;
  const inputDiv = createElement(`div`);
  inputDiv.append(
    createElement(`input`, {id: `pass`, type: `text`, placeholder: appText.texts.placeHolder[language]}),
    createElement(`button`, {id: `copy`, textContent: appText.buttons.copy[language], title: appText.texts.copyTtl[language]}),
    createElement(`button`, {id: `clear`, textContent: appText.buttons.clear[language]}),
    createElement(`button`, {id: `switchLang`, title: bttnLanguageTtl}, {language: bttnLanguage}),
    createElement(`span`, {id: `copied`}),
    createElement(`div`, {className: `entropyBox`, textContent: ` `}),
    createElement(`p`, {className: `instruction`, innerHTML: appText.instruction[language]}),
  );
  inputContent.append(
    inputDiv,
    createElement(`div`, {id: `symCharsClone`, className: `hidden`}),
  );
  inputContent.insertAdjacentHTML(`beforeend`, translateGeneratorElement(language));
  return inputContent;
}

/* Handling generator START */
function handleGenerator(evt) {
  const origin = evt.target;
  const generateBttn = origin.closest(`#generate`);
  const allNoneBttn = origin.closest(`#AllNone`);
  const initialSymsBttn = origin.closest(`#initialSyms`);
  const allSymsBttn = origin.closest(`#allSyms`);
  const root = origin.closest(`.expand-content`);
  
  switch (true) {
    case !!allNoneBttn:
      return checkAllOrNoneUsesState(allNoneBttn, root);
    case !!generateBttn:
      return generatePwd(root);
    case !!allSymsBttn:
      return checkAllSyms(allSymsBttn, root);
    case !!initialSymsBttn:
      return checkInitialSyms(initialSymsBttn, root);
    default:
      return true;
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
  bttn.dataset.state = currentStateIsAll ? appText.texts.none[language] : appText.texts.all[language];
  bttn.dataset.stateLang = currentStateIsAll ? appText.texts.nonState[language] : appText.texts.allState[language];
  
  return root.querySelectorAll(`.cbi [type=checkbox]`)
    .forEach(cb => cb.checked = currentStateIsAll);
}

function generatePwd(root) {
  const passField = me.querySelector(`#pass`);
  const preferences = getSelectedPreferencesForPasswordGenerator();
  const len = +root.querySelector(`[type=number]`).value || 8;
  const pwdGenerated = generateRandomPWD(len, preferences);
  passField.value = pwdGenerated;
  reportEntropy(pwdGenerated);
  passField.scrollIntoView();
}

function getSelectedPreferencesForPasswordGenerator() {
  const uses = [...generatorComponent.querySelectorAll(`.genLeft .cbi input`)]
    .reduce((acc, inp) => ({...acc, [inp.id]: inp.checked}), {});
  const syms = [...generatorComponent.querySelectorAll(`#symChars .cb input:checked`)]
    .map(inp => inp.value);
  return {...uses, Symbols: syms};
}

/* Handling END */

/* Generic Handling START */
function reportEntropy(value) {
  const calculated = calculateEntropy(value);
  const guessDuration = BigInt(calculated.guessDurationInDays);
  const years = (guessDuration / 365n);
  const days = (guessDuration % 365n);
  const report = me.querySelector(`.entropyBox`);
  report.classList.remove(`copyReport`);
  report.textContent = ``;
  const text = appText.inWordsLanguage(calculated, years, days, language);
  report.append(
    entropyLink(),
    createElement(`b`, {textContent: ` ${Math.round(calculated.entropy)} bits`}),
    createElement(`div`, {innerHTML: text})
  );
}

/* Generic Handling END */

/* Pass entry handling START */
function handleManualPasswordEntry(evt) {
  const inp = me.querySelector(`#pass`);
  
  if (evt.target.id === `switchLang`) {
    return me.host.replaceWith(
      createElement(`password-helper`, {}, {language: evt.target.dataset.language}) );
  }
  
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
function translateGeneratorElement(language="EN") {
  return interpolate(`${pwdGeneratorTemplate}`, {
    symCBTtl: appText.texts.symCBTtl[language],
    symCBText: appText.texts.symCBText[language],
    min8: appText.texts.min8[language],
    useNumbers: appText.texts.useNumbers[language],
    startWithLetter: appText.texts.startWithLetter[language],
    useUpperCase: appText.texts.useUpperCase[language],
    createBttnTxt: appText.texts.createBttnTxt[language],
    all: appText.texts.all[language],
    allState: appText.texts.allState[language],
    allTxt: appText.texts.allTxt[language],
    initialSymBttnTxt: appText.texts.initialSymBttnTxt[language],
    include: appText.texts.include[language],
    generatePwd: appText.texts.generatePwd[language],
    expand: appText.texts.expand[language],
    collapse: appText.texts.collapse[language],
    selectAllNO: appText.texts.selectAllNO[language],
    selectAllYES: appText.texts.selectAllYES[language],
    space: appText.texts.space[language],
  });
}

async function copyPwd2Clipboard() {
  const pwdField = me.querySelector(`#pass`);
  const reportCopy = me.querySelector(`.entropyBox`);
  reportCopy.classList.add(`copyReport`)
  
  if (location.protocol === `http:`) {
    return reportCopy.innerHTML = appText.texts.cantCopy[language];
  }
  
  if (!navigator.clipboard) {
    return reportCopy.innerHTM = appText.texts.browserTooOld[language];
  }
  
  if (pwdField.value.trim() === ``) {
    return reportCopy.innerHTML = appText.texts.noValue[language];
  }
  
  if (pwdField) {
    const type = `text/plain`;
    const value = new Blob([pwdField.value], {type});
    navigator.clipboard.write([new ClipboardItem({[type]: value})])
      .then(_ => reportCopy.textContent = appText.texts.copied[language])
      .catch(_ => reportCopy.textContent = appText.texts.copyFailed[language]);
  }
}

// MARK FULL
async function preloadGeneratorElement() {
  return await fetch(`${loadPath}GeneratorTemplate.html`).then(r => r.text());
}

async function preloadStyling() {
  return await fetch(`${loadPath}PasswordHelper.css`).then(r => r.text());
}
