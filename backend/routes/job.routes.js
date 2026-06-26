import express from "express";
import { protectMiddleware } from "../middlewares/protect.middleware.js";
import jobValidator from "../validators/job.validator.js";
import { createJob, fetchJobs , DeleteJob, updateJob, fetchSingleJob, applicantJobs,saveJob, fetchSaveJob, UnsaveJob} from "../controllers/job.controller.js";
import writeRateLimiter from "../middlewares/rate-limiters/write.rate-limiter.js";
import readRateLimiter from "../middlewares/rate-limiters/read.rate-limiter.js";

const router = express.Router();

router.post("/create",writeRateLimiter, protectMiddleware, jobValidator, createJob)
router.get("/fetch",readRateLimiter, protectMiddleware, fetchJobs);
router.delete("/delete/:id", readRateLimiter, protectMiddleware, DeleteJob);
router.patch("/update/:id",writeRateLimiter, protectMiddleware, jobValidator, updateJob);
router.get("/find/:id",readRateLimiter,protectMiddleware,fetchSingleJob);
router.get("/applicant-jobs",readRateLimiter, protectMiddleware, applicantJobs)
router.post("/save/create",writeRateLimiter, protectMiddleware, saveJob)
router.get("/save/fetch",readRateLimiter, protectMiddleware, fetchSaveJob);
router.delete("/save/delete/:jobId",readRateLimiter, protectMiddleware, UnsaveJob);

export default router;
