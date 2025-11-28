import { Router } from "express";
import {
  refreshAccessToken,
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
router.route("/logout").post(authMiddleware, userLogout);
router.route("/refresh-token").post(refreshAccessToken);

// Portected routes
router
  .route("/update-profile")
  .put(authMiddleware, upload.single("avatar"), updateUserDetails);

export default router;
