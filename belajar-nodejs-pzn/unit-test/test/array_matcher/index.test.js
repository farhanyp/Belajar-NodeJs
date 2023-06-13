test("Array Matcher", () => {
    const names = ["Farhan", "Yudha", "Pratama"]
    const namesObject = [{name:"Farhan"}, {name:"Yudha"}, {name:"Pratama"}]

    expect(names).toContain("Yudha") //check apakah ada "Yudha" didalam names
    expect(namesObject).toContainEqual({name:"Yudha"}) //check apakah ada object "Yudha" didalam namesObject
})