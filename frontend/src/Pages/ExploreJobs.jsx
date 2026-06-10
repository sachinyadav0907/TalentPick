import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useJobs } from '../Contexts/JobsContext'
import JobCard from '../Components/JobCard';

function ExploreJobs() {
  const {jobs} = useJobs();
  return (
    <div>
      <Navbar/>
      {jobs.map((job,index)=> {
        return <JobCard key={index} job={job} />
      })}
      <Footer/>
    </div>
  )
}

export default ExploreJobs
