import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PosTabs from './PosTabs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const DashboardSalesReport = () => {
    const columns = [
      { field: 'id', headerName: 'ID', width:200},
      // { field: 'order_number', headerName: 'Order Number', width: 400},
      { field: 'description', headerName: 'Description', flex: 1},
      { field: 'total', headerName: 'Total', width: 300},
      { field: 'date', headerName: 'Date', width: 300},
      { field: 'time', headerName: 'Time', width: 300},

    ]
    const[rows, setRows] = useState([]);

    const dailyColums = [
      {field: 'day', headerName: 'Day', flex: 1},
      {field: 'dailyTotal', headerName: 'Daily Total', flex: 1},
    ];
    const [dailyRows, setDailyRows] = useState([]);

    const weekColums = [
      // {field: 'week', headerName: 'Week', width:200},
      {field: 'weeklyTotal', headerName: 'Weekly Total', flex: 1},
      {field: 'year', headerName: 'Year', flex: 1},
    ];
    const [weekRows, setWeekRows] = useState([]);

    const monthColumns = [
      {field: 'month', headerName: 'Month', flex: 1},
      {field: 'monthlyTotal', headerName: 'Monthly Total', flex: 1},
      {field: 'year', headerName: 'Year', flex: 1},
    ];
    const [monthRows, setMonthRows] = useState([]);

    const yearColumns = [
      {field: 'year', headerName: 'Year', flex: 1},
      {field: 'yearlyTotal', headerName: 'Yearly Total', flex: 1},
    ];
    const [yearRows, setYearRows] = useState([]);

    const fetchSales = () => {
      //Daily
      axios.get("http://localhost:3001/api/daily-sales")
      .then((response) => {
        const rows = response.data.map(item => ({
          id: item.sales_report_id,
          day: item.day,
          dailyTotal: formatPrice(item.daily_total),
          // add more columns as needed
        }));
        setDailyRows(rows);
      })
      .catch(error => {
        console.error(error);
      });

      //Weekly
      axios.get("http://localhost:3001/api/weekly-sales")
      .then((response) => {
        const rows = response.data.map(item => ({
          id: item.sales_report_id,
          // week: item.week,
          weeklyTotal: formatPrice(item.weekly_total),
          year: item.year,
          // add more columns as needed
        }));
        setWeekRows(rows);
      })
      .catch(error => {
        console.error(error);
      });

      //Monthly
      axios.get("http://localhost:3001/api/monthly-sales")
      .then((response) => {
        const rows = response.data.map(item => ({
          id: item.sales_report_id,
          month: item.month,
          monthlyTotal: formatPrice(item.monthly_total),
          year: item.year,
          // add more columns as needed
        }));
        setMonthRows(rows);
      })
      .catch(error => {
        console.error(error);
      });

      //Yearly
      axios.get("http://localhost:3001/api/yearly-sales")
      .then((response) => {
        const rows = response.data.map(item => ({
          id: item.sales_report_id,
          yearlyTotal: formatPrice(item.yearly_total),
          year: item.year,
          // add more columns as needed
        }));
        setYearRows(rows);
      })
      .catch(error => {
        console.error(error);
      });
    };
    useEffect(() => {
      axios.get("http://localhost:3001/api/sales-report")
      .then((response) => {
        const rows = response.data.map(item => ({
          id: item.sales_report_id,
          // order_number: item.order_number,
          description: item.description,
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

      fetchSales();
    }, []);
    const formatPrice = (price) => {
      return Number(price).toFixed(2);
    };

    // Export data to PDF
    const handleExportPDF = () => {
      const doc = new jsPDF();
      doc.autoTable({ html: '#data-grid' });
      doc.save('data-grid.pdf');
    };

    // Export data to Excel
    const handleExportExcel = () => {
      const data = rows.map(row => {
        const rowData = {};
        columns.forEach(column => {
          rowData[column.field] = row[column.field];
        });
        return rowData;
      });

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'DataGrid');
      XLSX.writeFile(workbook, 'data-grid.xlsx');
    };


    const tabs = [
      {
        title: 'All',
        content:
        <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
            <DataGrid rows={rows} columns={columns} className='text-center' disableExtendRowFullWidth/>
        </div>
      },
      {
        title: 'Daily',
        content: 
        <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
          <DataGrid rows={dailyRows} columns={dailyColums} className='text-center' disableExtendRowFullWidth/>
        </div>
      },
      {
        title: 'Weekly',
        content: 
        <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
          <DataGrid rows={weekRows} columns={weekColums} className='text-center' disableExtendRowFullWidth/>
        </div>
      },
      {
        title: 'Monthly',
        content: 
        <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
          <DataGrid rows={monthRows} columns={monthColumns} className='text-center' disableExtendRowFullWidth/>
        </div>
      },
      {
        title: 'Yearly',
        content: 
        <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
          <DataGrid rows={yearRows} columns={yearColumns} className='text-center' disableExtendRowFullWidth/>
        </div>
      },
    ];
  return (
    <div className='px-[50px] py-[90px] bg-[#d3d3d3]'>
      <div className='flex justify-between'>
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Sales Report</h1>  

        <div>
            <button className='py-2 px-[40px]  md:mr-[30px] rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleExportExcel}>Export to Excel</button>
            <button className='py-2 px-[40px]  rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleExportPDF}>Export to PDF</button>
        </div>
      </div>
        <div className=''>
          <PosTabs tabs={tabs}/>
        </div>
        
    </div>
  )
}

export default DashboardSalesReport