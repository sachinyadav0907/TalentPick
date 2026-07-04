import React from 'react'
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import JobCard from '../components/JobCard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import Hero from '../components/Hero.jsx';

function Home() {

  const tokenValue = useAuth();
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default Home;
