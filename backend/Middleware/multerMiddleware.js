import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    if (file.fieldname === "profilePhoto") {
      const allowedType = ["image/jpeg", "image/png", "image/webp"];
      if (allowedType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new Error("Only JPG, PNG, and WEBP are allowed for profile pictures"),
        );
      }
    }
    if (file.fieldname === "resume") {
      const allowedType = ["application/pdf"];
      if (allowedType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only pdf is allowed for resume"));
      }
    }
    cb(new Error("Unexpexted file field"));
  },

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
