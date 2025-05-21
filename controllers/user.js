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

    const token = jwt.sign( { userId: user._id }, "#$#$#(*$", { expiresIn:'2d'});
    req.session.token = token; 
    
//for local use this 
// res.cookie("AuthToken", token, {
//   httpOnly: false,
//   secure: false,
//   maxAge: 2 * 24 * 60 * 60 * 1000,
//   sameSite: "Lax",
//   path: "/",  // Allow cookies for same-site requests and top-level navigation
// });

    //for production allow below code
 res.cookie("AuthToken", token, {
  httpOnly: true,
  secure: true,
  maxAge: 2 * 24 * 60 * 60 * 1000,
  sameSite: "None",  // Prevent CSRF attacks by restricting cross-site requests
});


    res.json({name:`${user.name}`
      ,email:`${user.email}`,
       message: `welcome ${user.name}`,
       id:user._id,
        token, sucess: true
       });
   
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const formLogout = async (req, res) => {
  try {
    // res.clearCookie("jwt");

    res.clearCookie("AuthToken", {
      httpOnly: false,  // Must match original settings
      secure: false,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({ message: "formLogin Logged out successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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


export const profile = async (req, res, next) => {
  try {
      const user = await User.findById(req.userId);
      console.log("usersssss:",user);
      
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
  } catch (error) {
      next(error); // Pass error to the error-handling middleware
  }
};




//delete user by id
export const  deleteUserByid=async (req,res)=>{
const userid=req.params.id
console.log(userid);

const usedelete=await User.findOneAndDelete({_id:userid})
if(!usedelete){
res.json({
  message:"user not found",
  success:false
})
}else{
  res.json({
    message:"user deleted successFully",
    success:true,
    user:userid
  })
}

}