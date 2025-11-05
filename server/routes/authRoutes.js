
import express from "express";
import {
  register,
  verifyOPT,
  resendOTP,
  login,
  logout,
  dashboard,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOPT);
router.post("/resend-otp", resendOTP);
router.post("/login", login);
router.post("/logout", logout);
router.post("/dashboard", authMiddleware, dashboard);

export default router;
