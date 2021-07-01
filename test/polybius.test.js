// Write your tests here!
const { expect } = require("chai");
const { polybius } = require("../src/polybius");


describe("polybius", ()=>{
    it("encodes correctly", ()=>{
        const testAns = polybius('thinkful');
        expect(testAns).to.eql("4432423352125413");
    })

    it("decodes correctly", ()=>{
        const testAns = polybius("4432423352125413", false);
        expect(testAns).to.eql("th(i/j)nkful");
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