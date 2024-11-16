import kafkaConfig from "../config/kafkaConfig.js";

const creatPostService=async(req,res)=>{
    try {
        const {title,content}=req.body
        if(!title || !content){
            return res.status(404).json({
                success:false,
                message:"Creadentions are empty"
            })
        }
        await kafkaConfig.sendToTopic('post',JSON.stringify({title,content}))
        return res.status(200).json({
            success:true,
            message:"Post Created Sucessfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Interal Server Error"
        })
    }
}

export {creatPostService}