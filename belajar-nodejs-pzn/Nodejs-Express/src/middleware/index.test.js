import express  from "express";
import request from "supertest"

const logger = (req, res, next) => {
    console.log(`Receive request: ${req.method} ${req.originalUrl}`)
    next()
}

const addPowerHeader = (req, res, next) => {
    res.set('X-Powered-By', 'Farhan Yp')
    next()
}

const apiKeyMiddleware = (req,res,next) => {
    if(req.query.apiKey){
        next()
    }else{
        res.status(401).end()
    }
}

const app = express()

app.use(logger)
app.use(apiKeyMiddleware)
app.use(addPowerHeader)
app.get('/', (req,res)=>{
    res.send("Hello Response")
})

app.get('/yp', (req,res)=>{
    res.send("Hello Response")
})

test('Try Middleware', async () => {
    const response = await request(app).get('/').query({apiKey: "123"})
    expect(response.get('x-powered-by')).toBe('Farhan Yp')
    expect(response.text).toBe('Hello Response')
})

test('Try Middleware 2', async () => {
    const response = await request(app).get('/yp').query({apiKey: "123"})
    expect(response.get('x-powered-by')).toBe('Farhan Yp')
    expect(response.text).toBe('Hello Response')
})

test('Try Middleware 3', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(401)
})