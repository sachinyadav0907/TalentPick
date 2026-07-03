import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axiox.js";

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
    return api.get("/job/fetch", {
      params: {
        page,
        limit,
        search,
        salary,
        jobType,
        experience,
        remote,
      },
      },
    );}

    return (
      <JobsContext.Provider value={{ fetchJobs }}>
        {children}
      </JobsContext.Provider>
    );
};

export const useJobs = () => useContext(JobsContext);
