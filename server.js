import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import ProductRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import addressRouter from "./routes/Address.js";
import routerpayment from './routes/payment.js';
import dotenv from 'dotenv';
import session from "express-session";

import testRouter  from './routes/AuthRouter.js';

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS setup for allowing the frontend to communicate with the backend
app.use(
  cors({
    origin:"https://mernStackproject-17.onrender.com",
    // "http://localhost:5173",
    

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and tokens
    allowedHeaders: ["Content-Type", "Auth"],  // Use "Authorization" for authentication
  })
);


// Configure session middleware
app.use(
  session({
    secret: "#$#$#(*$", // Use a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,  // Set to `true` if using HTTPS in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
    },
  })
);

// Register Routes
app.use("/api/user", userRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/payment", routerpayment);
app.use("/api/auth",testRouter);


// MongoDB connection
mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    dbname: process.env.DB_NAME,
  })
  .then(() => console.log("MongoDB connected successfully........"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Basic route to check server status
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Listen on port 1000
const port = 1000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});