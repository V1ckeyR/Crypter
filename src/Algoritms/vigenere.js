'use strict';

const { ALPHABET } = require('./alphabet.js');

const lastLetter = (alphabet) => alphabet.slice(-1).charCodeAt();

const OPERATIONS = {
  encode: (i, text, key) => key[i].charCodeAt() + ALPHABET.indexOf(text[i]),

  decode: (i, text, key) => {
    let symbol = ALPHABET[0].charCodeAt();
    const shift = Math.abs(key[i].charCodeAt() - text[i].charCodeAt());
    symbol += (text[i] > key[i]) ? shift : ALPHABET.length - shift;
    return symbol;
  },
};

function suitableKey(length, key) {
  key = key.toLowerCase();
  const full = length / key.length;
  const part = length % key.length;
  key = key.repeat(full) + key.slice(0, part);
  return key;
}

function vigenere(text, operation, key) {
  let result = [];
  let symbol;
  key = suitableKey(text.length, key);

  for (let i = 0; i < text.length; i++) {
    const fn = OPERATIONS[operation];
    symbol = fn(i, text, key);
    while (symbol > lastLetter(ALPHABET)) symbol -= ALPHABET.length;
    result.push(String.fromCharCode(symbol));
  }
  return result;
}

module.exports = vigenere;