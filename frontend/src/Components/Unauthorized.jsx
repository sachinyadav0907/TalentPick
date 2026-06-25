import React from "react";
import { Link } from "react-router-dom";
import { TfiFaceSad } from "react-icons/tfi";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">  

          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-500/10 p-5 border border-red-500/20">
              <TfiFaceSad className="text-5xl text-red-400" />
            </div>
          </div>

          <h1 className="bg-linear-to-r from-red-400 to-pink-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            Oops!!!!
          </h1>

          <p className="mt-4 text-lg font-medium text-slate-200 sm:text-xl">
            You are not logged in
          </p>

          <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">
            Login or create an account to continue exploring this page
            and unlock all features.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              className="rounded-xl bg-linear-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:opacity-90 hover:scale-105"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl border border-white/10 bg-slate-950 px-6 py-3 font-semibold text-slate-100 transition duration-300 hover:border-violet-500/30 hover:bg-slate-900 hover:scale-105"
            >
              Register
            </Link>
          </div>

          <div className="mt-8 space-y-2 text-sm text-slate-400">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-violet-400 hover:text-violet-300"
              >
                Login
              </Link>
            </p>

            <p>
              New here?{" "}
              <Link
                to="/register"
                className="font-semibold text-pink-400 hover:text-pink-300"
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

export default Unauthorized;