import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import ProductRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import addressRouter from "./routes/Address.js";
import routerpayment from './routes/payment.js';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import testRouter  from './routes/AuthRouter.js';

dotenv.config();

const app = express();
// Use cookie-parser middleware
app.use(cookieParser());
// Middleware to parse JSON requests
app.use(express.json());

// CORS setup for allowing the frontend to communicate with the backend
app.use(
  cors({
    // origin:"http://localhost:5173",
    origin: "https://appplicaation-mern-appecome.netlify.app",
      // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and tokens
  })
);
// app.set('trust proxy', 1);



// Register Routes
app.use("/api/user", userRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/payment", routerpayment);
app.use("/api/auth",testRouter);

const url=process.env.DB_CONNECTION_URL;
// MongoDB connection
mongoose.connect(`${url}mern_ecomerce?retryWrites=true&w=majority`).then(() => console.log("MongoDB connected successfully........"))
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