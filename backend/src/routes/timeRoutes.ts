import { Router } from "express";
import { validacao } from "../middlewares/validarMiddleware.js";
import { checkAdm } from "../middlewares/adminMiddleware.js";
import { checkAuth } from "../middlewares/authMiddleware.js";
import { timeSchema } from "../schemas/timeSchema.js";
import TimeController from "../controllers/TimeController.js";

const timeRouter = Router()

timeRouter.post("/time/create", checkAuth, checkAdm, validacao(timeSchema), TimeController.create);
timeRouter.get("/time", TimeController.show);
timeRouter.get("/time/:id", TimeController.showById);
timeRouter.delete("/time/:id", checkAuth, checkAdm, TimeController.delete);
timeRouter.put("/time/:id", checkAuth, checkAdm, TimeController.update);

export default timeRouter;