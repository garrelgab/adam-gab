import React, { useState } from 'react'
import axios from 'axios'

const CustomerChangePassword = (props) => {

  // const [pword, setPword] = useState('');
  // const [cpword, setCPword] = useState('');
  
  const [currentPword, setCurrentPword] = useState('');
  const [newPword, setNewPword] = useState('');
  const [confirmPword, setConfirmPword] = useState('');

  const userID = props.id;
  const handleUpdateCustomerPassword = () => {
    if (newPword !== confirmPword) {
      alert('New password and confirm password must match!');
      setNewPword('');
      setConfirmPword('');
      return;
    }

    axios
      .put('http://localhost:3001/api/customer-pass', {
        customerID: props.id,
        currentPword: currentPword,
        newPword: newPword,
        confirmPword: confirmPword,
      })
      .then(() => {
        alert('Customer password updated successfully!');
        setCurrentPword('');
        setNewPword('');
        setConfirmPword('');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          console.log('Error:', error);
        }
    });
    setCurrentPword('');
    setNewPword('');
    setConfirmPword('');
  };
  

  // const handleUpdateCustomerPassword = () => {
  //   if(pword !== cpword){
  //     alert('Password and Confirm Password must match!');
  //     setPword('');
  //     setCPword('');
  //     return;
  //   }

  //   axios.put('http://localhost:3001/api/customer-pass', {
  //     customerPword: pword,
  //     customerCPword: cpword,
  //     customerID: props.id,
  //   })
  //   .then((response) => {
  //       console.log(response.data[0]);
  //       alert('Customer Password Updated Successfully!');
  //   })
  //   .catch((error) => {
  //       console.log('Error',error);
  //   });
  //   setPword('');
  //   setCPword('');
  // }
  return (
    <div className='flex justify-center bg-[#d3d3d3] text-black'>
        <div className='py-[90px]'>
            <h1 className=' text-[30px] font-extrabold text-center mb-[50px] text-[#1ca350]'>Change Password?</h1>
            <div className=''>
              <label className="block mb-1 text-md md:text-lg mx-auto text-left font-bold text-[#1ca350] ">Enter Current Password</label>
              <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Current Password' value={currentPword} onChange={(e) => setCurrentPword(e.target.value)}/>
              <label className="block mb-1 text-md md:text-[30px] mx-auto text-center text-[#1ca350] font-extrabold my-[30px]">Set a new password</label>
              <label className="block mb-1 mt-[30px] text-md md:text-lg mx-auto text-left font-bold text-[#1ca350]">New Password</label>
              <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='New Password' value={newPword} onChange={(e) => setNewPword(e.target.value)}/>
              <label className="block mb-1 text-md md:text-lg mx-auto text-left font-bold text-[#1ca350]">Confirm Password</label>
              <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Confirm New Password' value={confirmPword} onChange={(e) => setConfirmPword(e.target.value)}/>
            </div>
            <div className='mt-[50px] md:mt-[150px] text-center'>
                <button className='w-[350px] p-3 text-xl font-bold ease-in-out duration-300 rounded-xl bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white mb-[50px] shadow-lg hover:shadow-xl' onClick={handleUpdateCustomerPassword}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default CustomerChangePassword