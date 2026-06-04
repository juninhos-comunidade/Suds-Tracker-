import {PrismaClient} from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export class UserRepository {
    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    }
    async findById(userID){
        return await prisma.user.findUnique({where: { id: userID}});
    }

    async create(name, email) {
        return await prisma.user.create({data: { name, email }});
    }
    async deleteByID(userID){
        return await prisma.user.delete({where: {id: userID}});
}
}