import express from "express";
import { login, register,logout } from "../Controllers/authController.js";
import { loginValidator, registerValidator} from "../Middleware/authValidator.js";
import { protectMiddleware } from "../Middleware/protectMiddleware.js";

const router = express.Router();

router.post("/register",registerValidator,register);
router.post("/login",loginValidator, login);
router.get("/logout", logout)
router.get("/verify", protectMiddleware, (req,res)=>{

})

export default router;

