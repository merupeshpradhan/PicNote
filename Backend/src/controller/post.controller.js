import { Post } from "../models/post.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

// ==================================
//         CREATE A NEW POST
// ==================================
const createPost = asyncHandler(async (req, res) => {
  const { imageName, description } = req.body;

  // Upload to Cloudinary

  // Validate file
  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Please provide image to upload.");
  }

  // Validate fields
  if (!imageName) {
    throw new ApiError(400, "Please provide image name.");
  }

  if (!description) {
    throw new ApiError(400, "Please provide description.");
  }

  // unique + friendly publicId: userId + post image name
  // const cleanName = (imageName || post.imageName).replace(/[^a-zA-Z0-9_-]/g, "_");
  // const publicId = `user_${req.user._id}_post_${cleanName}`;

  // With Login image name ->
  const publicId = `user_${req.user._id}_post_${imageName.replace(
    /\s+/g,
    "_"
  )}`;

  // With out Login image name ->
  // const userId = req.user?._id || null;
  // const publicId = userId
  //   ? `user_${userId}_post_${imageName.replace(/\s+/g, "_")}`
  //   : `_post_${imageName.replace(/\s+/g, "_")}`;

  // Upload to Cloudinary 1st way
  // const image = await uploadOnCloudinary(imageLocalPath);
  // if (!image) {
  //   throw new ApiError(400, "Image upload failed, please try again.");
  // }
  // const imagUrl = image.secure_url || image.url;

  // Upload to Cloudinary 2nd way
  const imageUpload = await uploadOnCloudinary(imageLocalPath, publicId);
  if (!imageUpload) {
    throw new ApiError(400, "Post image upload failed");
  }

  //   create post
  const post = await Post.create({
    // with Login
    user: req.user._id,

    // Now with out login
    // user: userId,

    image: imageUpload.secure_url,
    imagePublicId: imageUpload.public_id,
    imageName,
    description,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully."));
});

// ==================================
//           get all POST
// ==================================
const getAllPost = asyncHandler(async function (req, res) {
  const posts = await Post.find().populate(
    "user",
    "firstName lastName avatar email"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetch successfully."));
});

// ==================================
//    GET POSTS BY A SPECIFIC USER
// ==================================
const getuserPosts = asyncHandler(async function (req, res) {
  const { userId } = req.params;

  const posts = await Post.find({ user: userId }).populate(
    "user",
    "firstName lastName avatar email"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "User posts fetched successfully."));
});

// Get single post by ID
// ==================================
//        GET SINGLE POST
// ==================================
const getPostById = asyncHandler(async function (req, res) {
  const { postId } = req.params;

  const post = await Post.findById(postId).populate(
    "user",
    "firstName lastName avatar email"
  );

  if (!post) {
    throw new ApiError(404, "post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfylly"));
});

// ==================================
//           UPDATE POST
// ==================================
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
    const publicId = `user_${req.user._id}_post_${(
      imageName || post.imageName
    ).replace(/\s+/g, "_")}`;

    const uploadedImage = await uploadOnCloudinary(req.file.path, publicId);

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

  await post.populate("user", "firstName lastName  avatar email");

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

// ==================================
//           DELETE POST
// ==================================
const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  // console.log("Deleting postId:", req.params.postId);

  // Finde the post
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Only the owner can delete
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
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

export {
  createPost,
  getAllPost,
  getuserPosts,
  getPostById,
  updatePost,
  deletePost,
};
