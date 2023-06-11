import net from 'net'

const connection = net.createConnection({port: 300, host:"localhost"})

setInterval(()=>{
    connection.write("Eko\r\n")
}, 2000)

connection.addListener("data", (data)=>{
    console.log(`recevice data from server: ${data.toString()}`)
})