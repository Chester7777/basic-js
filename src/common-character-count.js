const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  let count = 0;

  if (typeof s1 !== 'string' || typeof s2 !== 'string') {
    return count;
  }

const arrS1 = s1.split('');
const arrS2 = s2.split('');
const charsInS2 = {};

  for (const char of arrS2) {
    if (!charsInS2[char]) {
      charsInS2[char] = 1;
    } else {
      charsInS2[char]++;
    }
  }

  for (const char of arrS1) {
    if (charsInS2[char] && charsInS2[char] > 0) {
      count++;
      charsInS2[char]--;
    }
  }

  return count;
}

module.exports = {
  getCommonCharacterCount
};
