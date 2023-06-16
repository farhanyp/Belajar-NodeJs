import express from "express";
import request from "supertest";

const app = express()

app.get('/', (req,res)=>{
    res.send(`Hello ${req.query.firstname} ${req.query.lastname}`)
})

test("Request Query", async() => {
    const response = await request(app).get("/").query({firstname: "Farhan", lastname: "Yp"})
    expect(response.text).toBe("Hello Farhan Yp")
})
