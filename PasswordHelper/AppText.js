import {entropyInWords} from "./PassWordFactory.js";

const allText = {
  buttons: {
    copy: {EN: `Copy`, NL: `Kopieer`},
    clear: {EN: `Clear`, NL: `Maak leeg`},
  },
  texts: {
    cantCopy: {
      EN: `Copy to clipboard is only possible for a page loaded with http<b>S</b>`,
      NL: `Kopieren naar het klembord kan alleen op een met http<b>S</b> beveiligde pagina`
    },
    browserTooOld: {
      EN: `The browser does not support this. Please update.`,
      NL: `Het internetbladerprogramma is hier te oud voor`
    },
    noValue: {
      EN: `Please supply a password value`,
      NL: `Voer svp een wachtwoord in`
    },
    symCBTtl: {
      EN: `Use selected non-letters (select characters in the 'Include' block)`,
      NL: `Gebruik niet-letters (selecteer tekens in het 'Gebruik'-blokje)`},
    min8: {EN: `Minimum 8 (enforced)`, NL: `Minimum 8 (afgedwongen)`},
    useNumbers: {EN: `Use numbers`, NL: `Gebruik getallen`},
    symCBText: {EN: `Use non-letters`, NL: `Gebruik niet-letters`},
    useUpperCase: {EN: `Use upper case`, NL: `Gebruik hoofdletters`},
    include: {EN: `Include`, NL: `Gebruik`},
    startWithLetter: {EN: `Start with letter`, NL: `Begin met een letter`},
    all: {EN: `All`, NL: `All`},
    allState: {EN: `All`, NL: `Alles`},
    nonState: {EN: `None`, NL: `Niks`},
    none: {EN: `None`, NL: `None`},
    selectAllNO: {EN: `Select all`, NL: `Selecteer alles`},
    selectAllYES: {EN: `Select none`, NL: `Selecteer niks`},
    allTxt: {EN: `of the above`, NL: `hierboven`},
    createBttnTxt: {EN: `Create`, NL: `Maak wachtwoord`},
    initialSymBttnTxt: {EN: `Initial selection`, NL: `Initiële selectie`},
    copied: { EN: `Copied!`, NL: `Gekopieerd!`},
    copyFailed: {EN: `Copy failed, sorry for that`, NL: `Kopiëren helaas niet gelukt`},
    placeHolder: {EN: `start typing...`, NL: `begin met typen...`},
    copyTtl: {EN: `copy to clipboard`, NL: `kopieer naar klembord`},
    generatePwd: {EN: `Generate a password`, NL: `Maak een wachtwoord`},
    expand: {EN: `click to expand`, NL: `klik om te tonen`},
    collapse: {EN: `click to collapse`, NL: `klik om verbergen`},
    entropy: {EN: `Entropy`, NL: `Entropie`},
  },
  inWordsLanguage,
  instruction: {
    EN: `
        <div class="p">
          Start filling out the input field above or click
          '<i>Generate a password</i>' to let the application create a 'random' password.
        </div>
        <div class="p">
          The strength of a password needed depends on its use: for a web shop one may need a less strong
          password (strength: <b>ok</b> to <b>fine</b>) than for online banking (minimal strength <b>fine</b>).
        </div>
        <div class="p">
          Mostly (but not allways) the <i>length</i> of a password is the main factor for its strength.
          For a strong  password it may be wise to use a <i>password <b>line</b></i> that is easy to
          remember.
        </div>
        <div>
          <b>Example lines</b> (click a line to check its strength):
          
          <ul>
          <li><i>Oh no! I need a password!</i></li>
          <li><i>Passwords are not my forte</i></li>
          <li><i>If only I didn't have to worry about my bank balance</i></li>
          <li><i>Cicero said: the apex of old age is influence.</i></li>
          </ul>
        </div>`,
      NL: `
          <div class="p">
          Vul het invoerveld hierboven in of klik op '<i>Wachtwoord genereren</i>'
          om een wachtwoord met onwillekeurige tekens te laten maken.
        </div>
        <div class="p">
          De benodigde sterkte van een wachtwoord is afhankelijk van waar het voor wordt gebruikt:
          voor een webwinkel is doorgaans een minder sterk wachtwoord (sterkte <b>goed</b> tot <b>prima</b>
          nodig dan voor een online bankieren (sterkte <b>prima</b> of beter).
        </div>
        <div class="p">
          Veelal (maar niet altijd) is de <i>lengte</i> van een wachtwoord de belangrijkste factor voor de
          sterkte ervan. Een goed wachtwoord kan prima een hele zin zijn. Dat is veel gemakkelijker
          te onthouden en een zin van enkele woorden geeft vaak al een heel sterk wachtwoord.
        </div>
        <div>
          <b>Voorbeelden van wachtwoordzinnen</b> (klik op een zin om de sterkte ervan te testen):
          
          <ul>
          <li><i>O help! Ik heb een wachtwoord nodig!</i></li>
          <li><i>Ik kan helemaal niks met wachtwoorden</i></li>
          <li><i>Als ik me nou maar niet steeds zorgen moet maken over mijn banksaldo</i></li>
          <li><i>Cicero zei al: het toppunt van ouderdom is invloed.</i></li>
          </ul>
        </div>`,
  },
};

export default allText;

const reportEntropyTexts = {
  thats: {EN: `That's`, NL: `Dat is`},
  what: {
    EN: `Without a dictionary and at a guess rate of`,
    NL: `Zonder een 'woordenboek' en met een raadfrequentie van`, },
  second: {EN: `second`, NL: `seconde`},
  wouldTake: {EN: `that would take`, NL: `zou dat`},
  years: {EN: `year(s)`, NL: `jaar`},
  days: {EN: `day(s)`, NL: `dag(en)`},
  vergen: {EN: ``, NL: `vergen`},
  atLeast: {
    EN: `A hacker needs to guess <i>at least</i>`,
    NL: `Een hacker heeft <i>tenminste</i>`},
  times: {EN: `time(s)`, NL: `raadpogingen nodig`},
  and: {EN: `and`, NL: `en`},
  
}

function inWordsLanguage(calculated, years, days, lang = `EN`) {
  return `${reportEntropyTexts.thats[lang]} ${
    inWords(calculated.intruderGuessAttempts, calculated.entropy, lang)}
      ${reportEntropyTexts.what[lang]} ${(100_000).toLocaleString(lang)} per ${
        reportEntropyTexts.second[lang]} ${reportEntropyTexts.wouldTake[lang]}
      ${years.toLocaleString(lang)} ${reportEntropyTexts.years[lang]} ${reportEntropyTexts.and[lang]} ${
        days} ${reportEntropyTexts.days[lang]} ${reportEntropyTexts.vergen[lang]}`;
}

function inWords(intruderGuessAttempts, entropy, lang) {
  const entropyWord = entropyInWords(entropy, lang);
  return entropy >= 2
    ? `<b>${entropyWord}</b>. ${reportEntropyTexts.atLeast[lang]} ${
      intruderGuessAttempts.toLocaleString(lang)} ${reportEntropyTexts.times[lang].toLocaleString(lang)}.`
    : `<b>${entropyWord}</b>`;
}

