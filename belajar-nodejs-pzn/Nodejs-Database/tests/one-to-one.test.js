import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
    test.skip("Should can create one to one relation", async () => {
        const wallet = await prismaClient.wallet.create({
            data:{
                id: "walletyp",
                customer_id: "P0003",
                balance: 100000
            },
            include: {
                customer: true,
            }
        })

        console.log(wallet)
    })


    test.skip("Should can insert wallet and customer with relation", async () => {
        const wallet = await prismaClient.wallet.create({
            data:{
                id: "walletyp3",
                // customer_id: "P0008",
                balance: 100000,
                customer:{
                    create: {
                        id:"P0009",
                        name: "fyp2",
                        email: "fyp2@gmail.com",
                        phone:"1234412"
                    }
                },
            },
            include: {
                customer: true,
            }
        })
    })

    test.skip("Should can find one to one relation", async () => {
        const wallet = await prismaClient.wallet.findUnique({
            where:{
                id: "walletyp3"
            },
            include: {
                customer: true,
            }
        })

        console.log(wallet)
    })

    test("Should can findmany with with operation relation one to one relation", async () => {
        const wallet = await prismaClient.wallet.findMany({
            where:{
                customer: {
                    isNot: null
                }
            },
            include: {
                customer: true,
            }
        })

        console.log(wallet)
    })
})