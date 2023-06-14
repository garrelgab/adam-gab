import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
// import TimePicker from "react-time-picker";
// import moment from 'moment';
import Select from 'react-select';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';
import 'react-time-picker/dist/TimePicker.css';
import { useNavigate } from 'react-router-dom';
const AddReservation = (props) => {
  const navigate = useNavigate();
  // const sevenAM = dayjs().set('hour', 7).startOf('hour');
  // const tenPM = dayjs().set('hour', 22).startOf('hour');

  // const [name, setName] = useState('');
  // const [startTime, setStartTime] = useState(sevenAM);
  // const [endTime, setEndTime] = useState(tenPM);
  const [pax, setPax] = useState('');
  const myDate = props.myDate;
  const status = 'Hold';

  const id = props.id;

  // const startTimeFormat = startTime.format('HH:mm:ss');
  // const endTimeFormat = endTime.format('HH:mm:ss');

  const handleStartTimeChange = (timeStart) => {
    // setStartTime(timeStart);
  };
  const handleEndTimeChange = (timeEnd) => {
    // setEndTime(timeEnd);
  };
 
  
  // const handleSaveReservation = () => {
  //   if(pax >= 15) {
  //     alert('Maximun of 15 Pax only.');
  //     setPax('');
  //     return;
  //   }
  //   if (startTime.hour() < 7 || startTime.hour() >= 22 || endTime.hour() < 7 || endTime.hour() >= 22) {
  //     alert('Reservation can only be made between 7 AM and 10 PM.');
  //     return;
  //   }

  //   const durationHours = endTime.diff(startTime, 'hours');
  //   if (durationHours > 3) {
  //     alert('Reservation duration cannot exceed 3 hours.');
  //     return;
  //   }  
  //   axios.post("http://localhost:3001/reservation", {
  //     // customerName: name,
  //     customerID: id,
  //     noPax: pax,
  //     customerStartTime: startTimeFormat,
  //     customerEndTime: endTimeFormat,
  //     customerDate: myDate,
  //     customerStatus: status,
  //   })
  //   .then(response => {
  //     alert('Reservation saved.', response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error saving data.', error)
  //   })
  //   // setName('');

  //   props.onClose(false);
  // };

  const handleChangePax = (event) => {
    const inputValue = event.target.value;
    // Validate if the input is a non-negative number
    if (!isNaN(inputValue) && Number(inputValue) >= 0) {
      setPax(inputValue);

      const totalAmount = inputValue * 70; // Assuming the amount is calculated as 10 times the number of pax
      setAmount(totalAmount);
    }
  };

  //New Time Selection
  //Session 1
  const sevAM = dayjs().set('hour', 7).startOf('hour');
  const tenAM = dayjs().set('hour', 10).startOf('hour');
  //Session 2
  const onePM = dayjs().set('hour', 13).startOf('hour');
  //Session 3
  const fourPM = dayjs().set('hour', 16).startOf('hour');
  //Session 4
  const sevPM = dayjs().set('hour', 19).startOf('hour');
  //Session 5
  const tenPM = dayjs().set('hour', 22).startOf('hour');

  

  const options = [
    {value: 'session1', label: 'Session 1 (7:00 AM to 10:00 AM)'},
    {value: 'session2', label: 'Session 2 (10:00 AM to 1:00 PM)'},
    {value: 'session3', label: 'Session 3 (1:00 PM to 4:00 PM)'},
    {value: 'session4', label: 'Session 4 (4:00 PM to 7:00 PM)'},
    {value: 'session5', label: 'Session 5 (7:00 PM to 10:00 PM)'},
  ]
  const [mySelectedOption, setMySelectedOption] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const [amount, setAmount] = useState('');
  const [referenceNum, setReference] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef(null);

  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };
  const handleSaveReservation = () => {
    // alert(mySelectedOption);
    const description = 'Reservation Payment'

    if(!pax || !amount || !referenceNum || !selectedImage){
      alert('Please fill up the empty fields.');
      return;
    }
    if(pax > 15) {
      alert('Maximum of 15 pax only.');
      return;
    }
    if(mySelectedOption === 'session1'){
      axios.post("http://localhost:3001/reservation", {
        // customerName: name,
        customerID: id,
        noPax: pax,
        customerStartTime: sevAM.format('HH:mm:ss'),
        customerEndTime: tenAM.format('HH:mm:ss'),
        customerDate: myDate,
        customerStatus: status,
        refNum: referenceNum,
        amount: formatPrice(amount),
        imageData: selectedImage,
        desc: description,
      })
      .then(response => {
        console.log(response.data);
        if(response.data) {
          // alert(response.data.error);
          console.log(response.data.error);
          if(response.data.totalPax === 15) {
            alert(response.data.error);
            const totalPax = response.data.totalPax;
            const remainingPax = 15 - totalPax;
            alert(`${remainingPax} pax remaining for this session ${sevAM.format('hh:mm A')} - ${tenAM.format('hh:mm A')}`)
          }
          else {
            alert('Reservation Saved.')
          }
        }
        else {
          alert('Reservation Saved.')
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          alert(`You already booked for ${props.date1}`);
        } else if (error.response.status === 200) {
          console.log(error.response.data);
        } else 
        {
          console.log(error)
        }
      })
      props.onClose(false);
    } else if (mySelectedOption === 'session2') {
      axios.post("http://localhost:3001/reservation", {
        // customerName: name,
        customerID: id,
        noPax: pax,
        customerStartTime: tenAM.format('HH:mm:ss'),
        customerEndTime: onePM.format('HH:mm:ss'),
        customerDate: myDate,
        customerStatus: status,
        refNum: referenceNum,
        amount: formatPrice(amount),
        imageData: selectedImage,
        desc: description,
      })
      .then(response => {
        console.log(response.data);
        if(response.data) {
          // alert(response.data.error);
          console.log(response.data.error);
          if(response.data.totalPax === 15) {
            alert(response.data.error);
            const totalPax = response.data.totalPax;
            const remainingPax = 15 - totalPax;
            alert(`${remainingPax} pax remaining for this session ${tenAM.format('hh:mm A')} - ${onePM.format('hh:mm A')}`)
          }
          else {
          alert('Reservation Saved.')
          }
        }
        else {
          alert('Reservation Saved.')
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          alert(`You already booked for ${props.date1}`);
        } else if (error.response.status === 200) {
          console.log(error.response.data);
        } else 
        {
          console.log(error)
        }
      })
      props.onClose(false);

    } else if (mySelectedOption === 'session3') {

      axios.post("http://localhost:3001/reservation", {
        // customerName: name,
        customerID: id,
        noPax: pax,
        customerStartTime: onePM.format('HH:mm:ss'),
        customerEndTime: fourPM.format('HH:mm:ss'),
        customerDate: myDate,
        customerStatus: status,
        refNum: referenceNum,
        amount: formatPrice(amount),
        imageData: selectedImage,
        desc: description,
      })
      .then(response => {
        console.log(response.data);
        if(response.data) {
          // alert(response.data.error);
          console.log(response.data.error);
          if(response.data.totalPax === 15) {
            alert(response.data.error);
            const totalPax = response.data.totalPax;
            const remainingPax = 15 - totalPax;
            alert(`${remainingPax} pax remaining for this session ${onePM.format('hh:mm A')} - ${fourPM.format('hh:mm A')}`)
          }
          else {
            alert('Reservation Saved.')
          }
        }
        else {
          alert('Reservation Saved.')
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          alert(`You already booked for ${props.date1}`);
        } else if (error.response.status === 200) {
          console.log(error.response.data);
        } else 
        {
          console.log(error)
        }
      })
      props.onClose(false);

    } else if (mySelectedOption === 'session4') {

      axios.post("http://localhost:3001/reservation", {
        // customerName: name,
        customerID: id,
        noPax: pax,
        customerStartTime: fourPM.format('HH:mm:ss'),
        customerEndTime: sevPM.format('HH:mm:ss'),
        customerDate: myDate,
        customerStatus: status,
        refNum: referenceNum,
        amount: formatPrice(amount),
        imageData: selectedImage,
        desc: description,
      })
      .then(response => {
        console.log(response.data);
        if(response.data) {
          // alert(response.data.error);
          console.log(response.data.error);
          if(response.data.totalPax === 15) {
            alert(response.data.error);
            const totalPax = response.data.totalPax;
            const remainingPax = 15 - totalPax;
            alert(`${remainingPax} pax remaining for this session ${fourPM.format('hh:mm A')} - ${sevPM.format('hh:mm A')}`)
          }
          else {
            alert('Reservation Saved.')
          }
        }
        else {
          alert('Reservation Saved.')
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          alert(`You already booked for ${props.date1}`);
        } else if (error.response.status === 200) {
          console.log(error.response.data);
        } else 
        {
          console.log(error)
        }
      })
      props.onClose(false);

    } else if (mySelectedOption === 'session5') {

      axios.post("http://localhost:3001/reservation", {
        // customerName: name,
        customerID: id,
        noPax: pax,
        customerStartTime: sevPM.format('HH:mm:ss'),
        customerEndTime: tenPM.format('HH:mm:ss'),
        customerDate: myDate,
        customerStatus: status,
        refNum: referenceNum,
        amount: formatPrice(amount),
        imageData: selectedImage,
        desc: description,
      })
      .then(response => {
        console.log(response.data);
        if(response.data) {
          // alert(response.data.error);
          console.log(response.data.error);
          if(response.data.totalPax === 15) {
            alert(response.data.error);
            const totalPax = response.data.totalPax;
            const remainingPax = 15 - totalPax;
            alert(`${remainingPax} pax remaining for this session ${sevPM.format('hh:mm A')} - ${tenPM.format('hh:mm A')}`)
          }
          else {
            alert('Reservation Saved.')
          }
        }
        else {
          alert('Reservation Saved.')
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          alert(`You already booked for ${props.date1}`);
        } else if (error.response.status === 200) {
          console.log(error.response.data);
        } else 
        {
          console.log(error)
        }
      })
      props.onClose(false);
    }
  };
  const handleChange = (selectedOption) => {
    setMySelectedOption(selectedOption.value);
    setShowPayment(true);
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

  useEffect(() => {

  }, []);
  return (
    <div className='fixed flex items-center align-middle justify-center top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        {/* <div className='text-white w-[400px] md:w-[500px] h-[500px] mt-[50px] z-50 bg-[#1ca350] rounded-md shadow-xl'> */}
        <div className='text-white flex flex-col mt-[0px] md:w-[500px] bg-[#1ca350] rounded-md shadow-xl'>
            <button className='ml-[90%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            <div className='mx-[50px]'>
              <div className='flex justify-start'>
                <h1 className='text-[20px] font-bold'>{props.date1}</h1>
              </div>
              <div className='my-[20px] flex'>
                <form>
                  <h1 className='md:text-[20px] mt-[30px] text-white font-bold'>No of Pax</h1>
                  <input type="text" className=" flex shadow-lg  p-3 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='No of PAX' value={pax} onChange={handleChangePax} required/>
                </form>
              </div>
              <div>
                <Select options={options} className='text-black' placeholder='Please select a session' onChange={handleChange}/>
                {showPayment && (
                  <div className='flex flex-col mt-[10px]'>
                    <div className='my-[2px]'>
                        <h1 className='md:text-[20px] mt-[0px] text-white font-bold'>Reference Number</h1>
                        <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Reference Number' value={referenceNum} onChange={handleChangeReferenceNumber} required/>
                    </div>
                    <div className='my-[2px]'>
                        <h1 className='md:text-[20px] text-white font-bold'>Amount</h1>
                        <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Amount' value={formatPrice(amount)} readOnly onChange={handleChangeAmount} required/>
                    </div>
                    <div className='my-[2px]'>
                        <h1 className='md:text-[20px] text-white font-bold'>Upload Image</h1>
                        <input type="file" ref={inputFileRef} accept='image/*' className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" onChange={handleImageUpload} required/>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className='flex flex-col mt-[30px]'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <label>Start: </label>
                    <TimePicker
                      className='shadow-md bg-white rounded-md'
                      onChange={handleStartTimeChange}
                      minTime={sevenAM}
                      maxTime={tenPM}
                      defaultValue={startTime}
                      value={startTime}
                    />
                  <label>End: </label>
                    <TimePicker
                      className='shadow-md bg-white rounded-md'
                      onChange={handleEndTimeChange}
                      minTime={sevenAM}
                      maxTime={tenPM}
                      defaultValue={endTime}
                      value={endTime}
                    />
                </LocalizationProvider>
              </div> */}
              <div className='flex justify-end my-[40px]'>
                <button className='w-[150px] p-2 text-lg font-bold rounded-md bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white ease-in-out duration-300 shadow-lg hover:shadow-xl' onClick={handleSaveReservation}>Request</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AddReservation