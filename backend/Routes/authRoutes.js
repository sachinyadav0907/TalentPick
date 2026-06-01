import express from "express";
import { login, register,logout, verifyUser } from "../Controllers/authController.js";
import { loginValidator, registerValidator} from "../Middleware/authValidator.js";
import { protectMiddleware } from "../Middleware/protectMiddleware.js";
import { loginLimiter, registerLimiter, verifyLimiter } from "../Middleware/authRateLimiter.js";

const router = express.Router();

router.post("/register", registerLimiter,registerValidator,register);
router.post("/login", loginLimiter,loginValidator, login);
router.get("/logout", logout)
router.get("/verify", verifyLimiter, protectMiddleware, verifyUser)

export default router;
