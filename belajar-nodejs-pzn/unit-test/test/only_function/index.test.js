
const sum = (...number) => {
    let total = 0
    number.forEach(num => {
        total += num
    });
    return total
}

// it.only() berfungsi untuk memprioritaskan test dan hanya test ini yang di run
describe("When call sum", ()=> {
    it.only("Should get 10 with parameter 5+5", ()=>{
        expect(sum(5,5)).toBe(10)
    })
})