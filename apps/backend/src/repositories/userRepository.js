import prisma from '../config/database.js';

class UserRepository {
    async findByEmail(email) {
        return await prisma.user.findUnique({ 
            where: { email } 
        });
    }
    
    async findById(userID){
        return await prisma.user.findUnique({
            where: { id: userID}
        });
    }

    async create(data) {
        return await prisma.user.create(data);
    }
    
    async deleteByID(userID){
        return await prisma.user.delete({
            where: {id: userID}
        });
    }
}

export default new UserRepository();