import { Request, Response } from "express";
import { BookService } from "../service/BookService";
import { BookRepository } from "../repository/BookRepository";


class BookController {
    static async create(request: Request, response: Response) {
        const { title, author, description, categoryId, publicationYear } = request.body;

        const bookService = new BookService(BookRepository);
        const { data, error, statusCode, message } = await bookService.create({ title, author, description, publicationYear, categoryId });

        return response.status(statusCode).json({
            error,
            message,
            data
        });
    };

    static async all(request: Request, response: Response) {
        const { title, author, categoryId } = request.query;
        const bookService = new BookService(BookRepository);

        const { data, error, statusCode, message } = await bookService.all({ title, author, categoryId });

        return response.status(statusCode).json({
            error,
            message,
            data
        });
    }
    static async index(request: Request, response: Response) {
        const { bookId } = request.params;

        const bookService = new BookService(BookRepository);
        const { data, error, statusCode, message } = await bookService.index(bookId);

        return response.status(statusCode).json({
            error,
            message,
            data
        });
    }

    static async update(request: Request, response: Response) {
        const { title, description, author, publicationYear, categoryId } = request.body;
        const { bookId } = request.params;


        const bookService = new BookService(BookRepository);

        const { data, error, statusCode, message } = await bookService.update({ title, description, author, publicationYear, categoryId, bookId });

        return response.status(statusCode).json({
            error,
            message,
            data
        });
    }

    static async delete(request: Request, response: Response) {
        const { bookId } = request.params;

        const bookService = new BookService(BookRepository)

        const { data, error, statusCode, message } = await bookService.delete(bookId);

        return response.status(statusCode).json({
            error,
            message,
            data
        });
    }
}

export { BookController };