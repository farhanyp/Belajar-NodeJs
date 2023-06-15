const sum = (a,b) => {
    return a + b
}

// it() sama seperti test()
describe("When call sum", ()=> {
    it("Should get 5 with parameter 3+2", ()=>{
        expect(sum(3,2)).toBe(5)
    })
})