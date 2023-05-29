import React from 'react'
import DanceStudio from './DanceStudio'
import GymWorkouts from './GymWorkouts'
// import MuayThai from './MuayThai'
// import Boxing from './Boxing'
const Facilities = () => {
  return (
    <div id='facilities' className='bg-[#d3d3d3] hidden md:flex md:flex-col'>
        <h1 className='flex justify-center text-[40px] md:text-[50px] py-[70px] font-extrabold text-[#1ca350] mb-[30px]'>Facilities</h1>
        <DanceStudio/>
        <GymWorkouts/>
        {/* <MuayThai/> */}
        {/* <Boxing/> */}
    </div>
    )
}

export default Facilities