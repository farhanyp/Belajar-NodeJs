
const sum = (numbers) => {
    let total = 0
    for (let number of numbers) {
        total+=number
    }

    return total
}

const table = [
    {numbers: [], expected: 0},
    {numbers: [10,10,10], expected: 30},
    {numbers: [10,10,10,10,10], expected: 50}
]

// it.each() berfungsi untuk merun test dengan mengguanakan berbagai parameter
    test.each(table)("sum(%s) should result %i", ({numbers, expected})=>{
        expect(sum(numbers)).toBe(expected)
    })

    // Hanya untuk tidak error
    // test.each(table)("sum(%s) should result %i", ({numbers, expected})=>{
    //     expect(sum(10,10)).toBe(20)
    // })