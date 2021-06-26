// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6
const { getAlphabetArray, stringToArray } = require('./helper');

function getKeyByValue(value, mapObj){
  for (const [k, v] of mapObj.entries()){

    if (v.column === value.column && v.row === value.row){
      return k;
    }
  }

  return null;
}


const polybiusModule = (function () {
  // you can add any code you want within this function scope
  function polybius(input, encode = true) {
    const alphabet = getAlphabetArray();
    let row = 1;
    let column = 1;
    let count = 0;
    let polyMap = new Map();
    let allPolyObjs = [];

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
    const iterableInput = stringToArray(input.toLowerCase());
    if (encode){
      let encoded = "";
      console.log("polyMap: ", polyMap);
      iterableInput.map((letter)=>{
        if ((/[a-z]/).test(letter)){
          let {column, row} = polyMap.get(letter);
          encoded += column;
          encoded += row;
        }else{
          encoded += letter;
        }
      })
      return encoded;
    }else{

      let placeholder = [];
      let toDecode = [];
      let decodeStr = "";

      iterableInput.map((char)=>{
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
          const letter = getKeyByValue(compareObj, polyMap);
          if (letter) decodeStr += letter;
        }else{
          decodeStr += element;
        }
      })

      return decodeStr;
    }
  }

  return {
    polybius,
  };
})();

let blah = polybiusModule.polybius('thinkful @ who');
console.log(blah)
polybiusModule.polybius("4432423352125413 @ 253243", false);

module.exports = { polybius: polybiusModule.polybius };
