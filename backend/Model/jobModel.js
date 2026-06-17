import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type:String,
      required:true,
      trim:true,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract"],
      required: true,
    },

    workplaceType: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      required: true,
    },

    salary: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },

    experience: {
      min: Number,
      max: Number,
    },

    skills: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one skill is required",
      },
    },

    description: {
      type: String,
      required: true,
    },

    applicationDeadline: Date,

    openings: {
      type: Number,
      default: 1,
    },

    education: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

jobSchema.index({
  title: "text",
  location: "text",
  companyName: "text",
  skills: "text",
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
