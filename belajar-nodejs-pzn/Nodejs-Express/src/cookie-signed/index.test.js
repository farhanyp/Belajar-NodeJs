import cookieParser from "cookie-parser";
import express from "express";
import request from "supertest";

const app = express()

app.use(cookieParser("SECRETKEYRAHASIA"))
app.use(express.json())

app.get('/', (req,res) => {
    const name = req.cookies.name
    res.send(`Hello ${name}`)
})

app.post('/login', (req,res) => {
    const name = req.body.name
    res.cookie("Login", name, {path: "/", signed: true})
    res.send(`Hello ${name}`)
})

test('Test Cookie Read', async () => {
    const response = await request(app)
    .get("/")
    .set("Cookie", "name=Yp")
    expect(response.text).toBe("Hello Yp")
})

test('Test Cookie Signed', async () => {
    const response = await request(app)
    .post("/login")
    .send({name: "Yp"})
    expect(response.get("Set-Cookie").toString()).toContain("Yp")
    expect(response.text).toBe("Hello Yp")
})