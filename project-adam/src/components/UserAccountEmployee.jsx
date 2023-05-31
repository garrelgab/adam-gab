import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import UserEmployeeModal from './UserEmployeeModal';
import PosTabs from './PosTabs';
import axios from 'axios';
const UserAccountEmployee = (props) => {
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const [rows, setRows] = useState([]);
  const rowHeight = 100;
  const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Employee Name', width: 450},
    {field: 'age', headerName: 'Age', width: 100},
    {field: 'gender', headerName: 'Gender', width: 100},
    {field: 'bday', headerName: 'Birthday', width: 150},
    {field: 'email', headerName: 'Email', width: 150},
    {field: 'role', headerName: 'Role Type', width: 150},
    {field: 'date', headerName: 'Date Account Created', width: 200},
  ];

  // const [openModal, setOpenModal] = useState(false);
  // const handleOpenModal = () => {
  //   setOpenModal(!openModal);
  // }
  const fetchEmployee = () => {
    axios.get('http://localhost:3001/api/employee-list')
    .then(response => {
      const rows = response.data.map(item => ({
        id: item.account_info_id,
        name: item.fname + " " + item.lname,
        age: item.age,
        gender: item.gender,
        bday: item.bday,
        email: item.email,
        role: capitalizeFirstLetter(item.role),
        date: item.date_created,
        // add more columns as needed
      }));
      setRows(rows);
    })
    .catch(error => {

    })
  }
  useEffect(() => {
    fetchEmployee();
  },[]);
  const tabs = [
    {
      title: 'Employee List',
      content: 
      <div className='hidden bg-white mt-[30px] mx-auto w-[100%] md:h-[600px] md:flex rounded-md justify-center items-center'>
        <DataGrid rows={rows} columns={columns} className='text-center w-[100%]' rowHeight={rowHeight} disableExtendRowFullWidth/>
      </div>
    },
    {
      title: 'Add new user',
      content: <UserEmployeeModal fetchEmployee={fetchEmployee}/>
    }
  ];
  return (
    <div className='px-[50px] h-[1000px] py-[90px] bg-[#d3d3d3]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Employee User Account</h1>  
        {/* <button className='py-2 justify-start px-[50px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleOpenModal}>Add User</button> */}
      </div>
      <div>
        <PosTabs tabs={tabs}/>
      </div>
      {/* <div className='hidden bg-white mt-[30px] mx-auto w-[100%] md:h-[600px] md:flex rounded-md justify-center items-center'>
        <DataGrid rows={rows} columns={columns} className='text-center' rowHeight={rowHeight} disableExtendRowFullWidth/>
      </div> */}
      {/* {openModal && <UserEmployeeModal onClose={handleOpenModal}/>} */}
    </div>
  )
}

export default UserAccountEmployee