import mongoose from "mongoose";
import env from "dotenv"

env.config();

 const dbConnect = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL)
        
        console.log("Connected to MongoDB")

    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnect;