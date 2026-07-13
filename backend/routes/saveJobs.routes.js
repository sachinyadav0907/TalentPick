import express from "express";
import { protectMiddleware } from "../middlewares/protect.middleware.js";
import writeRateLimiter from "../middlewares/rate-limiters/write.rate-limiter.js";
import readRateLimiter from "../middlewares/rate-limiters/read.rate-limiter.js";
import { fetchSaveJob, saveJob, UnsaveJob } from "../controllers/job.controller.js";

const router = express.Router();

router.use(protectMiddleware);

router.post("/saved-jobs",writeRateLimiter,  saveJob)
router.get("/saved-jobs",readRateLimiter,  fetchSaveJob);
router.delete("/saved-jobs/:jobId",writeRateLimiter,  UnsaveJob);

export default router;