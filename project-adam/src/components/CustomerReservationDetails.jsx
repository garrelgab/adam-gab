import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const CustomerReservationDetails = (props) => {
  return (
    <div className='fixed flex align-middle justify-center pt-[90px] top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-black w-[300px] md:w-[500px] h-[200px] md:h-[320px] mt-[50px] z-50 bg-[#93F4D3] rounded-md shadow-xl'>
            <button className='md:ml-[90%] ml-[85%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            <div className='mx-[50px] '>
                <h1 className='md:text-[25px] font-bold'>{props.eventTitle}</h1>
                <h1 className='md:text-[25px] font-light mt-[40px]'>{props.eventStart}</h1>
                <h1 className='md:text-[25px] font-light'>{props.eventEnd}</h1>
                {/* <h1 className='md:text-[25px] font-light'>{reservationID}</h1> */}
            </div>
            
        </div>
    </div>
  )
}

export default CustomerReservationDetails