function getAlphabetArray(caps=false){
    // 65 is capitalized A; 97 is lowercase A
    let asciiRep = caps ? 65 : 97;
    let allLetters = [];

    let count = 0;
    while (count < 26){
        allLetters.push(String.fromCharCode(asciiRep));
        asciiRep++;
        count++;
    }
    return allLetters
}

function stringToArray(str){
    let strArr = [];
    for (s of str){
        strArr.push(s);
    }
    return strArr;
}

function getKeyByValue(value, mapObj){
    for (const [k, v] of mapObj.entries()){

        if (v.column === value.column && v.row === value.row){
            return k;
        }
    }

    return null;
}
  

module.exports = { getAlphabetArray, stringToArray, getKeyByValue };
