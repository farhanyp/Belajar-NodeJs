import express from 'express'
import request from 'supertest'

const app = express()

app.route('/product')
    .get((req,res) => {
        res.send("get")
    })
    .post((req,res)=>{
        res.send("post")
    })
    .put((req,res)=>{
        res.send("put")
    })

test('Test Route Function', async () => {
    let response = await request(app).get("/product")
    expect(response.text).toBe("get")

    response = await request(app).post("/product")
    expect(response.text).toBe("post")

    response = await request(app).put("/product")
    expect(response.text).toBe("put")
})
