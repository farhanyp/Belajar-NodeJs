import supertest from "supertest"
import {web} from '../application/web'
import { logger } from "../application/logging"
import { createTestUser, getTestUser, removeTestUser } from "./test-util"
import bcrypt from "bcrypt";

describe("Post /api/users", () =>{

    afterEach(async () => {
        await removeTestUser()
    })

    test("Should can register new user", async () => {
        const result = await supertest(web).post('/api/users').send({
            username: "test",
            password: "123456",
            name: "test"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe("test")
        expect(result.body.data.password).toBeUndefined()
        expect(result.body.data.username).toBe("test")
    })


    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });


    it('should reject when wrong validation', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });


    it('should reject if duplicate data', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'Farhan',
                password: '123456',
                name: 'Farhan Yudha Pratama'
            });

            result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'Farhan',
                password: '123456',
                name: 'Farhan Yudha Pratama'
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
})


describe('POST /api/users/login', () => {
    beforeEach(async ()=> {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    test('should can login', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            username:"test",
            password: "123456"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe("test")
    })

    test('should reject login if empty input', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            username:"",
            password: ""
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject login if wrong username input', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            username:"test",
            password: "123"
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject login if wrong password input', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            username:"testa",
            password: "123456"
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})


describe("Get /api/users/current", () =>{

    beforeEach(async ()=> {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    test("Should can get user current", async ()=>{
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization', 'test')

        expect(result.status).toBe(200)
    })

    test("Should reject when wrong token ", async ()=>{
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization', 'salahtoken')

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})


describe('PATCH /api/users/current', () =>{
    beforeEach(async ()=> {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    test('Should cant update user', async() => {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            name: "Yp",
            password: "123456lagi"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("Yp")
    })

    test('Should can update user name', async() => {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            name: "Yp",
        })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("Yp")
    })

    test('Should cant update password', async() => {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            password: "123456lagi",
        })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")

        const user = await getTestUser()
        expect(await bcrypt.compare("123456lagi", user.password)).toBe(true)
    })

    test('Should cant update when input invalid', async() => {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "salah")
        .send({})

        expect(result.status).toBe(401)
    })
    
})

describe('DELETE /api/users/logout', () => {
    beforeEach(async ()=> {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    test('should can logout', async() => {
        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'test')

        expect(result.status).toBe(200)
    })

    test("should can't logout", async() => {
        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'salah')


        expect(result.status).toBe(401)
    })
})