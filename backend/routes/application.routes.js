import express from "express";
import {protectMiddleware} from "../middlewares/protect.middleware.js"
import {createApplication, fetchApplication, changeStatus } from "../controllers/application.controller.js";
import writeRateLimiter from "../middlewares/rate-limiters/write.rate-limiter.js";
import readRateLimiter from "../middlewares/rate-limiters/read.rate-limiter.js";

const router = express.Router();

router.post("/create", writeRateLimiter,protectMiddleware, createApplication);
router.get("/fetch",readRateLimiter, protectMiddleware, fetchApplication);
router.patch("/status",writeRateLimiter, protectMiddleware,changeStatus);

export default router;