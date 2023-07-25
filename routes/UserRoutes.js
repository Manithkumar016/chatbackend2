const {register,login,setavatar,getUserByUsername,getcontactByUsername, chat,getmessages, delete1} = require("../controller/UserController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.get("/user/:username", getUserByUsername);
router.post("/setavatar",setavatar);
router.get("/contact/", getcontactByUsername);
router.post("/chatt",chat);
router.get("/chat/:sender/:reciever", getmessages);
router.post("/delete",delete1);

module.exports=router;