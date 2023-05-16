import React from 'react'
import Sample1 from '../imgs/sample1.png'
const Company = () => {
  return (
    <div className='bg-[#2a2a2a] py-[50px] md:py-[100px] text-justify text-white md:drop-shadow-md' id='company'>
        <div className='max-w-[1240px] mx-auto p-5 grid md:grid-cols-2 justify-center rounded-2xl'>
            <div className=''>
                <img src={Sample1} alt='' className='rounded-2xl'/>
            </div>
            <div className='px-0 md:px-10'>
                <h1 className='text-[30px] md:text-[40px] font-bold text-[#93F4D3]'>Company</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className='hidden md:flex md:flex-col px-0 md:pr-10 py-10'>
                <h1 className='text-[30px] md:text-[40px] font-bold text-[#93F4D3]'>About</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className='pt-10'>
                <img src={Sample1} alt='' className='rounded-2xl'/>
            </div>
            <div className='flex flex-col md:hidden px-0 md:px-10'>
                <h1 className='text-[30px] md:text-[40px] font-bold text-[#93F4D3]'>About</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    </div>
  )
}

export default Company