import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
const DashboardMembershipModule = () => {
    const formatPrice = (price) => {
        return Number(price).toFixed(2);
    };

    const [rows, setRows] = useState([]);
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        // {field: 'accID', headerName: 'Account ID', width: 100},
        {field: 'name', headerName: 'Customer Name', width: 200},
        {field: 'email', headerName: 'Email', width: 250},
        {field: 'type', headerName: 'Membership Type', width: 200},
        {field: 'amount', headerName: 'Amount', width: 150},
        {field: 'start', headerName: 'Date Start', width: 150},
        {field: 'end', headerName: 'Date End', width: 150},
        {field: 'date', headerName: 'Date and Time', width: 200},
        {field: 'status', headerName: 'Status', width: 150},
        // {field: 'actions', headerName: 'Actions', width: 150},
    ];

    const fetchMembershipData = () => {
        axios.get('http://localhost:3001/api/membership')
        .then(response => {
            const rows = response.data.map(item => ({
                id: item.membership_id,
                accID: item.account_info_id,
                name: item.name,
                email: item.email,
                type: item.membership_type,
                amount: formatPrice(item.amount),
                start: item.start_date,
                end: item.end_date,
                date: item.date + " " + item.time,
                status: item.status,
            }));
            setRows(rows);
        })
        .catch(error => {
            console.log(error);
        })
    };
    useEffect(() => {
        fetchMembershipData();
    }, []);
  return (
    <div className='mt-[90px] mx-[50px]'>
        <h1 className='text-[30px] md:text-[35px] font-extrabold text-[#1ca350]'>Membership</h1>
        <div className='bg-white h-[700px] w-[100%] rounded-md mt-[30px]'>
            <DataGrid rows={rows} columns={columns} rowHeight={100} className='w-[100%]'/>
        </div>
    </div>
  )
}

export default DashboardMembershipModule