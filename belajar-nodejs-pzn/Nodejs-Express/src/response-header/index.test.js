import express from "express";
import request from "supertest";

const app = express()

app.get('/', (req,res)=>{
    res.set({
        "X-Powered-By": "Farhan Yudha Pratama",
        "X-Author": "Yp"
    })
    res.end()
})

test("Response Header", async() => {
    const response = await request(app).get("/")
    expect(response.get("x-powered-by")).toBe("Farhan Yudha Pratama")
    expect(response.get("x-author")).toBe("Yp")
})
