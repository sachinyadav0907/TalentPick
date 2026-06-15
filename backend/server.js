import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./Routes/authRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js"
import jobRoutes from "./Routes/jobRoutes.js"
import feedbackRoutes from "./Routes/feedbackRoutes.js"
import cookiesParser from "cookie-parser";
import cors from "cors"
import connectDB from "./Config/db.js";
import jwt from "jsonwebtoken";
import globalLimiter from "./Middleware/globalRateLimiter.js"

const app = express();
app.use(express.json());
app.use(cookiesParser());
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))

app.use("/api/auth", authRoutes)
app.use("/api" , globalLimiter)
app.use("/api/profile", profileRoutes)
app.use("/api/job", jobRoutes);
app.use("/api/feedback", feedbackRoutes)


app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(process.env.PORT,()=>{
  console.log(`Server is runnning on http://localhost:${process.env.PORT}/`);
})