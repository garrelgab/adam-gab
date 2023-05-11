import React from 'react'
import { Link as LinkScroll } from 'react-scroll/modules'

const ServiceOffer = () => {
  return (
    <div className='py-[20px] md:py-[90px] md:drop-shadow-md' id='services'>
        <h1 className='flex justify-center text-[40px] md:text-[50px] font-extrabold text-[#93F4D3] mb-[30px]'>Services Offered</h1>
        <div className='mx-[30px] md:flex md:flex-col-4 justify-center text-white'>
            <LinkScroll to='danceStudio' spy={true} smooth={true} offset={-150} duration={500}>
                <div className='bg-gray-500 h-[200px] md:h-[300px] md:w-[350px] rounded-2xl flex justify-center items-center my-4 md:mx-4 md:my-0 cursor-pointer'>
                    <h1 className='p-[50px] text-[30px] text-center font-extrabold'>Dance Studio</h1>
                </div>
            </LinkScroll>
            <LinkScroll to='gymWorkouts' spy={true} smooth={true} offset={-150} duration={500}>
                <div className='bg-gray-500 h-[200px] md:h-[300px] md:w-[350px] rounded-2xl flex justify-center items-center my-4 md:mx-4 md:my-0 cursor-pointer'>
                    <h1 className='p-[50px] text-[30px] text-center font-extrabold'>Gym Workouts</h1>
                </div>
            </LinkScroll>
            <LinkScroll to='muayThai' spy={true} smooth={true} offset={-150} duration={500}>
                <div className='bg-gray-500 h-[200px] md:h-[300px] md:w-[350px] rounded-2xl flex justify-center items-center my-4 md:mx-4 md:my-0 cursor-pointer'>
                    <h1 className='p-[50px] text-[30px] text-center font-extrabold'>Muay Thai</h1>
                </div>
            </LinkScroll>
            <LinkScroll to='boxing' spy={true} smooth={true} offset={-150} duration={500}>
                <div className='bg-gray-500 h-[200px] md:h-[300px] md:w-[350px] rounded-2xl flex justify-center items-center my-4 md:mx-4 md:my-0 cursor-pointer'>
                    <h1 className='p-[50px] text-[30px] text-center font-extrabold'>Boxing</h1>
                </div>
            </LinkScroll>
        </div>
    </div>
  )
}

export default ServiceOffer