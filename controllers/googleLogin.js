import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import UsergoogleLogin from "../models/GoogleLogin.js"; // Adjust the path based on your file structure

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { googleToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    let user = await UsergoogleLogin.findOne({ email, authType: "google" });

    if (!user) {
      user = new UsergoogleLogin({
        name,
        email,
        picture,
        googleId: sub,
        authType: "google",
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, "#$#$#(*$", {
      expiresIn: "2d",
    });

    //for local  only allow
    res.cookie("googleAuthToken", token, {
     httpOnly: true,        // Prevent client-side access for security
  secure: true,          // Ensure cookies are only sent over HTTPS
  maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  sameSite: "Strict",  //Prevent CSRF attacks by restricting cross-site requests
    });

    //setcookies token
    //      res.cookie("googleAuthToken", token, {
    //   httpOnly: true,        // Prevent client-side access for security
    //   secure: true,          // Ensure cookies are only sent over HTTPS
    //   maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    //   sameSite: "Strict",    // Prevent CSRF attacks by restricting cross-site requests
    // });

    return res.json({
      message: `Welcome ${user.name}`,
      token,
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture,

        userid: user._id,
        success: true,
      },
    });
  } catch (err) {
    res.status(401).json({
      message: "Invalid Google token",
      error: err.message,
      success: false,
    });
  }
};

//retrive google login user profile

export const getGoogleProfile = async (req, res) => {
  const userId = req.userId;
  console.log("User ID:", userId);

  try {
    const user = await UsergoogleLogin.findById(userId);
    console.log("User Profile:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User found",
      userProfile: user,
      success: true,
    });
  } catch (error) {
    console.error("Error retrieving Google user profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const googleLogout = async (req, res) => {
  try {
    res.clearCookie("googleAuthToken", {
      httpOnly: false, // Must match original settings
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "google Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Logout failed please try again :", error);
  }
};
