const express=require("express");
const router=express.Router();
const {getAllPosts,addPost,deletePost,commentOnPost,deleteComment,likeDislikePost,reportPost,getUserPosts}=require("../controllers/postControllers")
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

router.get("/getallposts",protectedRoutes,getAllPosts);

router.post("/addpost",protectedRoutes,upload.single('postImageUrl'),addPost);

router.post("/deletepost/:id",protectedRoutes,deletePost);

router.post("/comment/:id",protectedRoutes,commentOnPost);

router.post("/deletecomment/:id",protectedRoutes,deleteComment);

router.post("/like/:id",protectedRoutes,likeDislikePost);

router.post("/reportpost/:id",protectedRoutes,reportPost);

router.get("/getposts/:username",protectedRoutes,getUserPosts)

module.exports=router;