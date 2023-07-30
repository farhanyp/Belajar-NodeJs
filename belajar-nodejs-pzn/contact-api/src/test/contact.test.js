import supertest from "supertest";
import { app } from "../application/app.js";
import { logger } from "../application/logging.js";
import { createTestUser, removeTestUser, removeAllTestContacts, getTestContact, createTestContact, createManyTestContacts } from "./test-util.js";

describe('POST /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can create new contact', async () => {
        const result = await supertest(app)
            .post("/api/contacts")
            .set('Authorization', 'test')
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@pzn.com",
                phone: "08090000000"
            });

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe("test")
        expect(result.body.data.last_name).toBe("test")
        expect(result.body.data.email).toBe("test@pzn.com")
        expect(result.body.data.phone).toBe("08090000000")
    })

    it('should reject if request is not valod', async () => {
        const result = await supertest(app)
            .post("/api/contacts")
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "test",
                email: "test@pzn.com",
                phone: "080900000000000000000000000000"
            });

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})


describe('GET /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();

    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact()

        const result = await supertest(app)
        .get("/api/contacts/" + testContact.id)
        .set('Authorization', 'test');
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    })

    it("should can't get contact if invalid", async () => {
        const testContact = await getTestContact()


        const result = await supertest(app)
        .get("/api/contacts/" + testContact.id)
        .set('Authorization', 'salah');
        
        expect(result.status).toBe(401)
    })
})


describe('PUT /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();

    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can update contact', async () => {
        const testContact = await getTestContact()

        const result = await supertest(app)
        .put("/api/contacts/" + testContact.id)
        .set('Authorization', 'test')
        .send({
            id: testContact.id,
            first_name: "farhan",
            last_name: "yp",
            email: "yp@gmail.com",
            phone: "09999999"
        })
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe("farhan")
        expect(result.body.data.last_name).toBe("yp")
        expect(result.body.data.email).toBe("yp@gmail.com")
        expect(result.body.data.phone).toBe("09999999")
        
    })

    it('should can update contact if invalid request', async () => {
        const testContact = await getTestContact()

        const result = await supertest(app)
        .put("/api/contacts/" + testContact.id)
        .set('Authorization', 'test')
        .send({
            id: testContact.id,
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        })
        
        expect(result.status).toBe(400)
        
    })

    it('should can update contact if wrong username', async () => {
        const testContact = await getTestContact()

        const result = await supertest(app)
        .put("/api/contacts/" + (testContact.id+1))
        .set('Authorization', 'test')
        .send({
            id: testContact.id,
            first_name: "farhan",
            last_name: "yp",
            email: "yp@gmail.com",
            phone: "09999999"
        })
        
        expect(result.status).toBe(404)
        
    })
})


describe('DELETE /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();

    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    test('should can delete contact', async () => {
        let testContact = await getTestContact()
        
        const result = await supertest(app)
        .delete("/api/contacts/" + testContact.id)
        .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        
        testContact = await getTestContact()
        expect(testContact).toBeNull()
        
    })

    test('should reject if invalid username', async () => {
        let testContact = await getTestContact()
        
        const result = await supertest(app)
        .delete("/api/contacts/" + testContact.id)
        .set('Authorization', 'salah')

        expect(result.status).toBe(401)
        
    })

    test('should reject if user not found', async () => {
        let testContact = await getTestContact()
        
        const result = await supertest(app)
        .delete("/api/contacts/" + (testContact.id + 1))
        .set('Authorization', 'test')

        expect(result.status).toBe(404)
        
    })
    
})


describe('GET /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContacts();

    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    test('should can search without parameter', async () => {
        const result = await supertest(app)
        .get("/api/contacts/")
        .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
        
    })

    test('should can search without parameter', async () => {
        const result = await supertest(app)
        .get("/api/contacts/")
        .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
        
    })
    
})
