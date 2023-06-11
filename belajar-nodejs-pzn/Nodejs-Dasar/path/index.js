import path from "path"

//Path merupakan standard library yang bisa kita gunakan untuk bekerja dengan lokasi file dan directory / folder


const file = 'C:\Users\farha\Downloads\pragos.png'

console.log(path.sep)
console.log(path.dirname(file))
console.log(path.basename(file))
console.log(path.extname(file))
console.log(path.parse(file))

