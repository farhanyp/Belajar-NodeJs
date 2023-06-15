const sayHello = (name) => {
    if(name === "Yp"){
        return `Hello Yp`
    }else{
        throw new Error("Name is required")
    }
}

// test.failing() berfungsi untuk menangkap error
test.failing("SayHello Error", ()=>{
    sayHello(null)
})

// Atau bisa juga seperti ini
test("SayHello Error 2", () => {
    expect(()=>sayHello(null)).toThrow()
})