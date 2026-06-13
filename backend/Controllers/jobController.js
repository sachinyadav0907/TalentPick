import Job from "../Model/jobModel.js";

export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Unauthorized user" });
    }
    const frontendData = req.body;
    const jobData = {
      ...frontendData,
      recruiter: req.user.id,
    };
    const response = await Job.create(jobData);
    return res.status(201).json({
      success: true,
      payload: response,
      message: "Job created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchJobs = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const safePage = Math.max(1, Number(page) || 1);

    const safeLimit = Math.min(50, Math.max(1, Number(limit) || 10));

    const skip = (safePage - 1) * safeLimit;

    const query =
      req.user.role === "recruiter" ? { recruiter: req.user.id } : {};

    const totalJobs = await Job.countDocuments(query);

    const mongodbQuery = Job.find(query)
      .populate("recruiter")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .lean();

    const jobs = await mongodbQuery;

    const hasMore = skip + jobs.length < totalJobs;

    return res.status(200).json({
      success: true,
      payload: jobs,
      page: safePage,
      totalJobs,
      hasMore,
      message: "Jobs fetched successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const DeleteJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter")
      return res.status(403).json({ success: false, message: "Forbidden" });
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job)
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    if (job.recruiter.toString() !== req.user.id.toString())
      return res
        .status(403)
        .json({ success: false, message: "You can only delete your own jobs" });
    await job.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Job is deleted successfully" });
  } catch (error) {
    console.log("Delete Job error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
