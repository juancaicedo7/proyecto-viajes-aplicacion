import mongoose from 'mongoose';
import bcrypt from "bcrypt"
const { Schema, model } = mongoose;

const usuarioSchema =new Schema({

    
        nombre: {
          type: String,
          required: [true, "El campo nombre es obligatorio"],
        },
        correo: {
          type: String,
          required: [true, "El campo correo es obligatorio"],
          unique: true,
        },
    
        contrasenia: {
          type: String,
          required: [true, "El campo contrasenia es obligatorio"],
        },
      },
      { 
        timestamps: true 
     }
);

usuarioSchema.methods.matchPassword = function (contrasenia) {
    return bcrypt.compareSync(contrasenia, this.contrasenia);
  };

export const usuarioModel = model("usuario", usuarioSchema);