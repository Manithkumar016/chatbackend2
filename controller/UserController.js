const User = require("../model/userModel");
const Chat = require("../model/Chatmodel");
// const bcrypt = require('bcrypt');

//controller for the chat section on submithandler

module.exports.chat = async (req, res, next) => {

  try {
    const data = req.body;
    const chat = await Chat.create({
      Sender: data.UN,
      Reciver: data.a,
      Message: data.message,
      Date:data.date
    });
    return res.json({ status: true, chat });
  } catch (err) {
    next(err);
  }
};

//controller for the register component for post register

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernamecheck = await User.findOne({ username });
    if (/\s/.test(username))
      return res.json({ msg: "Spaces are not allowed in username", status: false });
    if (usernamecheck)
      return res.json({ msg: "username is already used", status: false });
    const emailcheck = await User.findOne({ email });
    if (emailcheck)
      return res.json({ msg: "email is already used", status: false });
    // const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password
    });

    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

//controller for the Login component for compare

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user1 = await User.findOne({ username });
    if (!user1)
      return res.json({ msg: "incorrect username or password", status: false });
    const isPassword = await compare(password, user1.password);
    if (!isPassword)
      return res.json({ msg: "incorrect username or password", status: false });

    delete User.password;

    return res.json({ status: true, user1 });
  } catch (err) {
    next(err);
  }
};

//controller for the setavatar component for update index value

module.exports.setavatar = async (req, res, next) => {
  try {
    const { selectedAvatar, usernamereg } = req.body;
    await User.updateOne(
      { username: usernamereg },
      { $set: { index: req.body.selectedAvatar } }
    );

    res.status(200).json({ message: "OK" }); // Send response with status 200 and message "OK"
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" }); // Send response with status 500 and error message
  }
};

//controller for the user at main page component for get the index value of specific user based on username entered on login page
module.exports.getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    // console.log(user.toObject())

    if (!user) {
      return res.json({ msg: "User not found", status: false });
    }

    // Exclude the password field from the response
    const { password, ...userData } = user.toObject();
    return res.json({ status: true, user: userData });
  } catch (err) {
    next(err);
  }
};

module.exports.getcontactByUsername = async (req, res, next) => {
  try {
    const user = await User.find();
    // console.log(user)
    return res.json({ user: user });
  } catch (err) {
    next(err);
  }
};

module.exports.getmessages = async (req, res, next) => {
  try {
    const { sender, reciever } = req.params;
    // console.log({ sender, reciever });
    const user = await Chat.find({
      $or: [
        {
          Sender: sender,
          Reciver: reciever,
        },
        {
          Sender: reciever,
          Reciver: sender,
        },
      ],
    });
    // console.log(user)
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    }
    return res.json({ status: true, user: user });
  } catch (err) {
    next(err);
  }
};

module.exports.delete1 = async (req, res, next) => {
  try{
    const data=req.body;
    await Chat.deleteOne({
      $and: [
        {Date:data.date},
        {Sender:data.sender}
      ],
  });

    res.status(200).json({ message: "OK" });
  }catch(err){
    next(err);
  }
}
