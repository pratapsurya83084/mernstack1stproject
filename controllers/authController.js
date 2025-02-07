import { UserGoogleLogin } from "../models/UserAuth.js";
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import jwt from "jsonwebtoken";


const googleLogin = async (req,res) => {
  try {
    //after create a model then take a code  from frontend
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    const UserRes = await axios.get(`https://www.googleapis.com/oauth2/v1/
    userinfo?access_token${googleRes.tokens.access_token}`);

    const { email, name, picture } = UserRes.data;
    let userFind = await UserGoogleLogin.findOne({ email });
    if (!userFind) {
      user =  UserGoogleLogin.create({ email, name, picture });
      // res.json({
      //     message: "user not found user",
      // })
    }
    const { _id } = userFind;

    //generate token
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRETE, {
      expiresIn: process.env.JWT_TIMEOUT, //2d
    });
    if (token) {
      res.json({
        message: "token  generated",
        token:token
      });
    }

    console.log("controller runnogg...");
  } catch (error) {
    res.json({
        message: "error",
    })
  }
};

export default googleLogin;
