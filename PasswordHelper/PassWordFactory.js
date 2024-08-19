/*
  2024/03/19
  - converted to module
  - refactored to class free Object Oriented
    (see https://depth-first.com/articles/2019/03/04/class-free-object-oriented-programming)
  2024/05/13
  - added guess duration (no dictionary, 100.000 guesses/second)
  2024/08/18
  - Adapted for Web Component
*/
export { passGenerator as default, calculateEntropy, uuid4, entropyInWords };

function passGenerator() {
  return function(len, use = pwdDefaults.defaultSettings) {
    len = validateLen(len);
    const chrs2Use = getChars2Use(use);
    return finalize([...Array(len)].map( _ => chrs2Use[randomNumber(chrs2Use.length - 1)]), use);
  };
}

const toChar = v => String.fromCharCode(v);

const pwdDefaults = {
  UC: numberRange({ start: 65, len: 26, remap: toChar } ),
  LC: numberRange({ start: 97, len: 26, remap: toChar } ),
  Nrs: numberRange(),
  SymDefault: ['!', '?', '@', '#', '$', '%', '^', '&', '*', '=', '+', '_', ';', '-'],
  Sym: [],
  defaultSettings: { UC: true, Nrs: false, Sym: false, AFrst: false },
};

function getChars2Use(use) {
  return shuffle( Object.entries(use).reduce( (acc, [key, ]) =>
    pwdDefaults[key] && use[key] ? [...acc, ...pwdDefaults[key]] : acc )
    .concat(use.Sym || [], pwdDefaults.LC).flat()
  );
}

function finalize(pass, use) {
  if (use.AFrst && !/[a-z]/i.test(pass[0])) {
    pass[0] = randomLetter(true);
  }
  
  if (use.Nrs && !pass.find(v => !isNaN(parseInt(v)))) {
    pass[1] = randomNumber(9);
  }
  
  if (use.Sym && !pass.find(v => ~pwdDefaults.Sym.findIndex(s => v === s ) ) ) {
    pass[1] = pwdDefaults.Sym[randomNumber(pwdDefaults.Sym.length-1)];
  }
  
  pass = [pass[0], ...shuffle(pass.slice(1))];
  
  if (pass[0] === ` `) {
    pass = moveSpaceAtStartOrEnd(pass, true);
  }
  
  if (pass[pass.length-1] === ` `) {
    pass = moveSpaceAtStartOrEnd(pass);
  }
  
  return pass.join(``);
}

function moveSpaceAtStartOrEnd(pass, atStart) {
  const len = pass.length - 1;
  pass = atStart ? pass.slice(1) : pass.slice(0, -1);
  pass.splice(randomNumber(len-1, 1), 0, ` `);
  return pass;
}

function validateLen(len) {
  len = parseInt(len);
  return isNaN(len) || len < 8 ? 8 : len;
}

function randomLetter(uc) {
  const letters = pwdDefaults.LC.concat(uc ? pwdDefaults.UC : []);
  return letters[randomNumber(letters.length-1)];
}

function shuffle(array) {
  let i = array.length, x = i - 1;
  
  while (i--) {
    const ri = randomNumber(x);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  
  return array;
}

function randomNumber(max, min = 0) {
  [max, min] = [Math.floor(max), Math.ceil(min)];
  return Math.floor( ([...crypto.getRandomValues(new Uint32Array(1))].shift() / 2 ** 32 )
    * (max - min + 1) + min );
}

function numberRange({start = 0, len = 10, remap} = {}) {
  return remap && remap instanceof Function
    ? [...Array(len)].map((_, i) => start + i).map(remap)
    : [...Array(len)].map((_, i) => start + i);
}

// Shannon entropy
function calculateEntropy(str) {
  const len = str.length
  const freqs = [...str].reduce((freq, c) => ({...freq, [c]: (freq[c] || 0) + 1}), {});
  const entropy = Object.values( freqs ).reduce( (sum, f) => sum - f/len * Math.log2(f/len), 0) * len;
  const intruderGuessAttempts = entropy > 2 ? BigInt((2**(Math.floor(entropy)))/2) : 0;
  const guessDurationInDays =  BigInt( Math.floor((2**(Math.floor(entropy)))/2/100000/86400) );
  return {entropy, guessDurationInDays, intruderGuessAttempts};
}

// refactored from
// https://stackoverflow.com/a/64976228/58186
function uuid4() {
  return [...crypto.getRandomValues(new Uint8Array(16))]
    .map( (v, i) => `${
      (i === 8 ? v & 0b00111111 | 0b10000000 : i === 6  ? v & 0b00001111 | 0b01000000 : v)
        .toString(16).padStart(2, `0`)}${!!~[3,5,7,9].indexOf(i) ? `-` : ``}` )
    .join(``);
}

function entropyInWords(entropy) {
  return entropy < 25 ? `Very weak`
    : entropy < 40 ? `Weak`
      : entropy < 60 ? `Ok`
        : entropy < 80 ? `Fine`
          : `Excellent`;
}