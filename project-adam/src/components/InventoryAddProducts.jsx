import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
const InventoryAddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQty, setProductQty] = useState('');
    const productStatus = 'In-Stock';
    const [rows, setRows] = useState([]);
    const [rows1, setRows1] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width:100},
        { field: 'name', headerName: 'Product Name', width: 700},
        { field: 'price', headerName: 'Price', width: 100},
        { field: 'qty', headerName: 'Quantity', width: 100},
    ]

    const columns1 = [
        { field: 'id', headerName: 'ID', width:50},
        { field: 'name', headerName: 'Product Name', width: 200},
        { field: 'price', headerName: 'Price', width: 60},
        { field: 'qty', headerName: 'Qty', width: 60},
    ]
    

    useEffect(() => {
        fetchData();
        fetchData1();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:3001/api/inventory")
        .then((response) => {
            const rows = response.data.map(item => ({
            id: item.product_id,
            name: item.product_name,
            price: item.price,
            qty: item.stock,
            }));
            setRows(rows);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const fetchData1 = () => {
        axios.get("http://localhost:3001/api/inventory")
        .then((response) => {
            const rows1 = response.data.map(item1 => ({
            id: item1.product_id,
            name: item1.product_name,
            price: item1.price,
            qty: item1.stock,
            }));
            setRows1(rows1);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleAddProduct = () => {
        if (!productName || !productPrice || !productQty) {
          alert('Please fill up all fields');
          return;
        }
        axios.post('http://localhost:3001/api/product-check', {
            prodName: productName,
        })
        .then((response) => {
        const { isTaken } = response.data;
        if (isTaken) {
            alert('Product name already exists');
        } else {
            axios
            .post('http://localhost:3001/api/add-products', {
                prodName: productName,
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
        setProductPrice('');
        setProductQty('');
    };
      
  return (
    <div>
        <h1 className='text-[20px] md:text-[25px] font-light text-[#93F4D3]'>Add Product</h1>
        <div className='text-[#93F4D3] mt-[30px] flex flex-col sm:flex-row items-center md:items-start'>
            <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Product Name</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[600px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} required/>

            </div>
            <div className='flex flex-col mx-[30px]'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Price</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[300px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required/>

            </div>
            <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Quantity</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[200px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Quantity' value={productQty} onChange={(e) => setProductQty(e.target.value)} required/>
            </div>
            <div>
            <button className='py-2 px-[90px] mt-[30px] md:mt-[31px] md:mx-[30px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleAddProduct}>Add Product</button>
            </div>
        </div>
        <div className='bg-white my-[50px] mx-auto hidden md:flex rounded-md h-[800px] md:h-[600px] z-1 justify-center items-center'>
            <DataGrid rows={rows} columns={columns} className='text-center' disableExtendRowFullWidth/>
        </div>
        <div className='bg-white my-[50px] mx-auto md:hidden flex rounded-md h-[800px] md:h-[600px] z-1 justify-center items-center'>
            <DataGrid rows={rows1} columns={columns1} className='text-center' disableExtendRowFullWidth/>
        </div>
    </div>
  )
}

export default InventoryAddProducts