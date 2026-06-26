import express from "express"
import cors from "cors"
import dotenv from "dotenv"  // ✅ Better
import ConnectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";
// routers importing
import userRouter from "./assets/routers/user.router.js"
import testimonialRouter from "./assets/routers/testimonial.router.js"
import ContactFormRouter from "./assets/routers/contactForm.router.js"
import AuditRouter from "./assets/routers/audit.router.js"
import { fileURLToPath } from "url";
dotenv.config();
const app = express()
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3000/en/", "http://localhost:3000/fr/"],
    credentials: true
}))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")))
app.use(express.json())
app.use(cookieParser())
// connect DB
ConnectDB()

console.log("Back-end Started")
app.use("/api/auth", userRouter)
app.use("/api/customers/feedback", testimonialRouter)
app.use("/api/contact-form", ContactFormRouter)
app.use("/api/service/audit", AuditRouter)

const port = process.env.PORT
app.listen(port, () => (
    console.log(`server running at http://localhost:${port}`)
))