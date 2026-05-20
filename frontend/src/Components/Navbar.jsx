// Navbar.jsx

import { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../Contexts/AuthContext";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const tokenValue = useAuth();

  return (
    <>
      <nav className="w-full h-16 flex justify-between items-center sticky top-0 z-40 bg-emerald-50 shadow-md px-3">
        <AiOutlineMenuUnfold
          className="text-4xl opacity-70 cursor-pointer sm:hidden"
          onClick={() => setIsOpen(true)}
        />

        <ul className="hidden sm:flex gap-8 opacity-80 items-center">
          <li>
            <Link
              to="/home"
              className="text-lg font-medium hover:text-emerald-600 transition"
            >
              Home
            </Link>
          </li>

          <li>
            {tokenValue.role == "jobseeker" ? (
              <Link
                to="/applied-jobs"
                className="text-lg font-medium hover:text-emerald-600 transition"
              >
                Applied Jobs
              </Link>
            ) : (
              <Link
                to="/post-jobs"
                className="flex items-center gap-1 text-lg font-medium hover:text-emerald-600 transition"
              >
                <FaRegSquarePlus className="text-xl" />
                <span>Post Jobs</span>
              </Link>
            )}
          </li>

          <li>
            {tokenValue.role == "jobseeker" ? (
              <Link
                to="/saved-jobs"
                className="text-lg font-medium hover:text-emerald-600 transition"
              >
                Saved Jobs
              </Link>
            ) : (
              <Link
                to="/my-applicants"
                className="text-lg font-medium hover:text-emerald-600 transition"
              >
                My Applicants
              </Link>
            )}
          </li>

          <li>
            {tokenValue.role == "jobseeker" ? (
              <Link
                to="/help"
                className="text-lg font-medium hover:text-emerald-600 transition"
              >
                Help
              </Link>
            ) : (
              <Link
                to="/my-jobs"
                className="text-lg font-medium hover:text-emerald-600 transition"
              >
                My Jobs
              </Link>
            )}
          </li>

          <li>
            <button className="flex items-center gap-1 text-lg font-medium hover:text-red-500 transition">
              <IoMdExit className="text-red-500 text-2xl"/>
              Logout
            </button>
          </li>
        </ul>

        <img
          src="/tplogo.png"
          alt="logo"
          className="h-12 w-auto cursor-pointer"
          onClick={() => navigate("/home")}
        />
      </nav>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;
