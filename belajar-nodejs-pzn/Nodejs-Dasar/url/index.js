import { URL } from 'url'

// URL merupakan standard library untuk bekerja dengan URL

const pzn = new URL("https://www.google.com/maman?orang=yp")

pzn.searchParams.append("status", "premium")

console.log(pzn.toString())
console.log(pzn.href)
console.log(pzn.protocol)
console.log(pzn.host)
console.log(pzn.pathname)
console.log(pzn.searchParams)