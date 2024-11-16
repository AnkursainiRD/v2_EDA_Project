import express from 'express'
import dbConnect from './config/datbaseConnect.js';
const app=express();

await dbConnect()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Working")
})

app.listen(4000,()=>console.log("Consumer Server Started"))