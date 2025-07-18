import mongoose from "mongoose";

const MONGO_URI =  process.env.MONGO_URI || "mongodb://localhost:27017/login-setup";



let isConnected = false; 

export async function connectToDatabase() {
  if (isConnected) {
    console.log("=> Using existing MongoDB connection");
    return;
  }
  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("=> MongoDB connected successfully");
    return db;
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw error;
  }
}