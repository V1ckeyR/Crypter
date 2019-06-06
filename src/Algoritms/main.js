'use strict';

const CIPHERS = {
  morze: require('./morze.js'),
  caesar: require('./caesar.js'),
  vigenere: require('./vigenere.js'),
  bacon: require('./bacon.js'),
};

const TIMEOUT = 1000;

const KEY_VALID = {
  caesar: key => !!key.match(/^[-0-9]+$/),
  vigenere: key => !!key.match(/^[a-z]+$/i),
  morze: () => true,
  bacon: () => true,
};

function validator(text) {
  const valid = [];

  text
    .split('')
    .map(symbol =>
      symbol.match(/[a-z]/i) && valid.push(symbol.toLowerCase())
    );

  return valid;
}

function recover(text, working, crypted) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i].toLowerCase() === working[0]) {
      const etalon = working.shift();
      let processed = crypted.shift();

      if (processed === undefined) break;
      if (text[i] === etalon.toUpperCase()) {
        processed = processed.toUpperCase();
      }

      result += processed;
    } else {
      result += text[i];
    }
  }
  return result;
}

const memoization = fn => {
  const cache = {};

  const setTimer = key => setTimeout(() => {
    const lastUse = cache[key].date;
    const difference = new Date() - lastUse;
    if (difference >= TIMEOUT) {
      delete cache[key];
    }
  }, TIMEOUT);

  return (...args) => {
    const key = args.join('|');
    const val = cache[key];
    if (val !== undefined) {
      clearTimeout(val.timer);
      val.date = new Date();
      this.setTimer(key);
      return val.result;
    }
    const result = fn(...args);
    cache[key] = { result, date: new Date(), timer: setTimer(key) };
    return result;
  };
};

function processor(text, key, cipher, operation) {
  if (!KEY_VALID[cipher](key)) throw new Error('Uncorrect key.');

  const working = validator(text);
  if (working.length === 0) throw new Error('Please, enter text.');

  const coder = CIPHERS[cipher];
  const crypted = coder(working, operation, key);
  const result = recover(text, working, crypted);
  return result;
}

module.exports = memoization(processor);
