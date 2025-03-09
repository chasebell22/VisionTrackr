import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    console.error(`MongoDB Connection Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.log('Server will continue running, but database functionality will be limited.');
    // Don't exit the process, allow the server to start anyway
  }
};

export default connectDB; 