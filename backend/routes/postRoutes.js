const express=require("express");
const router=express.Router();
const {getAllPosts,addPost,deletePost,commentOnPost,deleteComment,likeDislikePost,reportPost,getUserPosts,getPostComments,addStory,getAllUserStories,getUsersWhoPostedStories,getStories}=require("../controllers/postControllers")
const {protectedRoutes}=require("../middlewares/protectedRoutes");
const multer=require("multer");
const path=require("path");
const fs=require("fs")

const uploadDir=process.env.uploadDir || path.join(__dirname,"..",'public','posts');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const uploadPath = path.join(uploadDir,'./');
        fs.mkdirSync(uploadPath,{ recursive: true });
        cb(null, uploadPath);
    },
    filename:function(req,file,cb){
        return cb(null,Date.now()+"-"+file.originalname);
    }
})

const upload=multer({storage});

//the explaination of the controllers is in the controller folder!!!

router.get("/getallposts",protectedRoutes,getAllPosts);

router.post("/addpost",protectedRoutes,upload.single('postImageUrl'),addPost);

router.post("/deletepost/:id",protectedRoutes,deletePost);//:id is id of the post which we want to delete

router.post("/comment/:id",protectedRoutes,commentOnPost);//:id is the id of the post on which we want to add comment

router.post("/deletecomment/:id",protectedRoutes,deleteComment);

router.post("/like/:id",protectedRoutes,likeDislikePost);

router.post("/reportpost/:id",protectedRoutes,reportPost);

router.get("/getposts/:username",protectedRoutes,getUserPosts);

router.get("/getpostcomments/:postId",protectedRoutes,getPostComments);

router.post("/story/add",protectedRoutes,upload.single('storyContentUrl'),addStory)

router.get("/story/getalluserstories",protectedRoutes,getAllUserStories) // all users means whom the loggedIn user follows and who posted sotries

router.get("/story/getuserswhopostedstories",protectedRoutes,getUsersWhoPostedStories);

router.get("/story/:username",protectedRoutes,getStories);


module.exports=router;