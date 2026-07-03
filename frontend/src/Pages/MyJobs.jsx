import React, { useEffect, useRef, useState } from "react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import JobCard from "../Components/JobCard";
import EmptyState from "../Components/EmptyState";
import ConfirmationPopup from "../Components/ConfirmationPopup";
import { useJobs } from "../Contexts/JobsContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axiox";

function ExploreJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

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

        setJobs((prev) => [...prev, ...response.data.payload]);

        setHasMore(response.data.pagination.hasMore);
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
      },
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
      await api.delete(
        `/job/delete/${selectedJobId}`,
      );

      toast.success("Job deleted successfully");

      setJobs((prev) => prev.filter((job) => job._id !== selectedJobId));

      setConfirmIsOpen(false);
      setSelectedJobId(null);
    } catch (error) {
      toast.error("Failed to delete job");
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#081028]">
        <Navbar />

        <main className="flex-1 flex flex-col">
          {!loading && jobs.length === 0 ? (
            <EmptyState
              title="No Jobs Posted"
              description="You haven't posted any jobs yet. Start by creating your first job posting."
              buttonText="Post a Job"
              onButtonClick={() => navigate("/post-jobs")}
            />
          ) : (
            <div className="flex-1 flex flex-col gap-5 py-8">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onDeleteClick={handleDeleteClick}
                />
              ))}

              <div ref={loaderRef} className="py-5 text-center text-white">
                {loading && "Loading..."}
                {!hasMore && jobs.length > 0 && "No more jobs"}
              </div>
            </div>
          )}
        </main>

        <ConfirmationPopup
          confirmIsOpen={confirmIsOpen}
          setConfirmIsOpen={setConfirmIsOpen}
          title="Remove Job"
          message="This action cannot be undone. Are you sure you want to remove this job?"
          onConfirm={deleteJob}
        />
      </div>

      <Footer />
    </>
  );
}

export default ExploreJobs;
