import express from "express";
import { protectMiddleware } from "../Middleware/protectMiddleware.js";
import jobValidator from "../Middleware/jobValidator.js";
import { createJob, fetchJobs , DeleteJob} from "../Controllers/jobController.js";

const router = express.Router();

router.post("/create", protectMiddleware, jobValidator, createJob)
router.get("/fetch", protectMiddleware, fetchJobs);
router.delete("/delete/:id", protectMiddleware, DeleteJob);

export default router;
