import React from 'react'
import { Link as LinkScroll } from 'react-scroll/modules';
import { Link as LinkRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
const Footer = () => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const nnavigate = useNavigate();
    // const location = useLocation();

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
    <div className='bg-[#d3d3d3] md:bg-[#d3d3d3] py-[30px] flex flex-col items-center justify-center '>
        <div className='max-w-[840px] flex flex-cols-3 justify-center text-black'>
            <div className='px-0 md:px-0'>
                <h1 className='text-2xl font-bold mb-4 text-[#1ca350]'>Company</h1>
                <ul>
                    <LinkScroll to='company' spy={true} smooth={true} offset={-150} duration={500}>
                        <li className='hover:text-[#1ca350] cursor-pointer' onClick={handleHome}>About Us</li>
                    </LinkScroll>
                    <LinkRouter to='/faq' onClick={handleClick}>
                        <li className='hover:text-[#1ca350] pt-2 cursor-pointer'>FAQ's</li>
                    </LinkRouter>
                    <LinkRouter to='/terms-of-use' onClick={handleClick}>
                        <li className='hover:text-[#1ca350] pt-2 '>Terms and Conditions</li>
                    </LinkRouter>
                    <LinkRouter to='/privacy-policy' onClick={handleClick}>
                        <li className='hover:text-[#1ca350] pt-2'>Privacy Policy</li>
                    </LinkRouter>
                </ul>
            </div>
            <div className='px-3 md:px-[100px]'>
            <h1 className='text-2xl font-bold mb-4 text-[#1ca350]'>Gym</h1>
                <ul>
                    <LinkScroll to='services' spy={true} smooth={true} offset={-150} duration={500}>
                        <li className='hover:text-[#1ca350] cursor-pointer' onClick={handleHome}>Service Offers</li>
                    </LinkScroll>
                    {/* <li className='hover:text-[#1ca350] pt-2'>Products Available</li> */}
                    <LinkScroll to='facilities' spy={true} smooth={true} offset={-150} duration={500}>
                        <li className='hover:text-[#1ca350] pt-2 cursor-pointer' onClick={handleHome}>Gym/Facilities</li>
                    </LinkScroll>
                </ul>
            </div>
            <div className='px-0 md:px-0'>
            <h1 className='text-2xl font-bold mb-4 text-[#1ca350]'>Social Media</h1>
                <ul>
                    <a href='https://www.facebook.com/people/ADAM-FitnessCenter/100066718838043/' target='_blank' rel='noreferrer'><li className='hover:text-[#1ca350]'>Facebook</li></a>
                </ul>
            </div>
        </div>
        <div className='flex flex-col justify-center items-center mx-[40px] mt-[30px]'>
            <h1 className='flex'><p className='mr-[5px] text-[#1ca350]'>Store Hours:</p> 8 AM to 9 PM</h1>
            <a href='https://goo.gl/maps/6PZFiUac43b8tqCP7' target='_blank' rel='noreferrer'><h1 className='hover:text-[#1ca350]'>ADAM Fitness Center, M. L. Quezon Avenue, Antipolo, Rizal</h1></a>
        </div>
    </div>
  )
}

export default Footer