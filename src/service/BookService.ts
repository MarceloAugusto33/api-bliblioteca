import { AppResponse } from "../utils/AppResponse";
import { Book } from "@prisma/client";
import { createBookType } from "../utils/types";

type BookRepositoriesType = {
    findAll: () => Promise<Book[]>
    findAllQuery: ({ title, author, categoryId }: { title: any, author: any, categoryId: any }) => Promise<Book[]>
    findByTitle: (title: string) => Promise<Book | null>
    findById: (id: string) => Promise<Book | null>
    create: ({ title, description, author, publicationYear, categoryId }: createBookType) => Promise<Book>
    update: ({ title, description, author, publicationYear, categoryId, bookId }: createBookType & { bookId: string }) => Promise<Book>
    delete: (id: string) => Promise<Book>
}

class BookService {
    BookRepository: BookRepositoriesType;

    constructor(BookRepository: BookRepositoriesType) {
        this.BookRepository = BookRepository;
    }

    async all({ title, author, categoryId }: { title: any, author: any, categoryId: any }) {
        try {
            let books;

            if (title || author || categoryId) {
                books = await this.BookRepository.findAllQuery({ title, author, categoryId });
            } else {
                books = await this.BookRepository.findAll();
            }

            if (!books || books.length === 0) return AppResponse("Livros não encontrados", 404);

            return AppResponse("", 200, books);
        } catch (error) {
            return AppResponse("Internal Server erro", 500);
        }
    }

    async index(bookId: string) {
        try {
            const book = await this.BookRepository.findById(bookId);

            if (!book) return AppResponse("Livros não encontrado", 404);

            return AppResponse("", 200, book);
        } catch (error) {
            return AppResponse("Internal Server erro", 500);
        }
    }

    async create({ title, description, author, publicationYear, categoryId }: createBookType) {
        try {
            const bookExists = await this.BookRepository.findByTitle(title);

            if (bookExists) return AppResponse("Essa livro já existe!", 401);

            const book = await this.BookRepository.create({ title, description, author, publicationYear, categoryId });

            return AppResponse("", 201, book);
        } catch (error) {
            return AppResponse("Internal Server erro", 500);
        }
    }

    async update({ title, description, author, publicationYear, categoryId, bookId }: createBookType & { bookId: string }) {
        try {
            const bookUpdated = await this.BookRepository.update({ title, description, author, publicationYear, categoryId, bookId });

            return AppResponse("", 200, bookUpdated);
        } catch (error) {
            return AppResponse("Internal Server erro", 500);
        }
    }

    async delete(bookId: string) {
        try {
            const bookExists = await this.BookRepository.findById(bookId);

            if (!bookExists) return AppResponse("Livro não existe!", 404);

            const book = await this.BookRepository.delete(bookId);

            return AppResponse("", 200, book);
        } catch (error) {
            return AppResponse("Internal Server erro", 500);
        }
    }
}

export { BookService }