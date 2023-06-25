import { prismaClient } from "../src/prisma-client";

describe("Client Prisma", ()=>{

    test("should can select fields", async () => {
        const customers = await prismaClient.customer.findMany({
            select: {
                id: true,
                name:true,
            }
        })
        
        for(let customer of customers){
            expect(customer.id).toBeDefined()
            expect(customer.name).toBeDefined()
            expect(customer.email).toBeUndefined()
            expect(customer.phone).toBeUndefined()
        }
    
    })
})