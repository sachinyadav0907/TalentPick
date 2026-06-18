import Application from "../Model/applicationModel.js";
import Job from "../Model/jobModel.js";

export const applicationController = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const { jobId } = req.body;
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Job id was not provided" });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const existingApplication = await Application.findOne({
      jobId,
      userId: req.user.id,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "Already applied",
      });
    }
    await Application.create({
      jobId,
      userId: req.user.id,
    });
    return res
      .status(201)
      .json({ success: true, message: "Job applied successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
