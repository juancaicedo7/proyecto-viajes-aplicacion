import jwt from "jsonwebtoken"
import { response } from "../helpers/Response.js";
import { usuarioModel } from "../models/usuarioModel.js";

const messageNoAuth = (res) => {
    return response(res, 401, false, "", "no estas autorizado")
}

export const verifyToken = async(req,res, next) => {
    let token = null;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "abc123", async (err,payload)=> {
            if(err){
                return messageNoAuth(res)
            }
            const usuario = await usuarioModel.findById({_id: payload.usuario})
            if(! usuario){
                return messageNoAuth(res)
            }
            req.usuarioId = payload.usuario
            next()
        })
    }

    if(!token){
        return messageNoAuth(res)
    }
}