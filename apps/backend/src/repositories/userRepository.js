import { prisma } from '../config/database.js';


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