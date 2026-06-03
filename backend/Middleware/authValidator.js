import { body, validationResult } from "express-validator";

export const registerValidator = [
    body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .bail()
    .isIn(["jobseeker", "recruiter"])
    .withMessage("Role must be either jobseeker or recruiter"),
    
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 2, max: 20 })
    .withMessage("Name length must be between 2 and 20"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6, max: 18 })
    .withMessage("Password length must be between 6 and 18")
    .bail()
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain uppercase, lowercase, number and symbol"
    ),
    (req, res, next)=>{
      const errors = validationResult(req);

      if(!errors.isEmpty){
        return res.status(400).json({
         message:  errors.array()
        })
      };
      next();
    }
];

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6, max: 18 })
    .withMessage("Password length must be between 6 and 18"),

    (req, res, next)=>{
      const errors = validationResult(req);

      if(!errors.isEmpty){
        return res.status(400).json({
         message:  errors.array()
        })
      };
      next();
    }
];