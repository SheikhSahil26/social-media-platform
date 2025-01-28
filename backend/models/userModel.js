const {model,Schema}=require("mongoose");

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        default:"hey there i'm using social media platform"
    },
    followings:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    followers:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    totalPosts:{
        type:Number,
        default:0,
    },
    profilePicUrl:{
        type:String,
        default:""
    },
    accountType:{
        type:String,
        default:"public",
    },
    stories:[
        {
            type:Schema.Types.ObjectId,
            ref:"Story"
        }
    ]


},{timestamps:true});

const User=model('User',userSchema);

module.exports=User;