import { Router } from "express";
import { CategoryController } from "../controller/CategoryController";

const categoryRoutes = Router();

categoryRoutes.get("/", CategoryController.all);
categoryRoutes.post("/", CategoryController.create);
categoryRoutes.put("/:categoryId", CategoryController.update);
categoryRoutes.delete("/:categoryId", CategoryController.delete);

export { categoryRoutes }