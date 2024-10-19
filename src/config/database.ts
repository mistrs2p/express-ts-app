import mongoose from "mongoose";
import logger from "../utils/logger";

import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING!);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
