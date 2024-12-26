import { Payment } from "../models/Payment.js";

import Razorpay from "razorpay";
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  //my crdeadential
    key_id : process.env.RAZORPAY_key_id,
  key_secret: process.env.RAZORPAY_key_secret,
});

//create a payment
export const checkout = async (req, res) => {
  const { amount, cartItems, usershipping, userid } = req.body;
  // console.log("payment details received:", amount, cartItems, usershipping, userid);

  const options = {
    amount: amount * 100, // Convert to paise
    currency: "INR",
    receipt: `receipt${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: amount,
      cartItems,
      usershipping,
      userid,
      payStatus: "created",
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};




//verify - payment  and save to db
export const verifyPayment= async (req, res) => {
 const {order_id , payment_id , payment_signature ,amount , orderItems , userId , userShippingaddress} = req.body;

console.log("all payment details are receives in ...........db",order_id,payment_id,payment_signature,amount,orderItems,userId,userShippingaddress)


 const oredrSuccess = await Payment.create({order_id , payment_id , payment_signature ,amount , orderItems ,  userId , userShippingaddress});

 
 if (oredrSuccess) {
  res.json({
    message : "payment successful .",
    paymentDetails: oredrSuccess,
  success :true
  })
 }

}


//user specific order
export const UserSpecificOrder =async (req,res)=>{
  const userOrder=req.user._id.toString();
console.log(userOrder);


const order=await Payment.find({userId : userOrder}).sort({orderDat:1});   //logged user all order items get from db

if (order) {
  res.json({
    message : "your order details are :",
    orderDetails: order,
    
  })
  
}else{
  res.json({
    message : "your order not found",
  })
}


}



//get all users Order
export const getAllorders =async (req,res)=>{
 
const Allorder=await Payment.find().sort({orderDate:-1});   //logged user all order items get from db

if (Allorder) {
  res.json({
    message : "your order details are :",
    orderDetails: Allorder,
    
  })
  
}else{
  res.json({
    message : "your order not found",
  })
}


}