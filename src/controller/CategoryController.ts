import { Request, Response } from "express";


class CategoryController {
    static async create(request: Request, response: Response) {
        const { name } = request.body;

        
    };
}

export { CategoryController };