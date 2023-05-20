import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import ProductModal from './ProductModal';
const PosProducts = () => {
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 100},
        { field: 'name', headerName: 'Product Name', width: 600},
        { field: 'price', headerName: 'Price', width: 100},
        { field: 'qty', headerName: 'Quantity', width: 100},
    ]
    useEffect(() => {
      fetchData();
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

    const [selectRow, setSelectRow] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const handleSelectedRow = (params) => {
      setOpenModal(!openModal);
      setSelectRow(params.row);
    }


  return (
    <div>
      <div className='grid grid-cols-2'>
        <div>
          <h1 className='text-[20px] md:text-[25px] font-light text-[#93F4D3]'>Products</h1>
          <div className='text-center bg-white z-1 h-[600px] rounded-md'>
            <DataGrid rows={rows} columns={columns} className='text-center' onRowClick={handleSelectedRow} disableExtendRowFullWidth/>
            { openModal &&  <ProductModal onClose={handleSelectedRow} productName={selectRow.name} productPrice={selectRow.price} productQty={selectRow.qty}/>}
          </div>
        </div>
        <div className=' ml-[50px] justify-center mr-[50px]'>
          <h1 className='text-[20px] md:text-[25px] font-light text-[#93F4D3]'>Cart</h1>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PosProducts