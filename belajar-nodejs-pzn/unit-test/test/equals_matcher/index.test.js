test("Equals Matcher", ()=>{
    const num = 1+1
    const name = {
        a:"a",
        b:"b"
    }

    expect(num).toBe(2)
    expect(name).toEqual({a:"a", b:"b"})
})