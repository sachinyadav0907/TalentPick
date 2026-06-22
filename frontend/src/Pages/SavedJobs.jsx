import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer.jsx";
import JobCard from "../Components/JobCard.jsx";
import axios from "axios";
import toast from "react-hot-toast";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  useEffect(() => {
    const loadSavedJobs = async () => {
      if (!hasMore) return;

      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/job/save/fetch?page=${page}&limit=10`,
          {
            withCredentials: true,
          },
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
      await axios.post(
        "http://localhost:5000/api/application/create",
        { jobId },
        {
          withCredentials: true,
        },
      );
      toast.success("Applied successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/job/save/delete/${jobId}`,
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {jobs.map((job) => {
        return <JobCard key={job._id} job={job} onApply={handleApply} isSaved={true} onUnsave={handleUnsave} />;
      })}
      <div ref={loaderRef} className="text-center py-5 text-white bg-[#081028]">
        {loading && "Loading..."}
      </div>
      <Footer />
    </div>
  );
}

export default SavedJobs;
