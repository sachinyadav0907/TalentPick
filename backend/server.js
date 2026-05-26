import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import cookiesParser from "cookie-parser";
import cors from "cors"
import connectDB from "./Config/db.js";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookiesParser());
connectDB();

app.use(cors({
  origin: "*",
  credentials:true
}))

app.use("/auth", authRoutes)

app.listen(process.env.PORT,()=>{
  console.log(`Server is runnning on http://localhost:${process.env.PORT}/`);
})