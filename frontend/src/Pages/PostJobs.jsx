import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaUsers,
  FaClock,
  FaCalendarAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import ErrorMessage from "../Components/ErrorMessage.jsx";
import { useNavigate } from "react-router-dom";

const jobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title is required")
    .max(30, "Title must not exceed 30 characters"),

  skills: z.string().transform((val) =>
    val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ),

  experience: z
    .object({
      min: z.coerce.number().optional(),
      max: z.coerce.number().optional(),
    })
    .optional()
    .refine(
      (data) => {
        if (!data) return true;
        if (data.min == null || data.max == null) return true;
        return data.min <= data.max;
      },
      {
        message: "Max experience should be greater than min",
        path: ["max"],
      },
    ),

  education: z.string().optional(),

  salary: z
    .object({
      min: z.coerce.number().min(0, "Invalid salary"),
      max: z.coerce.number().min(0, "Invalid salary"),
    })
    .refine((data) => data.min <= data.max, {
      message: "Max salary should be greater than min",
      path: ["max"],
    }),

  openings: z.coerce.number().min(1, "At least 1 opening required"),

  jobType: z.enum(["Full Time", "Part Time", "Internship", "Contract"], {
    required_error: "Job type is required",
  }),

  workplaceType: z.enum(["Remote", "Hybrid", "Onsite"], {
    required_error: "Workplace is required",
  }),

  location: z.string().min(2, "Location is required"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  applicationDeadline: z.coerce.date().refine((date) => date >= new Date(), {
    message: "Deadline cannot be in the past",
  }),
});

const PostJob = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });

  const handleJob = async (data) => {
    try {
      const jobPromise = axios.post(
        "http://localhost:5000/api/job/create",
        data,
        {
          withCredentials: true,
        },
      );

      const createJob = await toast.promise(jobPromise, {
        loading: "Posting...",
        success: (res) => res.data.message,
        error: (err) => err?.response?.data?.message || "Internal server error",
      });
      navigate("/my-jobs");
    } catch (error) {
      console.log(error?.response?.message);
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <form
        className="flex-1 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8"
        onSubmit={handleSubmit(handleJob)}
      >
        <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 sm:px-10 py-8">
            <h1 className="text-xl sm:text-3xl font-bold text-white">
              Post a Job
            </h1>

            <p className="text-slate-100 mt-2 text-sm sm:text-base">
              Create a new job opening for candidates.
            </p>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2">Job Title</label>

                <div className="relative">
                  <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Frontend Developer"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                    {...register("title")}
                  />
                </div>
                <ErrorMessage message={errors.title?.message} />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2">
                  Skills Required
                </label>

                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  {...register("skills")}
                />
                <ErrorMessage message={errors.skills?.message} />

                <p className="text-xs text-slate-400 mt-2">
                  Use , to separate skills.
                </p>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  Education Requirement
                </label>

                <div className="relative">
                  <FaUserGraduate  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Bachelor In IT"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                    {...register("education")}
                  />
                   
                </div><ErrorMessage message={errors.education?.message} />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  Experience Required (Optional)
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="number"
                      name="experienceMin"
                      placeholder="Min (e.g. 2)"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                      {...register("experience.min")}
                    />
                  </div>

                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="number"
                      name="experienceMax"
                      placeholder="Max (e.g. 5)"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                      {...register("experience.max")}
                    />
                  </div>
                  <ErrorMessage
                    message={
                      errors.experience?.max?.message ||
                      errors.experience?.message
                    }
                  />
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  Enter experience in years
                </p>
              </div>
              <div>
                <label className="block text-slate-300 mb-2">
                  Vacancy Available
                </label>

                <div className="relative">
                  <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="number"
                    placeholder="5"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                    {...register("openings")}
                  />
                </div>
                <ErrorMessage message={errors.openings?.message} />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  Salary Range (LPA)
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="number"
                      name="salaryMin"
                      placeholder="Min (e.g. 5)"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                      {...register("salary.min")}
                    />
                  </div>

                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="number"
                      name="salaryMax"
                      placeholder="Max (e.g. 8)"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                      {...register("salary.max")}
                    />
                  </div>
                  <ErrorMessage
                    message={
                      errors.salary?.max?.message || errors.salary?.message
                    }
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Enter salary in Lakhs Per Annum
                </p>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  Job Location
                </label>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Mumbai, India"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                    {...register("location")}
                  />
                </div>
                <ErrorMessage message={errors.location?.message} />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Job Type</label>

                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  {...register("jobType")}
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
                <ErrorMessage message={errors.jobType?.message} />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  Workspace Type
                </label>

                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  {...register("workplaceType")}
                >
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Onsite</option>
                </select>
                <ErrorMessage message={errors.workplaceType?.message} />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  Application Deadline (Optional)
                </label>

                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="date"
                    name="applicationDeadline"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                    {...register("applicationDeadline")}
                  />
                </div>
                <ErrorMessage message={errors.applicationDeadline?.message} />

                <p className="text-xs text-slate-400 mt-2">
                  Select the last date to apply
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2">
                  Job Description
                </label>

                <textarea
                  rows="6"
                  placeholder="Write short job description..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 resize-none"
                  {...register("description")}
                ></textarea>
                <ErrorMessage message={errors.description?.message} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                type="submit"
                className="w-full text-sm sm:w-fit bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl text-white font-semibold"
              >
                Publish Job
              </button>
            </div>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default PostJob;
