//import statements

const express = require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const UserRoutes=require("./routes/UserRoutes");
const http = require('http');

const app=express();
require("dotenv").config();

//middlewares

app.use(express.json());

const corsOptions = {
    origin: 'https://chat-app-frontend-chi-pearl.vercel.app', // Allow requests from localhost:3000
    optionsSuccessStatus: 200, // Return 200 for successful preflight requests
    credentials: true,
  };
  
  // Enable CORS for all routes with specified options
  app.use(cors(corsOptions));


app.use("/api/auth",UserRoutes)

mongoose.connect("mongodb+srv://manithrai3:Ucj1GxOIoFn6nMU0@cluster0.v96jhfs.mongodb.net/chatapp",{
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


const server = http.createServer(app);
server.listen(process.env.PORT,()=>{
    console.log("server started on port :"+process.env.PORT);
})
