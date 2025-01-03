const User = require("../models/userModel")
const path=require("path")


async function seeProfile(req, res) {
    try{
        const username = req.params.username;

    const findUser = await User.findOne({ username: username });

    if (!findUser) {
        return res.status(404).json({
            error: "Not Found!!",
        })
    }

    return res.status(200).json({
        username: findUser.username,
        profilePicUrl: findUser.profilePicUrl,
        followers: findUser.followers,
        followings: findUser.followings,
        totalPosts: findUser.totalPosts,
        bio: findUser.bio,
    })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            error:"internal server error"
        })
    }
}

async function followUnFollowUser(req,res){

    try{
        const userToFollow=await User.findOne({username:req.params.username});

        const currentUser=await User.findOne({_id:req.user._id});

        console.log(currentUser.followings)

        console.log(req.params.username);
    
        const found=currentUser.followings.find(id=>id.toString()===userToFollow._id.toString())

        console.log(found)

        if(!found){

            currentUser.followings.push(userToFollow._id);

            userToFollow.followers.push(currentUser._id);

           await  userToFollow.save();
            await currentUser.save();
    
            return res.status(200).json({
                liked:"followed",
            })
        }
        
        currentUser.followings= currentUser.followings.filter(id=>id===userToFollow._id)
        userToFollow.followers= userToFollow.followers.filter(id=>id===currentUser._id);
    
       await currentUser.save();
        await userToFollow.save();

    
        return res.status(200).json({
            error:"unfollowed", 
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            error:"internal server error",
        })
    }
}

async function editProfile(req,res){
    try{
        const {username,bio}=req.body;

        const file=req.file
        console.log(file)
        const user=await User.findOne({_id:req.user.id});

        const existingAlready= await User.findOne({username:username})

        if(existingAlready && existingAlready._id.toString()!==req.user._id.toString())return res.status(400).json({error:"this username already present"});

        user.username=username;
        user.bio=bio;
        user.profilePicUrl=req.file?`/image/${req.file.originalname}`:"";

        console.log(req.file.path)
        console.log(user.profilePicUrl)

        await user.save();
 
        return res.status(200).json({
            success:"profile updated successfully",
            _id:user._id,
            username:user.username,
            bio:user.bio,
            profilePicUrl:user.profilePicUrl,
            followers: user.followers,
            followings: user.followings,
            totalPosts: user.totalPosts,


        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            error:"internal server error",
        })
    }

    
}


module.exports = {
    seeProfile,
    followUnFollowUser,
    editProfile,
}