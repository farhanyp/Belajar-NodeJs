test("Truthiness Matcher", () =>{
    let value = null
    expect(value).toBeNull() // check apakah variable berisi null
    expect(value).toBeDefined() //null termasuk tidak undefined atau defined
    expect(value).toBeFalsy() //null termasuk false
    
    value = undefined
    expect(value).toBeUndefined() //check apakah variabel value berisi undefined
    expect(value).toBeFalsy() //undefined termasuk false

    value = true
    expect(value).toBeTruthy() //variabel value memiliki string sama dengan true
})