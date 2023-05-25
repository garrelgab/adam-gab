import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const UserEmployeeModal = (props) => {
  return (
    <div className='fixed flex align-middle justify-center pt-[90px] top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-black w-[500px] h-[500px] mt-[50px] z-50 bg-[#93F4D3] rounded-md shadow-xl'>
            <button className='ml-[90%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            <div className='mx-[50px]'>
                <h1>Add User Employee</h1>
            </div>
        </div>
        
    </div>
  )
}

export default UserEmployeeModal