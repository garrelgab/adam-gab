import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import ImageModal from './ImageModal';
const DashboardGCash = () => {

  const [openModal, setOpenModal] = useState(false);
  const [modalImageData, setModalImageData] = useState(null);

  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };
  const [rows, setRows] = useState([]);
      
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'refNum', headerName: 'Reference Number', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'time', headerName: 'Time', width: 120 },


    {
      field: 'proof',
      headerName: 'Proof of Payment',
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
  
          // onClick={() => handleButtonClick(params.row.id)}
          onClick={() => handleButtonClick(params.row)}
        >
          View Image
        </Button>
      ),
    },
  ];
  // const handleButtonClick = (id) => {
  //     // Handle the button click event
  //     // alert(`Button clicked for row with id ${id}`);
      
  // };
  const handleButtonClick = (row) => {
    // Open modal and pass the image data
    setModalImageData(row.image);
    setOpenModal(true);
  };
  
    
  const fetchData = () => {
    axios.get('http://localhost:3001/api/gcash')
    .then(response => {
      const rows = response.data.map(item => ({
        id: item.proof_of_payment_id,
        name: item.name,
        amount: formatPrice(item.amount),
        refNum: item.reference_number,
        email: item.email,
        date: item.date,
        time: item.time,
        // image: item.image ? Buffer.from(item.image).toString('base64') : null,
      }));
      setRows(rows);
    })
    .catch(error => {
      console.log(error);
    })
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='mx-[50px] mt-[90px]'>
        <h1 className='text-[30px] md:text-[35px] font-extrabold text-[#1ca350]'>G-Cash</h1>
        <h1 className='md:text-[25px] mt-[30px] font-extrabold text-[#1ca350]'>Proof of Payment</h1>
        <div className='w-[100%] mt-[30px] h-[700px] bg-white rounded-md'>
            <DataGrid rows={rows} columns={columns} />
        </div>
        <ImageModal open={openModal} onClose={() => setOpenModal(false)} imageData={modalImageData} />

    </div>
  )
}

export default DashboardGCash