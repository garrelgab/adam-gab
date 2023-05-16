import React from 'react'
import { Link as LinkScroll } from 'react-scroll/modules';
import { Link as LinkRouter } from 'react-router-dom';

const Footer = () => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  return (
    <div className='py-[50px]'>
        <div className='max-w-[840px] mx-auto flex flex-cols-3 justify-center text-white'>
            <div className='px-0 md:px-0'>
                <h1 className='text-2xl font-bold mb-4 text-[#93F4D3]'>Company</h1>
                <ul>
                    <LinkScroll to='company' spy={true} smooth={true} offset={0} duration={500}>
                        <li className='hover:text-[#93F4D3] cursor-pointer'>About Us</li>
                    </LinkScroll>
                    <li className='hover:text-[#93f4d3] pt-2'>FAQ's</li>
                    <li className='hover:text-[#93f4d3] pt-2 '>Terms and Conditions</li>
                    <LinkRouter to='/privacypolicy' onClick={handleClick}>
                        <li className='hover:text-[#93f4d3] pt-2'>Privacy Policy</li>
                    </LinkRouter>
                </ul>
            </div>
            <div className='px-3 md:px-[100px]'>
            <h1 className='text-2xl font-bold mb-4 text-[#93F4D3]'>Gym</h1>
                <ul>
                    <LinkScroll to='services' spy={true} smooth={true} offset={-150} duration={500}>
                        <li className='hover:text-[#93F4D3] cursor-pointer'>Service Offers</li>
                    </LinkScroll>
                    <li className='hover:text-[#93f4d3] pt-2'>Products Available</li>
                    <li className='hover:text-[#93f4d3] pt-2'>Gym/Facilities</li>
                    <li className='hover:text-[#93f4d3] pt-2'>Opening Hours</li>
                </ul>
            </div>
            <div className='px-0 md:px-0'>
            <h1 className='text-2xl font-bold mb-4 text-[#93F4D3]'>Social Media</h1>
                <ul>
                    <a href='https://www.facebook.com/people/ADAM-FitnessCenter/100066718838043/' target='_blank' rel='noreferrer'><li className='hover:text-[#93F4D3]'>Facebook</li></a>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer