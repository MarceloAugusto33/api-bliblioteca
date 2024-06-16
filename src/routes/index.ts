import { Router } from "express";
import { bookRoutes } from "./book.routes";
import { categoryRoutes } from "./category.routes";

const routes = Router();

routes.use('/book', bookRoutes);
routes.use('/category', categoryRoutes);

export { routes }

