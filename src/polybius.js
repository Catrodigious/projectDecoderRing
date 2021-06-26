// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6
const { getAlphabetArray, stringToArray, getKeyByValue } = require('./helper');

function getCipherMap(){
  const alphabet = getAlphabetArray();

  let row = 1;
  let column = 1;
  let count = 0;
  let polyMap = new Map();

  for (letter of alphabet){
    let coord = {column, row};
    polyMap.set(letter, {column, row});

    if (letter === 'i'){
      polyMap.set(letter, {column, row});
      continue;
    }

    column < 5 ? column++ : column = 1;
    if(column === 1) row++;
  }

  return polyMap;
}

function encodeData(dataArr, cipherMap){
  let encoded = "";
  dataArr.map((letter)=>{
    if ((/[a-z]/).test(letter)){
      let {column, row} = cipherMap.get(letter);
      encoded += column;
      encoded += row;
    }else{
      encoded += letter;
    }
  })
  return encoded;
}

function decodeData(dataArr, cipherMap){
  let placeholder = [];
  let toDecode = [];
  let decodeStr = "";

  dataArr.map((char)=>{
    if ((/[0-9]/).test(char)){

      if (placeholder.length < 2){
        placeholder.push(Number(char));
      }
      if(placeholder.length === 2){
        toDecode.push(placeholder);
        placeholder = [];
      }
    }else{
      toDecode.push(char);
    }
  })

  toDecode.map((element)=>{
    if (Array.isArray(element)){
      let compareObj = {column: element[0], row: element[1]};
      const letter = getKeyByValue(compareObj, cipherMap);
      if (letter) decodeStr += letter;
    }else{
      decodeStr += element;
    }
  })

  return decodeStr;
}

const polybiusModule = (function () {
  // you can add any code you want within this function scope
  function polybius(input, encode = true) {
    const cipherMap = getCipherMap();
    const userInputArr = stringToArray(input.toLowerCase());
    if (encode){
      return encodeData(userInputArr, cipherMap);
    }else{
      return decodeData(userInputArr, cipherMap);
    }
  }

  return {
    polybius,
  };
})();

let encoded = polybiusModule.polybius('thinkful @ who');
console.log(encoded)
let decoded = polybiusModule.polybius("4432423352125413 @ 253243", false);
console.log(decoded)

module.exports = { polybius: polybiusModule.polybius };
