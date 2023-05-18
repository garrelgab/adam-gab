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
    <div className='flex justify-center flex-col mx-[50px] mt-[90px] text-black'>
      <h1 className='text-[30px] text-[#93F4D3] font-light'>Members</h1>
      <div className='mx-auto rounded-lg shadow-2xl text-center'>
        <div className='bg-white rounded-lg items-center justify-center shadow-2xl mt-[30px]'>
          <DataGrid rows={rows} columns={columns} className='text-center' disableExtendRowFullWidth/>
        </div>
        {/* <h1 className='text-center text-[100px] py-[300px]'>Members</h1> */}
      </div>
    </div>
  )
}

export default DashboardMembership