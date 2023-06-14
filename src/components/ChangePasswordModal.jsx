import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
const ChangePasswordModal = (props) => {

    const [pword, setPword] = useState('');
    const [confirmPword, setConfirmPword] = useState('');

    const handleSave = () => {
        if(!pword || !confirmPword) {
            alert('Please fill up the empty field.');
            return;
        }
        if(pword < 8 || confirmPword < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }
        if (pword !== confirmPword) {
            alert('New password and confirm password must match!');
            return;
        }
        axios.put('http://localhost:3001/update-customer-pass', {
            newPass: pword,
            confirmNewPass: confirmPword,
            customerEmail: props.Email,
        })
        .then(response => {
            console.log(response);
            alert(`Customer password changed.`);
            props.fetchCustomerService();
            props.onClose(false);
        })
        .catch(error => {
            console.log(error);
        })
    };
  return (
    <div className='fixed flex align-middle items-center justify-center top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-white w-[300px] md:w-[400px] h-auto max-h-[600px] my-[10px] z-50 bg-[#1ca350] rounded-md shadow-xl'>
            <button className='ml-[90%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            <div className='mx-[30px] mb-[30px]'>
                <h1 className='font-bold text-[30px] md:text-[40px]'>{props.Email}</h1>
                <div className='my-[2px]'>
                    <h1 className='md:text-[18px] mt-[0px] text-white font-bold'>New Password</h1>
                    <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Reference Number' value={pword} onChange={(e) => setPword(e.target.value)} required/>
                </div>
                <div className='my-[2px]'>
                    <h1 className='md:text-[18px] text-white font-bold'>Confirm New Password</h1>
                    <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Amount' value={confirmPword} onChange={(e) => setConfirmPword(e.target.value)} required/>
                </div>
                <div className='flex justify-end my-[40px]'>
                    <button className='w-[150px] p-2 text-lg font-bold rounded-md bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white ease-in-out duration-300 shadow-lg hover:shadow-xl' onClick={handleSave}>Confirm</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangePasswordModal