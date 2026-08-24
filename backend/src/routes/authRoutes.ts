import { Router } from "express"
import AuthController from "../controllers/AuthController.js";
import { validacao } from "../middlewares/validarMiddleware.js";
import { cadastroSchema, loginSchema, updateLoginSchema } from "../schemas/authSchema.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const router = Router()

router.post("/auth/cadastro", validacao(cadastroSchema), AuthController.cadastro);
router.post("/auth/login", validacao(loginSchema), AuthController.login);
router.get("/user/moderadores", AuthController.showAdmins);
router.get("/user/:id", checkAuth, AuthController.showById);
router.put("/user/:id", checkAuth, validacao(updateLoginSchema), AuthController.update);

export default router;