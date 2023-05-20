import React from 'react'
import DanceStudio from './DanceStudio'
import GymWorkouts from './GymWorkouts'
import MuayThai from './MuayThai'
import Boxing from './Boxing'
const Facilities = () => {
  return (
    <div id='facilities' className='bg-[#2a2a2a] hidden md:flex md:flex-col'>
        <h1 className='flex justify-center text-[40px] md:text-[50px] py-[70px] font-extrabold text-[#93F4D3] mb-[30px]'>Facilities</h1>
        <DanceStudio/>
        <GymWorkouts/>
        <MuayThai/>
        <Boxing/>
    </div>
    )
}

export default Facilities