import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    try {
      const fetchJobs = async () => {
        const response = await axios.get(
          "http://localhost:5000/api/job/fetch",
          {
            withCredentials: true,
          },
        );
        console.log(response.data.payload);
        setJobs(response.data.payload)
      };
      fetchJobs();
    } catch (error) {
      toast.error(error.response?.message || "Something went wrong")
    }
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
