import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
const DashboardAttendance = () => {

  const [rows, setRows] = useState([]);
  const rowHeight = 100;
  const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Account Name', width: 450},
    {field: 'status', headerName: 'Status', width: 150},
    {field: 'timein', headerName: 'Time-In', width: 150},
    {field: 'timeout', headerName: 'Time-Out', width: 150},
    {field: 'date', headerName: 'Date', width: 200},
  ];
  const fetchData = () => {
    axios.get("http://localhost:3001/api/attendance")
    .then((response) => {
        const rows = response.data.map(item => ({
        id: item.attendance_id,
        name: item.name,
        status: item.status,
        timein: item.time_in,
        // timeout: item.time_out,
        // timeout: item.time_out !== "00:00:00" ? item.time_out : 'No Data',
        timeout: item.time_out !== "00:00:00" ? item.time_out : "",
        date: item.date,
        }));
        setRows(rows);
    })
    .catch(error => {
        console.error(error);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='px-[50px] bg-[#d3d3d3] py-[90px]'>
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Attendance Log</h1>
        <div className='hidden bg-white my-[50px] mx-auto w-[100%] md:h-[600px] md:flex rounded-md justify-center items-center'>
          <DataGrid rows={rows} columns={columns} className='text-center w-full' rowHeight={rowHeight} disableExtendRowFullWidth/>
        </div>
    </div>
  )
}

export default DashboardAttendance