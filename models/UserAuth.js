import mongoose, { Types } from "mongoose";

const UserAuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },

    image: {
      type: String,
    },
  },

  { timestamps: true }
);

export const UserGoogleLogin = mongoose.model(
  "UserGoogleLogin",
  UserAuthSchema
);
