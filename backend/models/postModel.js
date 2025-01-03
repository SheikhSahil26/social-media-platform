const {model,Schema}=require("mongoose");


const postSchema=new Schema({
    postImageUrl:{
        type:String,
        required:false,
    },
    postCaption:{
        type:String,
        required:false,
    },
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    postLikes:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    postComments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment",
        }
    ],
    reportPost:[
        {
            type:String,
            required:false,
        }
    ]
},{timestamps:true});

const Post=model("Post",postSchema);

module.exports=Post;