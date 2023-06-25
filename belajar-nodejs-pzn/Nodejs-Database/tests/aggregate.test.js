import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
    test("Should can do aggregate function without group by and having right now", async() => {
        const result = await prismaClient.product.aggregate({
            _min: {
                price: true,
                stock: true
            },
            _max: {
                price: true,
                stock: true
            },
            _avg:{
                price: true,
                stock: true
            }
        })

        expect(result._min.price).toBe(1000)
        expect(result._min.stock).toBe(100)
        expect(result._max.price).toBe(5000)
        expect(result._max.stock).toBe(500)
        expect(result._avg.price).toBe(3000)
        expect(result._avg.stock).toBe(300)
    })

    test("Should can do aggregate function with group by", async() => {
        const result = await prismaClient.product.groupBy({
            by:["category"],
            _min: {
                price: true,
                stock: true
            },
            _max: {
                price: true,
                stock: true
            },
            _avg:{
                price: true,
                stock: true
            }
        })

        for(const item of result){
            console.log(`Category: ${item.category}, min ${item._min.price} max ${item._max.price} average ${item._avg.price}`)
        }
    })

    test("Should can do aggregate function with group by", async() => {
        const result = await prismaClient.product.groupBy({
            by:["category"],
            _min: {
                price: true,
                stock: true
            },
            _max: {
                price: true,
                stock: true
            },
            _avg:{
                price: true,
                stock: true
            },
            having: {
                price: {
                    _avg:{
                        gt: 2000
                    }
                }
            }
        })

        console.log(result)
    })
})