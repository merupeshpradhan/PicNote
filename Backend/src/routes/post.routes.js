import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost } from "../controller/post.controller.js";

const router = Router();

router.route("/").post(upload.single("image"), createPost);

export default router;
