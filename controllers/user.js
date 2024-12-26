import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//register user
export const register = async (req, res) => {
  const { name, email, password } = req.body; //take input from user
  try {
    ///check this detail user is already exists or not
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashPassword }); //create user collection in db

    if (!user) {
      console.log("all filds are required.....");
    }
    res.json({ message: "User register successfully", user, success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//login user
export const Userlogin = async (req, res) => {
  //take user email,password
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.json({
        message: "User is not find",
        success: false,
      });
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.json({ message: "invalid creadential", success: false });

    const token = jwt.sign(
      { userId: user._id },
      "#$#$#(*$",
     
      { expiresIn:'1d'}
   
  );




    res.json({name:`${user.name}`,email:`${user.email}`, message: `welcome ${user.name}`, token, sucess: true });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//get all users
export const allUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); //get all registered user detail from db
    res.json({ users, success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get profile User
// export const profile=async(req,res)=>{
//   //return current login user
//  res.json({ user: req.user})

// }
export const profile = async (req, res, next) => {
  try {
      const user = await User.findById(req.userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
  } catch (error) {
      next(error); // Pass error to the error-handling middleware
  }
};
