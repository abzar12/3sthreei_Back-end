import bcrypt from "bcrypt"
import user from "../models/user.js"
import { generate_access_token, generate_refresh_key } from "../../utils/generateToken.js"

export interface UserProps {
    user_id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    admin?: boolean
}
export const registerUser = async ({user_id, firstname, lastname, email, password, role, admin }: UserProps) => {
    try {
        // check if any of fiel is undefined or null or empty 
        if (!user_id || !email || !password || !firstname || !lastname) {
            throw new Error("Missing Data !!!");
        }
        const existing = await user.findOne({ email });
        //  checking is user already exit
        if (existing) {
            throw new Error("User already exists");
        }
        const pass_hash = await bcrypt.hash(password, 10)
        const User = await user.create({
            user_id,
            firstname,
            lastname,
            email,
            password: pass_hash,
            role,
            admin: admin || false
        })
        const access_token = generate_access_token( {user_id:User._id.toString(), email, role })
        const refresh_token = generate_refresh_key({ user_id:User._id.toString(), email, role} )
        if (!access_token || !refresh_token) {
            throw new Error("Failed to generate Token");
        }
        return ({ User, access_token, refresh_token })
    } catch (error) {
        console.log("Register failed !!! ERROR: ", error)
    }
}

export const SignInUser = async (email: string, password: string) => {
    if (!email || !password) {
        throw new Error("Missing Data !!!");
    }
    const foundUser = await user.findOne({ email })
    if (!foundUser) {
        throw new Error("Please Email or Password incorrect");
    }
    const verify_pwd = await bcrypt.compare(password, foundUser.password)
    if (!verify_pwd) throw new Error("Invalid credentials");

    const access_token = generate_access_token( {user_id:foundUser._id.toString(), email:foundUser.email, role:foundUser.role })
    const refresh_token = generate_refresh_key( {user_id:foundUser._id.toString(), email:foundUser.email, role:foundUser.role })
    return { foundUser, access_token, refresh_token}
}
export const getAllUsers = async ()=>{
    try {
        const UserFound = await user.find({})
        if (!UserFound){
            throw new Error("Any User found !!!");
        }
        return {UserFound}
    } catch (error:any) {
        throw new Error("User deleting Failed!!!", error.message);
    }
}