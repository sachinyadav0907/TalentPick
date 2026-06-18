import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import JobCard from "../Components/JobCard.jsx";

function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5000/api/application/fetch?page=${page}`,
          {
            withCredentials: true,
          },
        );

        const jobs = response.data.payload || [];

        const jobsArray = jobs.map((job) => ({
          ...job.jobId,
          status: job.status,
        }));

        setAppliedJobs((prev) => [...prev, ...jobsArray]);

        setHasMore(response.data.hasMore);

        console.log("Response:", response.data);
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
    <div>
      <Navbar />

      {appliedJobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}

      {loading && <p>Loading...</p>}

      {hasMore && <div ref={loaderRef} style={{ height: "20px" }} />}

      <Footer />
    </div>
  );
}

export default AppliedJobs;
