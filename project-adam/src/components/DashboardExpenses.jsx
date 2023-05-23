import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
const DashboardExpenses = () => {
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width:100},
        { field: 'description', headerName: 'Description', width: 600},
        { field: 'price', headerName: 'Price', width: 100},
        { field: 'date', headerName: 'Date', width: 150},
        { field: 'time', headerName: 'Time', width: 150},
      ]
    useEffect(() => {
        const fetchData = () => {
            axios.get("http://localhost:3001/api/expenses")
            .then((response) => {
                const rows = response.data.map(item => ({
                id: item.expenses_id,
                description: item.description,
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
        axios.get("http://localhost:3001/api/expenses")
        .then((response) => {
            const rows = response.data.map(item => ({
            id: item.expenses_id,
            description: item.description,
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
        if(!price || !description){
            alert('Please fill up empty fields.');
            return;
        }
        axios.post('http://localhost:3001/api/add-expenses', {
            desc: description,
            price: price,
        })
        .then(response => {
            alert(`${description}, ${price}`);
            fetchData();
        })
        .catch(error => {

        })
    };
    const handleChangePrice = (event) => {
        const inputValue = event.target.value;
        // Validate if the input is a non-negative number
        if (!isNaN(inputValue) && Number(inputValue) >= 0) {
          setPrice(inputValue);
        }
    };
  return (
    <div className='mx-[50px] mt-[90px]'>
        <h1 className='text-[30px] md:text-[35px] font-light text-[#93F4D3]'>Expenses Management</h1>
        <div className='text-[#93F4D3] mt-[30px] flex flex-col sm:flex-row items-center md:items-start'>
            <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Description</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[600px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </div>
            <div className='flex flex-col mx-[30px]'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Price</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[300px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Price' value={price} onChange={handleChangePrice} required/>
            </div>
            <div>
                <button className='py-2 px-[90px] mt-[30px] md:mt-[31px] md:mx-[0px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
        <div className='hidden bg-white my-[50px] mx-auto md:h-[600px] md:flex rounded-md justify-center items-center'>
            <DataGrid rows={rows} columns={columns} className='w-full text-center' disableExtendRowFullWidth/>
        </div>
    </div>
  )
}

export default DashboardExpenses