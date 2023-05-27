import React, { useState } from 'react'
import axios from 'axios'

const CustomerChangePassword = (props) => {

  const [pword, setPword] = useState('');
  const [cpword, setCPword] = useState('');

  const handleUpdateCustomerPassword = () => {
    if(pword !== cpword){
      alert('Password and Confirm Password must match!');
      setPword('');
      setCPword('');
      return;
    }

    axios.put('http://localhost:3001/api/customer-pass', {
      customerPword: pword,
      customerCPword: cpword,
      customerID: props.id,
    })
    .then((response) => {
        console.log(response.data[0]);
        alert('Customer Password Updated Successfully!');
    })
    .catch((error) => {
        console.log('Error',error);
    });
    setPword('');
    setCPword('');
  }
  return (
    <div className='flex justify-center bg-[#d3d3d3] text-black'>
        <div className='py-[90px]'>
            <h1 className=' text-[30px] font-extrabold text-center mb-[50px] text-[#1ca350]'>Change Password?</h1>
            <div className=''>
              <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">Enter Password</label>
              <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Password' value={pword} onChange={(e) => setPword(e.target.value)}/>
              <label className="block mb-1 text-md md:text-[30px] mx-auto text-center text-[#1ca350] font-extrabold my-[30px]">Set a new password</label>
              <label className="block mb-1 mt-[30px] text-md md:text-lg mx-auto text-left font-light ">New Password</label>
              <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Password' value={pword} onChange={(e) => setPword(e.target.value)}/>
              <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light">Confirm Password</label>
              <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Confirm Password' value={cpword} onChange={(e) => setCPword(e.target.value)}/>
            </div>
            <div className='mt-[50px] md:mt-[150px] text-center'>
                <button className='w-[350px] p-3 text-xl font-light rounded-xl bg-gray-600 hover:bg-gray-800 text-white mb-[50px] shadow-lg hover:shadow-xl' onClick={handleUpdateCustomerPassword}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default CustomerChangePassword