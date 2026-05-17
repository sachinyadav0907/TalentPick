import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";

function Register() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join us and start your journey today
            </p>
          </div>

          <form className="flex flex-col gap-5">

            <div>
              <label
                htmlFor="role"
                className="block mb-2 font-medium text-gray-700"
              >
                Register as
              </label>

              <select
                id="role"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option>Job Seeker</option>
                <option>Recruiter</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="fullname"
                className="block mb-2 font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                type="text"
                id="fullname"
                placeholder="Enter your full name"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-gray-700"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="Create a password"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition duration-300"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;