import { Router } from "express";
import sugerenciaCrtl from "../controllers/sugerenciaController.js";
import { upload } from '../middleware/imgUpload.js';
import { verifyToken } from "../middleware/auth.js";

const route = Router();

route.get("/", verifyToken, sugerenciaCrtl.listarSugerencias);
route.post("/", verifyToken, upload.single("img"), sugerenciaCrtl.guardarSugerencia);
route.put("/:id", verifyToken, upload.single("img"), sugerenciaCrtl.actualizarSugerencia);
route.delete("/:id", verifyToken, sugerenciaCrtl.eliminarSugerencia);

export default route;
