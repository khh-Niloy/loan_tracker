import jwt, { JwtPayload } from "jsonwebtoken"

export const generateToken = (payload : JwtPayload)=>{
    const accessToken = jwt.sign(payload,"secret-key",{expiresIn: "30d"})
    return accessToken
}