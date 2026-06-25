import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaTimes,
  FaUser,
  FaExternalLinkAlt,
} from "react-icons/fa";

const ApplicantCard = ({ user, onAccept, onReject }) => {
  const [status, setStatus] = useState(user.status);

  const currentStatus = status || user.status;

  const handleAccept = async () => {
    const success = await onAccept("accepted", user._id);

    if (success) {
      setStatus("accepted");
    }
  };

  const handleReject = async () => {
    const success = await onReject("rejected", user._id);

    if (success) {
      setStatus("rejected");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="group flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-slate-700 bg-slate-800/80 backdrop-blur-sm p-3 shadow-lg transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-500/10 mx-2">
        
        <div className="flex items-center gap-4">
          <img
            src={user.profile?.profilePhoto?.secure_url}
            alt={user.fullName}
            className="h-16 w-16 rounded-full object-cover border-2 border-cyan-500 shadow-md"
          />

          <div>
            <Link
              to={`/profile/${user._id}`}
              className="text-lg md:text-xl font-semibold text-white hover:text-cyan-400 transition uppercase"
            >
              {user.fullName}
            </Link>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <FaUser />
              <span>Job Applicant</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          
          {currentStatus === "pending" && (
            <>
              <button
                onClick={handleAccept}
                className="flex items-center gap-2 rounded-xl bg-green-500/15 border text-sm border-green-500/30 px-5 py-2.5 text-green-400 font-medium transition hover:bg-green-500/25 hover:scale-105"
              >
                <FaCheck />
                Accept
              </button>

              <button
                onClick={handleReject}
                className="flex items-center gap-2 text-sm rounded-xl bg-red-500/15 border border-red-500/30 px-5 py-2.5 text-red-400 font-medium transition hover:bg-red-500/25 hover:scale-105"
              >
                <FaTimes />
                Reject
              </button>
            </>
          )}

          {currentStatus === "accepted" && (
            <span className="rounded-full border border-green-500/30 bg-green-500/15 px-5 py-2 text-xs font-semibold text-green-400">
              ✓ Accepted
            </span>
          )}

          {currentStatus === "rejected" && (
            <span className="rounded-full border border-red-500/30 bg-red-500/15 px-5 py-2 text-xs font-semibold text-red-400">
              ✕ Rejected
            </span>
          )}

          <Link
            to={`/profile/${user._id}`}
            className="flex items-center text-sm gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-white font-medium transition hover:bg-cyan-500"
          >
            View Profile
            <FaExternalLinkAlt size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;