import mongoose, { Schema } from "mongoose";

const postScehema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String, required: [true, "Please provide image"] },
    imageName: { type: String, required: [true, "Please provide image name"] },
    description: {
      type: String,
      required: [true, "Please provide description for this image"],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postScehema);
