import {entropyInWords} from "./PassWordFactory.js";
import allText from "./AppTextCondensed.js";
allText.inWordsLanguage = inWordsLanguage;
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
  lessThanADay: {EN: `less than a day`, NL: `minder dan een dag`},
  vergen: {EN: ``, NL: `duren`},
  atLeast: {
    EN: `A hacker needs to guess <i>at least</i>`,
    NL: `Een hacker heeft <i>tenminste</i>`},
  times: {EN: `time(s)`, NL: `raadpogingen nodig`},
  and: {EN: `and`, NL: `en`},
};

function inWordsLanguage(calculated, years, days, lang = `EN`) {
  const duration = years < 1 && days < 1
    ? `<b><i>${reportEntropyTexts.lessThanADay[lang]}</i></b>` :
    `${years.toLocaleString(lang)} ${reportEntropyTexts.years[lang]} ${
        reportEntropyTexts.and[lang]} ${ days} ${reportEntropyTexts.days[lang]}`;
  return calculated.entropy <= 2 ? `` : `${reportEntropyTexts.thats[lang]} ${
    inWords(calculated.intruderGuessAttempts, calculated.entropy, lang)}
      ${reportEntropyTexts.what[lang]} ${(100_000).toLocaleString(lang)} per ${
        reportEntropyTexts.second[lang]} ${reportEntropyTexts.wouldTake[lang]} ${
          duration} ${reportEntropyTexts.vergen[lang]}`;
}

function inWords(intruderGuessAttempts, entropy, lang) {
  const entropyWord = entropyInWords(entropy, lang);
  return entropy >= 2
    ? `<b>${entropyWord}</b>. ${reportEntropyTexts.atLeast[lang]} ${
        intruderGuessAttempts.toLocaleString(lang)} ${
          reportEntropyTexts.times[lang].toLocaleString(lang)}.`
    : `<b>${entropyWord}</b>`;
}

