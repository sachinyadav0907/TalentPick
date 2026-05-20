import React from 'react'
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import JobCard from '../Components/JobCard.jsx';
import { useAuth } from '../Contexts/AuthContext.jsx';

function Home() {

  const tokenValue = useAuth();
  return (
    <div>
      <Navbar/>
      <h1>{tokenValue.role}</h1>
      <JobCard/>
      <Footer/>
    </div>
  )
}

export default Home;
