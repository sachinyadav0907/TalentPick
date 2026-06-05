import User from "../Model/userAuth.js";
import { cloudinaryUpload } from "../Utility/CloudUpload.js";

export const fetchProfile = async (req, res) => {
  try {
    const profileFieldsByRole = {
      jobseeker: `
    fullName email role
    profile.profilePhoto
    profile.about
    profile.phoneNumber
    profile.location
    profile.skills
    profile.experience
    profile.education
    profile.resume
    profile.jobPreference
    profile.links
  `,
      recruiter: `
    fullName email role
    profile.profilePhoto
    profile.about
    profile.phoneNumber
    profile.companyName
    profile.location
    profile.companyWebsite
    profile.companyDescription
    profile.companyLocation
    profile.companyPreferredJob
  `,
    };

    const user = await User.findById(userId).select(
      profileFieldsByRole[req.user.role],
    );
    if (!response) {
      return res.status(404).json({ success: true, message: "User not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        response,
        message: "Profile data is fetched successfully",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const EditProfile = async (req, res) => {
  try {
    const updates = req.body;
    const profilePhoto = req.files?.profilePhoto?.[0];
    const resume = req.files?.resume?.[0];
    if (profilePhoto) {
      const profileResult = await cloudinaryUpload(
        profilePhoto.buffer,
        req.user.id,
        "jobportal/profile-photo",
      );
      updates.profilePhoto = {
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
      updates.resume = {
        secure_url: resumeResult.secure_url,
        public_id: resumeResult.public_id,
      };
    }

    const user = User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const Response = User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true },
    );
    console.log(Response);
    res.status(201).json({ success: true, message: "uploaded succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
