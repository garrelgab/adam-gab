import React from 'react'
import gymWorkout from '../imgs/Gym Workout Area.jpg'
import gymWorkout2 from '../imgs/Gym Workout Area 2.jpg'
import gymWorkout3 from '../imgs/Gym Workout Area 3.jpg'

const GymWorkouts = () => {
  return (
    <div className='bg-[#d3d3d3] md:pt-[20px] md:pb-[20px] text-justify shadow-md' id='gymWorkouts'>
        <div className=' max-w-[1240px] mx-auto md:justify-center items-center'>
        <h1 className='text-[#1ca350] font-extrabold text-center text-[40px]'>Gym Workouts</h1>
            <div className='hidden md:grid md:grid-cols-2'>
              
              <div className='m-[10px]'>
                <img src={gymWorkout} alt='' className=' rounded-2xl drop-shadow-md'/>
              </div>
              <div className='m-[10px]'>
                <img src={gymWorkout2} alt='' className=' rounded-2xl drop-shadow-md'/>
              </div>
              <div className='m-[10px]'>
                <img src={gymWorkout3} alt='' className=' rounded-2xl drop-shadow-md'/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default GymWorkouts