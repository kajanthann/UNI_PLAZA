import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("DB Connected to mongodb atlas online");
    });
    await mongoose.connect(`${process.env.MONGODB_URL}/UNI-plaza`);
}

export default connectDB;