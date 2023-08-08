import { response } from "../helpers/Response.js";
import {
  eliminarImagenCloudinary,
  subirImageACloudinary,
} from "../helpers/cloudinary.actions.js";
import { deleteImg } from "../helpers/deleteImg.js";
import { viajeModel } from "../models/viajeModel.js";

const viajeCrtl = {};

viajeCrtl.listarTodosViajes = async (req, res) => {
  try {
    const viajes = await viajeModel.find().populate("usuario").sort("-createdAt");
    response(res, 200, true, viajes, "lista de viajes");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

viajeCrtl.listarViajeLogin = async (req, res) => {
  try {
    const viajes = await viajeModel.find({usuario: req.usuarioId}).populate("usuario", {contrasenia:0} ).sort("-createdAt");
    response(res, 200, true, viajes, "lista de viajes del usuario logueado");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

viajeCrtl.listarViajePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const viaje = await viajeModel.findById(id);

    if (!viaje) {
      return response(res, 404, false, " ", "viaje no encontrado");
    }

    response(res, 200, true, viaje, "viaje encontrado");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

viajeCrtl.guardarViaje = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const newViaje = new viajeModel({
      titulo,
      descripcion,
      usuario: req.usuarioId
    });
    //si existe la imagen
    if (req.file) {
      const { secure_url, public_id } = await subirImageACloudinary(req.file);
      newViaje.setImg({ secure_url, public_id });
    }

    await viajeModel.create(newViaje);
    response(res, 201, true, newViaje, "viaje creado");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

viajeCrtl.eliminarViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const viaje = await viajeModel.findById(id);

    if (!viaje) {
      return response(res, 404, false, "", "viaje no encontrado");
    }

    // viaje.nameImage && deleteImg(viaje.nameImage)
    if (viaje.public_id) {
      await eliminarImagenCloudinary(viaje.public_id);
    }

    await viaje.deleteOne();
    return response(res, 200, true, "", "viaje eliminado");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

viajeCrtl.actualizarViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const viaje = await viajeModel.findById(id);

    if (!viaje) {
      return response(res, 404, false, "", "viaje no encontrado");
    }
    if (req.file) {
      // viaje.nameImage &&deleteImg(viaje.nameImage)
      // viaje.setImg(req.file.filename);
      if (viaje.public_id) {
        await eliminarImagenCloudinary(viaje.public_id);
      }
      const { secure_url, public_id } = await subirImageACloudinary(req.file);
      viaje.setImg({ secure_url, public_id });
      await viaje.save();
    }

    await viaje.updateOne(req.body);
    return response(res, 200, true, "", "viaje actualizado");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

export default viajeCrtl;
