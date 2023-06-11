import util from "util"

// Util adalah standard library yang berisikan utility-utility yang bisa kita gunakan untuk mempermudah pembuatan kode program di NodeJS

console.log(util.format("Nama: %s %s", "Farhan", "Yudha"))

const person = {
    firstName: "Farhan",
    lastName: "Yp"
}
console.log(util.format("Person: %j", person))