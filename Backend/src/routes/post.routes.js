import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  getuserPosts,
  updatePost,
} from "../controller/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Create post (Without login)
// router.route("/").post(upload.single("image"), createPost);

// Get user posts (Without logged in user can access)
// router.route("/user/:userId").get(getuserPosts);

// Update post (login not required)
// router.route("/:postId").put(upload.single("image"), updatePost);

// Delete post (login not required required)
// router.route("/:postId").delete(deletePost);

// Create post (With login)
router.route("/").post(authMiddleware, upload.single("image"), createPost);

// Get all posts (public or private – your choice)
router.route("/").get(getAllPost);

// Get user posts (only logged in user can access)
router.route("/user/:userId").get(authMiddleware, getuserPosts);

// Fetch single post
router.route("/:postId").get(getPostById);

// Update post (login required)
router
  .route("/:postId")
  .put(authMiddleware, upload.single("image"), updatePost);

// Delete post (login required)
router.route("/:postId").delete(authMiddleware, deletePost);

export default router;
