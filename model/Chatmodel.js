const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    Sender:{
        type:String,
        default:"manith"
    },
    Reciver:{
        type:String,
        default:"anmol"
    },
    Message:{
        type:String,
        default:"hey there"
    },
    Date:{
        type:String
    }
});

module.exports=mongoose.model("Chat",userSchema);