import  {AdminLogin}  from  '../models/adminLogin.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';




export const adminLogin = async(req,res)=>{
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        status: false,
      });
    }
  
    try {
      // 2. Find admin by email
      const admin = await AdminLogin.findOne({ email });
      if (!admin) {
        return res.status(401).json({
          message: "Invalid credentials",
          status: false,
        });
      }
  
      // 3. Compare passwords
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
          status: false,
        });
      }
  
      // 4. Generate JWT Token
      const token = jwt.sign({ id: admin._id, email: admin.email }, "#$#$#(*$", { expiresIn: '2d' });
  

      res.cookie("adminToken", token, {
        httpOnly: false, // So that you can read it from the frontend
        secure: false, // Allow it on non-HTTPS (localhost or development)
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 day
        sameSite: "lax", // Allow cookie sharing
      });

      return res.status(200).json({
        message: "Login successful",
        role: "Admin",
        id:admin._id,
        token,
        status: true,
      });
  
    } catch (error) {
      console.error("Error logging in admin:", error);
      return res.status(500).json({
        message: "Server error",
        status: false,
      });
    }
  };

  export const AdminLogout = async (req, res) => {
    try {
      // res.clearCookie("jwt");
  
      res.clearCookie("adminToken", {
        httpOnly: false,  // Must match original settings
        secure: false,
        sameSite: "lax",
      });
      return res
        .status(200)
        .json({ message: "admin Logged out successfully", status: true });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };