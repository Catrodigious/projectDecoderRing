const { expect } = require("chai");
const {caesar} = require('../src/caesar');

function getAlphabetArray(){
    return "abcdefghijklmnopqrstuvwxyz".split("");
}

function generateRandomStr(){
    const alphabet = getAlphabetArray();
    // can use getRandomShift to generate string length and generate letters
    const newStringLength = generateRandomShift();
    let newStr = "";
    for (let n=0; n < newStringLength; n++){
        const index = generateRandomShift();
        newStr += alphabet[index];
    }

    return newStr;
}

function generateRandomShift(){
    return Math.floor((Math.random() * (24 - 1) + 1));
}

// function caesar(input <string>, shift <number>, encode=true <bool>)
describe("caesar", ()=>{
    it("should encode/decode correctly (1000 tests)", ()=>{
        let testCases = [];
        let count = 0;

        for (let n=0; n < 1000; n++){
            const randomStr = generateRandomStr();
            testCases[n] = randomStr;
        }
        testCases.map((test)=>{
            const shift = generateRandomShift();
            const encoded = caesar(test, shift);
            const decoded = caesar(encoded, shift, false);
            expect(decoded).to.eql(test);
        });    
        
    })

    it("should return false if shift equals 0 or is < -25 or > 25", ()=>{
        const tests = [];

        tests.push(caesar('testing', 0));
        tests.push(caesar('testing', 26));
        tests.push(caesar('testing', 29));
        tests.map((test) => expect(test).to.be.false);
    })


    it("should ignore non-alphabetic symbols for input", ()=>{
        const testCases = ["hello, world!", "404@errur.com", "this_is_a_test"];
        const ans = ["khoor, zruog!", "404@huuxu.frp", "wklv_lv_d_whvw"];
        const ansKey = new Map();

        if (testCases.length === ans.length){
            for (const i in testCases){
                ansKey.set(testCases[i], ans[i]);
            };
        }else{
            console.error("test string length differs from answer key length");
        }
        testCases.map((testStr)=>{
            let testAns = caesar(testStr, 3);
            
            expect(testAns).to.be.eql(ansKey.get(testStr));
        });
    })


    it("Should ignore capitalized letters for input", ()=>{
        const testCase = 'ThInKfUl';
        const testAns = caesar(testCase, 3);
        expect(testAns).to.be.eql("wklqnixo");
        expect(testAns).to.be.eql(testAns.toLowerCase());
    })


    it("should only process input if it is a string - if not, then return false", ()=>{
        const testCases = [null, {key: 'value'}, 111];
        testCases.map((test) => expect(caesar(test, 3)).to.be.false);
    })


    it("should handle non-numeric shift by returning false", ()=>{
        const testCases = [null, {key: 'value'}, "111"];
        testCases.map((test)=> expect(caesar('thinkful', test)).to.be.false);
    });
})
