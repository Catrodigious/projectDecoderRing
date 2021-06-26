// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6
const { getAlphabetArray, getKeyByValue } = require('./helper');
const { getCipherMap, encodeData, decodeData } = require('./processLogic');

const polybiusModule = (function () {
  function polybius(input, encode = true) {
    const cipherMap = getCipherMap();
    const userInputArr = input.toLowerCase().split("");
    if (encode){
      return encodeData(userInputArr, cipherMap);
    }else{
      return decodeData(userInputArr, cipherMap);
    }
  }

  return { polybius, };
})();

module.exports = { polybius: polybiusModule.polybius };
