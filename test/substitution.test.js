// Write your tests here!
const { expect } = require('chai');
const { substitution } = require('../src/substitution');


function createRandomAlphabet(){
    // ascii characters b/w 65 and 126 seem to be standard keyboard keys
    let alphabetStr = "";
    for (let n=0; n < 26; n++){
        const index = Math.random() * (126 - 65) + 65;
        const char = String.fromCharCode(index);
        if (alphabetStr.includes(char)) n-=1;
        else alphabetStr += char;
    }
    return alphabetStr;
}

function getAlphabetArray(){
    return "abcdefghijklmnopqrstuvwxyz".split("");
}

function generateRandomStrings(qty){
    const alphabet = getAlphabetArray();
    const randomStrArr = [];
    for (let n=0; n < qty; n++){
        const strLength = Math.floor(Math.random() * (30 - 1) + 1);
        let randomStr = "";
        for (let s=0; s < strLength; s++){
            const index = Math.floor(Math.random() * 25);
            randomStr += alphabet[index];
        }
        randomStrArr.push(randomStr);
    };
    return randomStrArr;
}

describe("substitution", ()=>{
    it("encodes and decodes correctly (1000 tests)", ()=>{
        const testStrings = ["cheese", "pray return to the waking sands", "such devestation", "this was not my intenti0n", ...generateRandomStrings(994)];
        const testCaseMap = new Map(); // {};
        testStrings.map((testStr)=>{
            const alphabet = createRandomAlphabet();
            const translated = substitution(testStr, alphabet);
            testCaseMap.set(alphabet, translated);
        })
        // map contains the translated string and custom alphabet
        // we want to iterate through the map, decode, and come up with the original test strings
        let testIndex = 0;
        for (let [alphabet, translated] of testCaseMap.entries()){
            const decodedStr = substitution(translated, alphabet, false);
            expect(decodedStr).to.eql(testStrings[testIndex]);
            testIndex += 1;
        }
    })

    it("returns false if the given alphabet isn't exactly 26 letters long", ()=>{
        const testCases = ["short"]
        const testAns = substitution("thinkful", "short");
        expect(testAns).to.be.false;
    })

    it("correctly transcribes the given phrase", ()=>{
        const randomAlphabet = createRandomAlphabet();
        const testStr = "thinkful";
        const testAns = substitution(testStr, randomAlphabet);
        const decoded = substitution(testAns, randomAlphabet, false);
        expect(decoded).to.eql(testStr);
    })

    it("maintains spaces in the message", ()=>{
        const randomAlphabet = createRandomAlphabet();
        const testStr = "the cake is a lie";
        const testAns = substitution(testStr, randomAlphabet);
        const decoded = substitution(testAns, randomAlphabet, false);
        expect(decoded).to.eql(testStr);
    })

    it("ignores capital letters", ()=>{
        const randomAlphabet = createRandomAlphabet();
        const testStr = "THE CAKE IS A LIE";
        const testAns = substitution(testStr, randomAlphabet);
        const decoded = substitution(testAns, randomAlphabet, false);
        expect(decoded).to.eql(testStr.toLowerCase());
    })
})