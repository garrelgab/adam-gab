import React from 'react'

const CustomerChangePassword = () => {
  return (
    <div className='flex justify-center text-white'>
        <div className='py-[50px]'>
            <h1 className=' text-[30px] font-light text-center mb-[50px]'>Change Password?</h1>
            
            <div className=''>
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">Password</label>
                <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Password'/>
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light">Confirm Password</label>
                <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Confirm Password'/>
            </div>
            <div className='mt-[50px] md:mt-[150px] text-center'>
                <button className='w-[350px] p-3 text-xl font-light rounded-xl bg-gray-600 hover:bg-gray-800 text-white mb-[50px] shadow-lg hover:shadow-xl'>Confirm</button>
            </div>
        </div>
        
    </div>
  )
}

export default CustomerChangePassword