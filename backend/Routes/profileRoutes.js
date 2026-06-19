import express from "express";
import { upload } from "../Middleware/multerMiddleware.js";
import { editProfile, fetchProfile } from "../Controllers/profileController.js";
import { protectMiddleware } from "../Middleware/protectMiddleware.js";
import { fileValidator } from "../Middleware/fileValidator.js";
import { fieldValidator } from "../Middleware/fieldCheckValidator.js";

const router = express.Router();

router.get("/data/:id", protectMiddleware, fetchProfile)
router.patch(
  "/edit",
  protectMiddleware,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  fieldValidator,
  fileValidator,
  editProfile
);


export default router;
