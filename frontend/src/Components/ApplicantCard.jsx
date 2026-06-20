import React from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";


const ApplicantCard = ({
  user,jobId
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-around gap-3 rounded-2xl border border-gray-700 bg-gray-800 p-2 shadow-md transition-all duration-300 hover:border-gray-600 hover:shadow-lg">
        
        {/* Profile Section */}
        <div className="flex items-center gap-4 ">
          <img
            src={user.profile?.profilePhoto?.secure_url}
            alt="ProfilePhoto"
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-600"
          />

          <Link
            to={`/profile/${user._id}`}
            className="text-2xl font-semibold text-white transition hover:text-cyan-400"
          >
            {user.fullName}
          </Link>
        </div>

        {/* Buttons */}
          {user.status === "pending" && (<div className="flex flex-wrap justify-center gap-3"><button
            className="group flex items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-3 text-lg font-medium text-green-300 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:bg-green-500/20"
          >
            <FaCheck size={25} />
            Accept
          </button>

          <button
            className="group flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-lg font-medium text-red-300 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-500/20"
          >
            <FaTimes size={28} />
            Reject
          </button></div>)}
        
      </div>
    </div>
  );
};

export default ApplicantCard;