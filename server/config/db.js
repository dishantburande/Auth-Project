import mongoose from "mongoose";
import User from "../models/User.js";

const MONGO_URL= "mongodb+srv://dishant:dishant123@cluster0.6lb6vze.mongodb.net/?appName=Cluster0";

const ConnectDB = async()=>{
try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})

    console.log("MongoDB connected Successfully")

    await User.createCollection();

    console.log("User Collection created Successfully")
} catch (error) {
    console.error("MongoDB Connection Failed", error.message)
    process.exit(1)
}
} 

export default ConnectDB;