class MyExceptions extends Error{

}

const callMe = (name) => {
    if(name === "Yp"){
        throw new MyExceptions("Salah nama")
    }else{
        return "Ok"
    }
}

test("Exception Matcher", ()=>{
    expect(()=> callMe("Yp")).toThrow()
    expect(()=> callMe("Yp")).toThrow(MyExceptions)
    expect(()=> callMe("Yp")).toThrow("Salah nama")
})