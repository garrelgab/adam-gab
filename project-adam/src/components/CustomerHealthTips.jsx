import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
const CustomerHealthTips = () => {
    const [rows, setRows] = useState('');
    const renderInstructionCell = (params) => {
        const instructionText = params.value
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .split('. ') // Split into sentences
        .map((sentence, index) => (
          <div key={index}>
            {`${index + 1}. ${sentence.trim()}`}
          </div>
        ));
      return <div style={{ whiteSpace: 'pre-wrap' }}>{instructionText}</div>;
    };

    const renderImageCell = (params) => {
        return (
          <img
            src={params.value}
            alt="Instruction"
            style={{ width: '100%', height: 'auto' }}
          />
        );
    };
    const columns = [
        // {field: 'id', headerName: 'ID', width: 100},
        {field: 'name', headerName: 'Type of Workout', width: 250},
        {
            field: 'equipment',
            headerName: 'Equipment',
            width: 300, // Set the desired width
            renderCell: (params) => (
            <div style={{ width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{params.value}</div>
            ),
        },
        {
            field: 'instruction',
            headerName: 'Instruction',
            width: 500, // Set the desired width
            renderCell: renderInstructionCell,
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 500,
            renderCell: renderImageCell,
        },
    ];
    const fetchHealthGuide = () => {
        axios.get('http://localhost:3001/api/health-guide')
          .then(response => {
            const rows = response.data.map(item => ({
                id: item.health_guide_id,
                name: item.name,
                equipment: item.equipment,
                instruction: item.instruction.replace(/<\/?p>/g, ''),
                image: item.instruction_image.toString('base64'),
            }));
            setRows(rows);
          })
          .catch(error => {
            console.log(error);
          });
    };
    useEffect(() => {
        fetchHealthGuide();
    },[]);
  return (
    <div className='px-[50px] py-[90px]'>
        <h1 className='text-[30px] font-extrabold text-[#1ca350]'>Health Media Guide</h1>
        <div className='w-[100%] h-[700px] bg-white rounded-md my-[50px]'>
            <DataGrid rows={rows} columns={columns} rowHeight={300} className='w-[100%]'/>
        </div>
    </div>
  )
}

export default CustomerHealthTips