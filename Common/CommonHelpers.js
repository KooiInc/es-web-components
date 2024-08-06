export {createElement, numberFactory, maybe}

function createElement(name, props = {}, data = {}) {
  const elem = Object.assign(document.createElement(name), props);
  data = maybe( {trial: _ => Object.entries(data), whenError: _ => [] } );
  
  if (data.length) {
    for (let [key, value] of data) {
      elem.dataset[key] = value;
    }
  }
  
  return elem;
}

function numberFactory() {
  const isNumber = v => v?.constructor !== Array && (+v).constructor === Number && !isNaN(+v) && +v !== Infinity;
  const numberOrDefault = (v, defaultValue2Return) =>
    isNumber(v) ? +v : isNumber(defaultValue2Return) ? +defaultValue2Return : 0;
  const gte = (v, gtv) => {
    v = numberOrDefault(v, -1); gtv = numberOrDefault(gtv);
    return v >= gtv ? v : gtv;
  };
  const inRange = (v, min, max) => {
    v = numberOrDefault(v, -1); min = numberOrDefault(min); max = numberOrDefault(max);
    return v >= min && v <= max;
  };
  
  return { NR: numberOrDefault, gte, inRange, };
}

function maybe({trial, whenError = err => console.log(err)} = {}) {
  try {
    if (trial?.constructor !== Function) {
      throw new TypeError(`maybe: trial parameter not a Function or Lambda`);
    }
    
    return trial();
  } catch (err) {
    return whenError?.constructor === Function ? whenError(err) : console.error(err);
  }
}