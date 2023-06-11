import zlib from "zlib"
import fs from 'fs'

const source = fs.readFileSync("zlib.js")
const result = zlib.unzip(source)
console.log(result.toString())