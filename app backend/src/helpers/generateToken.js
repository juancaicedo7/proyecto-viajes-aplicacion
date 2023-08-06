import jwt from "jsonwebtoken"

//payload ==> informacion que vamos a codificar
export const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, "abc123", {
            expiresIn: "30d"
        })
        return token
    } catch (error) {
        console.log("error en generateToken", error.message)
    }
}
