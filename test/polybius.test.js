// Write your tests here!
const { expect } = require("chai");
const { polybius } = require("../src/polybius");


describe("polybius", ()=>{
    it("encodes correctly", ()=>{
        const actual = polybius('thinkful');
        expect(actual).to.eql("4432423352125413");
    })
});