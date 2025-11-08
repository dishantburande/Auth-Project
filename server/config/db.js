import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;

const MONGO_URL = `mongodb+srv://${username}:${password}@cluster0.6lb6vze.mongodb.net/?appName=Cluster0`;

const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected Successfully");

    await User.createCollection();

    console.log("User Collection created Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed", error.message);
    process.exit(1);
  }
};

export default ConnectDB;
