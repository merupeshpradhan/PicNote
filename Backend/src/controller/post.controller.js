import { Post } from "../models/post.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create a new post
const createPost = asyncHandler(async (req, res) => {
  const { imageName, description } = req.body;

  // Validate file
  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Please provide image to upload.");
  }

  // Upload to Cloudinary
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(400, "Image upload failed, please try again.");
  }
  const imagUrl = image.secure_url || image.url;

  if (!imageName) {
    throw new ApiError(400, "Please provide image name.");
  }

  // Validate description
  if (!description) {
    throw new ApiError(400, "Please provide description.");
  }

  //   create post
  const post = await Post.create({
    user: req.user._id,
    image: imagUrl,
    imageName,
    description,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully."));
});

// Get all posts
const getAllPost = asyncHandler(async function (req, res) {
  const posts = await Post.find().populate("user", "userName avatar email");

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetch successfully."));
});

// Get posts by a specific user
const getuserPosts = asyncHandler(async function (req, res) {
  const { userId } = req.params;

  const posts = await Post.find({ user: userId }).populate(
    "user",
    "userName avatar email"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "User posts fetch successfully."));
});

export { createPost, getAllPost, getuserPosts };
