const sayHelloAsync = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(name === "Yp"){
                resolve("Hai Yp")
            }else{
                reject("Ok")
            }
        }, 1000);
    })
}

// menjalankan test secara async
test.concurrent("Test Concurrent 1", async()=>{
    await expect(sayHelloAsync("Yp")).resolves.toBe("Hai Yp")
})

test.concurrent("Test Concurrent 2", async()=>{
    await expect(sayHelloAsync("Yp")).resolves.toBe("Hai Yp")
})

test.concurrent("Test Concurrent 3", async()=>{
    await expect(sayHelloAsync("Yp")).resolves.toBe("Hai Yp")
})