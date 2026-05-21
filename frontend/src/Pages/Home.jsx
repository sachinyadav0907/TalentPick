import React from 'react'
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import JobCard from '../Components/JobCard.jsx';
import { useAuth } from '../Contexts/AuthContext.jsx';
import Hero from '../Components/Hero.jsx';

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
