// NodeJS memiliki fitur debugger, dimana kita bisa mengikuti tahapan eksekusi program di NodeJS
// Hal ini sangat cocok ketika kita melakukan proses debugging, mencari sebab masalah yang terjadi di aplikasi kita


function sayHello(name){
    return `hello ${name}`
}

const name = "farhan"
sayHello(name)
debugger
