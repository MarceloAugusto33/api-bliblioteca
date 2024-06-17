import { Category } from "@prisma/client";

class CategoryRepositoryInMemory {
    categories: { id: string, name: string }[] = []

    async findAll() {
        return this.categories
    }

    async findByName(name: string) {
        return this.categories.find(category => category.name === name);
    }

    async findById(id: string) {
        return this.categories.find(category => category.id === id);
    }

    async findByBook(name: string) {
        return 
    }

    async update(name: string, id: string) {
        const index = this.categories.findIndex(category => category.id === id);

        this.categories[index].name = name

        return this.categories[index]
    }


    async delete(id: string) {
        const index = this.categories.findIndex(category => category.id === id);

        if (index !== -1) {
            const [deletedCategory] = this.categories.splice(index, 1);
            
            return deletedCategory;
        }

        return null;
    }

    async create(name: string) {
        const category = {
            id: "920-" + Math.floor(Math.random() * 1000) + 1,
            name
        }

        this.categories.push(category);

        return category
    }


}

export { CategoryRepositoryInMemory }