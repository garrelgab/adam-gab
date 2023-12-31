import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ProductModal = (props) => {
    // const [name, setName] = ();
    
    const [qty, setQty] = useState('');
    const id = props.prodID;
    const handleConfirm = () => {
        //  alert(id);
        if(!qty){
            alert('Please fill out the empty field.');
            return;
        }
        if(qty > props.productQty){
            alert('Not enough stocks');
            return;
        }
        axios.post('http://localhost:3001/add-orders-temp', {
            prodID: id,
            prodName: props.productName,
            prodCategory: props.productCategory,
            prodPrice: props.productPrice * qty,
            prodQty: qty,
        })
        .then(response => {
            console.log(response.date);
            props.onClose(true);
        })
        .catch(error => {
            console.log(error);
        })
    }
    const handleChangeQty = (event) => {
        const inputValue = event.target.value;
        // Validate if the input is a non-negative number
        if (!isNaN(inputValue) && Number(inputValue) >= 0) {
            setQty(inputValue);
        }
    };
  return (
    <div className='fixed flex align-middle items-center justify-center py-[50px] top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-gray-800 w-[300px] md:w-[400px] h-auto max-h-[600px] my-[10px] z-50 bg-[#1ca350] rounded-md shadow-xl'>
            <button className='ml-[80%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            <div className='flex flex-col items-start mx-[50px]'>
                <h1 className='font-bold text-[30px] md:text-[50px]'>{props.productName}</h1>
                <h1 className='font-bold'>Category: {props.productCategory}</h1>
                <h1 className='font-bold'>Price: {props.productPrice}</h1>
                <h1 className='font-bold'>Stock: {props.productQty}</h1>
                <div className=''>
                    <label className="block mb-1 text-left font-bold">Quantity:</label>
                    <input type="text" className="shadow-lg block w-auto md:w-[300px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Quantity' value={qty} onChange={handleChangeQty} required/>
                </div>
            </div>
            <div className='flex justify-center'>
                <button className='py-4 px-[50px] md:px-[90px] my-[30px] md:mx-[30px] shadow-md rounded-md bg-gray-50 text-black ease-in-out duration-300 hover:bg-gray-500 hover:text-white' onClick={handleConfirm}>Confirm</button>

            </div>
        </div>
    </div>
  )
}

export default ProductModal