import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { DataGrid } from '@mui/x-data-grid';
const PosWorkOut = () => {
  const [customerName, setCustomerName] = useState('');
  const options = [
    { value: 'dailySession', label: 'Daily Session', price: '70.00' },
    { value: 'monthlySession', label: 'Monthly Session', price: '700.00' },
    { value: 'danceStudio', label: 'Dance Studio / 3hrs / per head', price: '70.00' }
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [price, setPrice] = useState('');
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.label);
    setPrice(selectedOption.price);
  };

  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width:100},
    { field: 'name', headerName: 'Customer Name', width: 500},
    { field: 'type', headerName: 'Type of Work-out', width: 400},
    { field: 'price', headerName: 'Price', width: 100},
    { field: 'date', headerName: 'Date', width: 300},
    { field: 'time', headerName: 'Time', width: 300},


  ]

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:3001/api/workouts")
      .then((response) => {
          const rows = response.data.map(item => ({
          id: item.workout_id,
          name: item.name,
          type: item.type,
          price: formatPrice(item.price),
          date: item.date,
          time: item.time,
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

    fetchData();
  }, []);
  const fetchData = () => {
    axios.get("http://localhost:3001/api/workouts")
    .then((response) => {
        const rows = response.data.map(item => ({
        id: item.workout_id,
        name: item.name,
        type: item.type,
        price: formatPrice(item.price),
        date: item.date,
        time: item.time,
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
    if(!customerName || !selectedOption){
      alert('Please fill up the empty fields.');
      return;
    }
    axios.post('http://localhost:3001/api/add-workout', {
      name: customerName,
      type: selectedOption,
      price: price,
    })
    .then(response => {
      alert(`${selectedOption}, ${customerName}`);
      fetchData();
    })
    .catch(error => {
      console.log(error);
    })
    setSelectedOption('');
    setPrice('');
    setCustomerName('')
  }
  return (
    <div>        
        <h1 className='text-[20px] md:text-[25px] font-light text-[#93F4D3]'>Daily Workout</h1>
        <div className='text-[#93F4D3] mt-[30px] flex flex-col sm:flex-row items-center md:items-start'>
            <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Customer Name</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[600px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Customer Name' value={customerName} onChange={(e) => setCustomerName(e.target.value)} required/>
            </div>
            <div className='flex flex-col mx-[30px]'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Type of Work-out</label>
                <Select className=' text-black w-[350px] z-50 md:w-[400px]' options={options} onChange={handleChange} placeholder="Select type of work-out"/>
            </div>
            <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Price</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[200px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none cursor-default" placeholder='Price' value={price} readOnly required/>
            </div>
            <div>
            <button className='py-2 px-[90px] mt-[30px] md:mt-[31px] md:mx-[30px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
        <div className='hidden bg-white my-[50px] mx-auto md:h-[600px] md:flex rounded-md justify-center items-center'>
            <DataGrid rows={rows} columns={columns} className='text-center' disableExtendRowFullWidth/>
        </div>
    </div>
  )
}

export default PosWorkOut