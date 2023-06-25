import { prismaClient } from "../src/prisma-client"

// ketika memakai executeRaw hanya untuk query manipulasi data seperti INSERT DELETE UPDATE dan lain lain
describe("Prisma Client", () => {
    test("should be able to execute sql", async () => {
        const id="1"
        const name = "Farhan Yudha Pratama"

        const impacted = await prismaClient.$executeRaw`INSERT INTO sample(id, name) VALUES(${id}, ${name})`
        expect(impacted).toBe(1)
    })
})