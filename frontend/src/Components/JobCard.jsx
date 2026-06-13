import React from "react";
import { Link } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { IoStarOutline } from "react-icons/io5";
import { CiLocationOn, CiBookmark } from "react-icons/ci";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsBriefcase } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";
import { BiRupee } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";
import { useAuth } from "../Contexts/AuthContext.jsx";
import axios from "axios";

function JobCard({ job, onDeleteClick }) {
  const { isRecruiter } = useAuth();

  const companyTags =
    "flex items-center gap-1 rounded-full border border-gray-600 bg-gray-800 px-3 py-1 text-xs text-green-400";

  const detailTags =
    "flex items-center gap-2 rounded-lg bg-gray-900/70 border border-gray-700 px-3 py-3 text-sm text-gray-200";

  return (
    <div className="flex w-full justify-center bg-[#081028] p-4">
      <article className="w-full max-w-5xl rounded-2xl bg-gray-800 p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row">
            <img
              src={job.recruiter?.profile?.profilePhoto?.secure_url}
              alt="Microsoft Logo"
              className="h-16 w-16 rounded-xl border border-gray-700 object-cover"
            />

            <div>
              <Link
                to="#"
                className="text-xl font-semibold text-white transition hover:text-blue-400 sm:text-2xl"
              >
                {job.recruiter?.profile?.companyName}
              </Link>

              <div className="mt-2 flex flex-wrap gap-2">
                <div className={companyTags}>
                  <SiTicktick />
                  <span>Verified Company</span>
                </div>

                <div className={companyTags}>
                  <IoStarOutline />
                  <span>Top Rated</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400">Posted 2 days ago</p>
        </div>

        <div className="my-5 border-t border-gray-700" />

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {job.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <LuCalendarClock />
            <span>Deadline:</span>
            <time dateTime="2026-06-08">{job.applicationDeadline}</time>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className={detailTags}>
            <BiRupee className="text-lg text-violet-400" />
            <span>
              ₹{job.salary.min}L - ₹{job.salary.max}L / year
            </span>
          </div>

          <div className={detailTags}>
            <HiOutlineBuildingOffice2 className="text-lg text-violet-400" />
            <span>{job.location}</span>
          </div>

          <div className={detailTags}>
            <CiLocationOn className="text-lg text-violet-400" />
            <span>{job.workplaceType}</span>
          </div>

          <div className={detailTags}>
            <BsBriefcase className="text-lg text-violet-400" />
            <span>{job.jobType}</span>
          </div>

          <div className={detailTags}>
            <MdWorkOutline className="text-lg text-violet-400" />
            <span>
              {job.experience.min} - {job.experience.max} Years Experience
            </span>
          </div>

          <div className={detailTags}>
            <PiGraduationCap className="text-lg text-violet-400" />
            <span>{job.education}</span>
          </div>

          <div className={detailTags}>
            <BsPeople className="text-lg text-violet-400" />
            <span>{job.openings} Openings</span>
          </div>
        </div>

        <p className="mt-3 text-right text-sm text-gray-400">120+ Applicants</p>

        <div className="my-5 border-t border-gray-700" />

        <div>
          <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {job.skills?.map((skill, index) => (
              <span
                key={index}
                className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-sm text-violet-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h2 className="mb-2 text-lg font-semibold text-white sm:text-xl">
            Job Description
          </h2>

          <p className="text-sm leading-7 text-gray-300 sm:text-base">
            {job.description}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {!isRecruiter ? (
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 py-3 text-lg font-medium text-slate-200 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-slate-800">
              <CiBookmark className="text-2xl transition-transform duration-300 group-hover:scale-110" />
              Save Job
            </button>
          ) : (
            <button
              onClick={() => onDeleteClick(job._id)}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-lg font-medium text-red-300 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-500/20"
            >
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
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 py-3 text-lg font-medium text-emerald-300 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-emerald-500/20">
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
