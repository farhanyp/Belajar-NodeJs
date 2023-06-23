import { PrismaClient } from "@prisma/client"

describe("Prisma Client", () => {
    test("Should be able to connect to database", async () => {
        const prisma = new PrismaClient()
        await prisma.$connect()

        // Do Something

        await prisma.$disconnect()
    })
})