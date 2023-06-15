const sum = (a,b) => {
    return a + b
}

// it.skip() berfungsi untuk mengskip test tersebut
describe("When call sum", ()=> {
    it.skip("Should get 5 with parameter 3+2", ()=>{
        expect(sum(3,2)).toBe(5)
    })
})