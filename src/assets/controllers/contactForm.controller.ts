import type { Request, Response } from "express";
import ContactFormService from "../services/contactForm.services.js";

class ContactFormController {
    static async CreateContactForm(req: Request, resp: Response) {
        try {
            const { fullname, email, phone_number, website_url, project_type, price, description } = req.body
            console.log("req body: ", req.body)
            if (!fullname || !email || !phone_number || !project_type || !description) {
                return resp.status(404).json({
                    success: false,
                    message: "Please fill in the required field",
                })
            }
            const SentForms = await ContactFormService.CreateContactFrom({fullname, email, phone_number, website_url, project_type, price, description})
            if(!SentForms){
                return resp.status(500).json({
                    success: false,
                    message: "Internal server error. Please try again later."
                })
            }
            return resp.status(201).json({
                    success: true,
                    message: "Thank you! We will get back to you within 48 hours",
                    response: SentForms
                })
        } catch (err: any) {
            return resp.status(500).json({
                success: false,
                message: "Submission failed. Please try again.",
                errors: err.message
            })
        }
    }
    static async getAllContactForm(req:Request, resp:Response){
        try {
            const FoundForms = await ContactFormService.getAllContactForm()
            if(!FoundForms){
                return resp.status(500).json({
                    success: false,
                    message: "Internal server error. Please try again later."
                })
            }
            return resp.status(200).json({
                    success: true,
                    message: "Request submitted successfully.",
                    response: FoundForms
                })
        } catch (err:any) {
            return resp.status(500).json({
                success: false,
                message: "Failed to retrieve customer requests.",
                errors: err.message
            })
        }
    }
}
export default ContactFormController