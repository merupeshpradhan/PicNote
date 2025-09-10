import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide your own name"],
    },
    avatar: { type: String, required: [true, "Please provide your own image"] },
    email: {
      type: String,
      required: [true, "Please provide correct and own email"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    accessToken: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
