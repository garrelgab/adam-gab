import React, {useState, useEffect, useRef} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import WebCamm from './WebCamm';

// import QrReader from 'react-qr-reader';
const DashboardAttendance = () => {


  
  const [rows, setRows] = useState([]);
  const rowHeight = 100;
  const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Account Name', width: 450},
    // {field: 'status', headerName: 'Status', width: 150},
    {field: 'timein', headerName: 'Time-In', width: 150},
    {field: 'timeout', headerName: 'Time-Out', width: 150},
    {field: 'date', headerName: 'Date', width: 200},
  ];
  const fetchData = () => {
    axios.get("http://localhost:3001/attendance")
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

  const handleQRScanner = () => {

  };

  // const handleScan = (data) => {
  //   if (data) {
  //     console.log('QR Code data:', data);
  //     // Do something with the scanned data
  //   }
  // };
  
  // const handleError = (error) => {
  //   console.error('QR Code scanning error:', error);
  // };

  // const startScan = () => {
  //   if (webcamRef.current) {
  //     webcamRef.current.video.play();
  //   }
  // };

  const [openWebModal, setOpenWebModal] = useState(false);
  
  const handleOpenWebModal = () => {
    setOpenWebModal(!openWebModal);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='px-[50px] bg-[#d3d3d3] py-[90px]'>
        <div className='flex justify-between'>
          <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Attendance Log</h1>
          <button className='w-[150px] p-2 text-lg font-bold rounded-md bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white ease-in-out duration-300 shadow-lg hover:shadow-xl' onClick={handleOpenWebModal}>QR-Scanner</button>
        </div>
        <div className='hidden bg-white my-[50px] mx-auto w-[100%] md:h-[600px] md:flex rounded-md justify-center items-center'>
          <DataGrid rows={rows} columns={columns} className='text-center w-full' rowHeight={rowHeight} disableExtendRowFullWidth/>
        </div>
        {openWebModal && <WebCamm onClose={handleOpenWebModal}/>}
        {/* <QrReader
          delay={300} // Delay between scans in milliseconds
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }} // Adjust the style as needed
        /> */}
    </div>
  )
}

export default DashboardAttendance