// Navbar.jsx

import { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
            <Link
              to="/applied-jobs"
              className="text-lg font-medium hover:text-emerald-600 transition"
            >
              Applied Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/saved-jobs"
              className="text-lg font-medium hover:text-emerald-600 transition"
            >
              Saved Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/help"
              className="text-lg font-medium hover:text-emerald-600 transition"
            >
              Help
            </Link>
          </li>

          <li>
            <button className="text-lg font-medium hover:text-red-500 transition">
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