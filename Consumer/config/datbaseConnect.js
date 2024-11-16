import mongoose from "mongoose";
import kafkaConfig from "./kafkaConfig.js";
import consumePostService from "../services/post-consume.js";

const dbConnect=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/microservies")
        console.log("Database Connected")
        await kafkaConfig.connect()
        console.log("Kafka Connected")
        await consumePostService()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default dbConnect;