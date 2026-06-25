import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ApplicantCard from "../Components/ApplicantCard";
import toast from "react-hot-toast";
import EmptyState from "../Components/EmptyState";

function ShowApplicants() {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5000/api/application/fetch?page=${page}&limit=10&jobId=${id}`,
          { withCredentials: true },
        );

        const applicants = response.data.payload || [];

        const usersArray = applicants.map((applicant) => ({
          ...applicant.userId,
          status: applicant.status,
          applicationId: applicant._id,
        }));

        setUsers((prev) => [...prev, ...usersArray]);

        if (applicants.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [page, id]);

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

  const handleAccept = async (status, userId) => {
    try {
      await axios.patch(
        "http://localhost:5000/api/application/status",
        { userId: userId, jobId: id, status: status },
        {
          withCredentials: true,
        },
      );
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const handleReject = async (status, userId) => {
    try {
      await axios.patch(
        "http://localhost:5000/api/application/status",
        { userId: userId, jobId: id, status: status },
        {
          withCredentials: true,
        },
      );
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
      {!loading && users.length === 0 ? (
        <EmptyState
          title="No Applicants"
          description="There are currently no applicants. Please check back later."
        />
      ) : (
        <div className="flex flex-col gap-5 py-8">
          {users.map((user) => (
            <ApplicantCard
              key={user._id}
              user={user}
              jobId={id}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}

          <div ref={loaderRef} className="py-5 text-center text-white">
            {loading && "Loading..."}
            {!hasMore && users.length > 0 && "No more applicants"}
          </div>
        </div>
      )}
    </main>
  </div>

  <Footer />
</>
  );
}

export default ShowApplicants;
