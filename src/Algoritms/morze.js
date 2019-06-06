'use strict';

const { ALPHABET_MORZE } = require('./alphabet.js');

const OPERATIONS = {
  encode: text => text
    .map(letter => {
      letter = letter.toUpperCase();
      return letter in ALPHABET_MORZE ? ALPHABET_MORZE[letter] + ' ' : letter;
    }),

  decode: text => {
    console.log(text);
    text
      .split('   ')
      .map(word => word
        .split(' ')
        .map(letter => Object.keys(ALPHABET_MORZE)
          .find(el => ALPHABET_MORZE[el] === letter) || letter)
        .join('')
      );
    return text;
  },
};

const morze = (text, operation) => OPERATIONS[operation](text);

module.exports = morze;
