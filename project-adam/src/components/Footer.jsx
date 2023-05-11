import React from 'react'
import { Link as LinkScroll } from 'react-scroll/modules'

const Footer = () => {
  return (
    <div className='py-[50px]'>
        <div className='max-w-[840px] mx-auto flex flex-cols-3 justify-center text-white'>
            <div className='px-0 md:px-0'>
                <h1 className='text-2xl font-bold mb-4 text-[#93F4D3]'>Company</h1>
                <ul>
                    <LinkScroll to='company' spy={true} smooth={true} offset={0} duration={500}>
                        <li className='hover:text-[#93F4D3] cursor-pointer'>About Us</li>
                    </LinkScroll>
                    <a href=''><li className='hover:text-[#93f4d3] pt-2'>FAQ's</li></a>
                    <a href=''><li className='hover:text-[#93f4d3] pt-2 '>Terms and Conditions</li></a>
                    <a href=''><li className='hover:text-[#93f4d3] pt-2'>Privacy Policy</li></a>
                </ul>
            </div>
            <div className='px-3 md:px-[100px]'>
            <h1 className='text-2xl font-bold mb-4 text-[#93F4D3]'>Gym</h1>
                <ul>
                    <LinkScroll to='services' spy={true} smooth={true} offset={-150} duration={500}>
                        <li className='hover:text-[#93F4D3] cursor-pointer'>Service Offers</li>
                    </LinkScroll>
                    <a href='#'><li className='hover:text-[#93f4d3] pt-2'>Products Available</li></a>
                    <a href='#'><li className='hover:text-[#93f4d3] pt-2'>Gym/Facilities</li></a>
                    <a href='#'><li className='hover:text-[#93f4d3] pt-2'>Opening Hours</li></a>
                </ul>
            </div>
            <div className='px-0 md:px-0'>
            <h1 className='text-2xl font-bold mb-4 text-[#93F4D3]'>Social Media</h1>
                <ul>
                    <a href='#'><li className='hover:text-[#93F4D3]'>Facebook</li></a>
                    <a href='#'><li className='hover:text-[#93f4d3] pt-2'>Instagram</li></a>
                    <a href='#'><li className='hover:text-[#93f4d3] pt-2'>Twitter</li></a>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer