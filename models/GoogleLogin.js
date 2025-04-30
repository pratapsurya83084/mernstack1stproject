import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String, // only for local users
    picture: String,
    googleId: String, // only for Google users
    authType: { type: String, enum: ['local', 'google'], default: 'local' },
  },{timestamps:true});
  
  export default mongoose.model("UsergoogleLogin", userSchema);
  