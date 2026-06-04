import User from "../Model/userAuth.js";
import { cloudinaryUpload } from "../Utility/CloudUpload.js";

export const EditProfile = async(req, res)=>{
  try {
    const updates = req.body
    const profilePhoto = req.files?.profilePhoto?.[0];
    const resume = req.files?.resume?.[0];
    if(profilePhoto){
      const profileResult = await cloudinaryUpload(profilePhoto.buffer, req.user.id, "jobportal/profile-photo");
      updates.profilePhoto = {
        secure_url : profileResult.secure_url,
        public_id : profileResult.public_id
      }
    }
    if(resume){
      const resumeResult = await cloudinaryUpload(resume.buffer, req.user.id, "jobportal/resume", "raw");
      updates.resume ={
        secure_url : resumeResult.secure_url,
        public_id : resumeResult.public_id
      }
    }

    const user = User.findById(req.user.id);
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    const Response = User.findByIdAndUpdate(
      req.user.id,
      {$set: updates},
      {new: true}
    )
    console.log(Response);
    res.status(201).json({message: "uploaded succesfully"})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
}