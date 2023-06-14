import React, {useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
const UserAccountCustomer = (props) => {

  const [rows, setRows] = useState([]);
  const rowHeight = 100;
  const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Customer Name', width: 450},
    {field: 'status', headerName: 'Status', width: 150},
    {field: 'timein', headerName: 'Time-In', width: 150},
    {field: 'timeout', headerName: 'Time-Out', width: 150},
    {field: 'date', headerName: 'Date', width: 200},
    {
      field: 'account',
      headerName: 'Account',
      width: 100,
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
            marginTop: '3px',
            marginBottom: '3px',
            width: '100px'
          }}
          onClick={() => handleAccount(params.row.id, params.row.status, params.row.name)}
          >
            {/* Archive */}
            {params.row.status === 'Active' ? 'Disable' : 'Enable'}
        </Button>
      ),
    },
  ];

  const active = 'Active';
  const inactive = 'In-Active'
  const handleAccount = (id, status, name) => {

    if(status === 'Active'){
      axios.put('http://localhost:3001/update-account-status', {
        accID: id,
        status: inactive,
      })
      .then(response => {
        alert(`User: ${name} account has been disable.`);
        fetchEmployee();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    } else {
      axios.put('http://localhost:3001/update-account-status', {
          accID: id,
          status: active,
        })
        .then(response => {
          alert(`User: ${name} account has been enable.`);
          fetchEmployee();
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  };

  return (
    <div className='mx-[50px] mt-[90px]'>
        <div className='flex items-center justify-between'>
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Employee User Account</h1>  
            {/* <button className='py-2 justify-start px-[50px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white'>Add User</button> */}
        </div>
        <div className='hidden bg-white mt-[30px] mx-auto w-[100%] md:h-[600px] md:flex rounded-md justify-center items-center'>
          <DataGrid rows={rows} columns={columns} className='text-center' rowHeight={rowHeight} disableExtendRowFullWidth/>
        </div>
    </div>
  )
}

export default UserAccountCustomer