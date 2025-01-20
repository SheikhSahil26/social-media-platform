const router=require('express').Router();
const {seeProfile,followUnFollowUser,editProfile,getAllUsers}=require("../controllers/userControllers")
const {protectedRoutes}=require("../middlewares/protectedRoutes")
const multer=require("multer");
const path=require("path");
const fs=require("fs")

const uploadDir=process.env.uploadDir || path.join(__dirname,"..",'public','image');

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




router.get('/profile/:username',protectedRoutes,seeProfile);

router.post("/followuser/:username",protectedRoutes,followUnFollowUser);

router.post("/editprofile",protectedRoutes,upload.single('profilePicUrl'),editProfile);

router.get("/getusers",protectedRoutes,getAllUsers);

module.exports=router;
