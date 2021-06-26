const { getKeyByValue, getAlphabetArray } = require('./helper');

// returns a map object with a letter of the alphabet as the key and its coordinates as the value
function getCipherMap(){
    const alphabet = getAlphabetArray();
    let polyMap = new Map();
    let row = 1;
    let column = 1;
    
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

// takes an array of letters and returns a string of translated numbers
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

// helper function for decodeData
function inputIsEven(inputs){
    let qtyNums = inputs.reduce((nums, input)=>{
        if ((/[0-9]/).test(input)) nums++;
        return nums;
    }, 0);

    if (qtyNums % 2 !== 0) return false;

    return true;
}

// takes an array of numbers and returns a string of translated letters
function decodeData(dataArr, cipherMap){
    let placeholder = [];
    let toDecode = [];
    let decodeStr = "";

    if (!inputIsEven(dataArr)) return false;

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
            let letter = getKeyByValue(compareObj, cipherMap);

            // j and i share the same coordinates, so switch one out for the other if one of the letters exist
            if (letter === 'i' && !decodeStr.includes('j')){
                letter = 'j';
                decodeStr += letter;
            }
            if (letter === 'i' && decodeStr.includes('j')){
                decodeStr += letter;
            }
            if (letter && letter != 'i' && letter != 'j'){
                decodeStr += letter;
            }

        }else{
            decodeStr += element;
        }
    })

    return decodeStr;
}

module.exports = { getCipherMap, encodeData, decodeData };
