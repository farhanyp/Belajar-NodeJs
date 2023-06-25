import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
    test.skip("Should can create comment one to many relation", async () => {
        const comment = await prismaClient.comment.create({
            data:{
                customer_id: "P0005",
                title: "Insert Comment 1",
                description: "Description Comment"
            },
            include: {
                customer: true,
            }
        })

        console.log(comment)
    })


    test.skip("Should insert with relation one to many relation", async () => {
        const customer = await prismaClient.customer.create({
            data:{
                id: "P0011",
                name: "Khansa",
                email:"khansa@gmail.com",
                phone:"1846322",
                comments:{
                    createMany:{
                        data:[
                            {
                                title:"Insert Comment 1",
                                description:"Description Comment"
                            },
                            
                            {
                                title:"Insert Comment 2",
                                description:"Description Comment"
                            }
                        ]
                        
                    }
                }
            }
        })


        console.log(customer)
    })


    test("Should can findmany with with operation relation one to many relation", async () => {
        const comment = await prismaClient.comment.findMany({
            where:{
                customer: {
                    isNot: null
                }
            },
            include: {
                customer: true,
            }
        })

        console.log(comment)
    })
})