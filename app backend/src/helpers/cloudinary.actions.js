import cloudinary from "./cloudinary.config.js";
import { deleteImg } from "./deleteImg.js";

export const subirImageACloudinary = async (file) => {
  try {
    // esta respuesta nos trae el upload response
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path
    );
    deleteImg(file.filename); // cuando se suba se elimine la del backend la elimino
    return {
      // desestructure el resp, por lo que es un object
      secure_url,
      public_id,
    };
  } catch (error) {
    console.log("error en subirImageACloudinary", error.message);
  }
};
export const eliminarImagenCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id); // eliminar la imagen
  } catch (error) {
    console.log("error en subirImageACloudinary", error.message);
  }
};
