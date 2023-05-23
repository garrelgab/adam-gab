import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import Select from 'react-select';

const InventoryUpdateProducts = () => {

  const [prodID, setProdID] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQty, setProductQty] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
  const [rows, setRows] = useState([]);

  const optionsCategory = [
    { value: 'food', label: 'Food Supplements'},
    { value: 'drinks', label: 'Energy Drinks'},
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width:100},
    { field: 'name', headerName: 'Product Name', width: 300},
    { field: 'description', headerName: 'Product Description', width: 450},
    { field: 'category', headerName: 'Category', width: 150},
    { field: 'price', headerName: 'Price', width: 100},
    { field: 'qty', headerName: 'Quantity', width: 100},
    { field: 'date', headerName: 'Date', width: 150},
    { field: 'time', headerName: 'Time', width: 150},
    { field: 'status', headerName: 'Status', width: 100},

    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'left',
      width: 150,
      renderCell: (params) => (
        <div className='flex flex-col'>
          <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: 'white',
            color: 'gray',
            '&:hover': {
              backgroundColor: 'gray',
              color: 'white',
            },
            marginTop: '3px',
            marginBottom: '3px',
            width: '100px'
          }}
          onClick={() => handleAction(params.row.id, params.row.name, params.row.status)}
          >
            {/* Archive */}
            {params.row.status === 'Archived' ? 'Show' : 'Archive'}
          </Button>
          <Button
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: 'white',
            color: 'gray',
            '&:hover': {
              backgroundColor: 'gray',
              color: 'white',
            },
            marginTop: '3px',
            marginBottom: '3px',
            width: '100px'
          }}
          onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ]

  const fetchData = () => {
    axios.get("http://localhost:3001/api/inventory")
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
        status: item.product_status,
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

  useEffect(() => {    
    fetchOptions();
    fetchData();
  }, []);
  const archived = 'Archived';
  const show = 'Show';
  const [action, setAction] = useState(false);
  // const [edit, setEdit] = useState(false);
  const handleAction = (id, name, status) => {
    // alert(`Button clicked for row with id ${id}`);
    // alert(`Button clicked for row with id ${name}`);
    if(status === 'Archived'){
      axios.put('http://localhost:3001/api/update-prod-status', {
      prodID: id,
      newProdStatus: show,
      })
      .then(response => {
        // alert(`The ${name} has been change status to ${show}`);
        fetchData();
      })
      .catch(error => {
        console.log(error);
      })
    }
    else{
      axios.put('http://localhost:3001/api/update-prod-status', {
      prodID: id,
      newProdStatus: archived,
      })
      .then(response => {
        // alert(`The ${name} has been change status to ${archived}`);
        fetchData();
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  const handleEdit = (id) => {
    // alert(`Button clicked for row with id ${id}`);
    setAction(!action);
    setProdID(id);
    axios.get('http://localhost:3001/api/price-inventory', {
      params: {
        prodID: id,
      }
    })
    .then(response => {
      setProductPrice(response.data[0].price);
      setProductName(response.data[0].product_name);
      setProductDesc(response.data[0].product_desc);
      setSelectedOptionCategory(response.data[0].category);
    })
    .catch(error => {
      console.log(error);
    })
  
  }

  const [category, setCategory] = useState(''); 
  const handleOptionChange = (selectedOption) => {
    setSelectedOptionCategory(selectedOption.label);
    // alert(selectedOption.label);
  }
  const handleUpdateProduct = () => {
    // alert(selectOptionName);
    if(!productPrice || !productName){
      alert('Please fill up the empty field.');
      return;
    }
    
    axios.put('http://localhost:3001/api/update-inventory', {
        prodID: prodID,
        newProdPrice: productPrice,
        newProdQty: productQty,
        newProdDesc: productDesc,
        newProdCat: selectedOptionCategory,
    })
    .then(response => {
      alert(`Product: ${productName} updated successfully.`, response);
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

  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption.value);
  //   setSelectedOptionName(selectedOption.label)
  //   if(selectedOption){
  //     axios.get('http://localhost:3001/api/price-inventory', {
  //       params: {
  //         prodID: selectedOption.value,
  //       }
  //     })
  //     .then(response => {
  //       setProductPrice(response.data[0].price);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   }
  // };
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
  const rowHeight = 100;
  return (
    <div>        
      <h1 className='text-[20px] md:text-[25px] font-light text-[#93F4D3]'>Update Product</h1>
      {action && (
        <div>
          <div className='text-[#93F4D3] mt-[30px] flex flex-col sm:flex-row items-center md:items-start'>
              <div className='flex flex-col'>
                  <label className="block mb-1 text-md md:text-lg text-left font-light">Product Name</label>
                  <input type="text" className="shadow-lg block w-[350px] md:w-[600px] p-2 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder={productName} value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                  {/* <Select className=' text-black font-light w-[350px] md:w-[600px]' options={options} onChange={handleChange} placeholder="Select product"/> */}
                    <label className="block mb-1 text-md md:text-lg text-left font-light">Product Description</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[600px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder={productDesc} value={productDesc} onChange={(e) => setProductDesc(e.target.value)} required/>

              </div>
              <div className='flex flex-col mx-[30px]'>
                  <label className="block mb-1 text-md md:text-lg text-left font-light">Price</label>
                  <input type="text" className="shadow-lg block w-[350px] md:w-[300px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Price' value={productPrice} onChange={handleChangePrice} required/>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Category</label>
                <Select className=' text-black font-light w-[350px] md:w-[300px]' value={selectedOptionCategory} options={optionsCategory} onChange={handleOptionChange} placeholder={selectedOptionCategory ? selectedOptionCategory : 'Select category'}/>

              </div>
              <div className='flex flex-col'>
                <label className="block mb-1 text-md md:text-lg text-left font-light">Add Quantity</label>
                <input type="text" className="shadow-lg block w-[350px] md:w-[200px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Add Quantity' value={productQty} onChange={handleChangeQty} required/>
                <button className='py-2 px-[30px] mt-[30px] md:mt-[31px] md:mx-[0px] rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleUpdateProduct}>Update Products</button>
              </div>
              <div>
              </div>
          </div>
        </div>
      )}
      <div className='hidden bg-white my-[50px] mx-auto md:h-[600px] md:flex rounded-md justify-center items-center'>
          <DataGrid rows={rows} columns={columns} className='text-center' rowHeight={rowHeight} disableExtendRowFullWidth/>
      </div>
    </div>
  )
}

export default InventoryUpdateProducts