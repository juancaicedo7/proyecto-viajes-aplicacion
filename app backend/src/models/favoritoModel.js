import mongoose from "mongoose";
const { Schema, model } = mongoose;

const favoritoItemSchema = new Schema(
  {
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
  favoritos: [favoritoItemSchema],
});

export const favoritoModel = model("favorito", favoritoSchema);
