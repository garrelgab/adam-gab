import React from 'react'
import { Link as LinkScroll, animateScroll } from 'react-scroll/modules';
import { Link as LinkRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Footer = () => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const nnavigate = useNavigate();
    const location = useLocation();

    const handleHome = () => {
        nnavigate('/');
        // if (location.pathname === '/signup') {
        //     window.location.href = '/'; // Redirect to the home page
        // } else {
        //     animateScroll.scrollTo('company', {
        //     smooth: true,
        //     offset: 0,
        //     duration: 500
        //     });
        // }
    };
  return (
    <div className='bg-[#2a2a2a] md:bg-[#1a1a1a] py-[30px] flex flex-col items-center justify-center '>
        <div className='max-w-[840px] flex flex-cols-3 justify-center text-white'>
            <div className='px-0 md:px-0'>
                <h1 className='text-2xl font-bold mb-4 text-[#93F4D3]'>Company</h1>
                <ul>
                    <LinkScroll to='company' spy={true} smooth={true} offset={-150} duration={500}>
                        <li className='hover:text-[#93F4D3] cursor-pointer' onClick={handleHome}>About Us</li>
                    </LinkScroll>
                    <LinkRouter to='/faq' onClick={handleClick}>
                        <li className='hover:text-[#93f4d3] pt-2 cursor-pointer'>FAQ's</li>
                    </LinkRouter>
                    <LinkRouter to='/terms-of-use' onClick={handleClick}>
                        <li className='hover:text-[#93f4d3] pt-2 '>Terms and Conditions</li>
                    </LinkRouter>
                    <LinkRouter to='/privacypolicy' onClick={handleClick}>
                        <li className='hover:text-[#93f4d3] pt-2'>Privacy Policy</li>
                    </LinkRouter>
                </ul>
            </div>
            <div className='px-3 md:px-[100px]'>
            <h1 className='text-2xl font-bold mb-4 text-[#93F4D3]'>Gym</h1>
                <ul>
                    <LinkScroll to='services' spy={true} smooth={true} offset={-150} duration={500}>
                        <li className='hover:text-[#93F4D3] cursor-pointer' onClick={handleHome}>Service Offers</li>
                    </LinkScroll>
                    <li className='hover:text-[#93f4d3] pt-2'>Products Available</li>
                    <LinkScroll to='facilities' spy={true} smooth={true} offset={-150} duration={500}>
                        <li className='hover:text-[#93f4d3] pt-2 cursor-pointer' onClick={handleHome}>Gym/Facilities</li>
                    </LinkScroll>
                </ul>
            </div>
            <div className='px-0 md:px-0'>
            <h1 className='text-2xl font-bold mb-4 text-[#93F4D3]'>Social Media</h1>
                <ul>
                    <a href='https://www.facebook.com/people/ADAM-FitnessCenter/100066718838043/' target='_blank' rel='noreferrer'><li className='hover:text-[#93F4D3]'>Facebook</li></a>
                </ul>
            </div>
        </div>
        <div className='flex flex-col justify-center text-white mx-[40px] mt-[30px]'>
            <h1 className='flex'><p className='mr-[5px] text-[#93f4d3]'>Store Hours:</p> 8 AM to 9 PM</h1>
            <a href='https://goo.gl/maps/6PZFiUac43b8tqCP7' target='_blank' rel='noreferrer'><h1 className='hover:text-[#93F4D3]'>ADAM Fitness Center, M. L. Quezon Avenue, Antipolo, Rizal</h1></a>
        </div>
    </div>
  )
}

export default Footer