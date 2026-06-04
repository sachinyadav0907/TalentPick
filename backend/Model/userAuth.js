import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
      required: true,
    },

    profile: {
      profilePhoto: {
        type: { secure_url: String, public_id: String },
        default: null,
      },

      about: {
        type: String,
        default: "",
      },

      // Jobseeker Fields

      phoneNumber: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "",
      },

      jobPreference: [
        {
          type: String,
        },
      ],

      skills: [
        {
          type: String,
        },
      ],

      experience: {
        type: Number,
        default: 0,
      },

      education: {
        type: String,
        default: "",
      },

      resume: {
        type: {
          secure_url: String,
          public_id: String,
        },
        default: null,
      },

      resumeOriginalName: {
        type: String,
        default: "",
      },

      links: {
        linkedin: {
          type: String,
          default: "",
        },

        github: {
          type: String,
          default: "",
        },

        portfolio: {
          type: String,
          default: "",
        },
      },

      // Recruiter Fields

      companyName: {
        type: String,
        default: "",
      },

      companyWebsite: {
        type: String,
        default: "",
      },

      companyDescription: {
        type: String,
        default: "",
      },

      companyLocation: {
        type: String,
        default: "",
      },

      companyPreferredJob: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
