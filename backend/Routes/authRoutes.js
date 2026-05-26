import express from "express";
import { login, register } from "../Controllers/authController.js";
import { loginValidator, registerValidator } from "../Middleware/authValidator.js";

const router = express.Router();

router.post("/register",registerValidator,register);
router.post("/login",loginValidator, login);

export default router;

