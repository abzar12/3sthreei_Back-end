import { Router } from "express";
import ContactFormController from "../controllers/contactForm.controller.js";

const router = Router()

router.post("/submit", ContactFormController.CreateContactForm)
router.get("/", ContactFormController.getAllContactForm)

export default router