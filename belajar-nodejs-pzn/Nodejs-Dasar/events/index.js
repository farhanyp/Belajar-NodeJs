import { EventEmitter } from 'events'

// Events adalah standard library di NodeJS yang bisa digunakan sebagai implementasi Event Listener

const emitter = new EventEmitter()
emitter.addListener("hello", (name)=>{
    console.log("hello",name)
})

emitter.addListener("hello", (name)=>{
    console.log("hello",name)
})

emitter.emit("hello", "Yp")