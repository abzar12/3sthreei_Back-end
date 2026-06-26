import testimonial from "../models/testimonial.js";

class TestimonialServices {
    // -----------------------------Create Testimonial------------
    static async CreateTestimonial(fullname: string, message: string, filename: string) {
        try {
            if (!fullname || !message || !filename) {
                throw new Error("Missing Collection rows !!!!");
            }
            const createTestl = await testimonial.create({ fullname, message, filename })
            if (!createTestl) {
                throw new Error("Failed to create collection");
            }
            return { createTestl }
        } catch (error: any) {
            throw new Error("Testimonial Error: ", error);
        }
    }
    // -----------------------------Fetch Testimonial------------
    static async FetchAllTestimonial() {
        try {
            const foundTestl = await testimonial.find({}).sort({ createdAt: -1 }).limit(15)
            if (!foundTestl) {
                throw new Error("Fetching User feedback Failed");
            }
            return { foundTestl }
        } catch (error:any) {
            throw new Error("Testimonial Error: ", error.message);
        }
    }
}
export default TestimonialServices