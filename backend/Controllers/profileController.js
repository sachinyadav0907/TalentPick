import User from "../Model/userAuth.js";
import { cloudinaryUpload } from "../Utility/CloudUpload.js";

export const fetchProfile = async (req, res) => {
  try {
    const profileFieldsByRole = {
      jobseeker: `
    fullName email role
    profile.profilePhoto
    profile.jobseekerAbout
    profile.jobseekerPhoneNumber
    profile.jobseekerLocation
    profile.skills
    profile.jobseekerExperience
    profile.jobseekerEducation
    profile.resume
    profile.jobseekerLinks
  `,
      recruiter: `
    fullName email role
    profile.profilePhoto
    profile.companyPhoneNumber
    profile.companyName
    profile.companyWebsite
    profile.companyDescription
    profile.companyLocation
    profile.companyPreferredJob
  `,
    };

    const response = await User.findById(req.user.id).select(
      profileFieldsByRole[req.user.role],
    );
    if (!response) {
      return res.status(404).json({ success: true, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      payload: response,
      message: "Profile data is fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { fullName } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const mergedProfile = {
      ...user.profile.toObject(),
      ...req.profileData
    }

    const updates = {
      fullName,
      profile: mergedProfile,
    };
    const profilePhoto = req.files?.profilePhoto?.[0];
    const resume = req.files?.resume?.[0];
    if (profilePhoto) {
      const profileResult = await cloudinaryUpload(
        profilePhoto.buffer,
        req.user.id,
        "jobportal/profile-photo",
      );
      updates.profile.profilePhoto = {
        secure_url: profileResult.secure_url,
        public_id: profileResult.public_id,
      };
    }
    if (resume) {
      const resumeResult = await cloudinaryUpload(
        resume.buffer,
        req.user.id,
        "jobportal/resume",
        "raw",
      );
      updates.profile.resume = {
        secure_url: resumeResult.secure_url,
        public_id: resumeResult.public_id,
      };
    }
    const response = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { returnDocument: 'after' },
    );
    res.status(201).json({
      success: true,
      payload: response,
      message: "uploaded succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
