import mongoose, { Document, Schema } from "mongoose";


export interface ITestimonial extends Document {
    fullname: string,
    message: string,
    filename: string
}

const TestimonialSchema = new Schema<ITestimonial>(
    {
        fullname: {type:String, required:true, index:true},
        message: {type:String, required:true},
        filename: {type:String, required:true}
    },
    {
        timestamps: true
    }
)
export default mongoose.model<ITestimonial>("Testimonial", TestimonialSchema)

