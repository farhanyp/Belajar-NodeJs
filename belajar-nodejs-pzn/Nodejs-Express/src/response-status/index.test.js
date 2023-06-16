import express from "express";
import request from "supertest";

const app = express()

app.get("/", (req,res)=>{
    if(req.query.name){
        res.status(200)
        res.send(`Hello ${req.query.name}`)
    }else{
        res.status(404).end()
    }
})

test("Response status", async() => {
    let response = await request(app).get("/").query({name: "Farhan"})
    expect(response.status).toBe(200)
    expect(response.text).toBe("Hello Farhan")

    response = await request(app).get("/")
    expect(response.status).toBe(404)
})
