import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import moment from 'moment-timezone';
const PosLocker = () => {
  const [contact, setContact] = useState('');
  const [amount, setAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const rowHeight = 100;
  const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Customer Name', width: 450},
    {field: 'contact', headerName: 'Contact No.', width: 150},
    {field: 'key', headerName: 'Key No.', width: 150},
    {field: 'amount', headerName: 'Amount', width: 150},
    {field: 'start', headerName: 'Start Date', width: 150},
    {field: 'end', headerName: 'End Date', width: 150},
    {field: 'totaldays', headerName: 'Total Days', width: 150},
    {field: 'date', headerName: 'Date and Time', width: 200},
  ];
  const optionsKey = [
    { value: 'no1', label: '1'},
    { value: 'no2', label: '2'},
    { value: 'no3', label: '3'},
    { value: 'no4', label: '4'},
    { value: 'no5', label: '5'},
    { value: 'no6', label: '6'},
    { value: 'no7', label: '7'},
    { value: 'no8', label: '8'},
    { value: 'no9', label: '9'},
    { value: 'no10', label: '10'},
  ];
  const [showCalendar1, setShowCalendar1] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);
  const handleButtonClick = () => {
    setShowCalendar1(!showCalendar1);
    setShowCalendar2(false);
  };
  const handleButtonClick2 = () => {
    setShowCalendar2(!showCalendar2);
    setShowCalendar1(false);
  };

  const handleChangeContactNo = (event) => {
    const inputValue = event.target.value;
    // Validate if the input is a non-negative number
    if (!isNaN(inputValue) && Number(inputValue) >= 0) {
      setContact(inputValue);
    }
  };
  const handleChangeAmount = (event) => {
    const inputValue = event.target.value;
    // Validate if the input is a non-negative number
    if (!isNaN(inputValue) && Number(inputValue) >= 0) {
      setAmount(inputValue);
    }
  };
  const handleDateChange1 = (date) => {
    setSelectedStartDate(date);
    setShowCalendar1(false);
    setShowCalendar2(false);
  };
  const handleDateChange2 = (date) => {
    setSelectedEndDate(date);
    setShowCalendar1(false);
    setShowCalendar2(false);
  };

  const [selectOption, setSelectOption] = useState(null);
  const handleOptionChange = (selectedOption) => {
    setSelectOption(selectedOption.label);
  }

  const fetchLocker = () => {
    axios.get("http://localhost:3001/api/locker")
    .then((response) => {
        const rows = response.data.map(item => ({
        id: item.locker_id,
        name: item.name,
        contact: item.contact_no,
        key: item.key_no,
        amount: formatPrice(item.amount),
        start: item.start_date,
        end: item.end_date,
        totaldays: item.total_days,
        date: item.date + " " + item.time,
        }));
        setRows(rows);
    })
    .catch(error => {
        console.error(error);
    });
    };
  const formatPrice = (price) => {
      return Number(price).toFixed(2);
  };
  const handleConfirm = () => {
    if(!customerName || !amount || !contact || !selectOption || !selectedStartDate || !selectedEndDate){
      alert('Please fill up the empty field.');
      return;
    }
    axios.post('http://localhost:3001/api/add-locker', {
      name: customerName,
      contact: contact,
      key: selectOption,
      amount: amount,
      startdate: selectedStartDate,
      enddate: selectedEndDate,
    })
    .then(response => {
      alert(`Customer: ${customerName}`);
      fetchLocker();
    })
    .catch(error => {
      alert('The selected key is not available until the end date');
    })
    setCustomerName('');
    setContact('');
    setAmount('');
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  
  const minDate = new Date();

  useEffect(() => {
    fetchLocker();
  },[])
  return (
    <div className='text-[#1ca350]'>
      <h1 className='text-[25px]  font-extrabold'>Locker Rent</h1>  
      <div className='mt-[30px] flex flex-col sm:flex-row items-center md:items-start'>
        <div className='flex flex-col'>
          <label className="block mb-1 text-md md:text-lg text-left font-extrabold">Customer Name</label>
          <input type="text" className="shadow-lg block w-[350px] md:w-[600px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Customer Name' value={customerName} onChange={(e) => setCustomerName(e.target.value)} required/>
          <div className='flex'>
            <div>
              <label className="block mb-1 text-md md:text-lg text-left font-extrabold">Start Date</label>
              <button onClick={handleButtonClick} className='font-light shadow-lg w-[280px] text-left bg-gray-50 p-2 rounded-lg text-black focus:outline-none' required>
                {selectedStartDate ? moment(selectedStartDate).tz('Asia/Manila').format('MMMM DD, YYYY') : 'Select Date'}
              </button>
              {showCalendar1 && (
                <div className='relative z-10'>
                    <Calendar value={selectedStartDate} onChange={handleDateChange1} minDate={minDate} className='fixed bg-white rounded-lg font-light shadow-xl text-black focus:outline-none'/>
                </div>
              )}
            </div>
            <div className='ml-[40px]'>
              <label className="block mb-1 text-md md:text-lg text-left font-extrabold">End Date</label>
              <button onClick={handleButtonClick2} className='font-light shadow-lg w-[280px] text-left bg-gray-50 p-2 rounded-lg text-black focus:outline-none' required>
                {selectedEndDate ? moment(selectedEndDate).tz('Asia/Manila').format('MMMM DD, YYYY') : 'Select Date'}
              </button>
              {showCalendar2 && (
                <div className='relative z-10'>
                    <Calendar value={selectedEndDate} onChange={handleDateChange2} minDate={minDate} className='fixed bg-white rounded-lg font-light shadow-xl text-black focus:outline-none'/>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col mx-[30px]'>
          <label className="block mb-1 text-md md:text-lg text-left font-extrabold">Contact No.</label>
          <input type="text" className="shadow-lg block w-[350px] md:w-[300px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Contact No.' maxLength={11} value={contact} onChange={handleChangeContactNo}  required/>
          <label className="block mb-1 text-md md:text-lg text-left font-extrabold">Key No.</label>
          <Select className=' text-black shadow-lg font-light w-[350px] z-50 md:w-[300px]'value={selectOption} options={optionsKey} onChange={handleOptionChange} placeholder={selectOption ? selectOption : 'Select Key No.'}/>
        </div>
        <div className='flex flex-col'>
          <label className="block mb-1 text-md md:text-lg text-left font-extrabold">Amount</label>
          <input type="text" className="shadow-lg block w-[350px] md:w-[200px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Amount' value={amount} onChange={handleChangeAmount} required/>
          <button className='py-2 justify-start px-[50px] shadow-lg mt-[30px] md:mt-[31px] font-bold rounded-md bg-gray-50 text-[#1ca350] ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleConfirm} >Confirm</button>
        </div>
        </div>
        <div className='hidden bg-white my-[50px] mx-auto md:w-[100%] shadow-lg md:h-[600px] md:flex rounded-md justify-center items-center'>
          <DataGrid rows={rows} columns={columns} className='w-[100%] text-center' rowHeight={rowHeight} disableExtendRowFullWidth/>
        </div>
    </div>
  )
}

export default PosLocker