import mongoose, { Document, Schema } from "mongoose";

export interface IContactForm extends Document {
    fullname: string,
    email: string,
    phone_number: string,
    website_url?: string | undefined,
    project_type: string,
    price?: string | undefined,
    description: string
}

const ContactFormSchema = new Schema<IContactForm>(
    {
        fullname:{type:String, required:true, minLength: 12, index:true},
        email: {type:String, required:true, index:true},
        phone_number: {type:String, required:true},
        website_url: {type:String, allowNull: false},
        project_type: {type:String, required:true},
        price: {type:String, allowNull:false},
        description: {type:String, required:true}
    },
    {
        timestamps:true
    }
)

export default mongoose.model<IContactForm>("ContactForm", ContactFormSchema)