import { Router } from "express";
import {
  updateUserDetails,
  userLogin,
  userLogout,
  userSignup,
} from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(upload.single("avatar"), userSignup);
router.route("/login").post(userLogin);
router
  .route("/update")
  .put(authMiddleware, upload.single("avatar"), updateUserDetails);
router.route("/logout").post(userLogout);

export default router;