export const fileValidator = (req, res, next) => {
  const profilePhoto = req.files?.profilePhoto?.[0];
  const resume = req.files?.resume?.[0];

  if (profilePhoto?.size > 2 * 1024 * 1024) {
    return res.status(400).json({
      message: "Profile photo size must not exceed 2MB",
    });
  }

    if(req.user.role === "recruiter" && resume){
      return res.status(400).json({
      message: "Resume upload is not allowed for recruiter",
    });
    } 
    
    if(resume?.size > 5 * 1024 * 1024) {
    return res.status(400).json({
      message: "Resume size must not exceed 5MB",
    });
  }

  next();
};