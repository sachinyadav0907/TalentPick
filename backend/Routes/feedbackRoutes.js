import express from "express";
import {feedbackStorage} from "../Controllers/feedbackController.js"

const router = express.Router();

router.post("/store", feedbackStorage)

export default router;