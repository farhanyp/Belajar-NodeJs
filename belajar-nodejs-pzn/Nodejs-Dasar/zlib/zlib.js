import zlib from "zlib"
import fs from 'fs'

// Zlib adalah standard library yang digunakan untuk melakukan kompresi menggunakan Gzip

// compress
const source = fs.readFileSync("./zlib.js")
const result = zlib.gzipSync(source)

fs.writeFileSync("zlib.js.txt", result)


// decompress
