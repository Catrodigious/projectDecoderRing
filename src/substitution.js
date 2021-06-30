// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  function substitution(input, cipherAlphabet, encode = true) {
    if (!input || input.length === 0) return false;
    if (!cipherAlphabet || cipherAlphabet.length !== 26 || new Set(cipherAlphabet.split("")).size < 26) return false;

    const actualAlphabet = getAlphabetArray();
    const data = {input, actualAlphabet, cipherAlphabet};
    return encode ? encodeData(data) : decodeData(data);
  }

  function getAlphabetArray(){
    return "abcdefghijklmnopqrstuvwxyz".split("");
  }

  function encodeData({input, actualAlphabet, cipherAlphabet}){
    const subMap = new Map();

    for (let n=0; n < cipherAlphabet.length; n++){
      subMap.set(actualAlphabet[n], cipherAlphabet[n]);
    }

    return input.split("").reduce((subStr, i)=>{
      return (!/[a-z]/.test(i)) ? subStr += i : subStr += subMap.get(i);
    }, "");
  }

  function decodeData({input, actualAlphabet, cipherAlphabet}){
    const subMap = new Map();

    for (let n=0; n < cipherAlphabet.length; n++){
      subMap.set(cipherAlphabet[n], actualAlphabet[n]);
    }

    return input.split("").reduce((subStr, i)=>{
      return (i === " ") ? subStr += i : subStr += subMap.get(i);
    }, "");
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
