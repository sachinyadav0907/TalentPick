import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useJobs } from "../contexts/JobsContext";
import EmptyState from "../components/EmptyState";
import JobCard from "../components/JobCard";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import FilterModal from "../components/FilterModal";

import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axiox";

function ExploreJobs() {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [appliedSearch, setAppliedSearch] = useState(initialSearch);
  const [filter, setFilter] = useState({});
  const { fetchJobs } = useJobs();
  const navigate = useNavigate();

  const loaderRef = useRef(null);

  useEffect(() => {
    const query = searchParams.get("search") || "";

    setSearch(query);
    setAppliedSearch(query);
    setJobs([]);
    setPage(1);
    setHasMore(true);
  }, [searchParams]);

  const handleFilters = (filters) => {
    setPage(1);
    setJobs([]);
    setFilter(filters);
    setHasMore(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setJobs([]);
    setHasMore(true);
    setPage(1);

    setAppliedSearch(search);
  };

  useEffect(() => {
    const loadJobs = async () => {
      if (!hasMore) return;

      setLoading(true);

      try {
        const response = await fetchJobs({
          page,
          search: appliedSearch,
          ...filter,
        });

        const jobsData = response.data.payload;
        console.log(response);

        setHasMore(response.data.pagination.hasMore);

        setJobs((prev) => (page === 1 ? jobsData : [...prev, ...jobsData]));
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [page, appliedSearch, filter]);

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

  const handleApply = async (jobId) => {
    try {
      await api.post(
        "/applications",
        { jobId },
      );
      toast.success("Applied successfully");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
      if (message === "You have already applied for this job") {
        return true;
      }
      return false;
    }
  };

  const handleSave = async (jobId) => {
    try {
      await api.post(
        "/saved-jobs",
        { jobId },
      );
      toast.success("Saved successfully");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
      if (message === "Job already saved") {
        return true;
      }
      return false;
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      await api.delete(`/saved-jobs/${jobId}`);
      toast.success("Unsaved successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#081028]">
        <Navbar />

        {/* Search & Filter */}
        <div className="flex items-center justify-center gap-3 px-4 py-6">
          <form
            className="flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm w-full max-w-4xl justify-between"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Job title, keyword, or company"
              className="grow bg-gray-200 px-4 py-2 text-md outline-none md:text-lg"
            />

            <button
              type="submit"
              className="bg-blue-600 p-3 text-white transition hover:bg-blue-700"
            >
              <FiSearch size={20} />
            </button>
          </form>

          <button
            className="flex items-center justify-center rounded-xl border border-slate-300 bg-gray-100 p-2 text-slate-700 transition hover:bg-slate-100"
            onClick={() => setShowFilters(true)}
          >
            <FiFilter size={22} className="block md:hidden" />
            <span className="hidden md:block md:text-lg">Filter</span>
          </button>

          <FilterModal
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            onApply={handleFilters}
          />
        </div>

        <main className="flex-1">
          {!loading && jobs.length === 0 ? (
            <EmptyState
              title="No Jobs Found"
              description="We couldn't find any jobs matching your search or filters. Try changing your search criteria or return to the home page."
              buttonText="Go Home"
              onButtonClick={() => navigate("/")}
            />
          ) : (
            <div className="flex flex-col gap-5 pb-8">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onApply={handleApply}
                  onSave={handleSave}
                  onUnsave={handleUnsave}
                />
              ))}

              <div ref={loaderRef} className="py-5 text-center text-white">
                {loading && "Loading..."}
                {!hasMore && jobs.length > 0 && "No more jobs"}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default ExploreJobs;
