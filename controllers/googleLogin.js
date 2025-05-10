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
     //setcookies token
     res.cookie("googleAuthToken", token, {
      httpOnly: false, 
      secure: false, //
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 day
      sameSite: "lax", // Allow cookie sharing
    });

    return res.json({
      message: `Welcome ${user.name}`,
      token,
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture,

        userid: user._id,
        success:true
      },
    
    });
  } catch (err) {
    res
      .status(401)
      .json({ message: "Invalid Google token", error: err.message,
        success:false
       });
  }
};


export const googleLogout = async(req,res)=>{

try {
  res.clearCookie("googleAuthToken", {
    httpOnly: false,  // Must match original settings
    secure: false,
    sameSite: "lax",
  });
  return res.status(200).json({
    message :"google Logout Successfully",
    success :true
  })
} catch (error) {
  console.log("Logout failed please try again :", error);
  
}

}