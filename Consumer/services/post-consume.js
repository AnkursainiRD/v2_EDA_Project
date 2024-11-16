import kafkaConfig from "../config/kafkaConfig.js";
import { Post } from "../model/postModel.js";

const consumePostService=async(req,res)=>{
    let messages=[]
    let processing=false
    try {
        await kafkaConfig.subscribeTopTopic("post")
        await kafkaConfig.consume(async(message)=>{
            // console.log("this is message,",message)
            // console.log("this is message variable type,",typeof(message))
            messages.push(message)
            // console.log("This is messages array :",messages)
            // console.log("This is messages array  length:",messages.length)

            if(messages.length > 10000){
                console.log("heerree")
                processMessage()
            }
        })
        setInterval(processMessage,100000)
    } catch (error) {
        console.log(error)
    }
    async function processMessage(){
        if(messages.length>0 && !processing){
            processing=true;
            // console.log("Heree", messages)
            const batchToProcess= [...messages];
            messages.length=0;

            try {
                // console.log(batchToProcess)
                await Post.insertMany(batchToProcess,{ ordered:false})
                // console.log("Bulk insertion completed and length",messages.length)
                processing=false
            } catch (error) {
                console.log(error)
                messages.push(...batchToProcess)
            }
        }
    }
}

export default consumePostService