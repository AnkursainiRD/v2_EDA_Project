import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    title:{ type:String},
    content:{ type:String}
})

export const Post=mongoose.model("Post",postSchema)