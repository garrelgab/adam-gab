import React from 'react'
import gymWorkout from '../imgs/gymWorkout.jpg'

const GymWorkouts = () => {
  return (
    <div className='bg-[#2a2a2a] md:pt-[20px] md:pb-[20px] text-justify' id='gymWorkouts'>
        <div className='hidden md:grid md:grid-cols-2 max-w-[1240px] mx-auto md:justify-center'>
            <div className='flex justify-center m-[5px]'>
                <img src={gymWorkout} alt='' className='rounded-2xl drop-shadow-md'/>
            </div>
            <div className='mx-10'>
                <h1 className='text-[#93F4D3] font-extrabold text-[40px]'>Gym Workouts</h1>
                <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    </div>
  )
}

export default GymWorkouts