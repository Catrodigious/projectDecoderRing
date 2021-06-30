// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  function polybius(input, encode=true) {
    const argsValid = argumentValidity(input, encode);
    console.log("argsValid: ", argsValid);

    const cipherMap = getCipherMap();
    const userInputArr = input.toLowerCase().split("");

    return encode ? encodeData(userInputArr, cipherMap) : decodeData(userInputArr, cipherMap);
  }

  function argumentValidity(input, encode){
    const consensus = {};
    const inputArr = input.split("");
    if (!encode){
      const numCheck = inputArr.map((input)=>isNaN(input));
      
      for (let n in numCheck){
        if (numCheck[n] === false && numCheck[n+1] === false){
          consensus.adjacentNums = true;
          break;
        }
      }
    }

    return Object.keys(consensus).every((item)=>item === true);
  }

  // maps columns and rows to alphabet keys
  function getCipherMap() {
    const alphabet = getAlphabetArray();
    let polyMap = new Map();
    let row = 1;
    let column = 1;

    for (const char of alphabet) {
      const coord = { column, row };
      polyMap.set(char, coord);

      // specifically for making sure 'j' is set to the same coord data as 'i'
      if (char === "i") {
        polyMap.set(char, coord);
        continue;
      }
      column < 5 ? column++ : (column = 1);
      if (column === 1) row++;
    }

    return polyMap;
  }
  
  // takes an array of letters and returns a string of translated numbers
  function encodeData(dataArr, cipherMap) {
    let encoded = "";

    return dataArr.reduce((encoded, char)=>{
      if (/[a-z]/.test(char)) {
        const { column, row } = cipherMap.get(char);
        encoded += column;
        encoded += row;
      }else{
        encoded += char;
      }
      return encoded;
    }, "");
  }

  // takes an array of numbers and returns a string of translated letters
  function decodeData(dataArr, cipherMap) {
    if (!inputIsEven(dataArr)) return false;

    let numPair = [];
    const toDecode = [];

    dataArr.map((num) => {
      if (/[0-9]/.test(num)) {
        if (numPair.length < 2) numPair.push(Number(num));
        if (numPair.length === 2) {
          toDecode.push(numPair);
          numPair = [];
        }
      } else {
        toDecode.push(num);
      }
    })

    return toDecode.reduce((decodeStr, element) => {
      if (Array.isArray(element)) {
        let compareObj = { column: element[0], row: element[1] };
        let char = getKeyByValue(compareObj, cipherMap);

        if (!char) return false;
        // accounts for 'j' and 'i' sharing the same coordinates and having a special output
        if (char === "i" || char === "j") decodeStr += "(i/j)"
        else decodeStr += char;
      } else {
        decodeStr += element;
      }
      return decodeStr;
    }, "");
  }

  function getAlphabetArray(){
    return "abcdefghijklmnopqrstuvwxyz".split("");
  }
  // find matching key by comparing value properties
  function getKeyByValue(value, mapObj) {
    for (const [k, v] of mapObj.entries())
      if (v.column === value.column && v.row === value.row) return k;
    return null;
  }

  // helper function for decodeData
  function inputIsEven(inputs) {
    const qtyNums = inputs.reduce((nums, input) => {
      if (/[0-9]/.test(input)) nums++;
      return nums;
    }, 0);

    return qtyNums % 2 !== 0 ? false : true;
  }

  return {
    polybius,
  };
})();


module.exports = { polybius: polybiusModule.polybius };
