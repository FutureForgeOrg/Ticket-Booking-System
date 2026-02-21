import express from "express";
import { register,login,logout, getMe,createAdmin,adminLogin,verifyOtp,resendOtp} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authmiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/create-admin", authenticateToken, checkRole("admin"), createAdmin);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.post("/logout",logout)
router.get("/user",authenticateToken, getMe);
export default router;