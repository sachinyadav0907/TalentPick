import React from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function JobsApplicants({job}) {
  return (
    <div className="flex justify-center items-center p-8">
      <article className="w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-white text-3xl sm:text-4xl font-bold text-center sm:text-left">
            {job.title}
          </h2>

          <Link
            to={`/my-applicants/${job._id}`}
            className="
            flex gap-2 justify-center 
          px-6 py-3
          rounded-xl
          font-semibold
          text-white
          bg-linear-to-r from-red-500 to-pink-600
          hover:from-red-600 hover:to-pink-700
          shadow-md hover:shadow-xl
          transition-all duration-300
          transform hover:scale-105
          active:scale-95
        "
          >
            <FaUsers className="text-xl"/>
            Show Applicants
          </Link>
        </div>
      </article>
    </div>
  );
}

export default JobsApplicants;
