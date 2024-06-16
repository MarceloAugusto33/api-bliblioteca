import { Request, Response } from "express";
import { CategoryRepository } from "../repository/CategoryRepository";
import { CategoryService } from "../service/CategoryService";


class CategoryController {
    static async create(request: Request, response: Response) {
        const { name } = request.body;

        const categoryService = new CategoryService(CategoryRepository)

        const { data, error, statusCode, message } = await categoryService.create(name);

        return response.status(statusCode).json({
            error,
            message,
            data
        });
    };

    static async all(request: Request, response: Response) {
        const categoryService = new CategoryService(CategoryRepository)

        const { data, error, statusCode, message } = await categoryService.all();

        return response.status(statusCode).json({
            error,
            message,
            data
        });
    }

    static async update(request: Request, response: Response) {
        const { name } = request.body;
        const { categoryId } = request.params;
        const categoryService = new CategoryService(CategoryRepository)

        const { data, error, statusCode, message } = await categoryService.update({ name, categoryId });

        return response.status(statusCode).json({
            error,
            message,
            data
        });
    }

    static async delete(request: Request, response: Response) {
        const { categoryId } = request.params;

        const categoryService = new CategoryService(CategoryRepository)

        const { data, error, statusCode, message } = await categoryService.delete(categoryId);

        return response.status(statusCode).json({
            error,
            message,
            data
        });
    }
}

export { CategoryController };