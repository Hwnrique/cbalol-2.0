import { Router } from "express";
import { validacao } from "../middlewares/validarMiddleware.js";
import { partidaSchema } from "../schemas/partidaSchema.js";
import { checkAdm } from "../middlewares/adminMiddleware.js";
import { checkAuth } from "../middlewares/authMiddleware.js";
import PartidaController from "../controllers/PartidaController.js";

const partidaRouter = Router();

partidaRouter.post("/partida/create", checkAuth, checkAdm, validacao(partidaSchema), PartidaController.create);
partidaRouter.get("/partida", PartidaController.show);
partidaRouter.get("/partida/:id", PartidaController.showById);
partidaRouter.delete("/partida/:id", checkAuth, checkAdm, PartidaController.delete);
partidaRouter.put("/partida/:id", checkAuth, checkAdm, PartidaController.update);

export default partidaRouter;