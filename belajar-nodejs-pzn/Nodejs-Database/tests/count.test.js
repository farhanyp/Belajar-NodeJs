import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
    test("Should Count", async () => {
        const count = await prismaClient.customer.count({
            where:{
                name: "yp"
            }
        })

        expect(count).toBe(1)
    })
})