import { response } from "../helpers/Response.js";

const usuarioCrtl = {};

usuarioCrtl.listarUsuarios = (req,res) => {
    try {
        
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
}