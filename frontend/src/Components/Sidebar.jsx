import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { FaRegSquarePlus } from "react-icons/fa6";

function Sidebar({ isOpen, setIsOpen }) {
  const { user, isRecruiter, profilePhoto } = useAuth();

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-slate-950 border-r border-white/10 text-slate-200 shadow-lg z-1000 transform transition-transform duration-300 ownNav:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <Link
          to="/profile"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={profilePhoto}
            alt="ProfilePicture"
            className="w-10 rounded-full"
          />

          <h1 className="text-xl font-semibold text-violet-400">
            {user?.fullName || "Hey, there"}
          </h1>
        </Link>

        <IoClose
          className="text-3xl cursor-pointer text-slate-400 hover:text-white transition"
          onClick={() => setIsOpen(false)}
        />
      </div>

      <ul className="flex flex-col gap-2 p-4">
        <li>
          <Link
            to="/home"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-slate-800 hover:text-violet-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </li>
        {!isRecruiter && 
          <Link
            to="/explore-jobs"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-slate-800 hover:text-violet-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Explore Jobs
          </Link>
        }

        <li>
          {!isRecruiter ? (
            <Link
              to="/applied-jobs"
              className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-slate-800 hover:text-violet-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Applied Jobs
            </Link>
          ) : (
            <Link
              to="/post-jobs"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-lg font-medium hover:bg-slate-800 hover:text-violet-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaRegSquarePlus className="text-xl" />
              Post Jobs
            </Link>
          )}
        </li>

        <li>
          {!isRecruiter ? (
            <Link
              to="/saved-jobs"
              className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-slate-800 hover:text-violet-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Saved Jobs
            </Link>
          ) : (
            <Link
              to="/my-applicants"
              className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-slate-800 hover:text-violet-400 transition"
              onClick={() => setIsOpen(false)}
            >
              My Applicants
            </Link>
          )}
        </li>

        <li>
          {!isRecruiter ? (
            <Link
              to="/help"
              className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-slate-800 hover:text-violet-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Help
            </Link>
          ) : (
            <Link
              to="/my-jobs"
              className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-slate-800 hover:text-violet-400 transition"
              onClick={() => setIsOpen(false)}
            >
              My Jobs
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
