import React, { useState, useRef, useEffect} from 'react'
import GYMRatesPoster from '../imgs/GYM Rates Poster.png';
import axios from 'axios';
const CustomerMembership = (props) => {

    const userID = props.id;
    // const [name, setName] = useState('');
    const [referenceNum, setReference] = useState('');
    const [amount, setAmount] = useState(700);
    const inputFileRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const description = 'Monthly Session';
  
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

    const formatPrice = (price) => {
    return Number(price).toFixed(2);
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
    const contactNo = '09123456789'
    
    const handleConfirm = () => {
        if(!referenceNum || !amount || !selectedImage)
        {
          alert('Please fill up the empty fields.');
          return;
        }
        axios.post('http://localhost:3001/add-proof-of-payment', {
          userID: userID,
          desc: description,
          refNum: referenceNum,
          amount: formatPrice(amount),
          imageData: selectedImage,
        })
        .then(response => {
          alert('Thankyou, Please wait the administrator to confirm your payment.');
          setReference('');
        //   setAmount('');
          setSelectedImage('');
          setSelectedImage(null);
          if(inputFileRef.current){
            inputFileRef.current.value = '';
          }
          console.log(response);
        //   fetchPaymentHistory();
        setFlexPayment(false);
        })
        .catch(error => {
          alert(error.data);
        })
    };

    const [flexPayment, setFlexPayment] = useState(false);

    const handlePayment = () => {
        setFlexPayment(true);
    }
    
    const [isSubscribed, setIsSubscribed] = useState(false);

    const fetchMembershipData = () => {
        axios.get('http://localhost:3001/membership')
        .then(response => {
            console.log(response.data[0].account_info_id);
            if(response.data[0].account_info_id === userID){
                setIsSubscribed(true);
            } else {
                setIsSubscribed(false);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };
    useEffect(() => {
        fetchMembershipData();
    },[]);
  return (
    <div className='my-[90px] mx-[50px]'>
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Membership</h1>
        <div className='flex justify-center items-center flex-col md:flex-row '>
            <div className='flex justify-center flex-col items-center h-[220px] w-[400px] outline shadow-xl rounded-md outline-1 mt-[50px] md:hover:mt-[30px] duration-300'>
                <h1 className='mt-[-105px] text-[30px] z-10 bg-[white] font-extrabold text-[#1ca350] px-5 rounded-md shadow-md'>Daily Session</h1>
                <div className='my-[30px]'>
                    <h1 className='text-[30px] font-bold'><span>&#8369; 70.00</span></h1>
                         {/* <img src={GYMRatesPoster} alt='' className='rounded-xl bg-transparent h-[500px] mt-[50px] cursor-pointer shadow-lg hover:mt-[30px] ease-in-out duration-300'/> */}
                </div>
                {/* <button className='w-[350px] my-[20px] p-3 font-bold rounded-xl bg-white ease-in-out duration-300 hover:bg-gray-500 text-[#1ca350] hover:text-white shadow-lg hover:shadow-xl'>Confirm</button> */}
            </div>
            <div className='flex justify-center mx-[50px] flex-col items-center h-[220px] w-[400px] outline shadow-xl rounded-md outline-1 mt-[50px] md:hover:mt-[30px] duration-300'>
                <h1 className='mt-[-20px] text-[30px] z-10 bg-[white] font-extrabold text-[#1ca350] px-5 rounded-md shadow-md'>Monthly Session</h1>
                <div className='my-[30px]'>
                    <h1 className='text-[30px] font-bold mx-[20px]'>{isSubscribed ? <p className='text-[20px] text-center'>You are currently subscribed to Monthly Session</p> : <span>&#8369; 700.00 / Month</span>}</h1>
                         {/* <img src={GYMRatesPoster} alt='' className='rounded-xl bg-transparent h-[500px] mt-[50px] cursor-pointer shadow-lg hover:mt-[30px] ease-in-out duration-300'/> */}

                </div>
                {!isSubscribed && (
                    <button className='w-[350px] my-[20px] p-3 font-bold rounded-xl bg-white ease-in-out duration-300 hover:bg-gray-500 text-[#1ca350] hover:text-white shadow-lg hover:shadow-xl' onClick={handlePayment}>Confirm</button>
                )}
            </div>
            <div className='flex justify-center flex-col items-center h-[220px] w-[400px] outline shadow-xl rounded-md outline-1 mt-[50px] md:hover:mt-[30px] duration-300'>
                <h1 className='mt-[-105px] text-[30px] z-10 bg-[white] font-extrabold text-[#1ca350] px-5 rounded-md shadow-md'>Dance Studio</h1>
                <div className='my-[30px]'>
                    <h1 className='text-[30px] font-bold'><span>&#8369; 70.00 3hrs / per head</span></h1>
                         {/* <img src={GYMRatesPoster} alt='' className='rounded-xl bg-transparent h-[500px] mt-[50px] cursor-pointer shadow-lg hover:mt-[30px] ease-in-out duration-300'/> */}

                </div>
                {/* <button className='w-[350px] my-[20px] p-3 font-bold rounded-xl bg-white ease-in-out duration-300 hover:bg-gray-500 text-[#1ca350] hover:text-white shadow-lg hover:shadow-xl'>Confirm</button> */}
            </div>
            
        </div>
        { flexPayment && (
            <div className='max-w-[1240px] justify-center flex items-center ease-in-out duration-300 mx-auto'>
                <div className='flex flex-col'>
                    <h1 className='mt-[30px] text-[30px] text-center z-50 font-extrabold text-[#1ca350] px-5'>{description}</h1>
                    <div className='my-[5px]'>
                        <h1 className='md:text-[20px] mt-[30px] text-[#1ca350] font-bold'>Gym Number</h1>
                        <input type="text" className="shadow-lg block w-full font-bold p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Reference Number' value={contactNo} onChange={handleChangeReferenceNumber} readOnly required/>
                    </div>
                    <div className='my-[5px]'>
                        <h1 className='md:text-[20px] mt-[30px] text-[#1ca350] font-bold'>Reference Number</h1>
                        <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Reference Number' value={referenceNum} onChange={handleChangeReferenceNumber} required/>
                    </div>
                    <div className='my-[5px]'>
                        <h1 className='md:text-[20px] text-[#1ca350] font-bold'>Amount</h1>
                        <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Amount' value={formatPrice(amount)} onChange={handleChangeAmount} required/>
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
        )}
    </div>
  )
}

export default CustomerMembership