import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext.jsx";
import toast from "react-hot-toast";

const registerSchema = z
  .object({
    role: z.enum(["jobseeker", "recruiter"], {
      required_error: "Role is required",
    }),

    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(32, "Name must not exceed 32 characters"),

    companyName: z.string().optional(),

    email: z.string().email("Invalid Email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must not exceed 32 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must contain at least one special character",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.role === "recruiter") {
      if (!data.companyName || data.companyName.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyName"],
          message: "Company Name is required for recruiters",
        });
      }
    }
  });

function Register() {
  const Navigate = useNavigate();
  const { setIsLogin, setUser, setProfileId } = useAuth();
  const [eyeOpen, setEyeOpen] = useState(false);
  const eyeToggle = () => {
    setEyeOpen(!eyeOpen);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const selectRole = watch("role");

  const handleRegister = async (data) => {
    try {
      const registerPromise = api.post(
        "/auth/register",
        data
      );
      const response = await toast.promise(registerPromise, {
        loading: "Registering User",
        success: (res) => res.data.message,
        error: (err) => err.res?.data?.message,
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data.payload));
      setIsLogin(true);
      setProfileId(response.data.payload.id);
      setUser(response.data.payload);
      Navigate("/");
    } catch (error) {
      console.log(error.response?.data?.message || "something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>

            <p className="mt-2 text-slate-300">
              Join us and start your journey today
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div>
              <label
                htmlFor="role"
                className="mb-2 block font-medium text-slate-200"
              >
                Register as
              </label>

              <select
                id="role"
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none focus:border-violet-500"
                {...register("role")}
              >
                <option value="jobseeker" className="bg-[#0B1120]">
                  Job Seeker
                </option>
                <option value="recruiter" className="bg-[#0B1120]">
                  Recruiter
                </option>
              </select>
              {errors.role && (
                <p className="text-red-400 mx-2 my-1">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="fullname"
                className="mb-2 block font-medium text-slate-200"
              >
                Full Name
              </label>

              <input
                type="text"
                id="fullname"
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-violet-500"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-400 mx-2 my-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {selectRole === "recruiter" && (
              <div>
                <label
                  htmlFor="companyName"
                  className="mb-2 block font-medium text-slate-200"
                >
                  Company Name
                </label>

                <input
                  type="text"
                  id="companyName"
                  placeholder="Enter your Company name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-violet-500"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-red-400 mx-2 my-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-medium text-slate-200"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-violet-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-400 mx-2 my-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-medium text-slate-200"
              >
                Password
              </label>

              <div className="flex items-center w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 focus-within:border-violet-500">
                <input
                  type={eyeOpen ? "text" : "password"}
                  id="password"
                  placeholder="Create a password"
                  required
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-400"
                  {...register("password")}
                />
                {eyeOpen ? (
                  <FiEye
                    onClick={eyeToggle}
                    className="cursor-pointer text-xl text-slate-300"
                  />
                ) : (
                  <FiEyeOff
                    onClick={eyeToggle}
                    className="cursor-pointer text-xl text-slate-300"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-400 mx-2 my-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-medium text-slate-200"
              >
                Confirm Password
              </label>

              <div className="flex items-center w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 focus-within:border-violet-500">
                <input
                  type={eyeOpen ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-400"
                  {...register("confirmPassword")}
                />
                {eyeOpen ? (
                  <FiEye
                    onClick={eyeToggle}
                    className="cursor-pointer text-xl text-slate-300"
                  />
                ) : (
                  <FiEyeOff
                    onClick={eyeToggle}
                    className="cursor-pointer text-xl text-slate-300"
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 mx-2 my-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 py-3 font-medium text-white transition duration-300 hover:opacity-90 active:scale-95 focus:scale-95"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-slate-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-violet-400 hover:text-violet-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
