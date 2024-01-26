import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("=> MongoDB is already connected");
    return;
  }

  try {

    await mongoose.connect(process.env.MONGODB_URI || '');
    isConnected = true;
    console.log("=> MongoDB is connected");
  } catch (error) {
    console.log("=> MongoDB connection error:", error);
  }
};
