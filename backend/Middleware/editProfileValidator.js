import { body, validationResult } from "express-validator";

const editProfileValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 2, max: 20 })
    .withMessage("Name length must be between 2 and 20"),
  body("about")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("About cannot exceed 500 charaters"),
  body("phoneNumber")
    .optional()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid phone number"),
  body("location")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Location cannot exceed 50 characters"),
  body("skills")
    .optional()
    .isArray({ max: 8 })
    .withMessage("Not more than 8 skills"),
  body("jobPreference")
    .optional()
    .isArray({ max: 2 })
    .withMessage("not more than 2 job preference"),
  body("experience")
    .optional()
    .isFloat({ max: 50 })
    .withMessage("experience cannot exceed 50 Years")
    .toFloat(),
  body("linkedin")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Enter a valid linkedIn URL"),
  body("github")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Enter a valid GitHub URL"),
  body("portfolio")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Enter a valid Portfolio URL"),
  body("resumeOriginalName")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("File Name cannot exceed 50 characters"),
  body("companyLocation")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Location cannot exceed 50 characters"),
  body("companyName")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Name length must be between 2 and 30"),
  body("companyWebsite")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Enter a valid Company URL"),
  body("companyDescription")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("About cannot exceed 500 charaters"),
  body("companyPreferredJob")
    .optional()
    .isArray({ max: 5 })
    .withMessage("NOt more than 5 job preference"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    next();
  },
];
