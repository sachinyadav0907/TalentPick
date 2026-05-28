import React from "react";
import { Link } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { IoStarOutline } from "react-icons/io5";
import { CiLocationOn, CiBookmark } from "react-icons/ci";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext.jsx";

function JobCard() {
  const companyTags =
    "flex items-center gap-1 rounded-full border border-gray-600 bg-gray-800 px-3 py-1 text-xs text-green-400";

  const extraTags =
    "flex items-center gap-1 rounded-md bg-gray-800 px-3 py-2 text-sm text-gray-200";

  const skills = [
    "React",
    "Tailwind",
    "Node",
    "MongoDB",
    "Express",
    "JavaScript",
  ];

  const {user, isRecruiter} = useAuth();

  return (
    <div className="flex w-full items-center justify-center bg-[#081028] p-4">
      <article className="w-full max-w-4xl rounded-2xl bg-gray-800 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <img
              src="/MicrosoftLogo.jpg"
              alt="Microsoft Logo"
              className="h-16 w-16 rounded-lg border border-gray-700 object-cover"
            />

            <div className="flex flex-col gap-2">
              <Link
                to="#"
                className="text-2xl font-semibold text-white hover:text-blue-400 transition duration-200"
              >
                Microsoft
              </Link>

              <div className="flex flex-wrap gap-2">
                <div className={companyTags}>
                  <SiTicktick />
                  <p>Verified Company</p>
                </div>

                <div className={companyTags}>
                  <IoStarOutline />
                  <p>Top Rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-1.5">
          <p className="text-gray-300 text-sm">Posted 2 days ago</p>
        </div>

        <div className="my-4 border-t border-gray-700"></div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-white">Frontend Developer</h1>

          <div className="flex flex-wrap gap-3">
            <div className={extraTags}>
              <CiLocationOn />
              <p>Remote Worldwide</p>
            </div>

            <div className={extraTags}>
              <HiOutlineBuildingOffice2 />
              <p>Mumbai, Parel</p>
            </div>
          </div>

          <p className="text-right text-sm text-gray-300">120+ Applicants</p>
        </div>

        <div className="my-4 border-t border-gray-700"></div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">Skills</h2>

          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="whitespace-nowrap rounded-full border border-gray-600 bg-gray-800 px-4 py-1"
              >
                <p className="text-sm text-white">{skill}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-gray-100">
          We are looking for a passionate frontend developer with strong React
          and Tailwind CSS skills to build modern, responsive, and scalable web
          applications.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {!isRecruiter ? (
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 py-3 text-lg font-medium text-slate-200 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-slate-800">
              <CiBookmark className="text-2xl transition-transform duration-300 group-hover:scale-110" />
              Save Job
            </button>
          ) : (
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-lg font-medium text-red-300 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-500/20">
              <RiDeleteBin6Line className="text-2xl transition-transform duration-300 group-hover:scale-110" />
              Remove Job
            </button>
          )}

          {!isRecruiter ? (
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3 text-lg font-medium text-white shadow-lg shadow-violet-900/30 transition-all duration-300 hover:-translate-y-1 hover:from-violet-500 hover:to-indigo-500">
              <AiOutlineThunderbolt className="text-2xl transition-transform duration-300 group-hover:rotate-12" />
              Apply Now
            </button>
          ) : (
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 py-3 text-lg font-medium text-emerald-300 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-emerald-500/20">
              <FaRegEdit className="text-2xl transition-transform duration-300 group-hover:scale-110" />
              Edit Details
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

export default JobCard;
