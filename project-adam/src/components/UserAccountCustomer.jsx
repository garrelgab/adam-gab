import React from 'react'

const UserAccountCustomer = (props) => {
  return (
    <div className='mx-[50px] mt-[90px]'>
        <div className='flex items-center justify-between'>
            <h1 className='text-[30px] text-[#93F4D3] font-light'>Customer User Account</h1>  
            <button className='py-2 justify-start px-[50px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white'>Add User</button>
        </div>
    </div>
  )
}

export default UserAccountCustomer