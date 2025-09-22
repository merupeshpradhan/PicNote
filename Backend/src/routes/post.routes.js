import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPost,
  deletePost,
  getAllPost,
  getuserPosts,
  updatePost,
} from "../controller/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Create post (login required)
router.route("/").post(authMiddleware, upload.single("image"), createPost);

// Get all posts (public or private – your choice)
router.route("/").get(getAllPost);

// Get user posts (only logged in user can access)
// router.route("/user/:userId").get(authMiddleware, getuserPosts);
router.route("/user/:userId").get( getuserPosts);

// Update post (login required)
router
  .route("/update/:postId")
  .put(authMiddleware, upload.single("image"), updatePost);

// Delete post (login required)
router.route("/:postId").delete(authMiddleware, deletePost);

export default router;
