import React, {useState, useEffect} from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link as LinkRouter } from 'react-router-dom';
import axios from 'axios';
// import moment from 'moment';
const CustomerNavbar = (props) => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav)
    }
    const userID = props.id;

    const [currentTime, setCurrentTime] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');

    

    const handleRunningDate = () => {
        const interval = setInterval(() => {
        const now = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = now.toLocaleDateString('en-US', options);
        const time = now.toLocaleTimeString('en-US', { hour12: true });
    
        setCurrentDateTime(`${date}`);
        setCurrentTime(`${time}`);
        }, 1000);
    
        return () => {
        clearInterval(interval);
        };
    }
    const handleLogout = () => {
        axios.put('http://localhost:3001/api/update-attendance')
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        })
    };
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const fetchAccountName = () => {
        axios.get('http://localhost:3001/api/account-name', {
            params: {
                accID: userID,
            }
        })
        .then(response => {
            setFname(response.data[0].fname);
            setLname(response.data[0].lname);
        })
        .catch(error => {
            console.log(error);
        });
    };
    useEffect(() => {
        handleRunningDate();
        fetchAccountName();
    }, []);
  return (
    <div className='fixed top-0 left-0 w-[100%] md:py-[20px] py-[20px] bg-[#1ca350] z-50'>
        <div className='blocked  text-white flex justify-between'>
            <AiOutlineMenu size={30} className='cursor-pointer ml-[3%] md:ml-[1%]' onClick={handleNav}/>
            <div className='md:flex text-lg font-light hidden'>
                <h1 className='border-r border-white px-5'>{currentTime}</h1>
                <h1 className='px-5'>{currentDateTime}</h1>
            </div>
        </div>
        
        <div className={nav ? 'fixed overflow-auto  top-0 left-0 w-[60%] border-r border-gray-500 md:w-[20%] text-center z-50 text-black bg-[#d9d9d9] h-full ease-in-out duration-500 font-light' : 'fixed left-[-100%]'}>
            <div className='blocked md:py-[20px] py-[20px] border-b border-gray-800'>
                <AiOutlineClose size={30} onClick={handleNav} className='cursor-pointer ml-[5%]'/>
            </div>
            <div className='mb-[20px] md:mb-[30px] justify-center items-center flex border-b border-gray-500 mx-[40px]'>
                <h1 className='my-[30px] md:my-[40px] text-[20px] md:text-[30px]'>{fname}</h1>
            </div>
            <ul className='flex flex-col text-left'>
                <LinkRouter to='/customer' state={userID} onClick={handleNav}>
                    <li className='p-6 hover:text-white hover:bg-gray-500 cursor-pointer'>Reservation</li>            
                </LinkRouter>
                <LinkRouter to='/customer/personalinfo' state={userID} onClick={handleNav}>
                    <li className='p-6 hover:text-white hover:bg-gray-500 cursor-pointer'>Personal Information</li>            
                </LinkRouter>
                <LinkRouter to='/customer/account' state={userID} onClick={handleNav}>
                    <li className='p-6 hover:text-white hover:bg-gray-500 cursor-pointer'>Change Password</li>
                </LinkRouter>
                <LinkRouter to='/customer/health-tips' state={userID} onClick={handleNav}>
                    <li className='p-6 hover:text-white hover:bg-gray-500 cursor-pointer'>Health Guide</li>
                </LinkRouter>
                <li className='p-6 hover:text-white hover:bg-gray-500 cursor-pointer'>Announcement</li>
                <LinkRouter to='/'>
                    <h1 className='p-6 hover:bg-gray-500 cursor-pointer hover:text-white font-bold left-0' onClick={handleLogout}>Logout</h1>
                </LinkRouter>
            </ul>
            
        </div>
    </div>
  )
}

export default CustomerNavbar