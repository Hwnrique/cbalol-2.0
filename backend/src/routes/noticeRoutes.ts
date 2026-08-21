import { Router } from "express";
import { validacao } from "../middlewares/validarMiddleware.js";
import { noticeSchema } from "../schemas/noticeSchema.js";
import NoticeController from "../controllers/NoticeController.js";
import { checkAdm } from "../middlewares/adminMiddleware.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const noticeRouter = Router()

noticeRouter.post("/notice/create", checkAuth, checkAdm, validacao(noticeSchema), NoticeController.create);
noticeRouter.get("/notice", NoticeController.show);
noticeRouter.get("/notice/:id", NoticeController.showById);
noticeRouter.delete("/notice/:id", checkAuth, checkAdm, NoticeController.delete);
noticeRouter.put("/notice/:id", checkAuth, checkAdm, NoticeController.update);
noticeRouter.post("/notice/:id/like", checkAuth, NoticeController.like);

export default noticeRouter;