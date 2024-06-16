import { prisma } from "../database/prisma";
import { createBookType } from "../utils/types";

class BookRepository {
    static async findByTitle(title: string) {
        return await prisma.book.findFirst({ where: { title: title } });
    }

    static async findAll() {
        return await prisma.book.findMany();
    }
    
    static async findAllQuery({ title, author, categoryId }: { title: string, author: string, categoryId: string }) {
        return await prisma.book.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: title,
                        }
                    },
                    {
                        author: {
                            contains: author
                        }
                    },
                    {
                        categoryId: {
                            contains: categoryId
                        }
                    }
                ]
            }
        });
    }

    static async findById(id: string) {
        return await prisma.book.findUnique({ where: { id } });
    }

    static async create({ title, description, author, publicationYear, categoryId }: createBookType) {
        return await prisma.book.create({ data: { title, description, author, publicationYear, categoryId } });
    }

    static async update({ title, description, author, publicationYear, categoryId, bookId }: createBookType & { bookId: string }) {
        return await prisma.book.update({ data: { title, description, author, publicationYear, categoryId }, where: { id: bookId } })
    }

    static async delete(id: string) {
        return await prisma.book.delete({ where: { id } })
    }
}

export { BookRepository }