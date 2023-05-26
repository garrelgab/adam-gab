import React, { useEffect, useState } from 'react'
import {DataGrid} from '@mui/x-data-grid'
import Axios from 'axios'
const DashboardMembership = () => {

  const columns = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'fname', headerName: 'First Name', width: 300},
    { field: 'lname', headerName: 'Last Name', width: 300},
    { field: 'age', headerName: 'Age', width: 100},
    { field: 'gender', headerName: 'Gender', width: 150},
    { field: 'bday', headerName: 'Birthday', width: 200},
    { field: 'email', headerName: 'Email', width: 300},
    { field: 'datecreated', headerName: 'Account Date Created', width: 200},

  ]

  const[rows, setRows] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/members")
    .then((response) => {
      const rows = response.data.map(item => ({
        id: item.account_info_id,
        fname: item.fname,
        lname: item.lname,
        age: item.age,
        gender: item.gender,
        bday: item.bday,
        email: item.email,
        datecreated: item.date_created,
        // add more columns as needed
      }));
      setRows(rows);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div className='flex justify-center flex-col px-[50px] py-[90px] bg-[#d3d3d3] text-black'>
      <h1 className='text-[30px] text-[#1ca350] font-extrabold mb-[30px]'>Customer User Account</h1>  
      <div className='mx-auto rounded-lg w-[100%] shadow-2xl text-center'>
        <div className='bg-white rounded-lg  items-center justify-center shadow-lg h-[700px] mt-[0px]'>
          <DataGrid rows={rows} columns={columns} className='text-center' disableExtendRowFullWidth/>
        </div>
        {/* <h1 className='text-center text-[100px] py-[300px]'>Members</h1> */}
      </div>
    </div>
  )
}

export default DashboardMembership