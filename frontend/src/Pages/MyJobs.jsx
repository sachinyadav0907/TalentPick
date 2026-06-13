import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import JobCard from "../Components/JobCard";
import ConfirmationPopup from "../Components/ConfirmationPopup";
import { useJobs } from "../Contexts/JobsContext";
import toast from "react-hot-toast";

function ExploreJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const { fetchJobs } = useJobs();

  const loaderRef = useRef(null);

  useEffect(() => {
    const loadJobs = async () => {
      if (!hasMore) return;

      try {
        setLoading(true);

        const response = await fetchJobs(page, 10);

        setJobs((prev) => [
          ...prev,
          ...response.data.payload,
        ]);

        setHasMore(response.data.hasMore);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  const handleDeleteClick = (jobId) => {
    setSelectedJobId(jobId);
    setConfirmIsOpen(true);
  };

  const deleteJob = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/job/delete/${selectedJobId}`,
        {
          withCredentials: true,
        }
      );

      toast.success("Job deleted successfully");

      setJobs((prev) =>
        prev.filter((job) => job._id !== selectedJobId)
      );

      setConfirmIsOpen(false);
      setSelectedJobId(null);
    } catch (error) {
      toast.error("Failed to delete job");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onDeleteClick={handleDeleteClick}
        />
      ))}

      <ConfirmationPopup
        confirmIsOpen={confirmIsOpen}
        setConfirmIsOpen={setConfirmIsOpen}
        title="Remove Job"
        message="This action cannot be undone. Are you sure you want to remove this job?"
        onConfirm={deleteJob}
      />

      <div
        ref={loaderRef}
        className="text-center py-5 text-white"
      >
        {loading && "Loading..."}
      </div>

      <Footer />
    </>
  );
}

export default ExploreJobs;