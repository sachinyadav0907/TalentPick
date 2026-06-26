import rateLimit from "express-rate-limit";

const readRateLimiter = rateLimit(
  {
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders:true,
    legacyHeaders:false,
    handler: (req, res)=>{
    res.status(429).json({
      success: false,
      message:"Too many fetch calls. Try again later."
    })
  }
  }
);

export default readRateLimiter;