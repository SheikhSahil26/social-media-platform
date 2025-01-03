const dotenv=require("dotenv")
dotenv.config();

const cookieParser=require("cookie-parser");
const express=require('express');
const mongoose=require('mongoose');
const path=require('path');

const connectToMongoDB=require("./db/connectToMongoDB");

const app=express();
const PORT=1000;

const cors=require("cors");

app.use(cors({
    origin:"http://localhost:4000",
    methods:['GET','POST'],
    credentials:true,
}))

app.use(express.static(path.join(__dirname,'public')));

//middlewares
app.use(express.json());    //to handle json input
app.use(express.urlencoded({extended:false}));   //to handle form input
app.use(cookieParser());   //parsing cookie


//Routes
const authRoutes=require("./routes/authRoutes");
const postRoutes=require("./routes/postRoutes");
const userRoutes=require("./routes/userRoutes");

app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/user",userRoutes);


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log("server started at port "+PORT);

})