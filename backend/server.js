import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import jobRoutes from "./routes/job.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import cookiesParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";
import globalLimiter from "./middlewares/rate-limiters/global.rate-limiter.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();
app.use(express.json());
app.use(cookiesParser());
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api", globalLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/application", applicationRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" && statusCode === 500
        ? "Internal Server Error"
        : err.message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is runnning on http://localhost:${process.env.PORT}/`);
});
