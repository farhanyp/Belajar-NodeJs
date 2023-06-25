import { prismaClient } from "../src/prisma-client";

describe("Client Prisma", ()=>{

    test("should can do sorting", async () => {
        const customers = await prismaClient.customer.findMany({
            skip: 0,
            take: 10,
            orderBy:[
                {
                    name:"desc"
                },
                {
                    email: "asc"
                }
            ]
        })
        
        console.log(customers)
    
    })
})