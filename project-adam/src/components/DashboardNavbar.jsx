import React, {useState, useEffect} from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { Link as LinkRouter } from 'react-router-dom';
const DashboardNavbar = (props) => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav)
    }

    const [currentTime, setCurrentTime] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        handleRunningDate();
    }, []);

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

    const [navSettings, setNavSettings] = useState(false);
    const handleNavSettings = () => {
        setNavSettings(!navSettings);
    };
    const userID = props.id;
  return (
    <div className='fixed top-0 left-0 w-[100%] overflow-auto md:py-[20px] py-[20px] bg-[#1a1a1a] border-b border-gray-500 z-50'>
        <div className='blocked text-white flex justify-between'>
            <AiOutlineMenu size={30} className='cursor-pointer ml-[3%] md:ml-[1%]' onClick={handleNav}/>
            <div className='md:flex text-lg font-light hidden'>
                <h1 className='text-[#93F4D3] border-r border-gray-500 px-5'>{currentTime}</h1>
                <h1 className='text-[#93F4D3] px-5'>{currentDateTime}</h1>
            </div>
        </div>
        <div className={nav ? 'fixed overflow-auto top-0 left-0 w-[60%] border-r border-gray-500 md:w-[20%] z-50 text-start text-black bg-[#d9d9d9] h-full ease-in-out duration-500 font-light' : 'fixed left-[-100%]'}>
            <div className='blocked md:py-[20px] py-[20px] border-b border-gray-800'>
                <AiOutlineClose size={30} onClick={handleNav} className='cursor-pointer ml-[5%]'/>
            </div>
            <ul className=''>
                <LinkRouter to='/dashboard' state={userID} onClick={handleNav}>
                    <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Dashboard</h1></li>
                </LinkRouter>
                <LinkRouter to='/dashboard/membership' state={userID} onClick={handleNav}>
                    <li className='hidden md:flex p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Membership</h1></li>
                </LinkRouter>
                <LinkRouter to="/dashboard/reservation" state={userID} onClick={handleNav}>
                    <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Reservation</h1></li>
                </LinkRouter>
                <LinkRouter to='/dashboard/pos' state={userID} onClick={handleNav}>
                    <li className='hidden md:flex p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Point of Sale</h1></li>
                </LinkRouter>
                <LinkRouter to='/dashboard/inventory' state={userID} onClick={handleNav}>
                    <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Inventory Management</h1></li>
                </LinkRouter>
                <LinkRouter to='/dashboard/expenses' state={userID} onClick={handleNav}>
                    <li className='hidden md:flex p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Expenses Management</h1></li>
                </LinkRouter>
                <LinkRouter to='/dashboard/gcash' state={userID} onClick={handleNav}>
                    <li className='hidden md:flex p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>G-Cash</h1></li>
                </LinkRouter>
                <LinkRouter to='/dashboard/salesreport' state={userID} onClick={handleNav}>
                    <li className='hidden md:flex p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Sales Report</h1></li>
                </LinkRouter>
                {/* <LinkRouter to='/dashboard/settings' state={userID} onClick={handleNavSettings}> */}
                    <div className='flex justify-between items-center hover:bg-gray-500 hover:text-[#93F4D3] cursor-pointer ease-in-out duration-300' onClick={handleNavSettings}>
                        <li className='p-4 md:py-6'><h1 className='mx-[20px]'>Settings</h1></li>
                        <div className='mr-[30px] md:mr-[20px]'>
                            {!navSettings ? <SlArrowDown className='md:text-[15px]'/> : <SlArrowUp className='md:text-[15px]'/>}
                        </div>
                    </div>
                {/* </LinkRouter> */}
                {navSettings && (
                    <ul className='ease-in-out duration-300'>
                        <LinkRouter to='/dashboard/faq' state={userID} onClick={handleNav}>
                            <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>FAQ's</h1></li>
                        </LinkRouter>
                        <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>Privacy Policy</h1></li>
                        <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>Terms and Conditions</h1></li>
                    </ul>
                )}
                <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Announcement</h1></li>
                <LinkRouter to='/'>
                    <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px] font-bold'>Logout</h1></li>
                </LinkRouter>

            </ul>
            {/* <LinkRouter to='/'>
                <h1 className='p-6 hover:bg-gray-500 cursor-pointer font-bold hover:text-[#93F4D3] ease-in-out duration-300'><h1 className='mx-[30px]'>Logout</h1></h1>
            </LinkRouter> */}
        </div>
    </div>
  )
}

export default DashboardNavbar