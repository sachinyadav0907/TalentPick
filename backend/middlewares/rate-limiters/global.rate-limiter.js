import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max : 50,
  standardHeaders:true,
  legacyHeaders:false,
  handler: (req, res)=>{
    res.status(429).json({
      success: false ,
      message: "Too many requests. Try again later."
    })
  }
})

export default globalLimiter;