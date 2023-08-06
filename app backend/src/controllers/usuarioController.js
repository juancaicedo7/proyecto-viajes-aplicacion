import { response } from "../helpers/Response.js";
import { encryptPassword } from "../helpers/encryptPassword.js";
import { generateToken } from "../helpers/generateToken.js";
import { usuarioModel } from "../models/usuarioModel.js"; 

const usuarioCrtl = {};

usuarioCrtl.registrarUsuario =async (req,res) => {
    try {
        const {correo,contrasenia,nombre} = req.body;
        const usuario = await usuarioModel.findOne({correo})

        if(usuario){
            return response(res,409,false,"","el correo ya existe en otro registro")
        }

        //encriptar contrasenia con el metodo encryptPassword
        const contraseniaEncript = encryptPassword(contrasenia)

        const newUsuario = new usuarioModel({correo,contrasenia: contraseniaEncript,nombre});

        await newUsuario.save();

        //crear token por medio del metodo generateToken
        const token = generateToken({usuario: newUsuario._id})

        response(res, 201, true, {...newUsuario._doc, contrasenia: null, token}, "usuario registrado")
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
}

usuarioCrtl.accesoUsuario = async (req,res) => {

    try {
        const {contrasenia, correo} = req.body
        const usuario = await usuarioModel.findOne({correo})

        //si existe el correo y la contrasenia, es decir el if es true, entra al acceso y genera el token
        if(usuario && usuario.matchPassword(contrasenia)){
            const token = generateToken({usuario: usuario._id})
            return response(res, 200, true, {...usuario._doc, contrasenia:null, token}, "Bienvenido")
        }
        response(res, 400, false, "", "correo o contrasenia incorrectas");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
}


export default usuarioCrtl;