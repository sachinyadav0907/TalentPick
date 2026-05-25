import React from "react";
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

function EditProfile() {
  const isRecruiter = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-36 sm:h-44 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0">
              <div className="relative">
                <img
                  src="/ExamplePP.webp"
                  alt="Profile"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-slate-900 object-cover"
                />

                <button className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full shadow-lg">
                  <FaPlus />
                </button>
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
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Job Role
                    </label>

                    <input
                      type="text"
                      placeholder="MERN Stack Developer"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      About
                    </label>

                    <textarea
                      rows="5"
                      placeholder="Write something about yourself..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Skills
                    </label>

                    <input
                      type="text"
                      placeholder="React, Node.js, MongoDB"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Resume
                    </label>

                    <label className="flex items-center justify-between gap-4 bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 cursor-pointer hover:border-indigo-500 transition">
                      <div className="flex items-center gap-3 text-slate-300">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        Upload Resume
                      </div>

                      <input type="file" className="hidden" />
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
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-slate-300">
                      Social Links
                    </label>

                    <div className="relative">
                      <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="GitHub URL"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="relative">
                      <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="LinkedIn URL"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="relative">
                      <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="Portfolio URL"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-slate-300 mb-2">
                      Company Name
                    </label>

                    <input
                      type="text"
                      placeholder="TechNova Solutions"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      About Company
                    </label>

                    <textarea
                      rows="6"
                      placeholder="Write about your company..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 resize-none"
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
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Website
                    </label>

                    <div className="relative">
                      <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        placeholder="https://company.com"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">
                      Company Logo / Profile Picture
                    </label>

                    <label className="flex items-center justify-between gap-4 bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 cursor-pointer hover:border-indigo-500 transition">
                      <span className="text-slate-300">
                        Upload Company Logo
                      </span>

                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button className="w-full sm:w-fit bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl text-white font-semibold">
                Save Changes
              </button>

              <button className="w-full sm:w-fit bg-slate-800 hover:bg-slate-700 transition px-8 py-3 rounded-xl text-slate-300 font-semibold border border-slate-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EditProfile;