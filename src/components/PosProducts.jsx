import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button';
import axios from 'axios';
import ProductModal from './ProductModal';
import ProductUpdateModal from './ProductUpdateModal';
const PosProducts = () => {
  const [rows, setRows] = useState([]);
  const columns = [
      { field: 'id', headerName: 'Product ID', width: 100},
      { field: 'name', headerName: 'Product Name', width: 450},
      { field: 'category', headerName: 'Category', width: 150},
      { field: 'price', headerName: 'Price', width: 100},
      { field: 'qty', headerName: 'Quantity', width: 100},
  ]
  

  const fetchData = () => {
    axios.get("http://localhost:3001/pos-inventory")
    .then((response) => {
        const rows = response.data.map(item => ({
        id: item.product_id,
        name: item.product_name,
        category: item.category,
        price: formatPrice(item.price),
        qty: item.stock,
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

  const [selectRow, setSelectRow] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleSelectedRow = (params) => {
    setOpenModal(!openModal);
    fetchOrder();
    fetchTotal();
    setChange(0);
    setSelectRow(params.row);
  }

  //Cart
  const [rows1, setRows1] = useState([]);
  const columns1 = [
    // { field: 'id', headerName: 'Product ID', width: 100},
    // { field: 'id1', headerName: 'Product ID', width: 100},

    { field: 'name', headerName: 'Product Name', width: 150},
    { field: 'category', headerName: 'Category', width: 150},
    { field: 'price', headerName: 'Total Price', width: 90},
    { field: 'qty', headerName: 'Quantity', width: 90},
    { field: 'date', headerName: 'Date', width: 110},
    { field: 'time', headerName: 'Time', width: 110},
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'left',
      width: 120,
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
          onClick={() => handleEdit(params.row.id, params.row.id1, params.row.name, params.row.category)}
          >
            Edit
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
          onClick={() => handleDelete(params.row.id)}
          >
            Void
          </Button>
        </div>
      ),
    },
  ];
  const [prodUpdateID, setProdUpdateID] = useState('');
  const [prodUpdateName, setProdUpdateName] = useState('');
  const [prodUpdateCategory, setProdUpdateCategory] = useState('');
  const [openProductUpdateModal, setOpenProductUpdateModal] = useState(false);
  const handleEdit = (id, id1, name, category) => {
    setOpenProductUpdateModal(!openProductUpdateModal);
    fetchOrder();
    fetchTotal();
    setProdUpdateID(id1)
    setProdUpdateName(name);
    setProdUpdateCategory(category);
  }
  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/void", {
      params: {
        orderTempID: id,
      }
    })
    .then(response => {
      fetchOrder();
      fetchTotal();
    })
    .catch(error => {
      alert(error);
    })
  }
  const fetchOrder = () => {
    axios.get("http://localhost:3001/orders-temp")
    .then((response) => {
      const rows1 = response.data.map(item => ({
      id: item.order_temp_id,
      id1: item.product_id,
      name: item.product_name,
      category: item.category,
      price: formatPrice(item.price),
      qty: item.qty,
      date: item.date,
      time: item.time,
      }));
      setRows1(rows1);
    })
    .catch(error => {
        console.error(error);
    });
  };
  const [total, setTotal] = useState(0);
  const fetchTotal = () => {
    fetch('http://localhost:3001/sum-price')
      .then(response => response.json())
      .then(data => {
        setTotal(data.total);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const [tendAmount, setTendAmount] = useState('');
  const handleChangePrice = (event) => {
    const inputValue = event.target.value;
    // Validate if the input is a non-negative number
    if (!isNaN(inputValue) && Number(inputValue) >= 0) {
      setTendAmount(inputValue);
    }
  };  
  const [change, setChange] = useState(0);
  const handleConfirmOrder = () => {
    if(total === 0){
      alert('No items in cart.');
      return;
    }
    if(tendAmount < total){
      alert('Please enter exact amount.')
      return;
    }
    const ids = rows1.map(row => row.id);
    const names = rows1.map(row => row.name);
    const prices = rows1.map(row => row.price);
    const qty = rows1.map(row => row.qty);

    console.log(qty);
    console.log(ids);
    axios.put('http://localhost:3001/update-products', {
      prodQty: qty,
      prodID: ids,
    })
    .then(response => {
      axios.post('http://localhost:3001/add-orders', {
        prodIDs: ids,
        prodNames: names,
        prodPrice: prices,
        quantities: qty,
        orderNum: randomNumbers,
      })
      .then(response => {
        axios.post('http://localhost:3001/add-sales', {
          orderNum: randomNumbers,
          total: total,
        })
        .then(response => {
          axios.delete('http://localhost:3001/clean-order-temp')
            .then(response => {
              setChange(tendAmount- total);
              setTotal(0)
              fetchData();
              fetchOrder();
              generateRandomNumber();
            })
            .catch(error => {
              console.log(error);
            })
        })
        .catch(error => {
          console.log(error);
        })
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      alert('Error')
    })
    setTendAmount('');
  }

  const [randomNumbers, setRandomNumbers] = useState([]);

  const generateRandomNumber = () => {
    const newRandomNumber = Math.random().toString().substring(2, 10);
    setRandomNumbers(newRandomNumber);
  };
  const rowHeight = 100;

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:3001/pos-inventory")
      .then((response) => {
          const rows = response.data.map(item => ({
          id: item.product_id,
          name: item.product_name,
          category: item.category,
          price: formatPrice(item.price),
          qty: item.stock,
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
    const fetchOrder = () => {
      axios.get("http://localhost:3001/orders-temp")
      .then((response) => {
        const rows1 = response.data.map(item => ({
        id: item.order_temp_id,
        id1: item.product_id,
        name: item.product_name,
        category: item.category,
        price: formatPrice(item.price),
        qty: item.qty,
        date: item.date,
        time: item.time,
        }));
        setRows1(rows1);
      })
      .catch(error => {
          console.error(error);
      });
    };
    fetchData();
    fetchOrder();
    fetchTotal();
    generateRandomNumber();
  }, []);
  //Order Temp
  
  return (
    <div>
      <div className='grid md:grid-cols-2'>
        <div className='hidden md:flex md:flex-col'>
          <h1 className='text-[20px] md:text-[25px] font-light text-[#93F4D3]'>Products</h1>
          <div className='mt-[30px] text-center bg-white z-1 h-[600px] w-[100%] rounded-md'>
            <DataGrid rows={rows} columns={columns}  pageSizeOptions={[]} hideFooterPagination={true} className='text-center' onRowClick={handleSelectedRow} disableExtendRowFullWidth/>
            { openModal &&  <ProductModal onClose={handleSelectedRow} prodID={selectRow.id} productName={selectRow.name} productCategory={selectRow.category} productPrice={selectRow.price} productQty={selectRow.qty}/>}
          </div>
        </div>
        <div className='md:ml-[50px] hidden md:flex md:flex-col'>
          <div className='flex justify-between text-[20px] md:text-[25px] font-light'>
            <h1 className='text-[#93F4D3]'>Cart</h1>
            <h1 className='flex text-[#93F4D3]'>Order ID:<p className='ml-2 flex text-white'> {randomNumbers}</p></h1>

          </div>

          <div className='mt-[30px] bg-white rounded-md h-[600px] w-[100%]'>
            <DataGrid rows={rows1} columns={columns1}  pageSizeOptions={[]} rowHeight={rowHeight} hideFooterPagination={true} className='text-center' autoPageSize disableExtendRowFullWidth/>
            { openProductUpdateModal && <ProductUpdateModal onClose={handleEdit} prodID={prodUpdateID} productName={prodUpdateName} productCategory={prodUpdateCategory}/>}
          </div>
          <div className='justfiy-between mt-[30px]'>
            <h1 className='text-[20px] justify-start md:text-[25px] flex item text-[#93F4D3]'>Total: <p className='ml-5 text-white'>{formatPrice(total)}</p></h1>
            <label className="block mb-1 text-md md:text-[20px] text-left mt-4 text-[#93F4D3]">Tendered Amount</label>
            <input type="text" className="shadow-lg block w-[350px] md:w-[300px] p-2 text-gray-900 rounded-md bg-gray-50 sm:text-md focus:outline-none" placeholder='Tendered Amount' value={tendAmount} onChange={handleChangePrice} required/>
            <h1 className='text-[20px] justify-start md:text-[25px] flex item text-[#93F4D3]'>Change: <p className='ml-5 text-white'>{formatPrice(change)}</p></h1>
            <button className='py-4 px-[50px] md:px-[90px] my-[30px] shadow-md rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleConfirmOrder}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PosProducts