import { Post } from "../models/post.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

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
    imagePublicId: image.public_id,
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

// Update Post
const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { imageName, description } = req.body;

  // Find the post
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // only the owner can update
  if (post.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to edit this post");
  }

  // If user uploads a new image
  if (req.file?.path) {
    // delete old image from Cloudinary
    if (post.imagePublicId) {
      await deleteFromCloudinary(post.imagePublicId);
    }

    // upload new one
    const uploadedImage = await uploadOnCloudinary(req.file.path);
    if (!uploadedImage) {
      throw new ApiError(400, "Image upload failed, please try again.");
    }
    post.image = uploadedImage.secure_url;
    post.imagePublicId = uploadedImage.public_id;
  }

  // Update text fields if provided
  if (imageName) post.imageName = imageName;
  if (description) post.description = description;

  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

// Delete post
const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  // Finde the post
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Only the owner can delete\
  if (post.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  // Delete image from Cloudinary if exists
  if (post.imagePublicId) {
    await deleteFromCloudinary(post.imagePublicId);
  }
  // Delete post from DB
  await Post.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Post deleted successfully", {}));
});

export { createPost, getAllPost, getuserPosts, updatePost, deletePost };
