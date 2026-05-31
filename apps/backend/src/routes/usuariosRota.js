import { Router } from "express";
const router = Router();

import usuariosController from "../controllers/usuariosController.js";

router.post("/cadastro", usuariosController.cadastrarUsuario);
// router.post("/login", usuariosController.logarUsuario);

export default router;
