import { Buffer } from 'node:buffer'

// uffer merupakan object yang berisikan urutan byte dengan panjang tetap.

const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log(buf.toString())

const buf2 = Buffer.from("Farhan Yudha Pratama", 'ascii', 5)
console.log(buf2.toString())