import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import UsergoogleLogin from "../models/GoogleLogin.js";
import { AdminLogin } from "../models/adminLogin.js";
//sent token into header

export const Authenticated = async (req, res, next) => {
  const formToken = req.cookies.AuthToken;
  const googleToken = req.cookies.googleAuthToken;
  const AdminToken = req.cookies.adminToken;
  console.log("Google login token:", googleToken);
  console.log("Admin form token:", AdminToken);
  console.log("User form token:", req.cookies.AuthToken);

  // If no token at all
  if (!formToken && !googleToken && !AdminToken) {
    return res.status(401).json({
      message: "Please login first",
      isAuthenticated: false,
    });
  }

  try {
    let decoded;
    let user = null;

    if (googleToken) {
      // Verify Google token
      decoded = jwt.verify(googleToken, "#$#$#(*$");
      user = await UsergoogleLogin.findById(decoded.userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: "Google user not found", isAuthenticated: false });
      }

      return res.json({
        message: "Google user authenticated",
        isAuthenticated: true,
        loginType: "google",
        user: decoded,
      });
    }

    if (formToken) {
      // Verify form token
      decoded = jwt.verify(formToken, "#$#$#(*$");

      user = await User.findById(decoded.userId);

      if (!user) {
        return res
          .status(404)
          .json({
            message: "Form-based user not found",
            isAuthenticated: false,
          });
      }

      return res.json({
        message: "Form-based user authenticated",
        isAuthenticated: true,
        loginType: "form",
        user: decoded,
      });
    }

  if (AdminToken) {
      decoded = jwt.verify(AdminToken, "#$#$#(*$");
      user = await AdminLogin.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({
          message: "Admin-based user not found",
          isAuthenticated: false,
        });
      }

      return res.json({
        message: "Admin user authenticated",
        isAuthenticated: true,
        loginType: "AdminLogin",
        user: decoded,
      });
    }

    // fallback
    return res
      .status(401)
      .json({ message: "Invalid login method", isAuthenticated: false });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
      isAuthenticated: false,
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
