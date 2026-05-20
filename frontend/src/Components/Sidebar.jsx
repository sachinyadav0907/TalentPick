// Sidebar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../Contexts/AuthContext";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";

function Sidebar({ isOpen, setIsOpen }) {
  const idName = "Sachin Yadav";
  const tokenValue = useAuth();

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-emerald-50 shadow-lg z-50 transform transition-transform duration-300 sm:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <Link
          to="/profile"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <CgProfile className="text-4xl opacity-65" />

          <h1 className="text-xl font-semibold text-emerald-700">
            {idName}
          </h1>
        </Link>

        <IoClose
          className="text-3xl cursor-pointer opacity-70 hover:opacity-100"
          onClick={() => setIsOpen(false)}
        />
      </div>

      <ul className="flex flex-col gap-2 p-4">
        <li>
          <Link
            to="/home"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </li>

        <li>
          {tokenValue.role == "jobseeker"? <Link
            to="/applied-jobs"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Applied Jobs
          </Link> : <Link
            to="/post-jobs"
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            <FaRegSquarePlus className="text-xl"/> Post Jobs           
          </Link>}
        </li>

        <li>
          {tokenValue.role == "jobseeker" ? <Link
            to="/saved-jobs"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Saved Jobs
          </Link> : <Link
            to="/my-applicants"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            My applicants
          </Link>}
        </li>

        <li>
          {tokenValue.role=="jobseeker" ? <Link
            to="/help"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Help
          </Link>: <Link
            to="/my-jobs"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            My Jobs
          </Link>}
        </li>

        <li>
          <button className=" flex items-center gap-1 w-full text-left px-3 py-2 rounded-lg text-lg font-medium hover:bg-red-100 hover:text-red-600 transition">
            <IoMdExit className="text-2xl text-red-500"/>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;