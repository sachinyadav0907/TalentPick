import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import { GiHandBag } from "react-icons/gi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { ImOffice } from "react-icons/im";
import { useAuth } from "../contexts/AuthContext.jsx";

function Hero() {
  const [search, setSearch] = useState("");
  const { user, isRecruiter } = useAuth();
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();

    navigate(`/explore-jobs?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-[#020617] via-[#050816] to-[#020617] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14 min-h-[85vh]">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-violet-400"></span>
              {!isRecruiter ? "Find. Apply. Grow." : "Post. Manage. Hire"}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              {!isRecruiter ? "Discover " : "Build Your "}
              <span className="bg-linear-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">
                {!isRecruiter ? "Opportunities" : "Team"}
              </span>
              <br />
              {!isRecruiter ? "That Matches " : "With The "}
              <span className="bg-linear-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                {!isRecruiter ? "Your Skills." : "Right People"}
              </span>
            </h1>

            <p className="mt-6 text-slate-300 text-lg leading-8 max-w-xl">
              {!isRecruiter
                ? "Connect with top recruiters, apply instantly, and take the next step in your career journey."
                : "Simplify your hiring process and discover talented professionals ready to join your company."}
            </p>

            {!isRecruiter && (
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Job title, keyword, or company"
                  className="w-full sm:flex-1 rounded-xl border border-white/10 bg-slate-900/80 px-5 py-4 text-slate-200 outline-none placeholder:text-slate-500 focus:border-violet-500"
                />

                <button onClick={handleHeroSearch} className="rounded-xl bg-linear-to-r from-violet-600 to-blue-600 px-8 py-4 font-medium transition hover:opacity-90">
                  Search
                </button>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-4">
              {!isRecruiter ? (
                <Link
                  to="/explore-jobs"
                  className="rounded-xl bg-linear-to-r from-violet-600 to-blue-600 px-6 py-3 font-medium transition hover:opacity-90"
                >
                  Explore Jobs
                </Link>
              ) : (
                <Link
                  to="/post-jobs"
                  className="flex justify-center items-center gap-1 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 px-6 py-3 font-medium transition hover:opacity-90"
                >
                  <FaRegSquarePlus className="text-lg" />
                  Post Jobs
                </Link>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <div className="flex gap-2 text-xl">
                  <ImOffice className="text-2xl" />
                  <h2 className="text-2xl font-bold">1000+</h2>
                </div>
                <p className="text-slate-400">Top Companies</p>
              </div>

              <div>
                <div className="flex gap-2 text-xl">
                  <GiHandBag />
                  <h2 className="text-2xl font-bold">5000+</h2>
                </div>
                <p className="text-slate-400">Verified Jobs</p>
              </div>

              <div>
                <div className="flex gap-2 text-xl items-center justify-center">
                  <AiOutlineThunderbolt />
                  <h2 className="text-2xl font-bold">Quick Apply</h2>
                </div>
                <p className="text-slate-400">Just a click</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/heroimg.png"
              alt="Hero"
              className="w-full max-w-3xl object-contain drop-shadow-[0_0_80px_rgba(124,58,237,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
