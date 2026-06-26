import { getSystemErrorMessage } from "util";
import user from "../models/user.js";
import { registerUser, SignInUser, getAllUsers } from "../services/user.js";
import bcrypt from "bcrypt"
import crypto from "crypto"

// -------------------------Sign Up USer---------------------
export const registerUsers = async (req: any, resp: any) => {
    try {
        const { email, password, confirm_password, firstname, lastname, role, admin } = req.body
        if (!email || !password || !firstname || !lastname) {
            return resp.status(404).json({
                success: false,
                message: "Missing data !!!!"
            })

        }
        const foundUser = await user.findOne({ email })
        if (foundUser) {
            return resp.status(409).json({
                success: false,
                message: "User already exist, please sign-in"
            })

        }
        //  checking if the passsword match 

        if (password !== confirm_password) {
            return resp.status(500).json({
                success: false,
                message: "Please Password does not match"
            })

        }
        const userID = "USER_" + crypto.randomInt(1000, 9999)
        const User = await registerUser({ user_id: userID, firstname, lastname, email, password, role, admin })
        if (!User) {
            return resp.status(500).json({
                success: false,
                message: "Failed to register User"
            })

        }
        resp.cookie('ac_tk', User.access_token, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            path: "/",
            secure: false,
            sameSite: "lax"
        })
        resp.cookie('rf_tk', User.refresh_token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            path: "/",
            secure: false,
            sameSite: "lax"
        })
        console.log("User created Successfully")
        return resp.status(200).json({
            success: true,
            message: "User created Successfully",
            response: User.User
        })

    } catch (err: any) {
        resp.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// -------------------------Sign In USer---------------------
export const SignInUsers = async (req: any, resp: any) => {
    try {
        // console.log("req", req)
        const { email, password } = req.body
        if (!email || !password) {
            return resp.status(404).json({
                success: false,
                message: "Missing data !!!!"
            })
        }
        const existing = await user.findOne({ email })
        if (!existing) {
            return resp.status(409).json({
                success: false,
                message: "Incorrect Email or Password"
            })
        }
        const match = await bcrypt.compare(password, existing.password)
        if (!match) {
            return resp.status(404).json({
                success: false,
                message: "Invalid Password or Email"
            })
        }
        if (existing.email === email && match) {
            const User = await SignInUser(email, password)
            resp.cookie("ac_tk", User.access_token, {
                maxAge: 15 * 60 * 1000,
                httpOnly: true,
                path: "/",
                secure: false,
                sameSite: "lax"
            })
            resp.cookie("rf_tk", User.refresh_token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                path: "/",
                secure: false,
                sameSite: "lax"
            })
            console.log("User logged in Successfully")
            return resp.status(200).json({
                success: true,
                message: "User logged in Successfully",
                response: User.foundUser,
                token: User.access_token
            })
        } else {
            console.log("Invalid Password or Email")
            return resp.status(404).json({
                success: false,
                message: "Invalid Password or Email"
            })
        }
    } catch (err: any) {
        resp.status(500).json({
            success: false,
            message: err.message
        })
    }
}
export const getAllUsers_Contro = async (req: any, resp: any) => {
    try {
        const UserFound: any = await getAllUsers()
        if (!UserFound) {
            return resp.status(404).json({
                success: false,
                message: "Any users found"
            })
        }
        return resp.status(200).json({
            success: false,
            message: "Users Fetch successfully !!!",
            response: UserFound
        })
    } catch (error:any) {
        return resp.status(500).json({
            success: false,
            message: "Any users found",
            errors: error.message
        })
    }
}