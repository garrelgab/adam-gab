import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios';
// import { response } from 'express';

const UpdateReservation = (props) => {

    const reservationID = props.reserveID;
    const reservationStatus = 'Approved';
    const handleUpdateReservation = () => {
        axios.put('http://localhost:3001/approved', {
            status: reservationStatus, 
            id: reservationID,
        })
        .then((response) => {
            console.log(response.data);
            alert('Approved!');
        })
        .catch((error) => {
            console.log('Error',error);
        });
        props.onClose(false);
    }
  return (
    <div className='fixed flex align-middle justify-center pt-[90px] top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-white w-[300px] md:w-[500px] h-[320px] mt-[50px] z-50 bg-[#1ca350] rounded-md shadow-xl'>
            <button className='md:ml-[90%] ml-[85%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            <div className='mx-[50px] '>
                <h1 className='md:text-[25px] font-bold'>{props.eventTitle}</h1>
                <h1 className='md:text-[25px] font-light mt-[40px]'>{props.eventStart}</h1>
                <h1 className='md:text-[25px] font-light'>{props.eventEnd}</h1>
                {/* <h1 className='md:text-[25px] font-light'>{reservationID}</h1> */}

                <div className='flex justify-end mt-[80px] md:mt-[40px]'>
                    <button className='w-[100px] md:w-[150px] p-2 md:text-lg font-bold rounded-md bg-white hover:bg-gray-500 ease-in-out duration-300 text-[#1ca350] hover:text-white shadow-lg hover:shadow-xl' onClick={handleUpdateReservation}>Approved</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default UpdateReservation