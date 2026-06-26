import { getAllUsers_Contro, registerUsers, SignInUsers } from "../controllers/user.js";
import { Router } from "express";

const router = Router()

router.post('/sign-in', SignInUsers)
router.post('/sign-up', registerUsers)
router.get('/getUsers', getAllUsers_Contro)

export default router

