import AuditController from "../controllers/audit.controller.js";
import { Router } from "express";

const router = Router()

router.post("/add", AuditController.SubmitAudit)
router.get("/", AuditController.getAllAudits)

export default router
