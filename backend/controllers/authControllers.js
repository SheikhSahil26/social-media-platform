const User=require("../models/userModel")
const generateTokenAndSetCookie=require("../utils/generateToken")

//this is signup controller
async function userSignUp(req,res){

    try{
        const {username,password,profilePicUrl,followers,followings,totalPosts,bio}=req.body;
    
        const alreadyExist=await User.findOne({username});
    
        if(alreadyExist){
            return res.status(400).json({
                error:"user already exist!!!",
            })
        }

        const newUser=new User({ 
            username,
            password,
            bio,
            profilePicUrl,
            followers,
            followings,
            totalPosts, 
        })

        if(newUser){

            await newUser.save();

            console.log("new user created");

            generateTokenAndSetCookie(newUser._id,res)

            return res.status(200).json({
                _id: newUser._id,
                username: newUser.username,
                profilePicUrl: newUser.profilePicUrl,
                followers:newUser.followers,
                followings:newUser.followings,
                totalPosts:newUser.totalPosts,
                profilePicUrl:newUser.profilePicUrl,
                bio:newUser.bio,

            })

        }else{
             res.status(500).json({
                error:"internal server error",
            })
        }
        console.log(newUser);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error:"internal server error",
        })
    }
}


// let OTP=111223;

// function generateOTP(){
//     OTP = Math.floor(100000 + Math.random() * 900000);
//     console.log("otp generated "+OTP); 
// }

//this is login controller

async function userLogin(req,res){

    try{
        const {username,password}=req.body;
    
        const findUser=await User.findOne({username});

        if(!findUser){
            return res.status(400).json({
                error:"no user found or invalid credentials"
            })
        }

        // generateOTP();

        generateTokenAndSetCookie(findUser._id,res)
        
        return res.status(200).json({
            success:"logged in successfully",
            _id: findUser._id,
            username: findUser.username,
            profilePicUrl: findUser.profilePicUrl,
            followers:findUser.followers,
            followings:findUser.followings,
            totalPosts:findUser.totalPosts,
            profilePicUrl:findUser.profilePicUrl,
            bio:findUser.bio,
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            error:"internal server error",
        })
    }
}

//this is log out controller

async function userLogOut(req,res){

    try{
        res.cookie('jwt',"",{
            maxAge:0,
        })
        res.status(200).json({
            success:"logged out successfully",
        })
    }
    catch(error){
        res.status(500).json({
            error:"internal server error!",
        })
    }


}


// async function loginWithOTP(req,res){
//     const {otp}=req.body;

//     if(otp===OTP){
//         generateTokenAndSetCookie(findUser._id,res)
        
//         return res.status(200).json({
//             success:"logged in with OTP successfully",
//             // _id: findUser._id,
//             // username: findUser.username,
//             // profilePicUrl: findUser.profilePicUrl,
//             // followers:findUser.followers,
//             // followings:findUser.followings,
//             // totalPosts:findUser.totalPosts,
//             // profilePicUrl:findUser.profilePicUrl,
//             // bio:findUser.bio,

//         })
//     }
//     else{
//         return res.status(400).json({
//             error:"OTP not matched",
//         })
//     }
// }


module.exports={
    userSignUp,
    userLogOut,
    userLogin,
    // loginWithOTP,
}
