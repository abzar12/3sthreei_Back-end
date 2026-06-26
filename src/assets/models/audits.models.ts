import mongoose, { Document, Schema } from "mongoose";

export interface IAudit extends Document {
    company_name: string,
    email: string,
    website_url: string,
    service_type: string
}

const AuditSchema = new Schema<IAudit>(
    {
        company_name: {type:String, required: true},
        email: {type:String, index:true, required: true},
        website_url: {type:String, required: true},
        service_type: {type:String, required: true}
    }, 
    {
        timestamps:true 
    }
)

export default mongoose.model<IAudit>("Audit", AuditSchema)