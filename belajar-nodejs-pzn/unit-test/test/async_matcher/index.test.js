const sayHello = async(name)=>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(name){
                resolve(`Hello ${name}`)
            }else{
                reject('Name is Empty')
            }
        },1000)
    })
}

test("Async Matcher", async()=>{
    await expect(sayHello("farhan")).resolves.toBe("Hello farhan");
    await expect(sayHello()).rejects.toBe("Name is Empty");
})