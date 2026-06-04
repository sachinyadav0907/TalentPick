const jobSeekerFields = [
  "fullName",
  "about",
  "phoneNumber",
  "location",
  "jobPreference",
  "skills",
  "experience",
  "education",
  "phoneNumber",
];
const recruiterFields = [
  "fullName",
  "about",
  "location",
  "companyName",
  "companyWebsite",
  "companyDescription",
  "companyLocation",
  "companyPreferredJob",
];

export const fieldValidator = (req, res, next) => {
  const allowedFields =
    req.user.role === "jobseeker" ? jobSeekerFields : recruiterFields;

  const incomingFields = Object.keys(req.body);

  const invalidFields = incomingFields.filter((field) => {
    !allowedFields.includes(field);
  });

  if (invalidFields.length) {
    return res.status(400).json({
      message: `Invalid fields: ${invalidFields.join(", ")}`,
    });
  }
  next();
};
