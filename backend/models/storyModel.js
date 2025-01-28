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
        index:{expires:'1h'}//using TTL index for automatically deleting this story object after specified time!!
    },
},{timestamps:true})

const Story=model("Story",storySchema)

module.exports=Story;