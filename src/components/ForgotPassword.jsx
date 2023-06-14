import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const handleConfirm = () => {
        if(!email || !contact) {
            alert('Please fill up the empty fields.');
            return;
        }
        axios.post('http://localhost:3001/add-customer-service', {
            email: email,
            contact: contact,
        })
        .then(response => {
            alert('Please wait the admin to response your request');
            setEmail('');
            setContact('');
            props.setTrigger(false)
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                alert('You already send your request, wait the admin to response your request.');
                setEmail('');
                setContact('');
                props.setTrigger(false);
            } else {
                alert('An error occurred during the proof of payment submission');
                console.log(error);
            }
        });
    };

    const handleChangeAmount = (event) => {
        const inputValue = event.target.value;
        // Validate if the input is a non-negative number
        if (!isNaN(inputValue) && Number(inputValue) >= 0) {
            setContact(inputValue);
        }
      };
  return (
    <div className='fixed flex align-middle justify-center pt-[20px] top-0 left-0 w-[100%] h-[100%] bg-modal'>
        <div className='text-black md:text-black shadow-md bg-[#1ca350] max-h-[670px] md:max-h-[600px] w-[400px] md:w-[500px] rounded-xl'>
            <div className='text-white'>
                <button className='ml-[90%] mt-[5%]' onClick={() => props.setTrigger(false)}>
                    <AiOutlineClose size={25}/>
                </button>
            </div>
            <h1 className='text-[20px] font-bold text-white'>Forgot Password</h1>
            <div className='mt-[100px] md:mt-[80px] max-w-[350px] mx-auto'>
                <label className="block mb-1 text-l md:text-l mx-auto text-left font-light text-white">Email</label>
                <input type="text"className="shadow-lg block w-[350px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:outline-none" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='mt-[100px] md:mt-[30px] max-w-[350px] mx-auto'>
                <label className="block mb-1 text-l md:text-l mx-auto text-left font-light text-white">Contact No.</label>
                <input type="text"className="shadow-lg block w-[350px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:outline-none" value={contact} placeholder='Contact No.' onChange={handleChangeAmount}/>
            </div>
            <button className='shadow-lg w-[350px] mt-[150px] p-3 text-xl font-bold rounded-xl text-[#1ca350] hover:text-white bg-white hover:bg-gray-500 ease-in-out duration-300' onClick={handleConfirm}>Confirm</button>

        </div>
    </div>
  )
}

export default ForgotPassword