// Net merupakan standard library yang bisa digunakan untuk membuat network client dan server berbasis TCP

import net from 'net'


const server = net.createServer((client) => {
    console.log("Client connected")

    client.on("data", (data)=>{
        console.log(`Receive data from client: ${data.toString()}`)
        client.write(`Hello ${data.toString()}\r\n`)
    })
})

server.listen(3000, "localhost")