import { Router } from "express";
import { BookController } from "../controller/BookController";

const bookRoutes = Router();

bookRoutes.get("/", BookController.all);
bookRoutes.get("/:bookId", BookController.index);
bookRoutes.post("/", BookController.create);
bookRoutes.put("/:bookId", BookController.update);
bookRoutes.delete("/:bookId", BookController.delete);

export { bookRoutes }