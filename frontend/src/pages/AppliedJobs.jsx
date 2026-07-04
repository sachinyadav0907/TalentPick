import React, { useEffect, useState, useRef } from "react";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import JobCard from "../components/JobCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/axiox.js";

function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          `/application/fetch?page=${page}`,
        );

        const jobs = response.data.payload || [];

        const jobsArray = jobs.map((job) => ({
          ...job.jobId,
          status: job.status,
        }));

        setAppliedJobs((prev) => [...prev, ...jobsArray]);

        setHasMore(response.data.hasMore);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
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

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
      observer.disconnect();
    };
  }, [loading, hasMore]);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#081028]">
        <Navbar />

        <main className="flex-1">
          {!loading && appliedJobs.length === 0 ? (
            <EmptyState
              title="No Applied Jobs"
              description="You haven't applied to any jobs yet. Explore available opportunities and submit your first application."
              buttonText="Explore Jobs"
              onButtonClick={() => navigate("/explore-jobs")}
            />
          ) : (
            <div className="flex flex-col gap-5 py-8">
              {appliedJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}

              <div ref={loaderRef} className="py-5 text-center text-white">
                {loading && "Loading..."}
                {!hasMore && appliedJobs.length > 0 && "No more jobs"}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default AppliedJobs;
