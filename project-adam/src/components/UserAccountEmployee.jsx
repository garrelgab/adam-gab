import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import UserEmployeeModal from './UserEmployeeModal';
import PosTabs from './PosTabs';
import axios from 'axios';
import Button from '@mui/material/Button';
import EmployeeAccess from './EmployeeAccess';

const UserAccountEmployee = (props) => {
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const userID = props.id;
  const [rows, setRows] = useState([]);
  const rowHeight = 100;
  const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Employee Name', width: 450},
    {field: 'age', headerName: 'Age', width: 100},
    {field: 'gender', headerName: 'Gender', width: 100},
    {field: 'bday', headerName: 'Birthday', width: 150},
    {field: 'email', headerName: 'Email', width: 150},
    {field: 'role', headerName: 'Role Type', width: 150},
    {field: 'date', headerName: 'Date Account Created', width: 200},
    {
      field: 'access',
      headerName: 'Access',
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
          onClick={() => handleChangeAccess(params.row)}
        >
          Access
        </Button>
      ),
  },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const handleChangeAccess = (row) => {
    const { id } = row;
    const { name } = row;
  setSelectedId(id); 
  setSelectedName(name);
  setOpenModal(true);
  };
  // const [openModal, setOpenModal] = useState(false);
  // const handleOpenModal = () => {
  //   setOpenModal(!openModal);
  // }
  const fetchEmployee = () => {
    axios.get('http://localhost:3001/api/employee-list')
    .then(response => {
      const rows = response.data.map(item => ({
        id: item.account_info_id,
        name: item.fname + " " + item.lname,
        age: item.age,
        gender: item.gender,
        bday: item.bday,
        email: item.email,
        role: capitalizeFirstLetter(item.role),
        date: item.date_created,
        // add more columns as needed
      }));
      setRows(rows);
    })
    .catch(error => {

    })
  }
  // const handleAddRole = () => {
  //   if(!roleName){
  //     alert('Please fill up the empty field.');
  //     return;
  //   }
  //   axios.post('http://localhost:3001/api/add-role', {
  //     roleName: roleName,
  //     dashboard: dashboard,
  //     reservation: reservation,
  //     window: windowPayment,
  //     sales: salesReport,
  //     settings: settings,
  //     userAccount: userAccount,
  //     audit: audit,
  //     attendance: attendanceLog,
  //     health: healthGuide,
  //     announcement: announcement,
  //   })
  //   .then(response => {
  //     alert(`New Role: ${roleName}`);
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // };  
  useEffect(() => {
    fetchEmployee();
  },[]);
  const tabs = [
    {
      title: 'Employee List',
      content: 
      <div>
        <div className='hidden bg-white mt-[30px] mx-auto w-[100%] md:h-[600px] md:flex rounded-md justify-center items-center'>
          <DataGrid rows={rows} columns={columns} className='text-center w-[100%]' rowHeight={rowHeight} disableExtendRowFullWidth/>
        </div>
        { openModal && <EmployeeAccess open={openModal} onClose={() => setOpenModal(false)} id={selectedId} name={selectedName}/>}
      </div>
    },
    {
      title: 'Add new user',
      content: <UserEmployeeModal fetchEmployee={fetchEmployee} id={userID}/>
    },
    // {
    //   title: 'Add new role',
    //   content: 
    //   <div className='mt-[50px]'>
    //     <label className="block mb-1 text-md md:text-lg mx-auto text-left font-bold text-[#1ca350]">Role</label>
    //     <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Role Name' value={roleName} onChange={(e) => setRoleName(e.target.value)} required/>

    //     
    // }
  ];
  return (
    <div className='px-[50px] h-[1000px] py-[90px] bg-[#d3d3d3]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Employee User Account</h1>  
        {/* <button className='py-2 justify-start px-[50px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleOpenModal}>Add User</button> */}
      </div>
      <div>
        <PosTabs tabs={tabs}/>
      </div>
      {/* <div className='hidden bg-white mt-[30px] mx-auto w-[100%] md:h-[600px] md:flex rounded-md justify-center items-center'>
        <DataGrid rows={rows} columns={columns} className='text-center' rowHeight={rowHeight} disableExtendRowFullWidth/>
      </div> */}
      {/* {openModal && <UserEmployeeModal onClose={handleOpenModal}/>} */}
    </div>
  )
}

export default UserAccountEmployee