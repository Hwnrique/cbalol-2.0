import { Router } from "express";
import { validacao } from "../middlewares/validarMiddleware.js";
import { checkAdm } from "../middlewares/adminMiddleware.js";
import { checkAuth } from "../middlewares/authMiddleware.js";
import { commentSchema } from "../schemas/commentSchema.js";
import CommentController from "../controllers/CommentController.js";

const commentRouter = Router()

commentRouter.post("/notice/:id/comments", checkAuth, validacao(commentSchema), CommentController.create);
commentRouter.get("/notice/:id/comments", CommentController.show);
commentRouter.delete("/comment/:id", checkAuth, CommentController.delete);
commentRouter.put("/comment/:id", checkAuth, CommentController.update);

export default commentRouter;