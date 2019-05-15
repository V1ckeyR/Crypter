'use strict';

const TEXT = 'Lorem ipsum';
const KEY = 2;

function encodeCaesar(text, key) {
	let encoded = '';
	for (const letter of text) {
		if (!letter.match(/[a-z]/i)) {
			encoded += letter;
			continue;
		}
		let newChar = letter.charCodeAt()+key;
		while (newChar > 'z'.charCodeAt()) newChar -= 26;
		encoded += String.fromCharCode(newChar);
	}
	return encoded
}

console.log(TEXT, '->', encodeCaesar(TEXT, KEY));