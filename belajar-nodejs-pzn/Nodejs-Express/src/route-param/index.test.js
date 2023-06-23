import express from 'express'
import request from 'supertest'

const app = express()

app.get('/products/:id', (req,res) => {
    const idProduct = req.params.id
    res.send(idProduct)
})

app.get('/categories/:id(\\d+)', (req,res) => {
    const idProduct = req.params.id
    res.send(idProduct)
})

test('Test Route Params', async () => {
    let response = await request(app).get("/products/yp")
    expect(response.text).toBe("yp")

    response = await request(app).get("/products/salah")
    expect(response.text).toBe("salah")

    response = await request(app).get("/categories/1234")
    expect(response.text).toBe("1234")

    response = await request(app).get("/categories/salah")
    expect(response.status).toBe(404)
})
