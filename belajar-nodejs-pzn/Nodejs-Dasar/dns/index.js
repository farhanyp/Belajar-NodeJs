import dns from "dns/promises"

// DNS merupakan standard library yang bisa digunakan untuk bekerja dengan DNS (domain name server)

const ip = await dns.lookup("www.game3rb.com")

console.log(ip)

