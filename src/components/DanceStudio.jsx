import React from 'react'
import danceStudio from '../imgs/Dance Studio.jpg'
import danceStudio4 from '../imgs/Dance Studio 4.jpg'

const DanceStudio = () => {
  return (
    <div className='bg-[#d3d3d3] md:pt-[40px] md:pb-[20px] text-justify' id='danceStudio'>
        <div className=' max-w-[1240px] mx-auto md:justify-center'>
          <h1 className='text-[#1ca350] font-extrabold text-center text-[40px]'>Dance Studio</h1>
            <div className='mx-[10px] hidden md:grid md:grid-cols-2'>
            <div className='m-[10px]'>
                <img src={danceStudio} alt='' className=' rounded-2xl drop-shadow-md'/>
              </div>
              <div className='m-[10px]'>
                <img src={danceStudio4} alt='' className=' rounded-2xl drop-shadow-md'/>
              </div>

            </div>
        </div>
    </div>
  )
}

export default DanceStudio