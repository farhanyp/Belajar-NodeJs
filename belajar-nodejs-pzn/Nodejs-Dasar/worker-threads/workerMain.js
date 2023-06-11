// Worker Threads adalah standard library yang bisa kita gunakan untuk menggunakan thread ketika mengeksekusi JavaScript secara paralel

import { threadId, Worker} from "worker_threads"

const worker1 = new Worker("./worker.js")
const worker2 = new Worker("./worker.js")

worker1.addListener("message", (message)=>{
console.log(`thread ${message.threadId} receive message: ${message}`)
})

worker2.addListener("message", (message)=>{
console.log(`thread ${message.threadId} receive message: ${message}`)
})

worker1.postMessage(10)
worker2.postMessage(10)