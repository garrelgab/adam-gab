import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link as LinkRouter } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Login = (props) => {

    let navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const [email, setEmail] = useState('');
    const [pword, setPword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const userLogin = () => {

        if(!email){
            alert('Please fill out the empty field.');
            return;
        }
        if(!pword){
            alert('Please fill out the empty field.');
            return;
        }
        Axios.post("http://localhost:3001/api/login", {
            userEmail: email,
            userPword: pword,
        })
        .then((response) => {
            //console.log(response.data.message)
            if(response.data.message) {
                setLoginStatus(response.data.message);
            } else{
                if(response.data[0].role === 'admin'){
                    setLoginStatus(response.data[0].fname);
                    navigate('/dashboard', { replace: true});
                    props.setTrigger(false);
                }
                else{
                    navigate('/customer', { replace: true});
                    props.setTrigger(false);
                }
            }
        })
        setEmail('');
        setPword('');
    };
    // useEffect(() => {
    //     Axios.get("http://localhost:3001/api/login").then(response => {
    //         //setLoginStatus(response.data.user[0].fname)
    //     })
    // }, []);

  return (props.trigger) ? (
    <div className='fixed flex align-middle justify-center pt-[90px] top-0 left-0 w-[100%] h-[100%] bg-modal'>
        <div className='relative text-black md:text-black bg-[#93F4D3] max-h-[700px] md:max-h-[750px] w-[400px] md:w-[500px] rounded-xl'>
            <div className='text-black'>
                <button className='ml-[90%] mt-[5%]' onClick={() => props.setTrigger(false)}>
                    <AiOutlineClose size={25}/>
                </button>
            </div>
            <h1 className='text-3xl md:text-5xl font-light text-center md:mb-2 md:mt-[0px]'>Login</h1>
            <h1 className='text-lg md:text-xl font-light text-center'>Sign in to Continue</h1>
            <h1 className='text-center mt-[40px] text-red-500 fixed mx-auto w-[400px] md:w-[500px] text-lg font-light'>{loginStatus}</h1>
            <div className='mt-[100px] md:mt-[90px] max-w-[350px] mx-auto'>
                <label className="block mb-1 text-l md:text-l mx-auto text-left font-light text-black">Email</label>
                <input type="text"className="shadow-lg block w-[350px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:outline-none" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='mt-[10px] md:mt-[10px] max-w-[350px] mx-auto'>
                <label className="block mb-1 text-l md:text-l mx-auto text-left font-light text-black">Password</label>
                <input type="password"className="shadow-lg block w-[350px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:outline-none" value={pword} placeholder='Password' onChange={(e) => setPword(e.target.value)}/>
            </div>
            <div className='mt-[50px] md:mt-[100px] text-center'>
                <button className='shadow-lg w-[350px] p-3 text-xl font-light rounded-xl bg-gray-600 hover:bg-gray-800 text-white' onClick={userLogin}>Login</button>
                <h1 className="block mb-1 text-l md:text-l text-center font-light text-blue-500 md:text-blue-500 mt-[0px] border border-t-transparent border-r-transparent border-l-transparent p-4 border-b-black">Forget Password?</h1>
                <LinkRouter to="/signup" onClick={() => props.setTrigger(false)}>
                    <button className='shadow-lg mt-[30px] w-[350px] p-3 text-xl font-light rounded-xl bg-gray-600 hover:bg-gray-800 text-white md:mb-[50px]'>Create Account</button>
                </LinkRouter>
            </div>
        </div>
    </div>
  ) : "";
}

export default Login