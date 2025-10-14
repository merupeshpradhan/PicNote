import { Router } from "express";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/signup").post(upload.single("avatar"), userSignup);
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);

export default router;