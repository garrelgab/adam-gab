import React, {useState} from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link as LinkRouter } from 'react-router-dom';
const DashboardNavbar = (props) => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav)
    }

    const [navSettings, setNavSettings] = useState(false);

    const handleNavSettings = () => {
        setNavSettings(!navSettings)
    }
    const userID = props.id;
  return (
    <div className='w-[100%] md:py-[20px] py-[20px] bg-[#1a1a1a] border-b border-gray-500'>
        <div className='blocked text-white flex justify-between'>
            <AiOutlineMenu size={30} className='cursor-pointer ml-[3%] md:ml-[1%]' onClick={handleNav}/>
            <div className='md:flex text-lg font-light hidden'>
                <h1 className='border-r border-gray-500 px-5'>{userID}</h1>
                <h1 className='px-5'>Date</h1>
            </div>
        </div>
        <div className={nav ? 'fixed top-0 left-0 w-[60%] border-r border-gray-500 md:w-[20%] z-50 text-center text-xl text-black bg-[#d9d9d9] h-full ease-in-out duration-500 font-light' : 'fixed left-[-100%]'}>
            <div className='blocked md:py-[20px] py-[20px] border-b border-gray-800'>
                <AiOutlineClose size={30} onClick={handleNav} className='cursor-pointer ml-[5%]'/>
            </div>
            <ul className=''>
                <LinkRouter to='/dashboard' state={userID} onClick={handleNav}>
                    <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer text-[15px] md:text-[20px] ease-in-out duration-300'>Dashboard</li>
                </LinkRouter>
                <LinkRouter to='/dashboard/membership' state={userID} onClick={handleNav}>
                    <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer text-[15px] md:text-[20px] ease-in-out duration-300'>Membership</li>
                </LinkRouter>
                <LinkRouter to="/dashboard/reservation" state={userID} onClick={handleNav}>
                    <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer text-[15px] md:text-[20px] ease-in-out duration-300'>Reservation</li>
                </LinkRouter>
                <LinkRouter to='/dashboard/settings' state={userID} onClick={handleNav}>
                    <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer text-[15px] md:text-[20px] ease-in-out duration-300'>Settings</li>
                </LinkRouter>                
                <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer text-[15px] md:text-[20px] ease-in-out duration-300'>Announcement</li>
            </ul>
            <LinkRouter to='/'>
                <h1 className='blocked p-6 hover:bg-gray-500 cursor-pointer hover:text-[#93F4D3] mt-[100%] left-0 ease-in-out duration-300'>Logout</h1>
            </LinkRouter>
        </div>

        
    </div>
  )
}

export default DashboardNavbar