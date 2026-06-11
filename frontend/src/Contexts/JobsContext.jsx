import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const fetchJobs = async (page, limit=10) => {
    return axios.get(
      `http://localhost:5000/api/job/fetch?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      },
    );}

    return (
      <JobsContext.Provider value={{ fetchJobs }}>
        {children}
      </JobsContext.Provider>
    );
};

export const useJobs = () => useContext(JobsContext);
