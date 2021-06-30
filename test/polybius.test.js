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
        const testKeys = ["24a53", "thinkful", "s0m3"];
        const testAns = ["rap", false, false];

        const testMap = new Map();
        for (let test in testKeys){
            testMap.set(testKeys[test], testAns[test]);
        }
        testKeys.map((testVal)=>{
            const testAns = polybius(testVal, false);
            expect(testAns).to.eql(testMap.get(testVal));
        })
    })

    it("must ignore capital letters", ()=>{
        const testKey1 = "THIS is a Test";
        const testKey2 = "this is a test";

        const testAns1 = polybius(testKey1);
        const testAns2 = polybius(testKey2);

        expect(testAns1).to.eql("44324234 4234 11 44513444");
        expect(testAns2).to.eql("44324234 4234 11 44513444");
    })

    it("translates decoded 42 to (i/j)", ()=>{
        const testKey = "44324234 4234 11 44513444";
        const testAns = polybius(testKey, false);
        expect(testAns).to.eql("th(i/j)s (i/j)s a test");
    })
});