const {model,Schema}=require("mongoose");

const storySchema=new Schema({
    storyContentUrl:{
        type:String,
        required:false,
    },
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    expiresAt:{
        type:Date,
        required:true,
        index:{expires:0}
        
    },
    publicId:{
        type:String,
        required:true,
    }
},{timestamps:true})



const Story=model("Story",storySchema)

module.exports=Story;