import fs from 'fs/promises'

// File System merupakan standard library yang bisa digunakan untuk memanipulasi file system

const buffer = await fs.readFile("./file-system/index.js")
console.log(buffer.toString())

await fs.writeFile("temp.txt", "Hello.nodejs")