// Di dalam NodeJS, terdapat library berupa variable atau function yang secara global bisa diakses dimana saja, tanpa harus melakukan import

function sayHelloWithTimer(word){
    setTimeout(()=>{
        console.log(word)
    },3000)
}

sayHelloWithTimer("maman")