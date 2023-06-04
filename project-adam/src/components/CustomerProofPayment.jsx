import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import PosTabs from './PosTabs';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router';
const CustomerProofPayment = (props) => {

  
  const userID = props.id;
  // const [name, setName] = useState('');
  const [referenceNum, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [rows, setRows] = useState([]);
  const columns = [
    // {field: 'id', headerName: 'ID', width: 100},
    {field: 'refNo', headerName: 'Reference Number', flex: 1},
    {field: 'amount', headerName: 'Amount', flex: 1},
    {field: 'date', headerName: 'Date', flex: 1},
    {field: 'time', headerName: 'Time', flex: 1},
  ];
  const fetchPaymentHistory = () => {
    axios.get('http://localhost:3001/api/customer-payment-history', {
      params: {
        accID: userID,
      }
    })
    .then(response => {
      const rows = response.data.map(item => ({
        id: item.proof_of_payment_id,
        refNo: item.reference_number,
        amount: formatPrice(item.amount),
        date: item.date,
        time: item.time,
      }));
      setRows(rows);
    })
    .catch(error => {
      console.log(error);
    })
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
    if (file && isFileSupported(file)) {
      const imageData = reader.result.split(',')[1];
      setSelectedImage(imageData);
    } else {
      alert('Please upload a PNG or JPEG (JPG) file.');
      setSelectedImage(null);
    }
    };
    reader.readAsDataURL(file);
  };
  const isFileSupported = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  const handle =() => {
  }
  
  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };
  const handleConfirm = () => {
    const description = 'Monthly Session';
    if(!referenceNum || !amount || !selectedImage)
    {
      alert('Please fill up the empty fields.');
      return;
    }
    axios.post('http://localhost:3001/api/add-proof-of-payment', {
      userID: userID,
      desc: description,
      refNum: referenceNum,
      amount: formatPrice(amount),
      imageData: selectedImage,
    })
    .then(response => {
      alert('Thankyou, Please wait the administrator to confirm your payment.');
      setReference('');
      setAmount('');
      setSelectedImage('');
      setSelectedImage(null);
      if(inputFileRef.current){
        inputFileRef.current.value = '';
      }
      console.log(response);
      fetchPaymentHistory();
    })
    .catch(error => {
      alert(error.data);
    })
  };
  const handleChangeAmount = (event) => {
    const inputValue = event.target.value;
    // Validate if the input is a non-negative number
    if (!isNaN(inputValue) && Number(inputValue) >= 0) {
      setAmount(inputValue);
    }
  };
  const handleChangeReferenceNumber = (event) => {
    const inputValue = event.target.value;
    // Validate if the input is a non-negative number
    if (!isNaN(inputValue) && Number(inputValue) >= 0) {
      setReference(inputValue);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();  
  }, []);
  const tabs = [
    {
      title: 'Payment',
      content:
      <div>
        <div className='flex flex-col'>
          <div className='my-[5px]'>
              <h1 className='md:text-[20px] mt-[30px] text-[#1ca350] font-bold'>Reference Number</h1>
              <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Reference Number' value={referenceNum} onChange={handleChangeReferenceNumber} required/>
          </div>
          <div className='my-[5px]'>
              <h1 className='md:text-[20px] text-[#1ca350] font-bold'>Amount</h1>
              <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Amount' value={amount} onChange={handleChangeAmount} required/>
          </div>
          <div className='my-[5px]'>
              <h1 className='md:text-[20px] text-[#1ca350] font-bold'>Upload Image</h1>
              <input type="file" ref={inputFileRef} accept='image/*' className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" onChange={handleImageUpload} required/>
          </div>
          <div className='md:justify-end flex justify-center my-[20px]'>
            <button className='md:w-[200px] w-[100%] md:p-2 py-[10px] font-bold rounded-md bg-white text-[#1ca350] hover:text-white hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    },
    {
      title: 'Payment History',
      content: 
      <div className='w-[100%] h-[600px] bg-white rounded-md my-10'>
        <DataGrid rows={rows} columns={columns} className='w-[100%] rounded-md'/>
      </div>
    }
  ];
  return (
    <div className='mt-[90px] mx-[50px]'>
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Payment</h1>
        <div>
          <PosTabs tabs={tabs}/>
        </div>
    </div>
  )
}

export default CustomerProofPayment