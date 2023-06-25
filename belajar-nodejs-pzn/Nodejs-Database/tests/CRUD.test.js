import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
    test.skip("Should be able to create customer", async() => {
        const customer = await prismaClient.customer.create({
            data:{
                id: "P0001",
                name: "Farhan",
                email: "farhan.yudha2016we@gmail.com",
                phone: "0826335235"
            }
        })

        expect(customer.id).toBe("P0001");
        expect(customer.name).toBe("Farhan")
        expect(customer.email).toBe("farhan.yudha2016we@gmail.com")
        expect(customer.phone).toBe("0826335235")
    })

    test.skip("Should be able to update customer", async() => {
        const customer = await prismaClient.customer.update({
            data:{
                name: "Farhan Yudha Pratama",
            },
            where: {
                id:"P0001"
            }
        })

        expect(customer.id).toBe("P0001");
        expect(customer.name).toBe("Farhan Yudha Pratama")
        expect(customer.email).toBe("farhan.yudha2016we@gmail.com")
        expect(customer.phone).toBe("0826335235")
    })

    test("Should be able to read customer", async() => {
        const customer = await prismaClient.customer.findUnique({
            where: {
                id:"P0001"
            }
        })

        expect(customer.id).toBe("P0001");
        expect(customer.name).toBe("Farhan Yudha Pratama")
        expect(customer.email).toBe("farhan.yudha2016we@gmail.com")
        expect(customer.phone).toBe("0826335235")
    })

    test("Should be able to delete customer", async() => {
        const customer = await prismaClient.customer.delete({
            where: {id:"P0001"}
        })

        expect(customer.id).toBe("P0001");
        expect(customer.name).toBe("Farhan Yudha Pratama")
        expect(customer.email).toBe("farhan.yudha2016we@gmail.com")
        expect(customer.phone).toBe("0826335235")
    })
})