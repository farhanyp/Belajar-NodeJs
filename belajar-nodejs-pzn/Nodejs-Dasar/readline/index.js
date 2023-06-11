import process from "process"
import readline from "readline"

// Readline merupakan standard library yang digunakan untuk membaca input 

const input =   readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

input.question("siapa nama mu? ", (name)=>{
    console.log(`nama saya ${name}`)
    input.close()
})
