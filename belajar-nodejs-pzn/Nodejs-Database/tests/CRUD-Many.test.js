import { prismaClient } from "../src/prisma-client";

describe("Client Prisma", ()=>{

    test.skip("It should be able to create many data", async () => {
        const { count } = await prismaClient.customer.createMany({
            data:[
                {
                    id: "P0001",
                    name: "farhan1",
                    email: "farhan1@gmail.com",
                    phone: "084512364"
                },
                {
                    id: "P0006",
                    name: "farhan2",
                    email: "farhan2@gmail.com",
                    phone: "084512364756"
                }
            ]
        })

        expect(count).toBe(2)
    })

    // Kebetulan hanya mengubah 1 data
    test.skip("It should be able to update many data", async () => {
        const { count } = await prismaClient.customer.updateMany({
            where:{id: "P0006"},
            data:{name: "Farhan2lagi"}
        })

        expect(count).toBe(1)
    })

    test("It should be able to read many data", async () => {
        const customers = await prismaClient.customer.findMany({})

        expect(customers.length).toBe(6)
    })

    test("It should be able to delete many data", async () => {
        const {count} = await prismaClient.customer.deleteMany({
            where:{
                name: "Tidak ada"
            }
        })

        expect(count).toBe(0)
    })
})