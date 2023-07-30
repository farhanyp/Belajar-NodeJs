import supertest from "supertest"
import { web } from "../application/web"
import { createTestUser, getTestContact, removeAllTestContacts, removeTestUser, createTestContact } from "./test-util"
import { logger } from "../application/logging.js"

describe('POST /api/contact', () => {

    beforeEach( async () => {
        await createTestUser()
    })

    afterEach ( async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    test("Should can create new Contact", async () => {
        const result = await supertest(web)
        .post("/api/contacts")
        .set("Authorization", "test")
        .send({
            first_name: "test",
            last_name: "test",
            email: "test@gmail.com",
            phone: "0813617596"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
    })

    test("Should can't create new Contact when invalid request", async () => {
        const result = await supertest(web)
        .post("/api/contacts")
        .set("Authorization", "test")
        .send({
            first_name: "",
            last_name: "test",
            email: "test@gmail.com",
            phone: "081361722222222222222596"
        })
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})


describe('GET /api/contacts/:contactID', () => {

    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    test('Should can get contact', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
        .get(`/api/contacts/${testContact.id}`)
        .set('Authorization','test')

        console.log(result.body.data)
        expect(result.status).toBe(200);
    })

    test('Should return 404 if contact id is not found', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
        .get(`/api/contacts/${testContact.id + 1}`)
        .set('Authorization','test')

        expect(result.status).toBe(404);
    })
})

// describe("PUT /api/contact/contactId", () => {
//     beforeEach(async () => {
//         await createTestUser();
//         await createTestContact();
//     })

//     afterEach(async () => {
//         await removeAllTestContacts();
//         await removeTestUser();
//     })
    

// })