import React from 'react'
import { Link as LinkRouter } from 'react-router-dom';
const Hero = () => {
  return (
    <div className='py-[285px] bg-[#d3d3d3] text-black drop-shadow-md'>
        <div className='flex justify-center max-w-[1240px] mx-auto'>
            <div className='mx-3'>
                <h1 className='hidden md:flex md:text-[80px] font-extrabold '>ADAM<p className='text-[#1ca350] px-[19px]'>FITNESS</p>CENTER</h1>
                <p className='hidden md:flex text-justify text-[20px] font-bold'>A wonderful place to start your fitness journey is by choosing a personal trainer from ADAM Fitness who has the credentials to work out safely and effectively!</p>
                {/* <button className='font-bold bg-[#93F4D3] hover:outline hover:outline-offset-0 hover:bg-[#19313800] text-black hover:text-white rounded-md w-[250px] my-6 py-2 ease-in-out duration-300' onClick={handleSignup}>BECOME A MEMBER</button> */}
                <LinkRouter to="/signup">
                  <button className='font-bold bg-[#1ca350] hover:outline outline-black hover:outline-offset-0 hover:bg-[#19313800] text-white hover:text-black rounded-md w-[250px] my-6 py-2 ease-in-out duration-300'>BECOME A MEMBER</button>
                </LinkRouter>
            </div>
        </div>
    </div>
  )
}

export default Hero