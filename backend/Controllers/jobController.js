import Job from "../Model/jobModel.js"

export const createJob = async(req, res)=>{
  try {
    if(req.user.role!=="recruiter"){
      return res.status(403).json({message:"Unauthorized user"})
    }
      const frontendData = req.body;
  const jobData = {
    ...frontendData,
    recruiter: req.user.id
  };
  const response = await Job.create(jobData);
  return res.status(201).json({success:true, payload:response, message: "Job created successfully"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message:error.message})
  }

}

export const fetchJobs = async (req, res) => {
  try {
    const query =
      req.user.role === "recruiter"
        ? { recruiter: req.user.id }
        : {};

    const jobs = await Job.find(query).populate({
      path: "recruiter",
      select: "profile.profilePhoto.secure_url profile.companyName",
    });

    return res.status(200).json({
      success: true,
      payload: jobs,
      message: "Jobs fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};