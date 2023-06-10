import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import axios from 'axios';
const DashboardCustomerService = () => {
    const [rows, setRows] = useState([]);
    const columns = [
        {field: 'id', headerName: 'ID', flex: 1},
        {field: 'email', headerName: 'Email', flex: 1},
        {field: 'contact', headerName: 'Contact No', flex: 1},
        {field: 'date', headerName: 'Date', flex: 1},
        {
            field: 'status',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
              if (params.row.status === 'Reset') {
                return <span>Reset</span>;
              } else {
                return (
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
                  }}
                  onClick={() => handleReset(params.row)}>
                  Action
                  </Button>
                )
              }
            }
        },
    ]

    const handleReset = () => {

    };

    const fetchCustomerService = () => {
        axios.get('http://localhost:3001/customer-service')
        .then(response => {
            const rows = response.data.map(item => ({
                id: item.customer_service_id,
                email: item.email,
                contact: item.contact_no,
                date: item.date,
            }));
            setRows(rows);
        })
        .catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        fetchCustomerService();
    }, []);
  return (
    <div className='mx-[50px] mt-[90px]'>
        <h1 className='text-[30px] md:text-[35px] font-extrabold text-[#1ca350]'>Customer Service</h1>
        <h1 className='md:text-[25px] mt-[30px] font-extrabold text-[#1ca350]'>Reset Password</h1>
        <div className='w-[100%] mt-[30px] h-[700px] bg-white rounded-md'>
            <DataGrid rows={rows} columns={columns} />
        </div>
    </div>
  )
}

export default DashboardCustomerService