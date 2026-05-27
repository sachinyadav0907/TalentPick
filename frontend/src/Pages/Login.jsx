import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import axios from "axios";

const loginSchema = z.object({
  role: z.enum(["jobseeker", "recruiter"], {
    required_error: "role is required",
  }),
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
});

function Login() {
  const [eyeOpen, setEyeOpen] = useState(true);
  const eyeToggle = () => {
    setEyeOpen(!eyeOpen);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const formSubmit = async (data) => {
    try {
      const useerInfo = await axios.post("http://localhost:5000/auth/login", data,{
        withCredentials: true,
        headers:{
          "Content-Type": "application/json"
        }
      });
      console.log(useerInfo);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">Welcome Back</h1>

            <p className="mt-2 text-slate-300">
              Login to continue your journey
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(formSubmit)}
          >
            <div>
              <label
                htmlFor="role"
                className="mb-2 block font-medium text-slate-200"
              >
                I'm a
              </label>

              <select
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none focus:border-violet-500"
                {...register("role", { required: "role is required " })}
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
                htmlFor="email"
                className="mb-2 block font-medium text-slate-200"
              >
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-violet-500"
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
                  id="password"
                  type={eyeOpen ? "text" : "password"}
                  placeholder="Enter your password"
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
                <p className="mx-2 my-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-violet-400 hover:text-violet-300"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-linear-to-r from-violet-600 to-blue-600 py-3 font-medium text-white transition duration-300 hover:opacity-90"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-300">
              New here?{" "}
              <Link
                to="/register"
                className="font-medium text-violet-400 hover:text-violet-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
