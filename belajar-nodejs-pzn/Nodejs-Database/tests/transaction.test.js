import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
    test.skip("It should be able to insert data with transaction sequential", async () => {
        const [farhanyudha, yp] = await prismaClient.$transaction([
            prismaClient.customer.create({
                data:{
                    id: "P0002",
                    name: "Farhan Yudha",
                    email: "farhan.yudha@gmail.com",
                    phone: "0826335235425"
                }
            }),
            prismaClient.customer.create({
                data:{
                    id: "P0003",
                    name: "yp",
                    email: "yp@gmail.com",
                    phone: "084563211523"
                }
            })
        ])

        expect(farhanyudha.id).toBe("P0002")
        expect(yp.id).toBe("P0003")
    })


    test("It should be able to insert data with interactive sequential", async () => {

        const [yp1, yp2] = await prismaClient.$transaction( async (prisma)=>{
            const yp1 = await prisma.customer.create({
                data:{
                    id: "P0004",
                    name: "yp1",
                    email: "yp1@gmail.com",
                    phone: "129653"
                }
            })

            const yp2 = await prisma.customer.create({
                data:{
                    id: "P0005",
                    name: "yp2",
                    email: "yp2@gmail.com",
                    phone: "142346853"
                }
            })

            return [yp1, yp2]
    })
        
        expect(yp1.id).toBe("P0004")
        expect(yp2.id).toBe("P0005")
    })
})