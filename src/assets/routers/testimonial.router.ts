import { Router } from "express";
import { UploadFile } from "../../config/multer.js";
import TestimonialController from "../controllers/testimonial.controller.js";

const router = Router()

router.post("/add", UploadFile.single("Img_url"), TestimonialController.CreateTestimonial)
router.get("/", TestimonialController.getAllTestimonial)

export default router