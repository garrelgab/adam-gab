import React, {useState} from 'react'
import HomeFAQsContent from './HomeFAQsContent'
import Login from './Login'
import BackToTopButton from './BackToTopButton'
import Footer from './Footer'
import Navbar from './Navbar'

const HomeFAQs = (props) => {
  const [showLogin, setShowLogin] = useState(false)

    function show(){
        setShowLogin(!showLogin);    
    }
  return (
    <>
      <Navbar onLogin={show}/>
      <HomeFAQsContent/>
      <BackToTopButton/>
      <Footer/>
      {showLogin && <Login trigger={showLogin} setTrigger={setShowLogin}/>}
    </>
  )
}

export default HomeFAQs