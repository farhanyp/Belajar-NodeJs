import fs from 'fs'

/*Stream adalah standard library untuk kontrak aliran data di NodeJS
Ada banyak sekali Stream object di NodeJS

Stream bisa jadi object yang bisa dibaca, atau bisa di tulis, dan 

Stream adalah turunan dari EventEmitter
*/


const writer = fs.createWriteStream("target.log")
writer.write("Farhan")

const reader = fs.createReadStream("target.log")
reader.addListener("data", (data)=>{
    console.log(data.toString())
})