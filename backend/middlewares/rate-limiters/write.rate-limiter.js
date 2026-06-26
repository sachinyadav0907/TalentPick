import rateLimit from "express-rate-limit";

const writeRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:50,
  standardHeaders:true,
  legacyHeaders:false,
  handler: (req, res)=>{
    res.status(429).json({
      success: false,
      message:"Too many write calls. Try again later."
    })
  }
});

export default writeRateLimiter;