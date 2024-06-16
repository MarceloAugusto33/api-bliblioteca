import { Router } from "express";
import { BookController } from "../controller/BookController";
const bookRoutes = Router();

bookRoutes.post("/book", BookController.create);

export { bookRoutes }