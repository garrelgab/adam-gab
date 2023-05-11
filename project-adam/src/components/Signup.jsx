import React, {useState} from 'react'
import CreateAccount from './CreateAccount'
import Login from './Login'
import Navbar from './Navbar'
const Signup = (props) => {
  const [showLogin, setShowLogin] = useState(false)

  function show(){
    setShowLogin(!showLogin);    
  }
  return (
    <>
        <Navbar onLogin={show}/>
        <CreateAccount/>
        {showLogin && <Login trigger={showLogin} setTrigger={setShowLogin}/>}
    </>
  )
}

export default Signup