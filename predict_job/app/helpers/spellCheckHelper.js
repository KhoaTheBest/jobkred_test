/* jshint node: true */
'use strict';
const spell = require('spell');
const dict = spell();

module.exports = {
    prepareDicts: (phase) => phase.split(' ').map((term) => dict.add_word(term)),
    correctWord: (word) => {
        return dict.lucky(word);
    }
};