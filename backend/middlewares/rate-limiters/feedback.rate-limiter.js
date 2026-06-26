import rateLimit from "express-rate-limit";

const feedbackRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:4,
  standardHeaders:true,
  legacyHeaders:false,
  handler: (req, res)=>{
    res.status(429).json({
      success: false,
      message:"Too many feedback calls. Try again later."
    })
  }
});

export default feedbackRateLimiter;