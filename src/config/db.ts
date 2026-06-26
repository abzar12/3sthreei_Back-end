import mongoose from "mongoose";
import dotenv from "dotenv"  // ✅ Better
dotenv.config();
const uri:string = process.env.DB_URL! 

const clientOptions = { serverApi: { version: '1' as const, strict: false, deprecationErrors: true } };
console.log("Testing:", process.env.DB_URL);

const ConnectDB = async () => {
    try {
        await mongoose.connect(uri, clientOptions)
        await mongoose.connection.db?.admin().command({ ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!")
    } catch (err:any) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1); // stop app if DB fails
    }
}
export default ConnectDB