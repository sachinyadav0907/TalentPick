import Job from "../Model/jobModel.js";
import User from "../Model/userAuth.js";

export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const companyNameResponse = await User.findById(req.user.id).select(
      "profile.companyName -_id",
    );
    console.log(companyNameResponse);
    const companyName = companyNameResponse.profile?.companyName;
    const frontendData = req.body;
    const jobData = {
      ...frontendData,
      companyName,
      recruiter: req.user.id,
    };
    const response = await Job.create(jobData);
    console.log(response);
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
    const { search, salary, jobType, experience, remote, page, limit } =
      req.query;

    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(50, Math.max(1, Number(limit) || 10));

    const skip = (safePage - 1) * safeLimit;

    const query = {};

    if (req.user.role === "jobseeker") {
      if (search?.trim()) {
        query.$text = {
          $search: search.trim(),
        };
      }
      if (salary?.trim()) {
        const [min, max] = salary.split("-").map(Number);

        if (!Number.isNaN(min) && !Number.isNaN(max)) {
          query["salary.min"] = { $lte: max };
          query["salary.max"] = { $gte: min };
        }
      }

      if (jobType?.trim()) {
        query.jobType = jobType.trim();
      }

      if (experience?.trim()) {
        const [min, max] = experience.split("-").map(Number);

        if (!Number.isNaN(min) && !Number.isNaN(max)) {
          query["experience.min"] = { $lte: max };
          query["experience.max"] = { $gte: min };
        }
      }

      if (remote === 'true') {
        query.workplaceType = "Remote";
      }
    } else if (req.user.role === "recruiter") {
      query.recruiter = req.user.id;
    }

    const [totalJobs, jobs] = await Promise.all([
      Job.countDocuments(query),

      Job.find(query)
        .populate(
          "recruiter",
          "profile.profilePhoto.secure_url profile.companyName",
        )
        .sort({ updatedAt: -1, _id: -1 })
        .skip(skip)
        .limit(safeLimit)
        .lean(),
    ]);

    const hasMore = skip + jobs.length < totalJobs;

    return res.status(200).json({
      success: true,
      payload: jobs,

      pagination: {
        page: safePage,
        limit: safeLimit,
        totalJobs,
        totalPages: Math.ceil(totalJobs / safeLimit),
        hasMore,
      },

      message: "Jobs fetched successfully",
    });
  } catch (error) {
    console.error("Error retrieving jobs:", error);

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

export const updateJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const frontendData = req.body;
    const jobData = {
      ...frontendData,
      recruiter: req.user.id,
    };
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "job not found" });
    if (job.recruiter.toString() !== req.user.id.toString())
      return res
        .status(403)
        .json({ success: false, message: "You can only Edit your own jobs" });
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, jobData, {
      returnDocument: "after",
      runValidators: true,
    });
    return res.status(200).json({
      success: true,
      updatedJob,
      message: "Job is updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const fetchSingleJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    if (job.recruiter.toString() !== req.user.id.toString())
      return res.status(403).json({
        success: false,
        message: "You can only fetch and edit your own jobs",
      });
    return res.status(200).json({
      success: true,
      job,
      message: "Job data is fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
