import express from "express";
import { upload } from "../Middleware/multerMiddleware.js";
import { EditProfile, fetchProfile } from "../Controllers/profileController.js";
import { editProfileValidator } from "../Middleware/editProfileValidator.js";
import { protectMiddleware } from "../Middleware/protectMiddleware.js";
import { fileValidator } from "../Middleware/fileValidator.js";
import { fieldValidator } from "../Middleware/fieldCheckValidator.js";

const router = express.Router();

router.get("/data", protectMiddleware, fetchProfile)
router.patch(
  "/edit",
  protectMiddleware,
  fieldValidator,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  editProfileValidator,
  fileValidator,
  EditProfile,
);


export default router;
