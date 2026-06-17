import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const fetchJobs = async ({
    page = 1,
    limit = 10,
    search = "",
    salary = "",
    jobType = "",
    experience = "",
    remote = "",
  } = {}) => {
    return axios.get("http://localhost:5000/api/job/fetch", {
      params: {
        page,
        limit,
        search,
        salary,
        jobType,
        experience,
        remote,
      },
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
