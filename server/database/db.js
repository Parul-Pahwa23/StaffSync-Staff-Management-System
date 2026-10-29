import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URL && typeof process.loadEnvFile === "function") {
      try {
        process.loadEnvFile();
      } catch (e) {}
    }
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/staffsync");
    console.log("Connection with database successfull");
  } catch(error) {
    console.log(error);
  }
}

export default connectToDatabase