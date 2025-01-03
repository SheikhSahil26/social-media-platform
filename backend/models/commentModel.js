const {model,Schema}=require("mongoose");


const commentSchema=new Schema({
    commentBody:{
        type:String,
        required:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    forPost:{
        type:Schema.Types.ObjectId,
        ref:"Post",
    }
},{timestamps:true});

const Comment=model("Comment",commentSchema);

module.exports=Comment;