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

    const token = jwt.sign({ userId: UsergoogleLogin._id }, "#$#$#(*$", {
      expiresIn: "2d",
    });
     //setcookies token
     res.cookie("googleAuthToken", token, {
      httpOnly: true, // So that you can read it from the frontend
      secure: true, // Allow it on non-HTTPS (localhost or development)
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
      },
    });
  } catch (err) {
    res
      .status(401)
      .json({ message: "Invalid Google token", error: err.message });
  }
};
