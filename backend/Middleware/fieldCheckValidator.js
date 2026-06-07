const jobSeekerFields = [
  "jobseekerAbout",
  "jobseekerPhoneNumber",
  "jobseekerLocation",
  "skills",
  "jobseekerExperience",
  "jobseekerEducation",
  "jobseekerLinks",
];

const recruiterFields = [
  "companyPhoneNumber",
  "companyName",
  "companyWebsite",
  "companyDescription",
  "companyLocation",
  "companyPreferredJob",
];

export const fieldValidator = (req, res, next) => {
  try {
    const profileData = JSON.parse(req.body.profile || "{}");

    req.profileData = profileData;

    const allowedFields =
      req.user.role === "jobseeker"
        ? jobSeekerFields
        : req.user.role === "recruiter"
          ? recruiterFields
          : null;

    if (!allowedFields) {
      return res.status(403).json({
        success: false,
        message: "Invalid user role",
      });
    }

    // Validate extra fields
    const incomingFields = Object.keys(profileData);

    const invalidFields = incomingFields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid fields: ${invalidFields.join(", ")}`,
      });
    }

    // Validate fullName
    if (
      !req.body.fullName ||
      req.body.fullName.trim().length < 2 ||
      req.body.fullName.trim().length > 20
    ) {
      return res.status(400).json({
        success: false,
        message: "Full name must be between 2 and 20 characters",
      });
    }

    // Jobseeker validations
    if (req.user.role === "jobseeker") {
      if (
        profileData.jobseekerPhoneNumber &&
        !/^[6-9]\d{9}$/.test(profileData.jobseekerPhoneNumber)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid phone number",
        });
      }

      if (
        profileData.skills &&
        (!Array.isArray(profileData.skills) ||
          profileData.skills.length > 8)
      ) {
        return res.status(400).json({
          success: false,
          message: "Maximum 8 skills allowed",
        });
      }
    }

    // Recruiter validations
    if (req.user.role === "recruiter") {
      if (
        profileData.companyPhoneNumber &&
        !/^[6-9]\d{9}$/.test(profileData.companyPhoneNumber)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid company phone number",
        });
      }

      if (
        profileData.companyWebsite &&
        !/^https?:\/\/.+/.test(profileData.companyWebsite)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid company website URL",
        });
      }

      if (
        profileData.companyPreferredJob &&
        (!Array.isArray(profileData.companyPreferredJob) ||
          profileData.companyPreferredJob.length > 5)
      ) {
        return res.status(400).json({
          success: false,
          message: "Maximum 5 preferred jobs allowed",
        });
      }
    }

    next();
  } catch {
    return res.status(400).json({
      success: false,
      message: "Invalid profile data",
    });
  }
};