import fs from "fs"
import multer from "multer"
import path from "path"


const storage = multer.diskStorage({
    destination(req: any, file: any, cb: any) {
        if (!fs.existsSync("public/uploads/testimonial")) {
            fs.mkdirSync("public/uploads/testimonial", { recursive: true })
        }
        cb(null, "public/uploads/testimonial")
    },
    filename(req: any, file: any, callback: any) {
        callback(null, file.fieldname+"_"+ Date.now() + path.extname(file.originalname));

    }
})
export const UploadFile = multer({storage: storage})