import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button';
import { Buffer } from 'buffer';
import ImageModal from './ImageModal';

const CustomerHealthTips = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalImageData, setModalImageData] = useState(null);  
  const [rows, setRows] = useState([]);

  const renderInstructionCell = (params) => {
      const instructionText = params.value
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .split('. ') // Split into sentences
      .map((sentence, index) => (
        <div key={index}>
          {`${index + 1}. ${sentence.trim()}`}
        </div>
      ));
    return <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight:250}}>{instructionText}</div>;
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
          flex: 1, // Set the desired width
          renderCell: renderInstructionCell,
      },
      {
          field: 'image',
          headerName: 'Image',
          width: 150,
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
              }}
              onClick={() => handleButtonClick(params.row)}
            >
              View Image
            </Button>
          ),
        },
  ];
  const handleButtonClick = (row) => {
      setModalImageData(row.image);
      console.log(row);
      setOpenModal(true);
  };
  const bufferToBase64 = (buffer) => {
    // const base64String = Buffer.from(buffer).toString('base64');
    // return `data:image/png;base64,${base64String}`;
    const fileHeader = buffer.slice(0, 4).toString('hex');
    let mimeType = '';

    if (fileHeader.startsWith('89504e47')) {
      mimeType = 'image/png';
    } else if (fileHeader.startsWith('ffd8ff')) {
      mimeType = 'image/jpeg';
    } else {
      // Unsupported file type
      return null;
    }

    const base64String = buffer.toString('base64');
    return `data:${mimeType};base64,${base64String}`;
  };
  const fetchHealthGuide = () => {
    axios.get('http://localhost:3001/api/health-guide')
    .then(response => {
      const rows = response.data.map(item => ({
          id: item.health_guide_id,
          name: item.name,
          equipment: item.equipment,
          instruction: item.instruction.replace(/<\/?p>/g, ''),
          image: item.instruction_image ? bufferToBase64(Buffer.from(item.instruction_image)) : null,
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
        <ImageModal open={openModal} onClose={() => setOpenModal(false)} imageData={modalImageData} />
    </div>
  )
}

export default CustomerHealthTips