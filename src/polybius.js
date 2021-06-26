// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  function polybius(input, encode = true) {
    const cipherMap = getCipherMap();
    const userInputArr = input.toLowerCase().split("");
    if (encode) {
      return encodeData(userInputArr, cipherMap);
    } else {
      return decodeData(userInputArr, cipherMap);
    }
  }
  
  function getCipherMap() {
    const alphabet = getAlphabetArray();
    let polyMap = new Map();
    let row = 1;
    let column = 1;

    for (const char of alphabet) {
      let coord = { column, row };
      polyMap.set(char, { column, row });
      if (char === "i") {
        polyMap.set(char, { column, row });
        continue;
      }
      column < 5 ? column++ : (column = 1);
      if (column === 1) row++;
    }

    return polyMap;
  }

  function getAlphabetArray(caps = false) {
    // 65 is capitalized A; 97 is lowercase A
    let asciiRep = caps ? 65 : 97;
    let allLetters = [];

    for (let n = 0; n < 26; n++) {
      allLetters.push(String.fromCharCode(asciiRep));
      asciiRep++;
    }

    return allLetters;
  }

  function getKeyByValue(value, mapObj) {
    for (const [k, v] of mapObj.entries())
      if (v.column === value.column && v.row === value.row) return k;

    return null;
  }

  // helper function for decodeData
  function inputIsEven(inputs) {
    let qtyNums = inputs.reduce((nums, input) => {
      if (/[0-9]/.test(input)) nums++;
      return nums;
    }, 0);

    return qtyNums % 2 !== 0 ? false : true;
  }

  // takes an array of letters and returns a string of translated numbers
  function encodeData(dataArr, cipherMap) {
    let encoded = "";
    dataArr.map((char) => {
      if (/[a-z]/.test(char)) {
        let { column, row } = cipherMap.get(char);
        encoded += column;
        encoded += row;
      } else {
        encoded += char;
      }
    });

    return encoded;
  }

  // takes an array of numbers and returns a string of translated letters
  function decodeData(dataArr, cipherMap) {
    let placeholder = [];
    let toDecode = [];
    let decodeStr = "";

    if (!inputIsEven(dataArr)) return false;

    dataArr.map((num) => {
      if (/[0-9]/.test(num)) {
        if (placeholder.length < 2) {
          placeholder.push(Number(num));
        }
        if (placeholder.length === 2) {
          toDecode.push(placeholder);
          placeholder = [];
        }
      } else {
        toDecode.push(num);
      }
    });
    toDecode.map((element) => {
      if (Array.isArray(element)) {
        let compareObj = { column: element[0], row: element[1] };
        let char = getKeyByValue(compareObj, cipherMap);

        if (!char) return false;
        if (char != "i") decodeStr += char;
        // j and i share the same coordinates, so switch one out for the other if one of the chars exist
        if (char === "i" && !decodeStr.includes("j")) decodeStr += "j";
        if (char === "i" && decodeStr.includes("j")) decodeStr += char;
      } else {
        decodeStr += element;
      }
    });

    return decodeStr;
  }


  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
