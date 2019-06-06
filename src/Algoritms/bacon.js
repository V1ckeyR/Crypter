'use strict';

const { KEY_BACON, ALPHABET } = require('./alphabet.js');

const OPERATIONS = {
  encode: text => {
    const result = [];
    for (const letter of text) {
      const shift = ALPHABET.indexOf(letter);
      result.push(KEY_BACON.slice(shift, shift + 5));
    }
    return result;
  },

  decode: text => {
    const result = [];
    for (let i = 0; i < text.length; i += 5) {
      const symbol = text.slice(i, i + 5).join('');
      if (symbol.length === 5) result.push(
        ALPHABET[
          KEY_BACON.indexOf(symbol)
        ]
      );
    }
    return result;
  },
};

function bacon(text, operation) {
  return OPERATIONS[operation](text);
}

module.exports = bacon;
