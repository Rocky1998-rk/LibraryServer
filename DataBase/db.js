import mongoose from "mongoose";

 const dbConnect = async () => {
    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/LibraryData?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongoose+2.3.9")
        
        console.log("Connected to MongoDB")

    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnect;