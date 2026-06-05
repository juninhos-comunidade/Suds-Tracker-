import { Router } from "express";
const router = Router();

import usuariosController from "../controllers/cadastroUsuarioController.js";

router.post("/cadastro", usuariosController.cadastrarUsuario);

export default router;
