const {model,Schema}=require("mongoose");

const storySchema=new Schema({
    storyContent:{
        type:String,
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        index:{expires:'24h'}//using TTL index for automatically deleting this story object after specified time!!
    },
})

const Story=mongoose.model("Story",storySchema)

module.exports=Story;