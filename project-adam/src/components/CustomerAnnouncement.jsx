import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
const CustomerAnnouncement = (props) => {

    const userID = props.id;

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const [rows, setRows] = useState('');
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {
            field: 'title',
            headerName: 'Title',
            width: 300, // Set the desired width
            renderCell: (params) => (
            <div style={{ width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{params.value}</div>
            ),
        },
        {
            field: 'annContent',
            headerName: 'Message',
            width: 500, // Set the desired width
            renderCell: (params) => (
            <div style={{ width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{params.value}</div>
            ),
        },
        {field: 'date', headerName: 'Date', width: 250},
        // {field: 'status', headerName: 'Status', width: 250},

    ];

    // const getRowClassName = (params) => {
    //     const status = params.row.status;
    //     return status === 'Unread' ? 'font-bold' : '';
    // };
    
    const fetchAnnouncementData = () => {
        axios.get('http://localhost:3001/api/announcement')
        .then(response => {
            const rows = response.data.map(item => ({
                id: item.announcement_id,
                title: capitalizeFirstLetter(item.title),
                annContent: capitalizeFirstLetter(item.ann_content).replace(/<\/?p>/g, ''),
                date: item.date,
                status: item.status,
            }));
            setRows(rows);
        })
        .catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        fetchAnnouncementData();
    },[]);
  return (
    <div className='my-[90px] mx-[50px]'>
        <h1 className='text-[30px] font-extrabold text-[#1ca350]'>Announcement</h1>
        <div className='w-[100%] h-[700px] bg-white rounded-md my-[50px]'>
            {/* <DataGrid rows={rows} columns={columns} rowHeight={300} className='w-[100%]' getRowClassName={getRowClassName}/> */}
            <DataGrid rows={rows} columns={columns} rowHeight={300} className='w-[100%]'/>

        </div>
    </div>
  )
}

export default CustomerAnnouncement