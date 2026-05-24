import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaUsers,
  FaClock,
} from "react-icons/fa";

function PostJob() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 sm:px-10 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
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
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2">
                  Skills Required
                </label>

                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  Experience Required
                </label>

                <div className="relative">
                  <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    placeholder="2+ Years"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                  />
                </div>
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
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  Salary Range
                </label>

                <div className="relative">
                  <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    placeholder="5 LPA - 8 LPA"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                  />
                </div>
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
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Job Type</label>

                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500">
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2">
                  Job Description
                </label>

                <textarea
                  rows="6"
                  placeholder="Write short job description..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="w-full sm:w-fit bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl text-white font-semibold">
                Publish Job
              </button>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PostJob;
