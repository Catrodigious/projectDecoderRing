function getAlphabetArray(caps=false){
    // 65 is capitalized A; 97 is lowercase A
    let asciiRep = caps ? 65 : 97;
    let allLetters = [];

    for (let n=0; n < 26; n++){
        allLetters.push(String.fromCharCode(asciiRep));
        asciiRep++;
    }

    return allLetters;
}

function getKeyByValue(value, mapObj){
    for (const [k, v] of mapObj.entries())
        if (v.column === value.column && v.row === value.row) return k;

    return null;
}

// helper function for decodeData
function inputIsEven(inputs){
    let qtyNums = inputs.reduce((nums, input)=>{
        if ((/[0-9]/).test(input)) nums++;
        return nums;
    }, 0);

    return (qtyNums % 2 !== 0) ? false : true;
}



module.exports = { getAlphabetArray, getKeyByValue, inputIsEven };
