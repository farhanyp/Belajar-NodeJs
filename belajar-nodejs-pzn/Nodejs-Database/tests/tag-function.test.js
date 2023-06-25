// Menggunakan tag function milik javascript bisa mempermudah melakukan query sekaligus menghindari sql injection
function tagFunction(array, ...args){
    console.log(array)
    console.log(args)
}


test("Tag Function", () =>{
    const name = "Yp"
    const age = "21"

    tagFunction`Helo ${name}, my name is ${name}`
    tagFunction`i'm ${age} years old`
})

test("Tag Function SQL", () =>{
    const name = "Yp"
    const age = "21"

    tagFunction`SELECT * FROM users WHERE name = ${name} AND age = ${age}`
})