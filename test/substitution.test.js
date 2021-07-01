// Write your tests here!
const { expect } = require('chai');
const { substitution } = require('../src/substitution');

// 
describe("substitution", ()=>{
    it("returns flase if the given alphabet isn't exactly 26 letters long", ()=>{
        const testAns = substitution("thinkful", "short");
        expect(testAns).to.be.false;
    })

    it("correctly transcribes the given phrase", ()=>{
        const testAns = substitution("thinkful", "xoyqmcgrukswaflnthdjpzibev"); //> 'jrufscpw'
        expect(testAns).to.eql('jrufscpw');
    })

    it("maintains spaces in the message", ()=>{
        const testAns = substitution("the cake is a lie", "$wae&zrdxtfcygvuhbijnokmpl");  //> "y&ii$r&"
        expect(testAns).to.eql("jd& a$f& xi $ cx&");
    })

    it("ignores capital letters", ()=>{
        const testAns = substitution("THE CAKE IS A LIE", "$wae&zrdxtfcygvuhbijnokmpl");  //> "y&ii$r&"
        expect(testAns).to.eql("jd& a$f& xi $ cx&");
    })
})