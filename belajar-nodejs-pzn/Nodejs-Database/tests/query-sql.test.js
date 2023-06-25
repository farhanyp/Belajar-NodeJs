import { prismaClient } from "../src/prisma-client"

// ketika memakai executeRaw hanya untuk query manipulasi data seperti INSERT DELETE UPDATE dan lain lain
describe("Prisma Client", () => {
    test("should be able to query sql", async () => {
        const id="1"

        const samples = await prismaClient.$queryRaw`SELECT * FROM sample WHERE id = ${id}`
        
        for (const sample of samples) {
            console.log(`Result sample id: ${sample.id} and name ${sample.name}`)
        }
    })
})