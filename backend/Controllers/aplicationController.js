import Application from "../Model/applicationModel.js";
import Job from "../Model/jobModel.js";

export const createApplication = async (req, res) => {
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
        message: "You have already applied for this job",
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

export const fetchApplication = async (req, res) => {
  try {
    const { page, limit, jobId } = req.query;
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(50, Math.max(1, Number(limit) || 10));

    const skip = (safePage - 1) * safeLimit;

    let countQuery;
    let fetchQuery;

    if (req.user.role === "jobseeker") {
      countQuery = Application.countDocuments({
        userId: req.user.id,
      });
      fetchQuery = Application.find({ userId: req.user.id })
        .populate({
          path: "jobId",
          populate: {
            path: "recruiter",
            select: "profile.profilePhoto.secure_url email profile.companyName",
          },
        })
        .sort({ updatedAt: 1, _id: -1 })
        .skip(skip)
        .limit(safeLimit)
        .lean();
    } else if (req.user.role === "recruiter") {
      countQuery = Application.countDocuments({
        jobId: jobId,
      });
      fetchQuery = Application.find({ jobId: jobId })
        .populate({
          path: "userId",
          select: "fullName profile.profilePhoto.secure_url",
        })
        .sort({ updatedAt: 1, _id: -1 })
        .skip(skip)
        .limit(safeLimit)
        .lean();
    }
    const [totalJobs, jobs] = await Promise.all([countQuery, fetchQuery]);

    const hasMore = skip + jobs.length < totalJobs;

    return res.status(200).json({
      success: true,
      payload: jobs,
      hasMore,
      message: "Applied jobs are fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { userId, jobId, status } = req.body;

    if (req.user.role !== "recruiter")
      return res.status(403).json({ success: false, message: "Forbidden" });

    const application = await Application.findOne({ userId, jobId });

    if (!application)
      return res
        .status(404)
        .json({ succes: false, message: "User or job not found" });

    await application.updateOne({ status });

    return res
      .status(200)
      .json({ succes: true, message: "Applicant status updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
