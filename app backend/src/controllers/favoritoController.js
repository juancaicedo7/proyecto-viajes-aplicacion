import { response } from "../helpers/Response.js";
import { favoritoModel } from "../models/favoritoModel.js";
import { sugerenciaModel } from "../models/sugerenciasModel.js";
import { usuarioModel } from "../models/usuarioModel.js";
import { viajeModel } from "../models/viajeModel.js";

const favoritoCtrl = {};

favoritoCtrl.listarFavoritos = async (req, res) => {
  try {
    const favorito = await favoritoModel
      .find({ usuario: req.usuarioId })
      .populate("usuario")
      .populate("viaje")
      .sort({ createdAt: -1 });
    response(res, 200, true, favorito, "Lista de favoritos");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

favoritoCtrl.guardarFavorito = async (req, res) => {
  try {
    const { id } = req.params;
    const viaje = await sugerenciaModel.findById(id);

    if (!viaje) {
      return response(res, 404, false, "", "Viaje no encontrado");
    }

    const favoriteExists = await favoritoModel.findOne({ viaje: id });

    if (favoriteExists) {
      return response(
        res,
        400,
        false,
        "",
        "El viaje ya esta en la lista de favoritos"
      );
    }

    const newFavorito = new favoritoModel({
      usuario: req.usuarioId,
      viaje: viaje._id,
    });

    await newFavorito.save();

    // const usuario = await usuarioModel.findByIdAndUpdate(req.usuarioId, {
    //   $push: { favoritos: newFavorito._id },
    // });

    response(res, 201, true, newFavorito, "Nuevo favorito");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

favoritoCtrl.guardarToViajes = async (req, res) => {
  try {
    const { _id } = req.body;
    const viaje = await sugerenciaModel.findById({ _id });

    if (!viaje) {
      return response(res, 404, false, "", "Viaje no encontrado");
    }

    const myViajeExists = await viajeModel.findById(_id);

    if (myViajeExists) {
      return response(
        res,
        400,
        false,
        "",
        "Amplía tus horizontes y crea recuerdos duraderos en un destino único."
      );
    }

    delete req.body.createdAt;
    delete req.body.updatedAt;

    const newFavorito = new viajeModel({
      ...req.body,
      usuario: req.usuarioId,
    });

    await newFavorito.save();


    response(res, 201, true, newFavorito, "Tu próxima aventura te espera en un destino lleno de maravillas por descubrir.");
  } catch (error) {
    console.log(error.message);
    response(res, 500, false, "", error.message);
  }
};

favoritoCtrl.eliminarFavorito = async (req, res) => {
  try {
    const { id } = req.params;
    const favorito = await favoritoModel.findById(id);

    if (!favorito) {
      return response(res, 404, false, "", "Viaje no encontrado en favoritos");
    }

    await favoritoModel.deleteOne();
    response(res, 200, true, "", "Viaje eliminado de favoritos");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

export default favoritoCtrl;
