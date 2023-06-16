import express from "express";
import request from "supertest";

const app = express()

app.get('/', (req,res)=>{
    res.send(`Hello ${req.query.name}`)
})

test("Request Http", async() => {
    const response = await request(app).get("/").query({name: "Farhan"})
    expect(response.text).toBe("Hello Farhan")
})
