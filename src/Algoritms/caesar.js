'use strict';

const { ALPHABET } = require('./alphabet.js');

const firstLetter = alphabet => alphabet[0].charCodeAt();
const lastLetter = alphabet => alphabet.slice(-1).charCodeAt();

function caesar(text, operation, key) {
  key = +key;
  if (operation === 'decode') key = -key;

  return text.map(el => {
    let symbol = el.charCodeAt() + key;
    while (symbol < firstLetter(ALPHABET)) symbol += ALPHABET.length;
    while (symbol > lastLetter(ALPHABET)) symbol -= ALPHABET.length;
    return String.fromCharCode(symbol);
  });
}

module.exports = caesar;

