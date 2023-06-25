import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
    test("Should have id", async () => {
        const category = await prismaClient.category.create({
            data: {
                name: "Food"
            }
        })

        console.info(category)
        expect(category).toHaveProperty("id")
    })
})