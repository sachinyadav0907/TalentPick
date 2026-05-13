import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";

const app = express();
dotenv.config();


app.use("/auth", authRoutes)

app.listen(process.env.PORT,()=>{
  console.log(`Server is runnning on http://localhost:${process.env.PORT}/`);
})