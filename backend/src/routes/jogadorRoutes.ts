import { Router } from "express";
import { validacao } from "../middlewares/validarMiddleware.js";
import { checkAdm } from "../middlewares/adminMiddleware.js";
import { checkAuth } from "../middlewares/authMiddleware.js";
import { jogadorSchema } from "../schemas/jogadorSchema.js";
import JogadorController from "../controllers/JogadorController.js";

const jogadorRouter = Router()

jogadorRouter.post("/jogador/create", checkAuth, checkAdm, validacao(jogadorSchema), JogadorController.create);
jogadorRouter.get("/jogador", JogadorController.show);
jogadorRouter.get("/jogador/:id", JogadorController.showById);
jogadorRouter.delete("/jogador/:id", checkAuth, checkAdm, JogadorController.delete);
jogadorRouter.put("/jogador/:id", checkAuth, checkAdm, JogadorController.update);

export default jogadorRouter;