import React from 'react'
import { useState } from 'react'
import Hero from './Hero'
import Company from './Company'
import ServiceOffer from './ServiceOffer'
import DanceStudio from './DanceStudio'
import GymWorkouts from './GymWorkouts'
import MuayThai from './MuayThai'
import Boxing from './Boxing'
import Footer from './Footer'
import BackToTopButton from './BackToTopButton'
import Login from './Login'
import Navbar from './Navbar'
const Home = (props) => {
  const [showLogin, setShowLogin] = useState(false)

  function show(){
    setShowLogin(!showLogin);    
  }
  return (
    <>
      <Navbar onLogin={show}/>
      <Hero/>
      <Company/>
      <ServiceOffer/>
      <DanceStudio/>
      <GymWorkouts/>
      <MuayThai/>
      <Boxing/>
      <Footer/>
      <BackToTopButton/>
      {showLogin && <Login trigger={showLogin} setTrigger={setShowLogin}/>}
    </>
  )
}

export default Home