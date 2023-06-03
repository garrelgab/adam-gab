import React, { useEffect, useState } from 'react'
import PosTabs from './PosTabs';
import { DataGrid } from '@mui/x-data-grid';
import ReactQuill from 'react-quill';
import axios from 'axios';
const SettingsServiceOffer = (props) => {
    const userID = props.id;
    const [rows, setRows] = useState([]);
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'name', headerName: 'Service Offer', width: 200},
        {field: 'desc', headerName: 'Description', flex: 1},
    ];
    const [editorContent, setEditorContent] = useState('');
    const [name, setName] = useState('');

    const fetchData = () => {
        axios.get('http://localhost:3001/api/service-offer')
        .then(response => {
            const rows = response.data.map(item => ({
                id: item.service_offer_id,
                name: item.name,
                desc: item.description.replace(/<\/?p>/g, ''),
            }));
            setRows(rows);
        })
        .catch(error => {
            console.log(error);
        });
    }
    const handleAddServiceOffer = () => {
        axios.post('http://localhost:3001/api/add-service-offer', {
            name: name,
            desc: editorContent,
        })
        .then(response => {
            alert('Successfully added.');
            fetchData();
            console.log(response);
            setName('');
            setEditorContent('');
        })
        .catch(error => {
            console.log(error);
        })
    };
    useEffect(() => {
        fetchData();
    }, []);
    const tabs = [
        {
            title: 'Services Offers',
            content:
            <div className='mt-[50px]'>
                <div className='h-[500px] w-[100%] bg-white rounded-md'>
                    <DataGrid rows={rows} columns={columns} className='w-[100%]'/>
                </div>
            </div>
        },
        {
            title: 'Add Service Offer',
            content:
            <div className='mt-[50px]'>
                <h1 className='md:text-[25px] text-[#1ca350] font-bold'>Add Service Offer</h1>
                <input type="text" className="shadow-lg block w-full my-[30px] p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                <div className='bg-white h-[340px] rounded-md'>
                    <ReactQuill className='h-[300px] min-h-[200px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
                </div>
                <div className='flex justify-end mt-[60px] md:mt-[30px]'>
                    <button className='w-[150px] p-2 text-lg font-bold rounded-md bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleAddServiceOffer}>Add</button>
                </div>
            </div>
        },

    ];
    
  return (
    <div className='mt-[90px] mx-[50px]'>
      <h1 className='md:text-[30px] font-extrabold text-[#1ca350]'>Service Offers</h1>
      <PosTabs tabs={tabs}/>
    </div>
  )
}

export default SettingsServiceOffer