import contactFormModels from "../models/contactForm.models.js";

interface contactFormProps {
    fullname:string,
    email:string,
    phone_number:string,
    website_url?:string,
    project_type:string,
    price?:string,
    description:string
}
class ContactFormService {
    static async CreateContactFrom({fullname, email, phone_number, website_url, project_type, price, description}: contactFormProps){
        try {
            if(!fullname || !email || !phone_number || !project_type || !description){
                throw new Error("Missing collection rows");
            }
            const FormSent = await contactFormModels.create({fullname, email, phone_number, website_url, project_type, price, description})

            if (!FormSent){
                throw new Error("Could not create collection !!!");
            }
            return {FormSent}
        } catch (error:any) {
            throw new Error("Form submit failed", error.message);
        }
    }
    static async getAllContactForm(){
        try {
            const FoundForms = await contactFormModels.find({})
            if (!FoundForms){
                throw new Error("Could not get collections !!!");
            }
            return {FoundForms}
        } catch (error:any) {
             throw new Error("Getting Contact Form failed", error.message);
        }
    }
}
export default ContactFormService