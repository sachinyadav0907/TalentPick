import React from "react";
import { Link } from "react-router-dom";
import { TfiFaceSad } from "react-icons/tfi";
import Navbar from "./Navbar";

function Unauthorized() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 sm:p-12 text-center border border-white/40">
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-5 rounded-full shadow-md">
              <TfiFaceSad className="text-6xl text-red-500" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 tracking-tight">
            Oops!!!!
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg sm:text-xl text-gray-700 font-medium">
            You are not logged in
          </p>

          {/* Description */}
          <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed">
            Login or create an account to continue exploring this page
            and unlock all features.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-110 hover:shadow-xl transition duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100 hover:scale-110 transition duration-300"
            >
              Register
            </Link>
          </div>

          {/* Extra Text */}
          <div className="mt-8 text-sm text-gray-500 space-y-2">
            <p>
              Already have an account?{"       "}
              <Link
                to="/login"
                className="text-red-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

            <p>
              New here?{" "}
              <Link
                to="/register"
                className="text-pink-500 font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;