import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Button from '@mui/material/Button';
import ImageModal from './ImageModal';
import { Buffer } from 'buffer';

const DashboardMembershipModule = () => {
    const formatPrice = (price) => {
        return Number(price).toFixed(2);
    };

    const [openModal, setOpenModal] = useState(false);
    const [modalImageData, setModalImageData] = useState(null);

    
    const [gridRows, setRows] = useState([]);
    const gridColumns = [
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
        {
          field: 'qrcode',
          headerName: 'QR Code',
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
              View QR Code
            </Button>
          ),
        },
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
                qrcode: item.qrcode ? bufferToBase64(Buffer.from(item.qrcode.data)) : null,
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
      setModalImageData(row.qrcode);
      // console.log(row.qrcode);
      setOpenModal(true);
    }

    const exportToPdf = () => {
        // Create a new instance of jsPDF
        const doc = new jsPDF();
      
        // Define the columns and rows for the PDF table
        const columns = gridColumns
          .filter((column) => column.field !== 'actions' && column.field !== 'status' && column.field !== 'id' && column.field !== 'email') // Exclude the "Actions" and "Status" columns
          .map((column) => ({
            header: column.headerName,
            dataKey: column.field,
          }));
        const rows = gridRows.map((row) =>
          gridColumns
            .filter((column) => column.field !== 'actions' && column.field !== 'status' && column.field !== 'id' && column.field !== 'email') // Exclude the "Actions" and "Status" columns
            .map((column) => row[column.field])
        );
      
        // Add the table to the PDF document
        doc.autoTable({
          columns,
          body: rows,
        });
      
        // Save the PDF file
        doc.save('MembershipModule.pdf');
    };
      
      
    useEffect(() => {
        fetchMembershipData();
    }, []);
  return (
    <div className='mt-[90px] mx-[50px]'>
        <div className='flex justify-between'>
            <h1 className='text-[30px] md:text-[35px] font-extrabold text-[#1ca350]'>Membership</h1>
            <button className='py-2 px-[40px] justify-end  rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={exportToPdf}>Export to PDF</button>
        </div>
        <div className='bg-white h-[700px] w-[100%] rounded-md mt-[30px]'>
            <DataGrid rows={gridRows} columns={gridColumns} rowHeight={100} className='w-[100%]'/>
        </div>
        <ImageModal open={openModal} onClose={() => setOpenModal(false)} imageData={modalImageData} />
    </div>
  )
}

export default DashboardMembershipModule