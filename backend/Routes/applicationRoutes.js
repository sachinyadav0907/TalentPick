import express from "express";
import {protectMiddleware} from "../Middleware/protectMiddleware.js"
import {createApplication, fetchApplication } from "../Controllers/aplicationController.js";

const router = express.Router();

router.post("/create", protectMiddleware, createApplication);
router.get("/fetch", protectMiddleware, fetchApplication)

export default router;