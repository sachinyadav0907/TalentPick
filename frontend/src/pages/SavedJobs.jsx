import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import JobCard from "../components/JobCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axiox.js";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loaderRef = useRef(null);

  useEffect(() => {
    const loadSavedJobs = async () => {
      if (!hasMore) return;

      setLoading(true);

      try {
        const response = await api.get(
          `/saved-jobs?page=${page}&limit=10`,
        );

        const jobsData = response.data.payload;

        const jobsArray = jobsData.map((job) => job.jobId).filter(Boolean);

        setHasMore(response.data.hasMore);
        setJobs((prev) => [...prev, ...jobsArray]);
      } catch (error) {
        console.error("Failed to fetch saved jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSavedJobs();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          hasMore &&
          jobs.length > 0
        ) {
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
        {
          withCredentials: true,
        },
      );
      toast.success("Applied successfully");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"

      toast.error(message);
      if(message === "You have already applied for this job"){
        return true;
      }
      return false;
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      await api.delete(
        `/saved-jobs/${jobId}`,
        {
          withCredentials: true,
        },
      );
      toast.success("Unsaved successfully");
      setJobs(jobs.filter(prevJob=>prevJob._id !== jobId));
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

    <main className="flex-1">
      {!loading && jobs.length === 0 ? (
        <EmptyState
          title="No Saved Jobs"
          description="You haven't saved any jobs yet. Browse available jobs and save the ones you're interested in."
          buttonText="Explore Jobs"
          onButtonClick={() => navigate("/explore-jobs")}
        />
      ) : (
        <div className="flex flex-col gap-5 py-8">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApply={handleApply}
              isSaved={true}
              onUnsave={handleUnsave}
            />
          ))}

          <div
            ref={loaderRef}
            className="py-5 text-center text-white"
          >
            {loading && "Loading..."}
            {!hasMore && jobs.length > 0 && "No more saved jobs"}
          </div>
        </div>
      )}
    </main>
  </div>

  <Footer />
</>
  );
}

export default SavedJobs;
