const Post=require("../models/postModel");
const User=require("../models/userModel")
const Comment=require("../models/commentModel")
const { findByIdAndUpdate, findById } = require("../models/userModel");

//this is for showing all post in the homepage of the platform
async function getAllPosts(req,res){

    try{
//fetching post after sorting them in descending order of their created time so we get the latest post first
        const Posts=await Post.find().populate('postedBy','username profilePicUrl').sort({createdAt:-1}); 
        //postedBy is a refrence to another object model so from that we want only the username and profilepic of user thats y populate.....
        console.log(Posts);

        return res.status(200).json({
            posts:Posts,
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            error:"error fetching posts!!!",
        })
    }
}

//to add post
async function addPost(req,res){
    try{
        const {postCaption}=req.body;

        const file=req.file;

        console.log(file)

        const userPosts=await Post.find({postedBy:req.user._id});

        // console.log(req.user);
        // console.log(req.user.bio);
    
        const newPost=new Post({
            postImageUrl:req.file?`/posts/${req.file.originalname}`:"",
            postCaption,
            postedBy:req.user._id,
            postlikes:[],
            postComments:[],
        })
        if(newPost){
            await newPost.save()

            const user=await User.findById(req.user._id);

            user.totalPosts=userPosts.length+1;

            await user.save();

    
            return res.status(200).json({
                success:"posted successfully",
            })
        }
        else{
            return res.status(500).json({
                failed:"failed to upload your post due to some technical error!!",
            })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            error:"internal server error",
        })
    }
}

//to delete post
async function deletePost(req,res){
    try{
        const post = await Post.findOne({_id:req.params.id})

        console.log(post);
        console.log(req.user._id)

        const userPosts= await Post.find({postedBy:req.user._id})

        

        if(post.postedBy.toString()!==req.user._id.toString()){
            return res.status(400).json({
                error:"you are not authorized to delete this post!!",
            })
        } 
        
        const user=await User.findById(req.user._id);

        if(user.totalPosts==0){
            return res.status(400).json({
                error:"cant delete no post",
            })
        }

        await Post.deleteOne({_id:req.params.id});

        user.totalPosts=userPosts.length-1;

        await user.save();

        return res.status(200).json({
            success:"post deleted successfully",
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            
            error:"failed to delete post",
        })
    }
}


//to comment on the post
async function commentOnPost(req,res){
    try{
        const {commentBody}=req.body;
        
        const post=await Post.findById(req.params.id);

        console.log(post)

        const newComment=new Comment({
            commentBody,
            createdBy:req.user._id,
            forPost:req.params.id,
        })

        await newComment.save();

        post.postComments.push(newComment._id);
        
        await post.save();


        return res.status(200).json({
            success:"comment added successfully",
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            error:"internal server error",
        })
    }
}

// to delete the comment 
async function deleteComment(req,res){
    try{
        const comment=await Comment.findById(req.params.id)

        let post= await Post.findById(comment.forPost);

        console.log(post);

        if(req.user._id.toString()!==comment.createdBy.toString()){
            return res.status(400).json({
                error:"you are not authorized to delete this comment!!!"
            })
        }


        let newArray=post.postComments.filter(id=>id.toString()!==req.params.id);

        post.postComments=newArray;

        await post.save();

        await Comment.deleteOne({_id:req.params.id});

        return res.status(200).json({
            success:"comment deleted successfully"
        })



    }catch(error){
        console.log(error)
        return res.status(500).json({
            error:"internal server error",
        })
    }
}


//to do like and dislike on the post 
async function likeDislikePost(req,res){
    try{
    
        const post=await Post.findById(req.params.id);

        const userId=req.user._id;

        const found=post.postLikes.find(id=>id.toString()===userId.toString());
        console.log(found);//first check if the loggedIn user already liked the post of this user or not and if he does then do do unlike or else like the post as below 
        if(!found){
            post.postLikes.push(req.user._id);

           await  post.save();

            return res.status(200).json({
                liked:"liked",
                likesNum:post.postLikes.length   //the postLikes is an array containing the user ids of the users who liked the post 
            })
        }
        
        post.postLikes=post.postLikes.filter(id=>id.toString()!==userId.toString())

        await post.save();

        return res.status(200).json({
            unliked:"unliked",
            likesNum:post.postLikes.length 
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            error:"internal server error",
        })
    }
}

// to report a post but this controller is pending !!!!
async function reportPost(req,res){
    const {reportBody}=req.body;

    const post = await Post.findById(req.params.id)

    if(post.report.length===10){
        //send the message(warning) to the post owner to 
    }
    else if(post.report.length>10){
        //delete post 
    }
}

//to show the post of the user whose profile is opened 
async function getUserPosts(req,res){

    try{
        const user=await User.findOne({username:req.params.username});
    
        const posts=await Post.find({postedBy:user._id}).sort({createdAt:-1}); //sorted on the basis of recent creation time

    
    
        if(posts){
            return res.status(200).json({
                posts:posts,
            })
        }

    }catch(error){
        return res.status(500).json({
            error:"error fetching post of user"
        })
    }


}

async function getPostComments(req,res){

    const postId=req.params.postId;

    try{
        const comments=await Comment.find({forPost:postId}).sort({createdAt:-1});
    
        if(!comments){
            return res.status(404).json({
                error:"error fetching comments"
            })
        }

        console.log(comments)

        return res.status(200).json({
            noOfComments:comments.length,
            comments:comments,
        })
        


    }catch(error){
        console.log(error)
        return res.status(500).json({
            error:"error fetching comments of user"
        })
    }

}




module.exports={
    getAllPosts,
    addPost,
    deletePost,
    commentOnPost,
    deleteComment,
    likeDislikePost,
    reportPost,
    getUserPosts,
    getPostComments,
}