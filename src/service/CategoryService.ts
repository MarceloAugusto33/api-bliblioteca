import { AppResponse } from "../utils/AppResponse";
import { Book, Category } from "@prisma/client";

type categoryRepositoriesType = {
    findAll: () => Promise<any>
    findByName: (name: string) => Promise<any>
    findById: (id: string) => Promise<any>
    findByBook: (id: string) => Promise<any>
    create: (name: string) => Promise<any>
    update: (name: string, id: string) => Promise<any>
    delete: (id: string) => Promise<any>
}

class CategoryService {
    categoryRepository: categoryRepositoriesType;

    constructor(categoryRepository: categoryRepositoriesType) {
        this.categoryRepository = categoryRepository;
    }

    async create(name: string) {
        try {
            if (!name) return AppResponse("Nome é obrigatorio!", 400);

            const categoryExists = await this.categoryRepository.findByName(name);

            if (categoryExists) return AppResponse("Essa categoria já existe!", 401);

            const category = await this.categoryRepository.create(name);

            return AppResponse("", 201, category);
        } catch (error) {
            return AppResponse("Internal Server erro", 500);
        }
    }

    async all() {
        try {
            const categories = await this.categoryRepository.findAll();

            if (!categories || categories.length === 0) return AppResponse("Categorias não encontrada", 404);

            return AppResponse("", 200, categories);
        } catch (error) {
            return AppResponse("Internal Server erro", 500);
        }
    }

    async update({ name, categoryId }: { name: string, categoryId: string }) {
        try {
            if (!name) return AppResponse("Nome é obrigatorio!", 400);

            const categoryExists = await this.categoryRepository.findByName(name);

            if (categoryExists) return AppResponse("Essa categoria já existe!", 401);

            const categoryUpdated = await this.categoryRepository.update(name, categoryId);

            return AppResponse("", 200, categoryUpdated);
        } catch (error) {
            return AppResponse("Internal Server erro", 500);
        }
    }

    async delete(categoryId: string) {
        try {
            const categoryExists = await this.categoryRepository.findById(categoryId);

            if (!categoryExists) return AppResponse("Categoria não existe!", 404);

            const booksInCategory = await this.categoryRepository.findByBook(categoryId);

            if (booksInCategory?.books.length) return AppResponse("Ainda há livros pertencente à essa categoria!", 400);

            const category = await this.categoryRepository.delete(categoryId);

            return AppResponse("", 200, category);
        } catch (error) {
            return AppResponse("Internal Server erro", 500);
        }
    }
}

export { CategoryService }