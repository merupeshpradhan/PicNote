import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true, (With Login its required true if did not login then false)
      // This required without Login
      required: false,
    },
    image: { type: String, required: [true, "Please provide image"] },
    imageName: { type: String, required: [true, "Please provide image name"] },
    imagePublicId: { type: String },
    description: {
      type: String,
      required: [true, "Please provide description for this image"],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
