import timers from 'timers/promises'

setInterval(()=>{
    console.log(`Timer at ${new Date()}`)  
},3000)

// Timer dengan promise
for await (const startTime of timers.setInterval(1000, "date")){
    console.log(`Timer at ${startTime} ${new Date()}`)
}