import bcrypt from "bcrypt"

// contrasenia ==> informacion que vamos a codificar(encriptar)
export const encryptPassword = (contrasenia)=>{

    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordEncriptada = bcrypt.hashSync(contrasenia, salt)
        return passwordEncriptada;
    } catch (error) {
        console.log("error en encryptPassword", error.message)
    }

}

