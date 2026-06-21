import express from "express";
import {protectMiddleware} from "../Middleware/protectMiddleware.js"
import {createApplication, fetchApplication, changeStatus } from "../Controllers/aplicationController.js";

const router = express.Router();

router.post("/create", protectMiddleware, createApplication);
router.get("/fetch", protectMiddleware, fetchApplication);
router.patch("/status", protectMiddleware,changeStatus);

export default router;