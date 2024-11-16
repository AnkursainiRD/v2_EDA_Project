import express from 'express'
import kafkaConfig from './config/kafkaConfig.js';
import postRoute from "./routes/postRoutes.js"
const app=express();


(async function(){
   try {
    await kafkaConfig.connect()
    await kafkaConfig.createTopic('post')
   } catch (error) {
    console.log(error)
    process.exit(1)
   }
})();


app.use(express.json())
app.use("/api/v1",postRoute)

app.get("/testing",(req,res)=>{
    res.send("Working")
})

app.listen(3000,()=>console.log("Producer Server Started"))