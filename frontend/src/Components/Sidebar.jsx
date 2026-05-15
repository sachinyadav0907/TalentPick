// Sidebar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

function Sidebar({ isOpen, setIsOpen }) {
  const [idName] = useState("Sachin Yadav");

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
          <Link
            to="/applied-jobs"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Applied Jobs
          </Link>
        </li>

        <li>
          <Link
            to="/saved-jobs"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Saved Jobs
          </Link>
        </li>

        <li>
          <Link
            to="/help"
            className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-emerald-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Help
          </Link>
        </li>

        <li>
          <button className="w-full text-left px-3 py-2 rounded-lg text-lg font-medium hover:bg-red-100 hover:text-red-600 transition">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;