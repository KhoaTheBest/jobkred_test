/* jshint node: true */
'use strict';
var Combinatorics = require('js-combinatorics');
var dist = require('../helpers/spellCheckHelper');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    extractKeywords: (inputText) => {
        var keywords = [];
        var splitText = inputText.split(/\W/g);

        splitText.map(word => {
            if (word.length > 0) {
                // Correct word
                var correctedWord = dist.correctWord(word);

                // Transform to Captialize
                var capitalizedWord = capitalizeFirstLetter(correctedWord);

                // Add to list
                keywords.push(capitalizedWord);
            }
        });

        return keywords;
    },
    prepareQueryString: (keywords) => {
        var allPossibleKeywordArray = Combinatorics.permutationCombination(keywords).toArray();
        return allPossibleKeywordArray.map(word => "'" + word.join(' ') + "'").join(',');
    }
};