import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import UsergoogleLogin  from '../models/GoogleLogin.js';
import {AdminLogin} from '../models/adminLogin.js';
//sent token into header
export const Authenticated = async (req, res, next) => {
  const token =req.cookies.jwt
  // req.header("Auth");
  // console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
  //  console.log("decoded token is....: ",decode);
   if (!decode) {
    res.json({ message: "token is not valid .."});
   }
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {
     req.user =user;
     next();
     res.json({ message: true, login: "successfull login", tokens: token ,email :req.user.email,name:req.user.name });
 
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.json({
        message: "Token is expired",
        loginStatus: false,
      });
    } else {
      res.json({
        message: "Invalid token",
        loginStatus: false,
      });
   
  }
};









}


//AddTocart Auth
export const AuthCart = async (req, res, next) => {
  const token =  req.cookies.adminToken || req.cookies.googleAuthToken ||req.cookies.AuthToken;
console.log("google login token user :",req.cookies.googleAuthToken);
console.log("admin form token:",req.cookies.adminToken );
console.log("user form token:",req.cookies.AuthToken );


  // Check if token is provided
  if (!token) {
    return res.json({ message: "Please login first", success: false });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, '#$#$#(*$'); // (token, secretKey)
    // console.log("Decoded token is:", decode);

    const userId = decode.userId;

    // Find the user based on the decoded token
    const user = await User.findById(userId) || await UsergoogleLogin.findById(userId)|| await AdminLogin.findById(userId) ;
console.log("google login user :",user);

    if (!user) {
      return res.json({ message: "User not found", success: false });
    } else {
      // Attach user to the request object
      req.user = user;
      next(); // Pass control to the next middleware/route handler
    }
  } catch (error) {
    // Handle token verification errors
    console.error("Token verification failed:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

// AuthAddCart
export const AuthAddCart = async(req,res,next)=>{
  const token = req.cookies.adminToken;
console.log("cart add token reciev:",token);

  // console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
  //  console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:");
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}


export const RemovefromCart = async(req,res,next)=>{
  const token = req.header("Auth");

  // console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
  //  console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
     res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}


export const decsreaseQty = async(req,res,next)=>{
  const token = req.header("Auth");

  // console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
  //  console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}


// incsreaseQty auth
export const incsreaseQty = async(req,res,next)=>{
  const token = req.header("Auth");

  // console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
  //  console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}


export const addressmiddlewaere = async(req,res,next)=>{
  const token = req.header("Auth");

  // console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
  //  console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:");
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}


//orderConfirm
export const orderConfirm = async(req,res,next)=>{
  const token = req.header("Auth");

  // console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
  //  console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:");
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}