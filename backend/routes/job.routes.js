import express from "express";
import { protectMiddleware } from "../middlewares/protect.middleware.js";
import jobValidator from "../validators/job.validator.js";
import { createJob, fetchJobs , DeleteJob, updateJob, fetchSingleJob, applicantJobs,saveJob, fetchSaveJob, UnsaveJob} from "../controllers/job.controller.js";
import writeRateLimiter from "../middlewares/rate-limiters/write.rate-limiter.js";
import readRateLimiter from "../middlewares/rate-limiters/read.rate-limiter.js";

const router = express.Router();
router.use(protectMiddleware);

router.post("/jobs",writeRateLimiter,  jobValidator, createJob)
router.get("/jobs",readRateLimiter,  fetchJobs);
router.get("/jobs/titles",readRateLimiter,  applicantJobs)
router.delete("/jobs/:id", readRateLimiter,  DeleteJob);
router.patch("/jobs/:id",writeRateLimiter,  jobValidator, updateJob);
router.get("/jobs/:id",readRateLimiter,fetchSingleJob);

export default router;
