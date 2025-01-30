import express from "express";
import mongoose from "mongoose";

import bodyParser from "express";
import userRouter from "./routes/user.js";
import ProductRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import addressRouter from "./routes/Address.js";
import cors from "cors";
import routerpayment from './routes/payment.js'
import dotenv from 'dotenv';
import session from "express-session";
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Configure session middleware
app.use(
  session({
    secret: "#$#$#(*$", // Change this to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // 1-day expiration
  })
);




app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //use for  send token
    allowedHeaders: ["Content-Type", "Auth"],
  })
);

app.use(bodyParser.json());
//home testing route
app.get("/", (req, res) => {
  res.json({ message: "this  is home route" });
});

//user Router
app.use("/api/user", userRouter);

// addproduct Router
app.use("/api/product", ProductRouter);

//addToCart router
app.use("/api/cart", cartRouter);

//address
app.use("/api/address", addressRouter);


app.use('/api/payment', routerpayment);



//route create for cashfree generate session key





mongoose
  .connect(
    process.env.DB_CONNECTION_URL,
    {
      
      dbname:process.env.DB_NAME
    }
  )
  .then(() =>
    console.log(
      "...............mongoodb connected successfully................."
    )
  );

const port = 1000;
app.listen(port, () => {
  console.log(`server runnning on port ${port}`);
});
