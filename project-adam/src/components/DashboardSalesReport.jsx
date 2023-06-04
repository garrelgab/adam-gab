import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PosTabs from './PosTabs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Calendar from 'react-calendar'
import moment from 'moment-timezone';

const DashboardSalesReport = () => {
    const gridColumns = [
      { field: 'id', headerName: 'ID', width:200},
      // { field: 'order_number', headerName: 'Order Number', width: 400},
      { field: 'description', headerName: 'Description', flex: 1},
      { field: 'total', headerName: 'Total', width: 300},
      { field: 'date', headerName: 'Date', width: 300},
      { field: 'time', headerName: 'Time', width: 300},

    ]
    const[gridRows, setRows] = useState([]);

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
    };
    const fetchWeekly = () => {
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
    };
    const fetchMonthly = () => {
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
    };
    const fetchYearly = () => {
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

    const fetchSalesReport = () => {
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
    };

    const [showCalendar1, setShowCalendar1] = useState(false);
    const [showCalendar2, setShowCalendar2] = useState(false);
    const [selectedFromDate, setSelectedFromDate] = useState(new Date());
    const [selectedToDate, setSelectedToDate] = useState(new Date());

    const handleFromDateChange = (date) => {
      setSelectedFromDate(date);
      setShowCalendar1(false);
      fetchSalesReportByDateRange(date, selectedToDate);
    };
    const handleToDateChange = (date) => {
      setSelectedToDate(date);
      setShowCalendar2(false);
      fetchSalesReportByDateRange(selectedFromDate, date);
    };
    const handleFromButtonClick = () => {
      setShowCalendar1(!showCalendar1);
      setShowCalendar2(false);
    };
    const handleToButtonClick = () => {
      setShowCalendar2(!showCalendar2);
      setShowCalendar1(false);
    };

    const fetchSalesReportByDateRange = (startDate, endDate) => {
      axios
        .get("http://localhost:3001/api/filter-sales-report", {
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        })
        .then((response) => {
          const rows = response.data.map((item) => ({
            id: item.sales_report_id,
            description: item.description,
            total: formatPrice(item.total),
            date: item.date,
            time: item.time,
            // add more columns as needed
          }));
          setRows(rows);
          // console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    };    
    useEffect(() => {
      fetchSalesReport();
      fetchSales();
      fetchWeekly();
      fetchMonthly();
      fetchYearly();
    }, []);
    const formatPrice = (price) => {
      return Number(price).toFixed(2);
    };

    
    
    // Export data to PDF
    const exportToPdfAll = () => {
      // Create a new instance of jsPDF
      const doc = new jsPDF();
    
      // Define the columns and rows for the PDF table
      const columns = gridColumns
        .filter((column) => column.field !== 'id') // Exclude the "Actions" and "Status" columns
        .map((column) => ({
          header: column.headerName,
          dataKey: column.field,
        }));
      const rows = gridRows.map((row) =>
        gridColumns
          .filter((column) => column.field !== 'id') // Exclude the "Actions" and "Status" columns
          .map((column) => row[column.field])
      );
    
      // Add the table to the PDF document
      doc.autoTable({
        columns,
        body: rows,
      });
    
      // Save the PDF file
      doc.save('Sales Report.pdf');
    };

    const exportToPdfDaily = () => {
      // Create a new instance of jsPDF
      const doc = new jsPDF();
    
      // Define the columns and rows for the PDF table
      const columns = dailyColums.map((column) => ({
          header: column.headerName,
          dataKey: column.field,
        }));
      const rows = dailyRows.map((row) =>
        dailyColums.map((column) => row[column.field])
      );
    
      // Add the table to the PDF document
      doc.autoTable({
        columns,
        body: rows,
      });
    
      // Save the PDF file
      doc.save('Sales Report Daily.pdf');
    };

    const exportToPdfWeekly = () => {
      // Create a new instance of jsPDF
      const doc = new jsPDF();
    
      // Define the columns and rows for the PDF table
      const columns = weekColums.map((column) => ({
          header: column.headerName,
          dataKey: column.field,
        }));
      const rows = weekRows.map((row) =>
        weekColums.map((column) => row[column.field])
      );
    
      // Add the table to the PDF document
      doc.autoTable({
        columns,
        body: rows,
      });
    
      // Save the PDF file
      doc.save('Sales Report Weekly.pdf');
    };

    const exportToPdfMonthly = () => {
      // Create a new instance of jsPDF
      const doc = new jsPDF();
    
      // Define the columns and rows for the PDF table
      const columns = monthColumns.map((column) => ({
          header: column.headerName,
          dataKey: column.field,
        }));
      const rows = monthRows.map((row) =>
        monthColumns.map((column) => row[column.field])
      );
    
      // Add the table to the PDF document
      doc.autoTable({
        columns,
        body: rows,
      });
    
      // Save the PDF file
      doc.save('Sales Report Monthly.pdf');
    };

    const exportToPdfYearly = () => {
      // Create a new instance of jsPDF
      const doc = new jsPDF();
    
      // Define the columns and rows for the PDF table
      const columns = yearColumns.map((column) => ({
          header: column.headerName,
          dataKey: column.field,
        }));
      const rows = yearRows.map((row) =>
        yearColumns.map((column) => row[column.field])
      );
    
      // Add the table to the PDF document
      doc.autoTable({
        columns,
        body: rows,
      });
    
      // Save the PDF file
      doc.save('Sales Report Yearly.pdf');
    };

    // Export data to Excel
    const handleExportExcel = () => {
      const data = gridRows.map(row => {
        const rowData = {};
        gridColumns.forEach(column => {
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
        <div>
          <div className='flex justify-between items-center'>
            <div className='flex'>
              <div>
                <label className="block mb-1 text-md md:text-lg text-left font-bold text-[#1ca350]">Start Date</label>
                <button onClick={handleFromButtonClick} className='font-light shadow-lg w-[280px] text-left bg-gray-50 p-2 rounded-lg text-black focus:outline-none' required>
                  {selectedFromDate ? moment(selectedFromDate).tz('Asia/Manila').format('MMMM DD, YYYY') : 'Select Date'}
                </button>
                {showCalendar1 && (
                  <div className='relative z-10'>
                      <Calendar value={selectedFromDate} onChange={handleFromDateChange} className='fixed bg-white rounded-lg font-light shadow-xl text-black focus:outline-none'/>
                  </div>
                )}
              </div>
              <div className='ml-[20px]'>
                <label className="block mb-1 text-md md:text-lg text-left font-bold text-[#1ca350]">End Date</label>
                <button onClick={handleToButtonClick} className='font-light shadow-lg w-[280px] text-left bg-gray-50 p-2 rounded-lg text-black focus:outline-none' required>
                  {selectedToDate ? moment(selectedToDate).tz('Asia/Manila').format('MMMM DD, YYYY') : 'Select Date'}
                </button>
                {showCalendar2 && (
                  <div className='relative z-10'>
                      <Calendar value={selectedToDate} onChange={handleToDateChange} className='fixed bg-white rounded-lg font-light shadow-xl text-black focus:outline-none'/>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button className='py-2 px-[40px]  md:mr-[30px] rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleExportExcel}>Export to Excel</button>
              <button className='py-2 px-[40px]  rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={exportToPdfAll}>Export to PDF</button>
            </div>
          </div>
          <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
            <DataGrid rows={gridRows} columns={gridColumns} className='text-center' disableExtendRowFullWidth/>
          </div>
        </div>
      },
      {
        title: 'Daily',
        content: 
        <div>
          <div className='flex justify-end'>
            <button className='py-2 px-[40px]  md:mr-[30px] rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleExportExcel}>Export to Excel</button>
            <button className='py-2 px-[40px]  rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={exportToPdfDaily}>Export to PDF</button>
          </div>
          <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
            <DataGrid rows={dailyRows} columns={dailyColums} className='text-center' disableExtendRowFullWidth/>
          </div>
        </div>
      },
      {
        title: 'Weekly',
        content: 
        <div>
          <div className='flex justify-end'>
            <button className='py-2 px-[40px]  md:mr-[30px] rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleExportExcel}>Export to Excel</button>
            <button className='py-2 px-[40px]  rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={exportToPdfWeekly}>Export to PDF</button>
          </div>
          <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
            <DataGrid rows={weekRows} columns={weekColums} className='text-center' disableExtendRowFullWidth/>
          </div>
        </div>
        
      },
      {
        title: 'Monthly',
        content: 
        <div>
          <div className='flex justify-end'>
            <button className='py-2 px-[40px]  md:mr-[30px] rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleExportExcel}>Export to Excel</button>
            <button className='py-2 px-[40px]  rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={exportToPdfMonthly}>Export to PDF</button>
          </div>
          <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
            <DataGrid rows={monthRows} columns={monthColumns} className='text-center' disableExtendRowFullWidth/>
          </div>
        </div>
      },
      {
        title: 'Yearly',
        content: 
        <div>
          <div className='flex justify-end'>
            <button className='py-2 px-[40px]  md:mr-[30px] rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleExportExcel}>Export to Excel</button>
            <button className='py-2 px-[40px]  rounded-md bg-gray-50 text-[#1ca350] font-bold ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={exportToPdfYearly}>Export to PDF</button>
          </div>
          <div className='bg-white rounded-lg h-[700px] w-[100%] shadow-lg mt-[30px]'>
            <DataGrid rows={yearRows} columns={yearColumns} className='text-center' disableExtendRowFullWidth/>
          </div>
        </div>
        
      },
    ];
  return (
    <div className='px-[50px] py-[90px] bg-[#d3d3d3]'>
      <div className='flex justify-between'>
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Sales Report</h1>  

        
      </div>
        <div className=''>
          <PosTabs tabs={tabs}/>
        </div>
        
    </div>
  )
}

export default DashboardSalesReport