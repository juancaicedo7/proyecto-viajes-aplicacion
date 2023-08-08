import { Router } from "express";
import sugerenciaCrtl from "../controllers/sugerenciaController.js";

const route = Router();

route.get("/", verifyToken, sugerenciaCrtl.listarSugerencias);
route.post("/", verifyToken, sugerenciaCrtl.guardarSugerencia);
route.put("/:id", verifyToken, sugerenciaCrtl.actualizarSugerencia);
route.delete("/:id", verifyToken, sugerenciaCrtl.eliminarSugerencia);

export default route;
