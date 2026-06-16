import { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isRecruiter } = useAuth();
  return (
    <>
      <nav className="w-full h-16 flex justify-between items-center sticky top-0 z-40 bg-slate-950 border-b border-white/10 px-3 text-slate-200">
        <AiOutlineMenuUnfold
          className="text-4xl opacity-70 cursor-pointer ownNav:hidden hover:text-violet-400 transition"
          onClick={() => {
            setIsOpen(true);
          }}
        />

        <ul className="hidden ownNav:flex gap-8 opacity-90 items-center">
          <li>
            <Link
              to="/home"
              className="text-lg font-medium hover:text-violet-400 transition"
            >
              Home
            </Link>
          </li>

          {!isRecruiter && (
            <li>
              {" "}
              <Link
                to="/explore-jobs"
                className="block px-3 py-2 rounded-lg text-lg font-medium hover:bg-slate-800 hover:text-violet-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Explore Jobs
              </Link>
            </li>
          )}

          <li>
            {!isRecruiter ? (
              <Link
                to="/applied-jobs"
                className="text-lg font-medium hover:text-violet-400 transition"
              >
                Applied Jobs
              </Link>
            ) : (
              <Link
                to="/post-jobs"
                className="flex items-center gap-1 text-lg font-medium hover:text-violet-400 transition"
              >
                <FaRegSquarePlus className="text-xl" />
                <span>Post Jobs</span>
              </Link>
            )}
          </li>

          <li>
            {!isRecruiter ? (
              <Link
                to="/saved-jobs"
                className="text-lg font-medium hover:text-violet-400 transition"
              >
                Saved Jobs
              </Link>
            ) : (
              <Link
                to="/my-applicants"
                className="text-lg font-medium hover:text-violet-400 transition"
              >
                My Applicants
              </Link>
            )}
          </li>

          <li>
            {!isRecruiter ? (
              <Link
                to="/profile"
                className="text-lg font-medium hover:text-violet-400 transition"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/my-jobs"
                className="text-lg font-medium hover:text-violet-400 transition"
              >
                My Jobs
              </Link>
            )}
          </li>

          {isRecruiter && (
            <li>
              <Link
                to="/profile"
                className="text-lg font-medium hover:text-violet-400 transition"
              >
                Profile
              </Link>
            </li>
          )}
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
          className="fixed inset-0 bg-black/30 z-30 ownNav:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;
