import express from "express";
import { protectMiddleware } from "../Middleware/protectMiddleware.js";
import jobValidator from "../Middleware/jobValidator.js";
import { createJob, fetchJobs , DeleteJob, updateJob, fetchSingleJob, applicantJobs,saveJob, fetchSaveJob, UnsaveJob} from "../Controllers/jobController.js";

const router = express.Router();

router.post("/create", protectMiddleware, jobValidator, createJob)
router.get("/fetch", protectMiddleware, fetchJobs);
router.delete("/delete/:id", protectMiddleware, DeleteJob);
router.patch("/update/:id", protectMiddleware, jobValidator, updateJob);
router.get("/find/:id",protectMiddleware,fetchSingleJob);
router.get("/applicant-jobs", protectMiddleware, applicantJobs)
router.post("/save/create", protectMiddleware, saveJob)
router.get("/save/fetch", protectMiddleware, fetchSaveJob);
router.delete("/save/delete/:jobId", protectMiddleware, UnsaveJob);

export default router;
