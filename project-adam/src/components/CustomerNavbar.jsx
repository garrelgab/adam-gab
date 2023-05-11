import React, {useState} from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link as LinkRouter } from 'react-router-dom';
const CustomerNavbar = () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav)
    }
  return (
    <div className=' w-[100%] md:py-[20px] py-[20px] bg-[#1a1a1a] border-b border-gray-500'>
        <div className='blocked  text-white flex justify-between'>
            <AiOutlineMenu size={30} className='cursor-pointer ml-[3%] md:ml-[1%]' onClick={handleNav}/>
            <div className='md:flex text-lg font-light hidden'>
                <h1 className='border-r border-gray-500 px-5'>Time</h1>
                <h1 className='px-5'>Date</h1>
            </div>
        </div>
        <div className={nav ? 'fixed  top-0 left-0 w-[60%] border-r border-gray-500 md:w-[20%] text-center text-xl z-50 text-black bg-[#d9d9d9] h-full ease-in-out duration-500 font-light' : 'fixed left-[-100%]'}>
            <div className='blocked md:py-[20px] py-[20px] border-b border-gray-800'>
                <AiOutlineClose size={30} onClick={handleNav} className='cursor-pointer ml-[5%]'/>
            </div>
            <ul className=''>
                <LinkRouter to='/customer' onClick={handleNav}>
                    <li className='p-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer'>Reservation</li>            
                </LinkRouter>
                <LinkRouter to='/customer/personalinfo' onClick={handleNav}>
                    <li className='p-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer'>Personal Information</li>            
                </LinkRouter>
                <LinkRouter to='/customer/account' onClick={handleNav}>
                    <li className='p-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer'>Change Password</li>
                </LinkRouter>
                <li className='p-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer'>Announcement</li>
            </ul>
            <LinkRouter to='/'>
                <h1 className='p-6 hover:bg-gray-500 cursor-pointer hover:text-[#93F4D3] mt-[100%] left-0'>Logout</h1>
            </LinkRouter>
        </div>
    </div>
  )
}

export default CustomerNavbar