import auditsModels from "../models/audits.models.js";
export interface auditProps {
    company_name: string,
    email: string,
    website_url: string,
    service_type: string
}
class AuditServices {
    static async submitAudit({ company_name, email, website_url, service_type }: auditProps) {
        try {
            if (!company_name || !email || !website_url || !service_type) {
                throw new Error("Missing collection rows");
            }
            const submit = await auditsModels.create({ company_name, email, website_url, service_type })
            if (!submit) {
                throw new Error("Could not submit the collections !!!");
            }
            return { submit }
        } catch (error: any) {
            throw new Error("Form submit failed", error.message);
        }

    }
    static async getAllAudits(limit?:any|null) {
        try {
            const Limit = limit || 50
            const FoundForms = await auditsModels.find({}).sort({ createdAt: -1 }).limit(Limit)
            if (!FoundForms) {
                throw new Error("Could not get collections !!!");
            }
            return { FoundForms }
        } catch (error: any) {
            throw new Error("Getting Contact Form failed", error.message);
        }
    }
}
export default AuditServices