import rateLimit from "express-rate-limit"

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max : 5,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res)=>{
    res.status(429).json({
      success: false,
      message:"Too many login attempts. Try again later."
    })
  }
})

export const registerLimiter = rateLimit({
  windowMs: 60*60*1000,
  max: 20,
  skipSuccessfulRequests: true,
  standardHeaders:true,
  legacyHeaders:false,
  handler: (req, res)=>{
    res.status(429).json({
      success: false,
      message:"Too many login attempts. Try again later."
    })
  }
})

export const verifyLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders:true,
  legacyHeaders:false,
  handler: (req, res)=>{
    res.status(429).json({
      success: false,
      message:"Too many login attempts. Try again later."
    })
  }
})