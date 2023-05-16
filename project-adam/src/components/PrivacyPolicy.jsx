import React, {useState} from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import PrivacyPolicyContent from './PrivacyPolicyContent';
import BackToTopButton from './BackToTopButton';

const PrivacyPolicy = (props) => {
    const [showLogin, setShowLogin] = useState(false)

    function show(){
        setShowLogin(!showLogin);    
    }
  return (
    <>
        <Navbar onLogin={show}/>
        <PrivacyPolicyContent/>
        <BackToTopButton/>
        <Footer/>
        {showLogin && <Login trigger={showLogin} setTrigger={setShowLogin}/>}
    </>
  )
}

export default PrivacyPolicy