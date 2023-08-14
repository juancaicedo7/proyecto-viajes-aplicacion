import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import favoritoCtrl from "../controllers/favoritoController.js";

const route = Router();

route.get("/", verifyToken, favoritoCtrl.listarFavoritos);

route.post("/addfavoritp/:id", verifyToken, favoritoCtrl.guardarFavorito);

route.post("/addviaje", verifyToken, favoritoCtrl.guardarToViajes);

route.delete("/:id", verifyToken, favoritoCtrl.eliminarFavorito);

export default route;
