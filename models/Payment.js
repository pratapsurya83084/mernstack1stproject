import mongoose, { Types } from "mongoose";

const payments = new mongoose.Schema(
  {
    orderDate: { type: Date, default: Date.now },
    payStatus: { type: String },
    
    
    // orderId: { type: String, required: true },
    // amount: { type: Number, required: true },
    // userId: { type: Types.ObjectId, ref: "User" },
  },
  { strict: false }
);

export const Payment = mongoose.model("Payment", payments);
