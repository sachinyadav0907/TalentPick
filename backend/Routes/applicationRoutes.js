import express from "express";
import {protectMiddleware} from "../Middleware/protectMiddleware.js"
import {createApplication } from "../Controllers/aplicationController.js";

const router = express.Router();

router.post("/create", protectMiddleware, createApplication)

export default router;