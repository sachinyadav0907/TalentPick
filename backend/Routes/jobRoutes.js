import express from "express";
import { protectMiddleware } from "../Middleware/protectMiddleware.js";
import jobValidator from "../Middleware/jobValidator.js";
import { createJob, fetchJobs } from "../Controllers/jobController.js";

const router = express.Router();

router.post("/create", protectMiddleware, jobValidator, createJob)
router.get("/fetch", protectMiddleware, fetchJobs);

export default router;
