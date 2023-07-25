//import statements

const express = require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const UserRoutes=require("./routes/UserRoutes");

const app=express();
require("dotenv").config();

//middlewares

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from localhost:3000
    optionsSuccessStatus: 200, // Return 200 for successful preflight requests
    credentials: true,
  };
  
  // Enable CORS for all routes with specified options
  app.use(cors(corsOptions));


app.use("/api/auth",UserRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/chat-database",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected successfully");
    // mongoose.connection.db.admin().listDatabases().then((result)=>{
    //     const dbs=result.databases;
    //     dbs.forEach((db)=>{
    //         console.log(db.name);
    //     })
    // })
}).catch((err)=>{
    console.log(err.message);
})



const server=app.listen(process.env.PORT,()=>{
    console.log("server started on port :"+process.env.PORT);
})