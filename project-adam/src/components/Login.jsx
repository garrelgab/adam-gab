import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link as LinkRouter } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {

    let navigate = useNavigate();
    // const location = useLocation();

    axios.defaults.withCredentials = true;

    const [email, setEmail] = useState('');
    const [pword, setPword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const userLogin = () => {

    //     if(!email){
    //         alert('Please fill out the empty field.');
    //         return;
    //     }
    //     if(!pword){
    //         alert('Please fill out the empty field.');
    //         return;
    //     }
    //     Axios.post("http://localhost:3001/api/login", {
    //         userEmail: email,
    //         userPword: pword,
    //     })
    //     .then((response) => {
    //         console.log(response);
    //         if(response.data.message) {
    //             setLoginStatus(response.data.message);
    //         } else
    //         {
    //             if(response.data.role === 'admin'){
    //                 // setIsLoggedIn(true);
    //                 const id = response.data.account_id;
    //                 console.log(id);
    //                 navigate('/dashboard', { replace: true, state: id});
    //                 props.setTrigger(false);
    //             }
    //             else{
    //                 // setIsLoggedIn(true);
    //                 const id = response.data.account_id;
    //                 console.log(id);
    //                 navigate('/customer', { replace: true, state: id});
    //                 props.setTrigger(false);
    //             }
                
    //         }
    //     })
    //     setEmail('');
    //     setPword('');
    // };
    const userLogin = () => {
      if (!email) {
        alert('Please fill out the empty field.');
        return;
      }
      if (!pword) {
        alert('Please fill out the empty field.');
        return;
      }
      axios.post("http://localhost:3001/login", {
        userEmail: email,
        userPword: pword,
      })
        .then((response) => {
          console.log(response.data); // Add this line for debugging
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            if (response.data[0].role === 'customer') {
              const id = response.data[0].account_id;
              // console.log(id);
              navigate('/customer', { replace: true, state: id });
              props.setTrigger(false);
            } else {
              const id = response.data[0].account_id;
              // console.log(id);
              navigate('/dashboard', { replace: true, state: id });
              props.setTrigger(false);
            }
          }
          setEmail('');
          setPword('');
        })
        .catch((error) => {
          console.error('Failed to login', error);
        });
    };
      

  return (props.trigger) ? (
    <div className='fixed flex align-middle justify-center pt-[20px] top-0 left-0 w-[100%] h-[100%] bg-modal'>
        <div className='text-black md:text-black shadow-md bg-[#1ca350] max-h-[670px] md:max-h-[600px] w-[400px] md:w-[500px] rounded-xl'>
            <div className='text-white'>
                <button className='ml-[90%] mt-[5%]' onClick={() => props.setTrigger(false)}>
                    <AiOutlineClose size={25}/>
                </button>
            </div>
            <h1 className='text-3xl md:text-5xl font-bold text-center md:mb-2 md:mt-[0px] text-white'>Login</h1>
            <h1 className='text-lg md:text-xl font-light text-center text-white'>Sign in to Continue</h1>
            <h1 className='text-center mt-[0px] text-red-500 fixed mx-auto w-[400px] md:w-[500px] text-lg font-light'>{loginStatus}</h1>
            <div className='mt-[100px] md:mt-[30px] max-w-[350px] mx-auto'>
                <label className="block mb-1 text-l md:text-l mx-auto text-left font-light text-white">Email</label>
                <input type="text"className="shadow-lg block w-[350px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:outline-none" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='mt-[10px] md:mt-[10px] max-w-[350px] mx-auto'>
                <label className="block mb-1 text-l md:text-l mx-auto text-left font-light text-white">Password</label>
                <input type="password"className="shadow-lg block w-[350px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:outline-none" value={pword} placeholder='Password' onChange={(e) => setPword(e.target.value)}/>
            </div>
            <div className='mt-[50px] md:mt-[20px] text-center'>
                <button className='shadow-lg w-[350px] p-3 text-xl font-bold rounded-xl text-[#1ca350] hover:text-white bg-white hover:bg-gray-500 ease-in-out duration-300' onClick={userLogin}>Login</button>
                <h1 className="block mb-1 text-l md:text-l text-center font-bold text-white cursor-pointer mt-[0px] border border-t-transparent border-r-transparent border-l-transparent p-4 border-b-white">Forget Password?</h1>
                <LinkRouter to="/signup" onClick={() => props.setTrigger(false)}>
                    <button className='shadow-lg mt-[30px] w-[350px] p-3 text-xl font-bold rounded-xl bg-white text-[#1ca350] hover:text-white hover:bg-gray-500 md:mb-[50px] ease-in-out duration-300'>Create Account</button>
                </LinkRouter>
            </div>
        </div>
    </div>
  ) : "";
}

export default Login