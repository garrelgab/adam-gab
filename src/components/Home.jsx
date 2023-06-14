import React from 'react'
import { useState } from 'react'
import Hero from './Hero'
import Company from './Company'
import ServiceOffer from './ServiceOffer'
import Footer from './Footer'
import BackToTopButton from './BackToTopButton'
import Login from './Login'
import Navbar from './Navbar'
import Facilities from './Facilities'
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
      <Facilities/>
      <Footer/>
      <BackToTopButton/>
      {showLogin && <Login trigger={showLogin} setTrigger={setShowLogin}/>}
    </>
  )
}

export default Home