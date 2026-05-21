import mongoose from "mongoose";

import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "please provide mongodb uri in the .env file "
    )
}
async function connectDB(params) {
    
}try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongodb is connected")
} catch (error) {
    console.log("something went wrong",error)
    process.exit(1)
}

export default connectDB