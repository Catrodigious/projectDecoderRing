// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6
const substitutionModule = (function () {
  function substitution(input, cipherAlphabet, encode = true) {
    // takes care of invalid arguments
    if (!input || input.length === 0) return false;
    if (!cipherAlphabet || cipherAlphabet.length !== 26 || new Set(cipherAlphabet.split("")).size < 26) return false;
    if (encode) input = input.toLowerCase();
    const actualAlphabet = getAlphabetArray();
    const data = {input, actualAlphabet, cipherAlphabet};
    return encode ? encodeData(data) : decodeData(data);
  }

  function getAlphabetArray(){
    return "abcdefghijklmnopqrstuvwxyz".split("");
  }

  // substitutes the English alphabet with a custom one
  function encodeData({input, actualAlphabet, cipherAlphabet}){
    const subMap = new Map();

    for (let n=0; n < cipherAlphabet.length; n++){
      subMap.set(actualAlphabet[n], cipherAlphabet[n]);
    }

    return input.split("").reduce((subStr, i)=>{
      return (!/[a-z]/.test(i)) ? subStr += i : subStr += subMap.get(i);
    }, "");
  }
  // substitutes custom alphabet with the English alphabet
  function decodeData({input, actualAlphabet, cipherAlphabet}){
    const subMap = new Map();

    for (let n=0; n < cipherAlphabet.length; n++){
      subMap.set(cipherAlphabet[n], actualAlphabet[n]);
    }

    return input.split("").reduce((subStr, i)=>{
      if (i === " ") subStr += i
      else{
        const transStr = subMap.get(i);
        (transStr) ? subStr += transStr : subStr += i;
      }
      return subStr;
    }, "");
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
