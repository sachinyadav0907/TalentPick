import express from "express";
import {feedbackStorage} from "../controllers/feedback.controller.js"
import feedbackRateLimiter from "../middlewares/rate-limiters/feedback.rate-limiter.js";

const router = express.Router();

router.post("/feedbacks",feedbackRateLimiter, feedbackStorage)

export default router;