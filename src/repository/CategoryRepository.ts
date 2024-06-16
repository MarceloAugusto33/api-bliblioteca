import { prisma } from "../database/prisma";

class CategoryRepository {
    static async findByName(name: string) {
        return await prisma.category.findFirst({ where: { name } })
    }

    static async findAll() {
        return await prisma.category.findMany();
    }

    static async findById(id: string) {
        return await prisma.category.findUnique({ where: { id } });
    }

    static async create(name: string) {
        return await prisma.category.create({ data: { name } });
    }

    static async update(name: string, id: string) {
        return await prisma.category.update({ data: { name }, where: { id } })
    }

    static async delete(id: string) {
        return await prisma.category.delete({ where: { id } })
    }
}

export { CategoryRepository }