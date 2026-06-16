import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useJobs } from "../Contexts/JobsContext";
import JobCard from "../Components/JobCard";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import FilterModal from "../Components/FilterModal";

function ExploreJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { fetchJobs } = useJobs();

  const loaderRef = useRef(null);

  const handleFilters = (filters) => {
    console.log(filters);
  };

  useEffect(() => {
    const loadJobs = async () => {
      if (!hasMore) return;

      setLoading(true);

      try {
        const response = await fetchJobs(page, 10);

        const jobsData = response.data.payload;
        console.log(response);

        setHasMore(response.data.hasMore);

        setJobs((prev) => [...prev, ...jobsData]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "200px",
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center gap-3 px-4 py-6 bg-[#081028]">
        <div className="flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm w-full max-w-4xl justify-between">
          <input
            type="text"
            placeholder="Job title, keyword, or company"
            className="px-4 py-2 text-lg md:text-xl outline-none"
          />

          <button className="bg-blue-600 p-3 text-white hover:bg-blue-700 transition">
            <FiSearch size={25} />
          </button>
        </div>

        <button className="flex items-center justify-center rounded-xl border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-100 transition" onClick={()=>setShowFilters(true)}>
          <FiFilter size={30} className="block md:hidden" />

          <span className="hidden md:block md:text-xl">Filter</span>
        </button>
        <FilterModal
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onApply={handleFilters}
        />
      </div>
      {jobs.map((job, index) => {
        return <JobCard key={job._id} job={job} />;
      })}
      <div ref={loaderRef} className="text-center py-5 text-white bg-[#081028]">
        {loading && "Loading..."}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreJobs;
