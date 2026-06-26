import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    user_id:string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    admin: boolean
}
const userSchema = new Schema<IUser>(
    {
        user_id: {type:String, required: true, unique: true},
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: "staff" },
        admin: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)
export default mongoose.model<IUser>("User", userSchema)

