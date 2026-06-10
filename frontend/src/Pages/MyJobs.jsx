import React from 'react'
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Navbar';
import JobCard from '../Components/JobCard.jsx';
import { useJobs } from '../Contexts/JobsContext.jsx';

function MyJobs() {
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

export default MyJobs
