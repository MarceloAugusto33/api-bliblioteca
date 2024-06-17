import { CategoryRepositoryInMemory } from "./CategoryRepositoryInMemory";
import { CategoryService } from "../service/CategoryService";

describe("Testes de Categoria", () => {
    it("Busca todas as categorias", async () => {
        const name = "ficção"

        const categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        const categoryService = new CategoryService(categoryRepositoryInMemory);

        await categoryService.create(name)

        const { data } = await categoryService.all();

        expect(data[0]).toHaveProperty("name");
    })

    it("Cria categoria", async () => {
        const name = "ficção"

        const categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        const categoryService = new CategoryService(categoryRepositoryInMemory);

        const { data } = await categoryService.create(name)

        expect(data).toHaveProperty("id");
    });

    it("Valida criar uma categoria que já existe", async () => {
        const name = "ficção"

        const categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        const categoryService = new CategoryService(categoryRepositoryInMemory);

        await categoryService.create(name)
        const { error } = await categoryService.create(name)

        expect(error).toBe(true);
    })

    it("Atualiza uma categoria", async () => {
        const name1 = "ficção";
        const name2 = "romance";

        const categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        const categoryService = new CategoryService(categoryRepositoryInMemory);

        const categoria1 = await categoryService.create(name1);
        const categoria2 = await categoryService.create(name2);

        const { data } = await categoryService.update({ name: "comedia", categoryId: categoria2.data.id });

        expect(data.name).toBe("comedia");
    });

    it("Valida a atulização para uma categoria existente", async () => {
        const name1 = "ficção";
        const name2 = "romance";

        const categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        const categoryService = new CategoryService(categoryRepositoryInMemory);

        const categoria1 = await categoryService.create(name1);
        const categoria2 = await categoryService.create(name2);

        const { error } = await categoryService.update({ name: "ficção", categoryId: categoria2.data.id });

        expect(error).toBe(true);
    })

    it("Deleta uma categoria", async () => {
        const name = "ficção";

        const categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        const categoryService = new CategoryService(categoryRepositoryInMemory);

        const { data } = await categoryService.create(name);

        await categoryService.delete(data.id);

        const allCategories = await categoryService.all();

        expect(allCategories.data.length).toBe(0);
    });
})

