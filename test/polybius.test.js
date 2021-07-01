// Write your tests here!
const { expect } = require("chai");
const { polybius } = require("../src/polybius");

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

describe("polybius", ()=>{
    it("encodes and decodes correctly (1000 test)", ()=>{
        const testCases = generateRandomStrings(1000);
        const testMap = new Map();
        let index = 0;
    
        testCases.map((testStr)=>{
            let jiReplaceStr = "";

            for (char of testStr){
                if (char === "i" || char === "j"){
                    jiReplaceStr += "(i/j)";
                }else{
                    jiReplaceStr += char;
                }
            }
            const encodeStr = polybius(testStr);
            testMap.set(encodeStr, jiReplaceStr);
        })
        for (let [encoded, jiReplaceStr] of testMap.entries()){
            const result = polybius(encoded, false);
            expect(result).to.eql(jiReplaceStr);
            index++;
        }

    })

    it("must have at least two numbers adjacent to each other if decoding", ()=>{
        const testCases = ["24a53", "thinkful", "s0m3"];
        const testAns = ["rap", false, false];

        const testMap = new Map();
        for (let test in testCases){
            testMap.set(testCases[test], testAns[test]);
        }
        testCases.map((testVal)=>{
            const testAns = polybius(testVal, false);
            expect(testAns).to.eql(testMap.get(testVal));
        })
    })

    it("must ignore capital letters", ()=>{
        const testCase1 = "THIS is a Test";
        const testCase2 = "this is a test";

        const testAns1 = polybius(testCase1);
        const testAns2 = polybius(testCase2);

        expect(testAns1).to.eql("44324234 4234 11 44513444");
        expect(testAns2).to.eql("44324234 4234 11 44513444");
    })

    it("translates decoded 42 to (i/j)", ()=>{
        const testCase = "44324234 4234 11 44513444";
        const testAns = polybius(testCase, false);
        expect(testAns).to.eql("th(i/j)s (i/j)s a test");
    })
});