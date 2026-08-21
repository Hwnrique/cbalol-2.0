import { Router } from "express";
import { validacao } from "../middlewares/validarMiddleware.js";
import { checkAdm } from "../middlewares/adminMiddleware.js";
import { checkAuth } from "../middlewares/authMiddleware.js";
import { mvpSchema } from "../schemas/mvpSchema.js";
import MVPController from "../controllers/MVPController.js";

const mvpRouter = Router();

mvpRouter.post("/mvp/create", checkAuth, checkAdm, validacao(mvpSchema), MVPController.create);
mvpRouter.get("/mvp", MVPController.show);
mvpRouter.get("/mvp/atual", MVPController.showAtual);
mvpRouter.get("/mvp/:id", MVPController.showById);
mvpRouter.delete("/mvp/:id", checkAuth, checkAdm, MVPController.delete);
mvpRouter.put("/mvp/:id", checkAuth, checkAdm, MVPController.update);

export default mvpRouter;