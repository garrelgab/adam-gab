import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
const DashboardAuditTrail = () => {
    const [rows, setRows] = useState('');
    const rowHeight = 50;
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'action', headerName: 'Action', width: 650},
        {field: 'date', headerName: 'Date', width: 150},
        {field: 'time', headerName: 'Time', width: 150},
    ];

    const fetchAudit = () => {
        axios.get('http://localhost:3001/api/audit')
        .then(response => {
            const rows = response.data.map(item => ({
                id: item.audit_id,
                action: item.action,
                date: item.date,
                time: item.time,
                // add more columns as needed
              }));
              setRows(rows);
        })
        .catch(error => {

        });
    };
    useEffect(() => {
        fetchAudit();
    }, [])
  return (
    <div className='py-[90px] px-[30px] bg-[#d3d3d3]'>        
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Audit Trail</h1> 
        <div className='hidden bg-white mt-[30px] mx-auto w-[100%] md:h-[600px] md:flex rounded-md justify-center items-center'>
            <DataGrid rows={rows} columns={columns} className='text-center w-[100%]' rowHeight={rowHeight} disableExtendRowFullWidth/>
      </div> 
    </div>
  )
}

export default DashboardAuditTrail