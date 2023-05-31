import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import ImageModal from './ImageModal';
import { Buffer } from 'buffer';

const DashboardGCash = () => {

  const [openModal, setOpenModal] = useState(false);
  const [modalImageData, setModalImageData] = useState(null);

  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };
  const [rows, setRows] = useState([]);
      
  const columns = [
    // { field: 'id', headerName: 'ID', width: 150 },
    // { field: 'accountID', headerName: 'Account ID', width: 150 },
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
          onClick={() => handleButtonClick(params.row)}
        >
          View Image
        </Button>
      ),
    },
    {
      field: 'account',
      headerName: 'Account',
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
          onClick={() => handleButtonActivate(params.row)}>
        Activate
        </Button>
      ),
    },
  ];
  const handleButtonActivate = (row) => {
    const membershipType = 'Monthly Session';
    alert(`Button clicked for row with id AccountID: ${row.accountID} and ID: ${row.id}`);
    axios.post('http://localhost:3001/api/add-membership', {
      accID: row.accountID,
      amount: row.amount,
      membershipType: membershipType,
      proofID: row.id,
    })
    .then(response => {
      alert(`${membershipType}: ${row.name}`);
      fetchData();
    })
    .catch(error => {

    })
  };
  const fetchData = () => {
    axios.get('http://localhost:3001/api/gcash')
    .then(response => {
      const rows = response.data.map(item => ({
        id: item.proof_of_payment_id,
        accountID: item.account_info_id,
        name: item.name,
        amount: formatPrice(item.amount),
        refNum: item.reference_number,
        email: item.email,
        date: item.date,
        time: item.time,
        proof: item.image ? bufferToBase64(Buffer.from(item.image.data)) : null,
      }));
      setRows(rows);
    })
    .catch(error => {
      console.log(error);
    })
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
  const handleButtonClick = (row) => {
    setModalImageData(row.proof);
    // console.log(row.proof);
    setOpenModal(true);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='mx-[50px] mt-[90px]'>
        <h1 className='text-[30px] md:text-[35px] font-extrabold text-[#1ca350]'>Payment Setting</h1>
        <h1 className='md:text-[25px] mt-[30px] font-extrabold text-[#1ca350]'>Proof of Payment</h1>
        <div className='w-[100%] mt-[30px] h-[700px] bg-white rounded-md'>
            <DataGrid rows={rows} columns={columns} />
        </div>
        <ImageModal open={openModal} onClose={() => setOpenModal(false)} imageData={modalImageData} />

    </div>
  )
}

export default DashboardGCash