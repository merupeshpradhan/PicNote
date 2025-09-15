import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, updatePost } from "../controller/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(authMiddleware, upload.single("image"), createPost);

router
  .route("/:postId")
  .put(authMiddleware, upload.single("image"), updatePost);

export default router;
