import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  }, {
    timestamps: true
  });

  export const  AdminLogin = mongoose.model("AdminLogin",adminSchema);