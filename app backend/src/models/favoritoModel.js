import mongoose from "mongoose";
const { Schema, model } = mongoose;

const favoritoItemSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
    },

    viaje: {
      type: Schema.Types.ObjectId,
      ref: "viaje",
    },
  },

  { timestamps: true }
);

const favoritoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
  },
  viaje: {
    type: Schema.Types.ObjectId,
    ref: "sugerencia",
  },
});

export const favoritoModel = model("favorito", favoritoSchema);
