import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
  },
  { timestamps: true }
);

const Feedback = mongoose.model("feedback", feedbackSchema)

export default Feedback;