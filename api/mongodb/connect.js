import mongoose from "mongoose";

export const connectToMongoDb = async (url) => {
    mongoose.set('strictQuery', true)
    await mongoose.connect(url)
}