'use strict';

const assert = require('assert');
const processor = require('./main.js');
const { writeFile } = require('fs');

const successMessage = 'success';

class Tester {
  constructor(name, operation, tests) {
    this.name = name;
    this.operation = operation;
    this.tests = tests;
    this.results = [];
  }

  run() {
    for (const test of this.tests) {
      const [key, text, expected, name] = test;
      
      let result;
      try {
        result = processor(text, key, this.name, this.operation);
      } catch (error) {
        result = error.message;
      }

      try {
        assert.strictEqual(result, expected, `Error in ${name}`);
        this.results.push({ key, text, result, expected, message: successMessage });
      } catch (err) {
        const { message } = err;
        this.results.push({ key, text, result, expected, message });
      }
    }
    return this;
  }

  log() {
    let failed = 0;
    let successed = 0;
    const total = this.tests.length;
    for (const result of this.results) {
      result.message === successMessage ? ++successed : ++failed;
    }

    console.log(`${this.name} ${this.operation} results:`);
    console.table(this.results);
    console.log({total, successed, failed});
    return this;
  }

  toFile(filename) {
    writeFile(filename, JSON.stringify(this.results), (err) => {
      if (err) throw err;
      console.log('\x1b[3;32mSUCCESSFULLY IMPORTED TO FILE\x1b[0m')
    });
    return this;
  }
}

//USAGE

const caesarEncodeTests = new Tester('caesar', 'encode', [
  ['0',   'a bz!',  'a bz!',                 'Non shift'],
  ['1',   'a bz!',  'b ca!',                   '+ shift'],
  ['-1',  'a bz!',  'z ay!',                   '- shift'],
  ['1',        '',  'Please, enter text.',  'Empty text'],
  ['1',   '10 20',  'Please, enter text.', 'Number text'],
]);

const caesarDecodeTests = new Tester('caesar', 'decode', [
  ['0',   'a bz!',  'a bz!',                 'Non shift'],
  ['1',   'a bz!',  'z ay!',                   '+ shift'],
  ['-1',  'a bz!',  'b ca!',                   '- shift'],
  ['1',        '',  'Please, enter text.',  'Empty text'],
  ['1',   '10 20',  'Please, enter text.', 'Number text'],
]);

const morzeEncodeTests = new Tester('morze', 'encode', [
  [null, 'a bz!',       '.-  -... --.. !',      'Casual'],
  [null,      '',   'Please, enter text.',  'Empty text'],
  [null, '10 20',   'Please, enter text.', 'Number text'],
]);

const vigenereEncodeTests = new Tester('vigenere', 'encode', [
  ['Lemon', 'Some text',            'Dsys gpbf',      'Casual'],
  ['Melon',          '',  'Please, enter text.',  'Empty text'],
  ['Nekon',     '10 20',  'Please, enter text.', 'Number text'],
]);

const baconEncodeTests = new Tester('bacon', 'encode', [
  [null, 'cat',                  'aaabbaaaaababba',      'Casual'],
  [null,                '',  'Please, enter text.',  'Empty text'],
  [null,           '10 20',  'Please, enter text.', 'Number text'],
])

const baconDecodeTests = new Tester('bacon', 'decode', [
  [null, 'aaabbaaaaababba',                  'cat',      'Casual'],
  [null,                '',  'Please, enter text.',  'Empty text'],
  [null,           '10 20',  'Please, enter text.', 'Number text'],
])

const execute = test => 
  test
  .run()
  .log()
  .toFile('./test.txt');

execute(caesarEncodeTests);
execute(caesarDecodeTests);
execute(morzeEncodeTests);
execute(vigenereEncodeTests);
execute(baconDecodeTests);
execute(baconEncodeTests);