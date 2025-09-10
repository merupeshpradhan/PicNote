import { Router } from "express";
import { userLogin, userLogout, userSignup } from "../controller/user.controller.js";

const router = Router();

router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);

export { router };
