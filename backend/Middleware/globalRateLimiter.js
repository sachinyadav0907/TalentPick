import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max : 100,
  skipSuccessfulRequests: true,
  standardHeaders:true,
  legacyHeaders:false,
  handler: (req, res)=>{
    res.status(429).json({
      success: false ,
      message: "Too many login attempts. Try again later."
    })
  }
})

export default globalLimiter;