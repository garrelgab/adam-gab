import React, {useState} from 'react'
import Navbar from './Navbar';
import BackToTopButton from './BackToTopButton';
import Footer from './Footer';
import Login from './Login';
import TermsAndConditionContent from './TermsAndConditionContent';

const TermsAndConditions = (props) => {
    const [showLogin, setShowLogin] = useState(false)

    function show(){
        setShowLogin(!showLogin);    
    }
  return (
    <>
        <Navbar onLogin={show}/>
        <TermsAndConditionContent/>
        <BackToTopButton/>
        <Footer/>
        {showLogin && <Login trigger={showLogin} setTrigger={setShowLogin}/>}
    </>
  )
}

export default TermsAndConditions