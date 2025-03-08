import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL || "");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with a failure code
    }
};

export default connectDb;
