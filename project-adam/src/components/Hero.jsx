import React from 'react'
import { Link as LinkRouter } from 'react-router-dom';
const Hero = () => {
  return (
    <div className='py-[50px] md:py-[285px] bg-[#1a1a1a] text-white md:drop-shadow-md'>
        <div className='flex justify-center max-w-[1240px] mx-auto'>
            <div className='mx-3'>
                <h1 className='hidden md:flex md:text-[80px] font-extrabold '>ADAM<p className='text-[#93F4D3] px-[19px]'>FITNESS</p>CENTER</h1>
                <p className='hidden md:flex'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                {/* <button className='font-bold bg-[#93F4D3] hover:outline hover:outline-offset-0 hover:bg-[#19313800] text-black hover:text-white rounded-md w-[250px] my-6 py-2 ease-in-out duration-300' onClick={handleSignup}>BECOME A MEMBER</button> */}
                <LinkRouter to="/signup">
                  <button className='font-bold bg-[#93F4D3] hover:outline hover:outline-offset-0 hover:bg-[#19313800] text-black hover:text-white rounded-md w-[250px] my-6 py-2 ease-in-out duration-300'>BECOME A MEMBER</button>
                </LinkRouter>
            </div>
        </div>
    </div>
  )
}

export default Hero