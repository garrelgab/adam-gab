import React, { useEffect, useState } from 'react'
import {DataGrid} from '@mui/x-data-grid'
import Axios from 'axios'
import Button from '@mui/material/Button';
import axios from 'axios';
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
    {
      field: 'account',
      headerName: 'Account',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: 'white',
            color: 'gray',
            '&:hover': {
              backgroundColor: 'gray',
              color: 'white',
            },
            marginTop: '3px',
            marginBottom: '3px',
            width: '100px'
          }}
          onClick={() => handleAccount(params.row.id, params.row.status, params.row.fname, params.row.lname)}
          >
            {/* Archive */}
            {params.row.status === 'Active' ? 'Disable' : 'Enable'}
        </Button>
      ),
    },
  ]

  const[rows, setRows] = useState([]);

  const fetchCustomerUser = () => {
    Axios.get("http://localhost:3001/members")
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
        status: item.status,
        // add more columns as needed
      }));
      setRows(rows);
    })
    .catch(error => {
      console.error(error);
    });
  }
  useEffect(() => {
    fetchCustomerUser();
  }, []);

  const active = 'Active';
  const inactive = 'In-Active'
  const handleAccount = (id, status, fname, lname) => {

    // alert(`${status}`);
    if(status === 'Active'){
      axios.put('http://localhost:3001/update-account-status', {
        accID: id,
        status: inactive,
      })
      .then(response => {
        alert(`User: ${fname} ${lname} account has been disable.`);
        fetchCustomerUser();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    } else {
      axios.put('http://localhost:3001/update-account-status', {
          accID: id,
          status: active,
        })
        .then(response => {
          alert(`User: ${fname} ${lname} account has been enable.`);
          fetchCustomerUser();
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  };
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