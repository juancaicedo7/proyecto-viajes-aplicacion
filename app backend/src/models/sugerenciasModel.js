import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sugerenciaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, "El campo titulo es obligatorio"],
    },
    descripcion: {
      type: String,
      required: [true, "El campo descripcion es obligatorio"],
    },

    imgUrl: {
      type: String,
      default: null,
    },

    public_id: String,
  },
  { timestamps: true }
);

sugerenciaSchema.methods.setImg = function setImg({ secure_url, public_id }) {
  this.imgUrl = secure_url;
  this.public_id = public_id;
};

export const sugerenciaModel = model("sugerencia", sugerenciaSchema);
