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

router.route("/").post(authMiddleware, upload.single("image"), createPost);
router.route("/").get(getAllPost);
router.route("/user/:userId").get(getuserPosts);

router
  .route("/:postId")
  .put(authMiddleware, upload.single("image"), updatePost)
  .delete(authMiddleware, deletePost);

export default router;
