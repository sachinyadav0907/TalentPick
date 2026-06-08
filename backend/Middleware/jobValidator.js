import { body, validationResult } from "express-validator";

const jobValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Title should be 2-30 characters"),

  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Location should be 2-30 characters"),

  body("jobType")
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(["Full Time", "Part Time", "Internship", "Contract"])
    .withMessage("Invalid job type"),

  body("workplaceType")
    .notEmpty()
    .withMessage("Workplace Type is required")
    .isIn(["Remote", "Hybrid", "Onsite"])
    .withMessage("Invalid workplace type"),

  body("salary.min")
    .notEmpty()
    .withMessage("Minimum salary is required")
    .isNumeric()
    .withMessage("Minimum salary must be a number"),

  body("salary.max")
    .notEmpty()
    .withMessage("Maximum salary is required")
    .isNumeric()
    .withMessage("Maximum salary must be a number")
    .custom((value, { req }) => {
      if (Number(value) < Number(req.body.salary.min)) {
        throw new Error("Max salary must be >= min salary");
      }
      return true;
    }),

  body("experience.min")
    .optional()
    .isNumeric()
    .withMessage("Minimum experience must be a number"),

  body("experience.max")
    .optional()
    .isNumeric()
    .withMessage("Maximum experience must be a number"),

  body("education")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Education should not exceed 20 characters"),

  body("skills")
    .isArray({ min: 1, max: 8 })
    .withMessage("Skills must be an array (1-8 items)"),

  body("skills.*")
    .isString()
    .trim()
    .withMessage("Each skill must be a string"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 2, max: 400 })
    .withMessage("Description should be 2-400 characters"),

  body("openings")
    .optional()
    .isNumeric()
    .withMessage("Openings must be a number"),

  body("applicationDeadline")
  .optional()
  .isISO8601()
  .withMessage("Invalid date")
  .custom((value) => {
    if (new Date(value) < new Date()) {
      throw new Error("Deadline cannot be in the past");
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation error",
        errors: errors.array(),
      });
    }

    next();
  },
];

export default jobValidator;