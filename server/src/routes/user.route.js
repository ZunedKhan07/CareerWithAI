import Router from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register-user").post(registerUser)
router.route("/login-user").post(loginUser)
router.route("/logout").post(logoutUser)

export default router