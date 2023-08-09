import { response } from "express";
import { sugerenciaModel } from "../models/sugerenciasModel.js";

const sugerenciaCrtl = {}

sugerenciaCrtl.listarSugerencias = async(req,res) => {
    try {
        const sugerencias = await sugerenciaModel.find()
        response(res,200,true,sugerencias, "lista de sugerencias")
    } catch (error) {
        response(res,500,false, "", error.message)
    }
}

sugerenciaCrtl.guardarSugerencia = async(req,res) => {
    try {
    const { titulo, descripcion } = req.body;
    const newSugerencia = new sugerenciaModel({
      titulo,
      descripcion,
    });

    //si existe la imagen
    if (req.file) {
      const { secure_url, public_id } = await subirImageACloudinary(req.file);
      newSugerencia.setImg({ secure_url, public_id });
    }

    await sugerenciaModel.create(newSugerencia);
    response(res, 201, true, newSugerencia, "Sugerencia creada");


    } catch (error) {
        response(res,500,false, "", error.message)
    }
}

sugerenciaCrtl.actualizarSugerencia = async (req,res) => {
    try {
        const { id } = req.params;
        const sugerencia = await sugerenciaModel.findById(id);
    
        if (!sugerencia) {
          return response(res, 404, false, "", "sugerencia no encontrada");
        }
        if (req.file) {
        
          if (sugerencia.public_id) {
            await eliminarImagenCloudinary(sugerencia.public_id);
          }
          const { secure_url, public_id } = await subirImageACloudinary(req.file);
          sugerencia.setImg({ secure_url, public_id });
          await sugerencia.save();
        }
    
        await sugerencia.updateOne(req.body);
        return response(res, 200, true, "", "sugerencia actualizada");
    } catch (error) {
        response(res,500,false, "", error.message)
    }
}


sugerenciaCrtl.eliminarSugerencia = async (req,res) => {
    try {
        const { id } = req.params;
    const sugerencia = await sugerenciaModel.findById(id);

    if (!sugerencia) {
      return response(res, 404, false, "", "sugerencia no encontrada");
    }

    if (sugerencia.public_id) {
      await eliminarImagenCloudinary(sugerencia.public_id);
    }

    await sugerencia.deleteOne();
    return response(res, 200, true, "", "sugerencia eliminado");
    } catch (error) {
        response(res,500,false, "", error.message)
    }
}

export default sugerenciaCrtl;