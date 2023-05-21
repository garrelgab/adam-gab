import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
const DashboardSalesReport = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width:200},
        { field: 'order_number', headerName: 'Order Number', width: 400},
        { field: 'total', headerName: 'Total', width: 300},
        { field: 'date', headerName: 'Date', width: 300},
        { field: 'time', headerName: 'Time', width: 300},

    ]
    const[rows, setRows] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/sales-report")
        .then((response) => {
          const rows = response.data.map(item => ({
            id: item.sales_report_id,
            order_number: item.order_number,
            total: formatPrice(item.total),
            date: item.date,
            time: item.time,
            // add more columns as needed
          }));
          setRows(rows);
        })
        .catch(error => {
          console.error(error);
        });

      }, []);
      const formatPrice = (price) => {
        return Number(price).toFixed(2);
      };
  return (
    <div className='mx-[50px] mt-[90px]'>
        <h1 className='text-[30px] font-light text-[#93F4D3]'>Sales Report</h1>
        <div className='bg-white rounded-lg h-[700px] items-center justify-center w-[100%] shadow-2xl mt-[30px]'>
            <DataGrid rows={rows} columns={columns} className='text-center' disableExtendRowFullWidth/>
        </div>
    </div>
  )
}

export default DashboardSalesReport