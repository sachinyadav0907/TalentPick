import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import axios from "axios";
import JobsApplicants from "../Components/JobsApplicants.jsx";

function MyApplicant() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!hasMore) return;

      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5000/api/job/applicant-jobs?page=${page}&limit=10`,
          {
            withCredentials: true,
          }
        );

        setJobs((prev) => [
          ...prev,
          ...response.data.payload,
        ]);

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
      }
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
    <div className="bg-[#081028] min-h-screen flex flex-col">
      <Navbar />

      <div className="grow">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobsApplicants
              key={job._id}
              job={job}
            />
          ))
        ) : (
          !loading && <div className="text-white text-center py-10">No jobs found</div>
        )}
      </div>

      {hasMore && (
        <div
          ref={loaderRef}
          className="text-center py-5 text-white"
        >
          {loading && "Loading..."}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MyApplicant;