import { response } from "../helpers/Response.js";
import { favoritoModel } from "../models/favoritoModel.js";
import { usuarioModel } from "../models/usuarioModel.js";
import { viajeModel } from "../models/viajeModel.js";

const favoritoCtrl = {}

favoritoCtrl.listarFavoritos = async(req, res) => {
    try {
        const favorito = await favoritoModel.find({usuario: req.usuarioId}).populate("usuario").populate("favoritos.viaje").sort({createdAt: -1});
        response(res, 200, true, favorito, "Lista de favoritos")
    } catch (error) {
        response(res, 500, false, "", error.message)
    }
};

favoritoCtrl.guardarFavorito = async (req, res) => {
    try {
        const {id} = req.params;
        const viaje = await viajeModel.findById(id).sort("-createdAt");

        if (!viaje) {
            return response(res, 404, false, "", "Viaje no encontrado")
        };

        const newFavorito = new favoritoModel({
            usuario: req.usuarioId,
            favoritos: [{
                viaje: viaje._id
            }]
        });

        await newFavorito.save()

        const usuario = await usuarioModel.findByIdAndUpdate(req.usuarioId, {
            $push: {favoritos: newFavorito._id}
        });

        response(res, 201, true, newFavorito, "Nuevo favorito")
    } catch (error) {
        response(res, 500, false, "", error.message)
    }
};

favoritoCtrl.eliminarFavorito = async(req, res) => {
    try {
        const {id} = req.params;
        const favorito = await favoritoModel.findById(id);

        if(!favorito){
            return response(res, 404, false, "", "Viaje no encontrado en favoritos");
        }

        await favoritoModel.deleteOne();
        response(res, 200, true, "", "Viaje eliminado de favoritos")
    } catch (error) {
        response(res, 500, false, "", error.message)
    }
};

export default favoritoCtrl;