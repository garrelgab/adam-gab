import React, { useEffect, useState } from 'react'
import PosTabs from './PosTabs';
import ReactQuill from 'react-quill';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
const DashboardAnnouncement = (props) => {
    const userID = props.id;

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    const [annTitle, setAnnTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');
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
            <div style={{ width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{params.value}</div>
            ),
        },
        {field: 'date', headerName: 'Date and Time', width: 250},
        // {field: 'status', headerName: 'Status', width: 250},

    ];

    const fetchAnnouncementData = () => {
        axios.get('http://localhost:3001/api/announcement')
        .then(response => {
            const rows = response.data.map(item => ({
                id: item.announcement_id,
                title: capitalizeFirstLetter(item.title),
                annContent: capitalizeFirstLetter(item.ann_content).replace(/<\/?p>/g, ''),
                date: item.date + " " + item.time,
                status: item.status,
            }));
            setRows(rows);
        })
        .catch(error => {
            console.log(error);
        })
    };
    const handleAddAnnouncement = () => {
        axios.post('http://localhost:3001/api/add-announcement', {
            annTitle: capitalizeFirstLetter(annTitle),
            annContent: capitalizeFirstLetter(editorContent),
            accID: userID,
        })
        .then(response => {
            alert(`New Announcement: ${capitalizeFirstLetter(annTitle)}`);
            fetchAnnouncementData();
        })
        .catch(error => {
            console.log(error);
        })
        setAnnTitle('');
        setEditorContent('');
    };
    useEffect(() => {
        fetchAnnouncementData();
    },[]);
    const tabs = [
        {
            title: 'Announcement',
            content: 
            <div>
                <h1 className='md:text-[25px] font-bold text-[#1ca350]'>Add Announcement</h1>
                <div className='w-[100%] h-[700px] my-[20px] rounded-md bg-[white]'> 
                    <DataGrid rows={rows} columns={columns} rowHeight={300} className='w-[100%]'/>
                </div>
            </div>
        },
        {
            title: 'Add Announcement',
            content: 
            <div>
                <h1 className='md:text-[25px] font-bold text-[#1ca350]'>Add Announcement</h1>
                <h1 className='mt-[20px] text-[#1ca350] font-bold md:text-[20px]'>Title</h1>
                <input type="text" className="shadow-lg block w-full mt-[5px] p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Question' value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} required/>
                <h1 className='mt-[20px] text-[#1ca350] font-bold md:text-[20px]'>Content</h1>
                <div className='bg-white h-[390px] rounded-md'>
                    <ReactQuill className=' h-[350px] min-h-[200px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
                </div>
                <div className='flex justify-end mt-[60px] md:mt-[30px]'>
                    <button className='w-[150px] p-2 font-bold rounded-md bg-white hover:text-white hover:bg-gray-500 text-[#1ca350] shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleAddAnnouncement}>Add</button>
                </div>
            </div>
        }
    ]
  return (
    <div className='mt-[90px] mx-[50px]'>
        <h1 className='text-[30px] font-extrabold text-[#1ca350]'>Announcement</h1>
        <PosTabs tabs={tabs}/>
    </div>
  )
}

export default DashboardAnnouncement