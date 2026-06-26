import jwt from "jsonwebtoken";
import type { UserProps } from "../assets/services/user.js";

interface UserProps_Gene {
    user_id:string,
    email:string,
    role: string
}
export const generate_access_token = ({user_id, email, role}:UserProps_Gene):string=>{
    return jwt.sign({user_id, email, role}, process.env.JWT_ACCESS_KEY as string, {expiresIn: "30min" as any})
}
export const generate_refresh_key = ({user_id, email, role}:UserProps_Gene):string => {
    return jwt.sign({user_id, email, role}, process.env.JWT_REFRESH_KEY as string, {expiresIn: "7d"})
}