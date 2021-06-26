// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6
const { getAlphabetArray, stringToArray } = require('./helper');

const caesarModule = (function () {
  function caesar(input, shift, encode = true) {
    if (shift < -25 || shift > 25 || shift === 0) return false;
    if (!encode) shift = 0 - shift;

    let shiftMap = new Map();
    let alphabetArr = getAlphabetArray();
    let inputArr = input.toLowerCase().split("");
    // account for shifts beyond 'z' and before 'a'
    // examples: 
    //  if shift is -3 and the letter is 'a', get index 22
    //  if shift is 3 and the letter is 'z', get index 2
    alphabetArr.map((letter)=>{
      let shiftedIndex = alphabetArr.indexOf(letter) + shift;
      let offset = 0;

      if (shiftedIndex > 25){ // 25 to account for 0th index
        offset = shiftedIndex - 26;
      }else if (shiftedIndex < 0){
        offset = 26 + shiftedIndex;
      }else{
        offset = shiftedIndex;
      }
      shiftMap.set(letter, alphabetArr[offset]);
    })

    const cipheredWord = inputArr.map((input)=>shiftMap.get(input) || input);
    return cipheredWord.reduce((word, letter)=>word+=letter, '');
  }

  return { caesar, };
})();

module.exports = { caesar: caesarModule.caesar };
