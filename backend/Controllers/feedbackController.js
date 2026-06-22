import Feedback from "../Model/feedbackModel.js"

export const feedbackStorage = async(req, res)=>{
  try {
    const feedbackData = req.body;
    await Feedback.create(feedbackData);
    return res.status(200).json({success:true, message:"Feedback is taken"});
  } catch (error) {
    console.log("Feedback save error",error);
    return res.status(500).json({success:true, message:"Internal server error"});
  }
};

