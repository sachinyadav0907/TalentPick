import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Footer from '../Components/Footer.jsx';

function Login() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Login to continue your journey
            </p>
          </div>

          <form className="flex flex-col gap-5">

            <div>
              <label
                htmlFor="role"
                className="block mb-2 font-medium text-gray-700"
              >
                I'm a
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
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              New here?{" "}
              <Link
                to="/register"
                className="text-blue-500 font-medium hover:underline"
              >
               Create an account
              </Link>
            </p>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;