import mongoose from "mongoose";

const cartitemSchema = new mongoose.Schema(
  {
    productid: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: "Product" ,
      required: true,
     },

    title: {
      type: String,
      require: true,
    },

    price: {
      type: Number,
      require: true,
    },
    qty: {
      type: Number,
      require: true,
    },
    imgsrc: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);


const cartSchema = new mongoose.Schema(
  {
    //user id which user aadded which product
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartitemSchema], //product detail by id wise
  },
  { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);
