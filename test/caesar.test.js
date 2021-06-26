const { expect } = require("chai");
const { caesar } = require("../src/caesar");


describe("caesar", ()=>{
    it("should return false if shift equals 0 or is < -25 or > 25", ()=>{
        const actual1 = caesar('testing', 0);
        const actual2 = caesar('testing', 26);
        const actual3 = caesar('testing', 29);

        const tests = [actual1, actual2, actual3];
        tests.map((test)=>{
            expect(test).to.be.false;
        })
    })

    it("should ignore non-alphabetic symbols", ()=>{
        const testStrings = ["hello, world!", "404@errur.com", "this_is_a_test"];
        
        testStrings.map((testStr)=>{
            const actual = caesar(testStr, 3);
            
        })

    })

})