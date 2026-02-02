import express from "express";

import { register,login,logout, getMe} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",logout)
router.get("/user",authenticateToken, getMe);
export default router;