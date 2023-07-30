import supertest from "supertest";
import { app } from "../application/app.js";
import { logger } from "../application/logging.js";
import { createTestUser, removeTestUser, removeAllTestContacts, getTestContact, createTestContact, createManyTestContacts, removeAllTestAddress, getTestAddress, createTestAddress } from "./test-util.js";

describe('POST /api/contacts/:contactId/addresses', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can create new address', async () => {

        const testContact = await getTestContact()

        const result = await supertest(app)
            .post("/api/contacts/" + testContact.id + "/addresses")
            .set('Authorization', 'test')
            .send({
                street: "Jalan apa",
                city: "Kota apa",
                province: "Province apa",
                country: "Negara apa",
                postal_code: "Kode pos"
            });

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe("Jalan apa")
        expect(result.body.data.city).toBe("Kota apa")
        expect(result.body.data.province).toBe("Province apa")
        expect(result.body.data.country).toBe("Negara apa")
        expect(result.body.data.postal_code).toBe("Kode pos")
    })


    it('should reject if request invalid', async () => {

        const testContact = await getTestContact()

        const result = await supertest(app)
            .post("/api/contacts/" + testContact.id + "/addresses")
            .set('Authorization', 'test')
            .send({
                street: "Jalan apa",
                city: "Kota apa",
                province: "Province apa",
                country: "",
                postal_code: ""
            });

        expect(result.status).toBe(400)
    })

    it('should reject if contact not found', async () => {

        const testContact = await getTestContact()

        const result = await supertest(app)
            .post("/api/contacts/" + (testContact.id + 1) + "/addresses")
            .set('Authorization', 'test')
            .send({
                street: "Jalan apa",
                city: "Kota apa",
                province: "Province apa",
                country: "Negara apa",
                postal_code: "Kode pos"
            });

        expect(result.status).toBe(404)
    })
})


describe('GET /api/contacts/:contactId/addresses/:addressesId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async () => {
        // await removeAllTestAddress()
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can get address', async () => {

        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        
        const result = await supertest(app)
            .get("/api/contacts/" + testContact.id + "/addresses/"+ testAddress.id)
            .set('Authorization', 'test')


        expect(result.status).toBe(200)
    })
})