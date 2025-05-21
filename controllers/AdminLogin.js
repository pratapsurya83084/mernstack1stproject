import { AdminLogin } from "../models/adminLogin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
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
    const token = jwt.sign(
      { userId: admin._id, email: admin.email },
      "#$#$#(*$",
      { expiresIn: "2d" }
    );

    //for local use only
    res.cookie("adminToken", token, {
      httpOnly: false,
      secure: false,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
      path: "/", // Prevent CSRF attacks by restricting cross-site requests
    });

    //   res.cookie("adminToken", token, {
    //   httpOnly: true,        // Prevent client-side access for security
    //   secure: true,          // Ensure cookies are only sent over HTTPS
    //   maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    //   sameSite: "Strict",    // Prevent CSRF attacks by restricting cross-site requests
    // });

    return res.status(200).json({
      message: "Login successful",
      role: "Admin",
      id: admin._id,
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
     httpOnly: true,
  secure: true,
  maxAge: 2 * 24 * 60 * 60 * 1000,
  sameSite: "None", 
    });
    return res
      .status(200)
      .json({ message: "admin Logged out successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//update admin password that is reset

export const ResetAdminPassword = async (req, res) => {
  try {
   
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required", status: false });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match", status: false });
    }

    const adminUser = await AdminLogin.findOne({email});
    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found", status: false });
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);
    adminUser.password = hashedPassword;
    await adminUser.save();

    return res.status(200).json({ message: "Password reset successful", status: true });
  } catch (error) {
    console.error("ResetAdminPassword error:", error);
    return res.status(500).json({ message: "Server error", status: false });
  }
};

