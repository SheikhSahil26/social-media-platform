const jwt=require("jsonwebtoken")

const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.SECRET_SESSION_KEY,{expiresIn:"1d"});

    res.cookie("jwt",token,{
        maxAge:24*60*60*1000,  //max time of cookie in ms
        httpOnly:true,        //prevent XSS attacks cross-site scripting
        sameSite:"strict",//CSRF attacksf
        secure:process.env.NODE_ENV!=='development',
    })
}

module.exports=generateTokenAndSetCookie