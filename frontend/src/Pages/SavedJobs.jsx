import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer.jsx';
import JobCard from '../Components/JobCard.jsx';

function SavedJobs() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <p className='grow'>saved jobs</p>
      <Footer/>
    </div>
  )
}

export default SavedJobs;
