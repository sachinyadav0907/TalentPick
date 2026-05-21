import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

function Login() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-slate-300">
              Login to continue your journey
            </p>
          </div>

          <form className="flex flex-col gap-5">

            <div>
              <label
                htmlFor="role"
                className="mb-2 block font-medium text-slate-200"
              >
                I'm a
              </label>

              <select
                id="role"
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none focus:border-violet-500"
              >
                <option className="bg-[#0B1120]">Job Seeker</option>
                <option className="bg-[#0B1120]">Recruiter</option>
              </select>
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
                id="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-violet-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-medium text-slate-200"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-violet-500"
              />
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