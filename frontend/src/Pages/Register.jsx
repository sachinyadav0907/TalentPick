import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

function Register() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="mt-2 text-slate-300">
              Join us and start your journey today
            </p>
          </div>

          <form className="flex flex-col gap-5">

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
              >
                <option className="bg-[#0B1120]">Job Seeker</option>
                <option className="bg-[#0B1120]">Recruiter</option>
              </select>
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
              />
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
                placeholder="Create a password"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-violet-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-medium text-slate-200"
              >
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 py-3 font-medium text-white transition duration-300 hover:opacity-90"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center">
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