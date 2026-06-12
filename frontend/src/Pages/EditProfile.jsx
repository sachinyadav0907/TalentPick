import React, { useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaFilePdf,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfileSchema = z.object({
  fullName: z.string().min(2, "Name is required"),

  skillData: z.string().optional(),

  hiringRole: z.string().optional(),

  profilePhoto: z.any().optional(),

  resume: z.any().optional(),

  profile: z.object({
    jobseekerAbout: z.string().optional(),
    jobseekerLocation: z.string().optional(),
    jobseekerPhoneNumber: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid phone number")
      .optional()
      .or(z.literal("")),
    companyDescription: z.string().optional(),
    companyLocation: z.string().optional(),
    companyWebsite : z.string().url("Enter a valid LinkedIn URL").optional().or(z.literal("")),
    companyPhoneNumber: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid phone number")
      .optional()
      .or(z.literal("")),
    jobseekerLinks: z
      .object({
        github: z.string().url("Enter a valid GitHub URL").optional().or(z.literal("")),
        linkedin: z.string().url("Enter a valid LinkedIn URL").optional().or(z.literal("")),
        portfolio: z.string().url("Enter a valid Portfolio URL").optional().or(z.literal("")),
      })
      .optional(),
  }),
});

function EditProfile() {
  const navigate = useNavigate();
  const {
    user,
    isRecruiter,
    setProfileData,
    profileData,
    setProfilePhoto,
    profilePhoto,
  } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditProfileSchema),
  });
  const profilePhotoFile = watch("profilePhoto");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/profile/data",
          { withCredentials: true },
        );
        reset({
          ...response.data.payload,

          skillData: response.data.payload.profile.skills?.join(", ") || "",

          hiringRole:
            response.data.payload.profile.companyPreferredJob?.join(", ") || "",
        });
        setProfileData(response.data.payload);
        setProfilePhoto(response.data.payload.profile.profilePhoto.secure_url);
      } catch (error) {
        toast.error(error?.response?.message || "Something went wrong");
      }
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    const file = profilePhotoFile?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfilePhoto(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [profilePhotoFile]);

  const handleEdit = async (data) => {
    try {
      const formData = new FormData();

      const skillsData = data.skillData
        ? data.skillData
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const hiringRole = data.hiringRole
        ? data.hiringRole
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const profile = {
        ...data.profile,
        ...(isRecruiter
          ? { companyPreferredJob: hiringRole }
          : { skills: skillsData }),
      };
      formData.append("fullName", data.fullName);

      formData.append("profile", JSON.stringify(profile));

      if (data.profilePhoto?.[0]) {
        formData.append("profilePhoto", data.profilePhoto[0]);
      }

      if (data.resume?.[0]) {
        formData.append("resume", data.resume[0]);
      }

      const editPromise = axios.patch(
        "http://localhost:5000/api/profile/edit",
        formData,
        {
          withCredentials: true,
        },
      );

      const response = await toast.promise(editPromise, {
        loading: "Saving...",
        success: (res) => res.data.message,
        error: (err) => err?.response?.data?.message || "Internal server error",
      });

      setProfilePhoto(response.data.payload.profile.profilePhoto.secure_url);

      setProfileData(response.data.payload);

      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <form
        className="flex-1 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8"
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleEdit)}
      >
        <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-36 sm:h-44 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0">
              <div className="relative">
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  className="hidden"
                  {...register("profilePhoto")}
                />
                <label htmlFor="profilePhoto" className="cursor-pointer">
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-slate-900 object-cover"
                  />
                </label>

                <label
                  htmlFor="profilePhoto"
                  className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full shadow-lg cursor-pointer"
                >
                  <FaPlus />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-24 sm:pt-28 px-5 sm:px-8 lg:px-10 pb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center sm:text-left mb-8">
              Edit Profile
            </h1>

            {!isRecruiter ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-slate-300 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-red-500">{errors.fullName?.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">About</label>

                    <textarea
                      rows="5"
                      placeholder="Write something about yourself..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 resize-none"
                      {...register("profile.jobseekerAbout")}
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">Skills</label>

                    <input
                      type="text"
                      placeholder="React, Node.js, MongoDB"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                      {...register("skillData")}
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">Resume</label>

                    <label className="flex items-center justify-between gap-4 bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 cursor-pointer hover:border-indigo-500 transition">
                      <div className="flex items-center gap-3 text-slate-300">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        Upload Resume
                      </div>

                      <input
                        type="file"
                        className="hidden"
                        {...register("resume")}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-slate-300 mb-2">
                      Location
                    </label>

                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="Mumbai, India"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                        {...register("profile.jobseekerLocation")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Phone Number
                    </label>

                    <div className="relative">
                      <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="+91 9876543210"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                        {...register("profile.jobseekerPhoneNumber")}
                      />
                      {errors.profile?.jobseekerPhoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.profile.jobseekerPhoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-slate-300">Social Links</label>

                    <div className="relative">
                      <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="GitHub URL"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                        {...register("profile.jobseekerLinks.github")}
                      />
                      {errors.profile?.jobseekerLinks?.github && (
                        <p className="text-red-500">
                          {errors.profile.jobseekerLinks.github.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="LinkedIn URL"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                        {...register("profile.jobseekerLinks.linkedin")}
                      />
                      {errors.profile?.jobseekerLinks?.linkedin && (
                        <p className="text-red-500">
                          {errors.profile.jobseekerLinks.linkedin.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="Portfolio URL"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                        {...register("profile.jobseekerLinks.portfolio")}
                      />
                      {errors.profile?.jobseekerLinks?.portfolio && (
                        <p className="text-red-500">
                          {errors.profile.jobseekerLinks.portfolio.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-slate-300 mb-2">
                      Your Name
                    </label>

                    <input
                      type="text"
                      placeholder="TechNova Solutions"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-red-500">{errors.fullName?.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      About Company
                    </label>
                    <textarea
                      rows="6"
                      placeholder="Write about your company..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 resize-none"
                      {...register("profile.companyDescription")}
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Hiring Roles
                    </label>

                    <input
                      type="text"
                      placeholder="Frontend Developer, Backend Developer"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                      {...register("hiringRole")}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-slate-300 mb-2">
                      Location
                    </label>

                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="Pune, India"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                        {...register("profile.companyLocation")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Phone Number
                    </label>

                    <div className="relative">
                      <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="+91 9876543210"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                        {...register("profile.companyPhoneNumber")}
                      />
                      {errors.profile?.companyPhoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.profile.companyPhoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">Website</label>

                    <div className="relative">
                      <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="https://company.com"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                        {...register("profile.companyWebsite")}
                      />
                      {errors.profile?.companyWebsite && (
                        <p className="text-red-500">
                          {errors.profile?.companyWebsite?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                type="submit"
                className="w-full sm:w-fit bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl text-white font-semibold"
              >
                Save Changes
              </button>

              <button
                className="w-full sm:w-fit bg-slate-800 hover:bg-slate-700 transition px-8 py-3 rounded-xl text-slate-300 font-semibold border border-slate-700"
                onClick={() => {
                  navigate("/profile");
                  toast.error("No changes applied");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default EditProfile;
