import { prismaClient } from "../application/databases.js";
import bcrypt from "bcrypt"

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'test'
        }
    })
}

export const createTestUser = async () => {
    const password = await bcrypt.hash("123456", 10)
    
    await prismaClient.user.create({
        data: {
            username: "test",
            password: password,
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@pzn.com",
            phone: "080900000"
        }
    })
}

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: 'test'
        }
    })
}