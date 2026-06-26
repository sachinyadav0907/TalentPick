import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  editProfile,
  fetchProfile,
} from "../controllers/profile.controller.js";
import { protectMiddleware } from "../middlewares/protect.middleware.js";
import { fileValidator } from "../validators/file.validator.js";
import { fieldValidator } from "../validators/profile.validator.js";
import readRateLimiter from "../middlewares/rate-limiters/read.rate-limiter.js";
import uploadRateLimiter from "../middlewares/rate-limiters/upload.rate-limiter.js";

const router = express.Router();

router.get("/data/:id", readRateLimiter, protectMiddleware, fetchProfile);
router.patch(
  "/edit",
  uploadRateLimiter,
  protectMiddleware,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  fieldValidator,
  fileValidator,
  editProfile,
);

export default router;
