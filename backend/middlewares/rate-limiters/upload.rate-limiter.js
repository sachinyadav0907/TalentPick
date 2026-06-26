import rateLimit from "express-rate-limit";

const uploadRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  standardHeaders:true,
  legacyHeaders:false,
  handler: (req, res)=>{
    res.status(429).json({
      success: false,
      message:"Too many upload requests. Try again later."
    })
  }
});

export default uploadRateLimiter;