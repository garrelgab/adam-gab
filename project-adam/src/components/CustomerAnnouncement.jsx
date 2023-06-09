import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PosTabs from './PosTabs'
import { Autocomplete } from '@mui/material';
const CustomerAnnouncement = (props) => {

    const userID = props.id;

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const [rows, setRows] = useState([]);
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
            flex: 1, // Set the desired width
            renderCell: (params) => (
            <div style={{ width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', overflow: 'auto', maxHeight:250 }}>{params.value}</div>
            ),
        },
        {field: 'date', headerName: 'Date', width: 250},
        // {field: 'status', headerName: 'Status', width: 250},

    ];

    const fetchAnnouncementData = () => {
        axios.get('http://localhost:3001/announcement')
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

    const [notifRows, setNotifRows] = useState([]);
    const notifColums = [
        // {field: 'id', headerName: 'ID', width: 100},
        // {field: 'accID', headerName: 'Account ID', width: 100},
        {field: 'desc', headerName: 'Notification', flex: 1},
        {field: 'date', headerName: 'Date', width: 200},
        // {field: 'status', headerName: 'Status', width: 100},
    ];
    
    const fetchNotificationData = () => {
        axios.get('http://localhost:3001/notification', {
            params: {
                accID: userID,
            }
        })
        .then(response => {
            const rows = response.data.map(item => ({
                id: item.notification_id,
                accID: item.account_info_id,
                desc: item.description,
                date: item.date + " " + item.time,
                status: item.status,
            }));
            setNotifRows(rows);
        })
        .catch(error => {
            console.log(error);
        })
    };
    

    const [unreadNotifications, setUnreadNotifications] = useState(0);

    const fetchUnreadNotifications = async () => {
        try {
          const response = await axios.get('http://localhost:3001/unread-notif', {
            params: {
                accID: userID,
            }
          });
          const count = response.data.count; // Assuming the API response provides the count
          setUnreadNotifications(count);
        } catch (error) {
          console.log(error);
        }
    };
    const [readRows, setReadRows] = useState([]);

    const getRowClassName = (params) => {
    if (readRows.includes(params.row.id)) {
        return ''; // Remove any styling for read rows
    } else if (params.row.status === 'Unread') {
        return 'font-bold'; // Apply bold styling for unread rows
    }
    return '';
    };
    const handleUpdateNotif = () => {
        axios.put('http://localhost:3001/update-notif', {
            accID: userID,
        })
        .then(response => {
            // console.log(response);
            fetchUnreadNotifications();
            setReadRows([...readRows, ...notifRows.map((row) => row.id)]);
        })
        .catch(error => {
            console.log(error);
        })
    };
    const tabs = [
        {
            title: (
                <div onClick={handleUpdateNotif}>
                    Announcement
                </div>
            ),
            content: 
            <div>
                <div className='w-[100%] h-[600px] bg-white rounded-md my-[50px]'>
                    {/* <DataGrid rows={rows} columns={columns} rowHeight={300} className='w-[100%]' getRowClassName={getRowClassName}/> */}
                    <DataGrid rows={rows} columns={columns} rowHeight={300} className='w-[100%]'/>
                </div>
            </div>
        },
        {
            title: (
                <div className='flex justify-center items-center'>
                    {unreadNotifications > 0 && (
                        <h1 className="bg-red-600 items-center px-1 text-[9px] mr-[10px] rounded-full text-white">{unreadNotifications}</h1>
                    )}
                    Notification

                </div>
            ),
            content:
            <div className='w-[100%] h-[600px] bg-white rounded-md my-[50px]' onClick={handleUpdateNotif}>
                <DataGrid rows={notifRows} columns={notifColums} getRowClassName={getRowClassName} className='w-[100%]'/>
            </div>
        }
    ]
    useEffect(() => {
        fetchAnnouncementData();
        fetchNotificationData();
        fetchUnreadNotifications();
    },[]);

    
  return (
    <div className='my-[90px] mx-[50px]'>
        <h1 className='text-[30px] font-extrabold text-[#1ca350]'>Announcement / Notifications</h1>
        <div>
            <PosTabs tabs={tabs}/>
        </div>
        
    </div>
  )
}

export default CustomerAnnouncement