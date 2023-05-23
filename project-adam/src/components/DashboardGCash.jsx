import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const DashboardGCash = () => {
    const rows = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 32 },
        // Add more rows as needed
    ];
      
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'refNum', headerName: 'Reference Number', width: 300 },
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
      
              onClick={() => handleButtonClick(params.row.id)}
            >
              View Image
            </Button>
          ),
        },
    ];
    const handleButtonClick = (id) => {
        // Handle the button click event
        alert(`Button clicked for row with id ${id}`);
    };
      
  return (
    <div className='mx-[50px] mt-[90px]'>
        <h1 className='text-[30px] md:text-[35px] font-light text-[#93F4D3]'>G-Cash</h1>
        <div className='w-[100%] h-[400px] bg-white rounded-md'>
            <DataGrid rows={rows} columns={columns} />
        </div>
    </div>
  )
}

export default DashboardGCash