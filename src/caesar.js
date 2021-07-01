// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6
const caesarModule = (function () {
  // returns a "translated" phrase with each character shifted by some amount
  function caesar(input, shift, encode = true) {
    // take care of invalid arguments
    if (typeof input !== "string") return false;
    if (!encode) shift = 0 - shift;
    if (shift < -25 || shift > 25 || shift === 0 || typeof shift !== "number") return false;

    const shiftMap = new Map();
    const alphabetArr = getAlphabetArray();
    const inputArr = input.toLowerCase().split("");

    alphabetArr.map((letter) => {
      const offset = alphabetArr.indexOf(letter) + shift;
      let shiftedIndex = offset;

      // account for shifts beyond 'z' and before 'a'
      if (offset > 25) shiftedIndex = offset - 26;
      else if (offset < 0) shiftedIndex = 26 + offset;
      else shiftedIndex = offset;
      shiftMap.set(letter, alphabetArr[shiftedIndex]);
    });
    // matches alphabet character to shifted character; pushes non-alphabet characters as-is
    const cipheredWord = inputArr.map((input) => shiftMap.get(input) || input);
    return cipheredWord.reduce((word, letter) => (word += letter), "");
  }

  // returns an alphabet string transformed into an array
  function getAlphabetArray(){
    return "abcdefghijklmnopqrstuvwxyz".split("");
  }

  return {
    caesar,
  };
})();

module.exports = { 
  caesar: caesarModule.caesar,
};
