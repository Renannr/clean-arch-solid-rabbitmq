import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/clientes';

export async function connect() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("\n \t DB connected");
  } catch (error) {
    console.warn("Could not connect to db");
    process.exit(1);
  }
}