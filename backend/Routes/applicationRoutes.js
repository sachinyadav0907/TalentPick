import express from "express";
import {protectMiddleware} from "../Middleware/protectMiddleware.js"
import { applicationController } from "../Controllers/aplicationController.js";

const router = express.Router();

router.post("/application", protectMiddleware, applicationController)

export default router;