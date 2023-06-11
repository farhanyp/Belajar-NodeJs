import os from "os"

// OS merupakan standard library yang bisa digunakan untuk mendapatkan informasi tentang sistem operasi yang digunakan

console.log(os.platform())
console.log(os.arch())
console.table(os.cpus())
console.table(os.uptime())
console.table(os.totalmem())
console.table(os.freemem())
console.table(os.networkInterfaces())

