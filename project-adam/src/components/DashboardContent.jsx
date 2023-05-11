import React from 'react'

const DashboardContent = () => {
  return (
    <div className='mx-[50px] mt-[30px] text-black'>
      <h1 className='text-[30px] text-white font-light'>Dashboard</h1>
      <div className='blocked flex md:justify-between  mt-[20px] mx-[0px]'>
        <div className='bg-[#D9D9D9] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-0 md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-xl text-center font-light mt-[-50px] mb-[0px]'>Total Members</h1>
          <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>20</h1>
        </div>
        <div className='bg-[#D9D9D9] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-0 md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-xl text-center font-light mt-[-50px] mb-[0px]'>Total Members</h1>
          <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>20</h1>
        </div>
        <div className='bg-[#D9D9D9] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-0 md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-xl text-center font-light mt-[-50px] mb-[0px]'>Total Members</h1>
          <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>20</h1>
        </div>
      </div>
      <div className='bg-[#D9D9D9] mt-[20px] rounded-lg'>
        <h1 className='text-center text-[100px] py-[200px]'>Calendar</h1>
      </div>
    </div>
  )
}

export default DashboardContent