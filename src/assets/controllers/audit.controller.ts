import type { Request, Response } from "express";
import AuditServices from "../services/audit.services.js";

class AuditController {
    static async SubmitAudit(req: Request, resp: Response) {
        try {
            const { company_name, email, website_url, service_type } = req.body
            console.log("request body:  ", req.body)
            if (!company_name || !email || !website_url || !service_type) {
                return resp.status(404).json({
                    success: false,
                    message: "Please fill in the required field",
                })
            }
            const result = await AuditServices.submitAudit({ company_name, email, website_url, service_type })
            if (!result) {
                return resp.status(500).json({
                    success: false,
                    message: "Internal server error. Please try again later."
                })
            }
            return resp.status(201).json({
                success: true,
                message: "Thank you! We will get back to you within 48 hours",
                response: result
            })
        } catch (err: any) {
            return resp.status(500).json({
                success: false,
                message: "Submission failed. Please try again.",
                errors: err.message
            })
        }
    }
    static async getAllAudits(req:Request, resp:Response){
            try {
                const {limit} = req.body
                const Found = await AuditServices.getAllAudits(limit)
                if(!Found){
                    return resp.status(500).json({
                        success: false,
                        message: "Internal server error. Please try again later."
                    })
                }
                return resp.status(200).json({
                        success: true,
                        message: "Data restrieved successfully.",
                        response: Found
                    })
            } catch (err:any) {
                return resp.status(500).json({
                    success: false,
                    message: "Failed to retrieve audits requests.",
                    errors: err.message
                })
            }
        }
}
export default AuditController