import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Select from 'react-select'
const InventoryAddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const productStatus = 'In-Stock';

    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'food', label: 'Food Supplements'},
        { value: 'drinks', label: 'Energy Drinks'},
    ];

    const handleOptionChange = (selectedOption) => {
        setSelectedOption(selectedOption.label);
    };
    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width:100},
        { field: 'name', headerName: 'Product Name', width: 300},
        { field: 'description', headerName: 'Product Description', width: 500},
        { field: 'category', headerName: 'Category', width: 150},
        { field: 'price', headerName: 'Price', width: 100},
        { field: 'qty', headerName: 'Quantity', width: 100},
        { field: 'date', headerName: 'Date', width: 150},
        { field: 'time', headerName: 'Time', width: 150},

    ]

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:3001/inventory")
        .then((response) => {
            const rows = response.data.map(item => ({
            id: item.product_id,
            name: item.product_name,
            description: item.product_desc,
            category: item.category,
            price: formatPrice(item.price),
            qty: item.stock,
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

    const handleAddProduct = () => {
        if (!productName || !productPrice || !productQty || !selectedOption) {
          alert('Please fill up all fields');
          return;
        }
        axios.post('http://localhost:3001/product-check', {
            prodName: productName,
        })
        .then((response) => {
        const { isTaken } = response.data;
        if (isTaken) {
            alert('Product name already exists');
        } else {
            axios.post('http://localhost:3001/add-products', {
                prodName: productName,
                prodDesc: productDesc,
                prodCateg: selectedOption,
                prodPrice: productPrice,
                prodQuantity: productQty,
                prodStatus: productStatus,
            })
            .then(() => {
                alert(`Product added: ${productName}`);
                fetchData(); // Assuming this function retrieves the latest product data from the server
            })
            .catch((error) => {
                alert(`Error adding product: ${error}`);
            });
        }
        })
        .catch((error) => {
            alert('Error checking product name');
            console.log(error);
        });
        setProductName('');
        setProductDesc('');
        setProductPrice('');
        setProductQty('');
    };

    const handleChangeQty = (event) => {
        const inputValue = event.target.value;
        // Validate if the input is a non-negative number
        if (!isNaN(inputValue) && Number(inputValue) >= 0) {
          setProductQty(inputValue);
        }
    };
    const handleChangePrice = (event) => {
        const inputValue = event.target.value;
        // Validate if the input is a non-negative number
        if (!isNaN(inputValue) && Number(inputValue) >= 0) {
          setProductPrice(inputValue);
        }
    };
    
  return (
    <div>
        <h1 className='text-[20px] md:text-[25px] font-light text-[#93F4D3]'>Add Product</h1>
        <div className='text-[#93F4D3] mt-[30px] flex flex-col sm:flex-row items-center md:items-start'>
            <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Product Name</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[600px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Product Description</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[600px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Product Description' value={productDesc} onChange={(e) => setProductDesc(e.target.value)} required/>

            </div>
            <div className='flex flex-col mx-[30px]'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Price</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[300px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Price' value={productPrice} onChange={handleChangePrice} required/>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Category</label>
                <Select className=' text-black font-light w-[350px] md:w-[300px]' value={selectedOption} options={options} onChange={handleOptionChange} placeholder={selectedOption ? selectedOption : 'Select category'}/>

            </div>
            <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Quantity</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[200px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Quantity' value={productQty} onChange={handleChangeQty} required/>
                <button className='py-2 justify-start px-[50px] mt-[30px] md:mt-[31px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleAddProduct}>Add Product</button>
            </div>
            <div>
            </div>
        </div>
        <div className='bg-white my-[50px] mx-auto hidden md:flex rounded-md h-[800px] md:h-[600px] z-1 justify-center items-center'>
            <DataGrid rows={rows} columns={columns} className='text-center' disableExtendRowFullWidth/>
        </div>
        {/* <div className='bg-white my-[50px] mx-auto md:hidden flex rounded-md h-[800px] md:h-[600px] z-1 justify-center items-center'>
            <DataGrid rows={rows1} columns={columns1} className='text-center' disableExtendRowFullWidth/>
        </div> */}
    </div>
  )
}

export default InventoryAddProducts