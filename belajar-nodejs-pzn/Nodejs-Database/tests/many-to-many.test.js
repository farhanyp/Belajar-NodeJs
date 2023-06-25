import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
    test.skip("Should can create comment many to many relation", async () => {
        const like = await prismaClient.like.create({
            data:{
                customer_id: "P0005",
                product_id: "P0004",
            },
            include: {
                customer: true,
                product: true,
            }
        })
    })

    test.skip("Should can create comment many to many relation", async () => {
        const customer = await prismaClient.customer.findUnique({
            where:{
                id: "P0005"
            },
            include:{
                likes: true
            }
        })

        console.log(customer)
    })

    test("Should can find many comment many to many relation", async () => {
        const customer = await prismaClient.customer.findMany({
            where:{
                likes: {
                    some:{
                        product:{
                            name:{
                                contains: "AB"
                            }
                        }
                    }
                }
            },
            include:{
                likes: {
                    include: {
                        product: true
                    }
                }
            }
        })

        console.log(customer)
    })
})