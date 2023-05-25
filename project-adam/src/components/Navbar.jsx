import React, {useEffect, useState} from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import ADAMLOGONOBG from '../imgs/ADAM_LOGO_NO_BG.png'

import { Link as LinkScroll } from "react-scroll/modules";
import { Link as LinkRouter, useLocation } from 'react-router-dom';


const Navbar = (props) => {
    const [nav, setNav] = useState(false);

    const [isListVisible, setIsListVisible] = useState(true);
    const location = useLocation();

    const handleLogin = () => {
        props.onLogin();
    };
    const handleNav = () => {
        setNav(!nav)
    }

    useEffect(() => {
        const isSignupPage = location.pathname === '/signup';
        const isPrivacyPolicyPage = location.pathname === '/privacypolicy';
        const isFAQsPage = location.pathname === '/faq';
        const isTermsAndConditionPage = location.pathname === '/terms-of-use';
        setIsListVisible(!isSignupPage && !isPrivacyPolicyPage && !isFAQsPage && !isTermsAndConditionPage);
    }, [location.pathname]);
  return (
    <div className='flex justify-between items-center px-4 w-full mx-auto text-white border-b border-b-gray-500 md:grid-flow-col-3 p-1'>
        <LinkRouter to='/'><img src={ADAMLOGONOBG} alt='' className='rounded-xl h-20 cursor-pointer'/></LinkRouter>
        
        <div className='hidden md:flex mr-2 items-center'>
            <ul className='hidden md:flex items-center text-xl font-light ml-[100px]'>
                <LinkRouter to='/'>
                    <li className='p-8 hover:text-[#93F4D3]'>Home</li>
                </LinkRouter>
                {isListVisible && (
                    <>
                        <LinkScroll to='services' spy={true} smooth={true} offset={-150} duration={500}>
                            <li className='p-8 hover:text-[#93F4D3] cursor-pointer'>Services</li>
                        </LinkScroll>
                        <LinkScroll to='facilities' spy={true} smooth={true} offset={-150} duration={500}>
                            <li className='p-8 hover:text-[#93F4D3] cursor-pointer'>Facilities</li>
                        </LinkScroll>
                        <LinkScroll to='/' spy={true} smooth={true} offset={50} duration={500}>
                            <li className='p-8 hover:text-[#93F4D3] cursor-pointer'>Products Available</li>
                        </LinkScroll>
                    </>
                )}
            </ul>
            <button className='font-normal h-[40px] bg-[#93F4D3] hover:outline hover:outline-offset-0 hover:bg-[#19313800] text-black hover:text-white rounded-md w-[90px] ml-2 my-2 py-2 ease-in-out duration-300'
             onClick={handleLogin}>Login</button>
        </div>
        <div onClick={handleNav} className='blocked md:hidden'>
            {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
        </div>
        <div className={!nav ? 'fixed left-0 top-0 w-[65%] bg-[#1a1a1a] h-full border-r border-gray-500 ease-in-out duration-500 md:hidden font-light' : 'fixed left-[-100%]'}>
            <img src={ADAMLOGONOBG} alt='' className='rounded-xl h-20 pl-4 mb-0 mt-1'/>
            <ul className='pt-1 pl-0'>
                <LinkRouter to="/" onClick={handleNav}>
                    <li className='p-4 border-b border-t border-gray-500 hover:text-[#93F4D3] hover:bg-gray-500'>Home</li>
                </LinkRouter>
                {isListVisible && (
                    <>
                    <LinkScroll to='services' spy={true} smooth={true} offset={-150} duration={500} onClick={handleNav}>
                        <li className='p-4 border-b border-gray-500 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer'>Services</li>
                    </LinkScroll>
                    <LinkScroll to='facilities' spy={true} smooth={true} offset={-150} duration={500} onClick={handleNav}>
                        <li className='p-4 border-b border-gray-500 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer'>Facilities</li>
                    </LinkScroll>
                    <li className='p-4 hover:text-[#93F4D3] hover:bg-gray-500'>Products Available</li>
                    </>
                )}
            </ul>
        </div>
    </div>
  )
}

export default Navbar