import React from 'react'
import boxing from '../imgs/boxing.jpg'
const Boxing = () => {
  return (
    <div className='bg-[#d3d3d3] md:pt-[20px] md:pb-[0px] text-justify shadow-md' id='boxing'>
        <div className='hidden md:grid md:grid-cols-2 max-w-[1240px] mx-auto md:justify-center'>
            <div className='h-[80%] flex justify-center m-[5px]'>
                <img src={boxing} alt='' className='rounded-2xl drop-shadow-md'/>
            </div>
            <div className='mx-10'>
                <h1 className='text-[#1ca350] font-extrabold text-[40px]'>Boxing</h1>
                <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    </div>
  )
}

export default Boxing