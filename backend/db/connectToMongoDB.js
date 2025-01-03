const mongoose=require("mongoose");

const connectToMongoDB=async (req,res)=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/social-media-app");
        console.log("mongoDB connected successfully");
    }catch(error){
        console.log(error)
        console.log("error connecting to mongodb")
    }
}

module.exports=connectToMongoDB
