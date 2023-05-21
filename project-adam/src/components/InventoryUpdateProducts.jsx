import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Select from 'react-select';

const InventoryUpdateProducts = () => {
  // const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQty, setProductQty] = useState('');
  
  const [rows, setRows] = useState([]);

  const columns = [
      { field: 'id', headerName: 'ID', width:100},
      { field: 'name', headerName: 'Product Name', width: 700},
      { field: 'price', headerName: 'Price', width: 100},
      { field: 'qty', headerName: 'Quantity', width: 100},
  ]
  // const [rows1, setRows1] = useState([]);

  // const columns1 = [
  //     { field: 'id', headerName: 'ID', width:50},
  //     { field: 'name', headerName: 'Product Name', width: 200},
  //     { field: 'price', headerName: 'Price', width: 60},
  //     { field: 'qty', headerName: 'Qty', width: 60},
  // ]

  useEffect(() => {
    fetchOptions();
    fetchData();
    // fetchData1();
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

  // const fetchData1 = () => {
  //   axios.get("http://localhost:3001/api/inventory")
  //   .then((response) => {
  //       const rows1 = response.data.map(item1 => ({
  //       id: item1.product_id,
  //       name: item1.product_name,
  //       price: item1.price,
  //       qty: item1.stock,
  //       }));
  //       setRows1(rows1);
  //   })
  //   .catch(error => {
  //       console.error(error);
  //   });
  // };
  const handleUpdateProduct = () => {
    // alert(selectOptionName);
    axios.put('http://localhost:3001/api/update-inventory', {
      prodID: selectOption,
        newProdPrice: productPrice,
        newProdQty: productQty,
    })
    .then(response => {
      alert(`Product: ${selectOptionName} updated successfully.`, response);
      fetchData();
      // fetchData1();
    })
    .catch(error => {
      console.log(error);
    });
    setProductQty('')
  };
  
  const [options, setOptions] = useState([]);
  const [selectOption, setSelectedOption] = useState(null);
  const [selectOptionName, setSelectedOptionName] = useState(null);


  const fetchOptions = () => {
    axios.get('http://localhost:3001/api/option-inventory')
    .then((response) => {
      setOptions(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    setSelectedOptionName(selectedOption.label)
    if(selectedOption){
      axios.get('http://localhost:3001/api/price-inventory', {
        params: {
          prodID: selectedOption.value,
        }
      })
      .then(response => {
        setProductPrice(response.data[0].price);
      })
      .catch(error => {
        console.log(error);
      })
    }
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
        <h1 className='text-[20px] md:text-[25px] font-light text-[#93F4D3]'>Update Product</h1>
        <div className='text-[#93F4D3] mt-[30px] flex flex-col sm:flex-row items-center md:items-start'>
            <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Product Name</label>
                {/* <input type="text" className="shadow-lg block w-[350px] md:w-[600px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} required/> */}
                <Select className=' text-black font-light w-[350px] md:w-[600px]' options={options} onChange={handleChange} placeholder="Select product"/>

            </div>
            <div className='flex flex-col mx-[30px]'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Price</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[300px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Price' value={productPrice} onChange={handleChangePrice} required/>

            </div>
            <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Add Quantity</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[200px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Add Quantity' value={productQty} onChange={handleChangeQty} required/>
            </div>
            <div>
            <button className='py-2 px-[90px] mt-[30px] md:mt-[31px] md:mx-[30px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleUpdateProduct}>Update Products</button>
            </div>
        </div>
        <div className='hidden bg-white my-[50px] mx-auto md:h-[600px] md:flex rounded-md justify-center items-center'>
            <DataGrid rows={rows} columns={columns} className='text-center' disableExtendRowFullWidth/>
        </div>
        {/* <div className='bg-white my-[50px] mx-auto md:hidden h-[800px] flex rounded-md justify-center items-center'>
            <DataGrid rows={rows} columns={columns} className='text-center' disableExtendRowFullWidth/>
        </div> */}
    </div>
  )
}

export default InventoryUpdateProducts