import { Request, Response } from "express";


class BookController {
    static async create(request: Request, response: Response) {
        const { title, author, description, categoryId, publicationYear } = request.body;

        
    };
}

export { BookController };