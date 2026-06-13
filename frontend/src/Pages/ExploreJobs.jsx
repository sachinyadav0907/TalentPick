import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useJobs } from "../Contexts/JobsContext";
import JobCard from "../Components/JobCard";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function ExploreJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const {fetchJobs}= useJobs();

  const loaderRef = useRef(null);

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
      {jobs.map((job, index) => {
        return <JobCard key={job._id} job={job} />;
      })}
      <div
        ref={loaderRef}
        className="text-center py-5 text-white"
      >
        {loading && "Loading..."}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreJobs;
