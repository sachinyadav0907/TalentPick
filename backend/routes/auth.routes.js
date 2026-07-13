import express from "express";
import { login, register,logout, verifyUser } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator} from "../validators/auth.validator.js";
import { protectMiddleware } from "../middlewares/protect.middleware.js";
import { loginRateLimiter, registerRateLimiter, verifyRateLimiter } from "../middlewares/rate-limiters/auth.rate-limiter.js";

const router = express.Router();

router.post("/register", registerRateLimiter,registerValidator,register);
router.post("/login", loginRateLimiter,loginValidator, login);
router.post("/logout",protectMiddleware, logout)
router.get("/verify", verifyRateLimiter, protectMiddleware, verifyUser)

export default router;
