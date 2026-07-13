import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import EmptyState from "../components/EmptyState";

import JobsApplicants from "../components/JobsApplicants.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/axiox.js";

function MyApplicant() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!hasMore) return;

      try {
        setLoading(true);

        const response = await api.get(
          `/jobs/titles?page=${page}&limit=10`,
        );

        setJobs((prev) => [...prev, ...response.data.payload]);

        setHasMore(response.data.hasMore);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
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

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loading, hasMore]);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#081028]">
        <Navbar />

        <main className="flex-1">
          {!loading && jobs.length === 0 ? (
            <EmptyState
              title="No Jobs Posted"
              description="Post your first job to start receiving applications."
              buttonText="Post a Job"
              onButtonClick={() => navigate("/post-jobs")}
            />
          ) : (
            <div className="flex flex-col gap-5 py-8">
              {jobs.map((job) => (
                <JobsApplicants key={job._id} job={job} />
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

export default MyApplicant;
