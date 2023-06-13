test("Number Matcher", ()=>{
    const value = 2+2

    expect(value).toBeGreaterThan(3) //sama seperti (>)
    expect(value).toBeGreaterThanOrEqual(4) //sama seperti (>=)
    expect(value).toBeLessThan(5) //sama seperti(<)
    expect(value).toBeLessThanOrEqual(4) //sama seperti (<=)
})