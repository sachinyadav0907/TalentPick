import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaFilePdf,
  FaEdit,
  FaGlobe,
} from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { IoMdExit } from "react-icons/io";

function Profile() {
  const isRecruiter = useAuth();

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <div className="flex justify-center items-center p-4 sm:p-6 flex-1">
        <div className="w-full max-w-5xl bg-slate-900 rounded-3xl shadow-lg border border-slate-800 overflow-hidden">
          <div className="h-40 sm:h-52 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
            <Link to="/edit-profile" className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-800 transition px-4 py-2 rounded-xl text-white flex items-center gap-2">
              <FaEdit />
              Edit
            </Link>

            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0">
              <img
                src="/ExamplePP.webp"
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-slate-900 object-cover"
              />
            </div>
          </div>

          <div className="pt-20 sm:pt-24 px-5 sm:px-10 pb-8">
            {" "}
            {!isRecruiter ? (
              <div className="flex flex-col gap-8">
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-5xl font-bold text-white">
                    Sachin Yadav
                  </h1>

                  <p className="text-indigo-400 mt-2 text-lg sm:text-xl">
                    MERN Stack Developer
                  </p>

                  <div className="flex justify-center sm:justify-start items-center gap-2 text-slate-400 mt-3">
                    <FaMapMarkerAlt />
                    <span>Mumbai, India</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-3">
                    About
                  </h2>

                  <p className="text-slate-300 leading-7">
                    Passionate MERN stack developer focused on building modern
                    full-stack applications. Interested in DevOps, cloud, and
                    scalable backend systems.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Skills
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "React",
                      "Node.js",
                      "MongoDB",
                      "Express",
                      "Docker",
                      "Tailwind",
                    ].map((skill, index) => (
                      <span
                        key={index}
                        className="bg-slate-800 text-slate-200 px-4 py-2 rounded-xl text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Resume
                  </h2>

                  <div className="bg-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FaFilePdf className="text-red-500 text-3xl" />

                      <div>
                        <p className="text-white font-medium">
                          sachin_resume.pdf
                        </p>
                        <p className="text-slate-400 text-sm">
                          Uploaded recently
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-xl text-white">
                        View
                      </button>

                      <button className="bg-slate-700 hover:bg-slate-600 transition px-4 py-2 rounded-xl text-white">
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Links
                  </h2>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-xl text-slate-200"
                    >
                      <FaGithub />
                      GitHub
                    </a>

                    <a
                      href="#"
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-xl text-slate-200"
                    >
                      <FaLinkedin />
                      LinkedIn
                    </a>

                    <a
                      href="#"
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-xl text-slate-200"
                    >
                      <FaGlobe />
                      Portfolio
                    </a>
                  </div>
                </div>
                <button className="w-full sm:w-fit bg-red-600 hover:bg-red-500 transition px-5 py-3 rounded-xl text-white flex items-center justify-center gap-2">
  <IoMdExit className="text-xl" />
  Logout
</button>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-5xl font-bold text-white">
                    TechNova Solutions
                  </h1>

                  <p className="text-indigo-400 mt-2 text-lg sm:text-xl">
                    Hiring Developers Worldwide
                  </p>

                  <div className="flex justify-center sm:justify-start items-center gap-2 text-slate-400 mt-3">
                    <FaMapMarkerAlt />
                    <span>Pune, India</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-3">
                    Company Description
                  </h2>

                  <p className="text-slate-300 leading-7">
                    TechNova Solutions builds modern web applications and cloud
                    systems for startups and enterprises globally.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Currently Hiring
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "Frontend Developer",
                      "Backend Developer",
                      "DevOps Engineer",
                    ].map((role, index) => (
                      <span
                        key={index}
                        className="bg-slate-800 text-slate-200 px-4 py-2 rounded-xl text-sm"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Website
                  </h2>

                  <a
                    href="#"
                    className="flex items-center gap-2 w-fit bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-xl text-slate-200"
                  >
                    <FaGlobe />
                    www.technova.com
                  </a>
                </div>
                <button className="w-full sm:w-fit bg-red-600 hover:bg-red-500 transition px-5 py-3 rounded-xl text-white flex items-center justify-center gap-2">
  <IoMdExit className="text-xl" />
  Logout
</button>
              </div>
            )}
          </div>
        </div>
        
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
