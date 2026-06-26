import TestimonialServices from "../services/testimonial.services.js";

class TestimonialController {

    // -----------------------------creating Testimonial------------
    static async CreateTestimonial(req: any, resp: any) {
        try {
            const { fullname, feedback } = await req.body
            const filename = req.file?.filename 
            if (!fullname || !feedback || !filename) {
                return resp.status(404).json({
                    success: false,
                    message: "Please fill in all the fields"
                })
            }
            console.log(`Testimonial Data: \n, fullname: ${fullname}\n feedback: ${feedback} \n image: ${filename}`)
            const createTestl = await TestimonialServices.CreateTestimonial(fullname, feedback, filename)
            if (!createTestl) {
            console.log("Creating testimonial Failed ")
                return resp.status(500).json({
                    success: false,
                    message: "Could not send you message"
                })
            }
            console.log("Creating testimonial Succesfully ")
            return resp.status(201).json({
                success: true,
                message: "Thank you, For you feedback",
                response: createTestl
            })
        } catch (err: any) {
            console.log("Testimonial Error: ",err.message())
            return resp.status(500).json({
                success: false,
                message: "Failed to submit your feedback",
                errors: err.message
            })
        }
    }

    // -----------------------------Fetch Testimonial------------
    static async getAllTestimonial(req: any, resp: any) {
        try {
            const Testls = await TestimonialServices.FetchAllTestimonial()
            if (!Testls) {
                return resp.status(500).json({
                    success: false,
                    message: "Could not get users feedback"
                })
            }
            return resp.status(200).json({
                success: true,
                Message: "Fetching users Feedback Successfully",
                response: Testls.foundTestl
            })
        } catch (err: any) {
            return resp.status(500).json({
                success: false,
                message: "Failed to get your users feedback",
                errors: err.message
            })
        }
    }
}
export default TestimonialController