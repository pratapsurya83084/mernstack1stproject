import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import UsergoogleLogin from "../models/GoogleLogin.js";
import { AdminLogin } from "../models/adminLogin.js";
//sent token into header
export const Authenticated = async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.googleAuthToken ||
    req.cookies.AuthToken;
  console.log("google login token user :", req.cookies.googleAuthToken);
  console.log("admin form token:", req.cookies.adminToken);
  console.log("user form token:", req.cookies.AuthToken);

  // Check if token is provided
  if (!token) {
    return res.json({ message: "Please login first", success: false });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, "#$#$#(*$"); // (token, secretKey)
    // console.log("Decoded token is:", decode);
    console.log("decoded google user userId :", decode);

    const userId = decode.userId;

    // Find the user based on the decoded token
    const user =
      (await User.findById(userId)) ||
      (await UsergoogleLogin.findById(userId)) ||
      (await AdminLogin.findById(userId));
    // console.log("google login user :", user);

    if (!user) {
      return res.json({ message: "User not found", success: false });
    } else {
      // Attach user to the request object
      req.userId = user;
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

//AddTocart Auth
export const AuthCart = async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.googleAuthToken ||
    req.cookies.AuthToken;
  console.log("google login token user :", req.cookies.googleAuthToken);
  console.log("admin form token:", req.cookies.adminToken);
  console.log("user form token:", req.cookies.AuthToken);

  // Check if token is provided
  if (!token) {
    return res.json({ message: "Please login first", success: false });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, "#$#$#(*$"); // (token, secretKey)
    // console.log("Decoded token is:", decode);
    console.log("decoded google user userId :", decode);

    const userId = decode.userId;

    // Find the user based on the decoded token
    const user =
      (await User.findById(userId)) ||
      (await UsergoogleLogin.findById(userId)) ||
      (await AdminLogin.findById(userId));
    console.log("google login user :", user);

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

//get cart item AuthCart
export const AuthAddCart = async (req, res, next) => {

  const token = req.cookies.adminToken || req.cookies.googleAuthToken || req.cookies.AuthToken;
  console.log("google login token user :", req.cookies.googleAuthToken);
  console.log("admin form token:", req.cookies.adminToken);
  console.log("user form token:", req.cookies.AuthToken);

  // Check if token is provided
  if (!token) {
    return res.json({ message: "Please login first", success: false });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, "#$#$#(*$"); // (token, secretKey)
    // console.log("Decoded token is:", decode);
    console.log("decoded google user userId :", decode);

    const userId = decode.userId;

    // Find the user based on the decoded token
    const user =
      (await User.findById(userId)) ||
      (await UsergoogleLogin.findById(userId)) ||
      (await AdminLogin.findById(userId));
    // console.log(user);

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

export const RemovefromCart = async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.googleAuthToken ||
    req.cookies.AuthToken;
  console.log("google login token user :", req.cookies.googleAuthToken);
  console.log("admin form token:", req.cookies.adminToken);
  console.log("user form token:", req.cookies.AuthToken);

  // Check if token is provided
  if (!token) {
    return res.json({ message: "Please login first", success: false });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, "#$#$#(*$"); // (token, secretKey)
    // console.log("Decoded token is:", decode);
    console.log("decoded google user userId :", decode);

    const userId = decode.userId;

    // Find the user based on the decoded token
    const user =
      (await User.findById(userId)) ||
      (await UsergoogleLogin.findById(userId)) ||
      (await AdminLogin.findById(userId));
    console.log("google login user :", user);

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

export const decsreaseQty = async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.googleAuthToken ||
    req.cookies.AuthToken;
  console.log("google login token user :", req.cookies.googleAuthToken);
  console.log("admin form token:", req.cookies.adminToken);
  console.log("user form token:", req.cookies.AuthToken);

  // Check if token is provided
  if (!token) {
    return res.json({ message: "Please login first", success: false });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, "#$#$#(*$"); // (token, secretKey)
    // console.log("Decoded token is:", decode);
    console.log("decoded google user userId :", decode);

    const userId = decode.userId;

    // Find the user based on the decoded token
    const user =
      (await User.findById(userId)) ||
      (await UsergoogleLogin.findById(userId)) ||
      (await AdminLogin.findById(userId));
    console.log("google login user :", user);

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

// incsreaseQty auth
export const incsreaseQty = async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.googleAuthToken ||
    req.cookies.AuthToken;
  console.log("google login token user :", req.cookies.googleAuthToken);
  console.log("admin form token:", req.cookies.adminToken);
  console.log("user form token:", req.cookies.AuthToken);

  // Check if token is provided
  if (!token) {
    return res.json({ message: "Please login first", success: false });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, "#$#$#(*$"); // (token, secretKey)
    // console.log("Decoded token is:", decode);
    console.log("decoded google user userId :", decode);

    const userId = decode.userId;

    // Find the user based on the decoded token
    const user =
      (await User.findById(userId)) ||
      (await UsergoogleLogin.findById(userId)) ||
      (await AdminLogin.findById(userId));
    console.log("google login user :", user);

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

export const addressmiddlewaere = async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.googleAuthToken ||
    req.cookies.AuthToken;
  console.log("google login token user :", req.cookies.googleAuthToken);
  console.log("admin form token:", req.cookies.adminToken);
  console.log("user form token:", req.cookies.AuthToken);

  // Check if token is provided
  if (!token) {
    return res.json({ message: "Please login first", success: false });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, "#$#$#(*$"); // (token, secretKey)
    // console.log("Decoded token is:", decode);
    console.log("decoded google user userId :", decode);

    const userId = decode.userId;

    // Find the user based on the decoded token
    const user =
      (await User.findById(userId)) ||
      (await UsergoogleLogin.findById(userId)) ||
      (await AdminLogin.findById(userId));
    console.log("google login user :", user);

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

//orderConfirm
export const orderConfirm = async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.googleAuthToken ||
    req.cookies.AuthToken;
  console.log("google login token user :", req.cookies.googleAuthToken);
  console.log("admin form token:", req.cookies.adminToken);
  console.log("user form token:", req.cookies.AuthToken);

  // Check if token is provided
  if (!token) {
    return res.json({ message: "Please login first", success: false });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, "#$#$#(*$"); // (token, secretKey)
    // console.log("Decoded token is:", decode);
    console.log("decoded google user userId :", decode);

    const userId = decode.userId;

    // Find the user based on the decoded token
    const user =
      (await User.findById(userId)) ||
      (await UsergoogleLogin.findById(userId)) ||
      (await AdminLogin.findById(userId));
    console.log("google login user :", user);

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
