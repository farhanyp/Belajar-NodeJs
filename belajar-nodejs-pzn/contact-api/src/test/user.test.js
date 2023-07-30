import supertest from "supertest";
import { app } from "../application/app.js";
import { logger } from "../application/logging.js";
import {createTestUser, getTestUser, removeTestUser} from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users', () => {

    afterEach( async () => {
        await removeTestUser()
    })

    test('should can register new user', async () =>{
        const result = await supertest(app)
        .post('/api/users')
        .send({
            username : 'test',
            password : 'rahasia',
            name : 'test'
        })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
        expect(result.body.data.password).toBeUndefined()
    })

    test("should reject if request invalid", async () =>{
        const result = await supertest(app)
        .post('/api/users')
        .send({
            username : '',
            password : '',
            name : ''
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    test("should reject if duplicate username invalid", async () =>{
        let result = await supertest(app)
        .post('/api/users')
        .send({
            username : 'test',
            password : 'rahasia',
            name : 'test'
        })

        result = await supertest(app)
        .post('/api/users')
        .send({
            username : 'test',
            password : 'rahasia',
            name : 'test'
        })


        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

})



describe('POST /api/users/login', () => {

    beforeEach( async () => {
        await createTestUser()
    })

    afterEach( async () => {
        await removeTestUser()
    })

    test('should can login', async () =>{
        const result = await supertest(app)
        .post('/api/users/login')
        .send({
            username : 'test',
            password : 'rahasia',
        })

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
    })

    test('should reject login if not input username and password', async () =>{
        const result = await supertest(app)
        .post('/api/users/login')
        .send({
            username : '',
            password : 'rahasia',
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject login if wrong username', async () =>{
        const result = await supertest(app)
        .post('/api/users/login')
        .send({
            username : 'salah',
            password : 'rahasia',
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject login if wrong password', async () =>{
        const result = await supertest(app)
        .post('/api/users/login')
        .send({
            username : 'salah',
            password : 'salah',
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
    
})


describe('GET /api/users/current', () => {

    beforeEach( async () => {
        await createTestUser()
    })

    afterEach( async () => {
        await removeTestUser()
    })

    test('should can get current user', async () =>{
        const result = await supertest(app)
        .get('/api/users/current')
        .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
    })
    
})



describe('PATCH /api/users/current', () => {

    beforeEach( async () => {
        await createTestUser()
    })

    afterEach( async () => {
        await removeTestUser()
    })

    test('should can get current user', async () =>{
        const result = await supertest(app)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            name: "test2",
            password:"rahasialagi"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test2")

        const user = await getTestUser()
        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true)
    })

    test('should can update username', async () =>{
        const result = await supertest(app)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            name: "test2",
        })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test2")
    })

    test('should can update password', async () =>{
        const result = await supertest(app)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            password:"rahasialagi"
        })

        expect(result.status).toBe(200)
        const user = await getTestUser()
        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true)
    })
    
    test('should can update if not valid', async () =>{
        const result = await supertest(app)
        .patch('/api/users/current')
        .set('Authorization', 'salah')
        .send({})

        expect(result.status).toBe(401)
    })
})



describe('DELETE /api/users/logout', () => {

    beforeEach( async () => {
        await createTestUser()
    })

    afterEach( async () => {
        await removeTestUser()
    })

    test('should can logout', async () =>{
        const result = await supertest(app)
        .delete('/api/users/logout')
        .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        const user = await getTestUser()
        expect(user.token).toBeNull()
    })

    test("should can't logout if invalid request", async () =>{
        const result = await supertest(app)
        .delete('/api/users/logout')
        .set('Authorization', 'salah')

        expect(result.status).toBe(401)
    })
})