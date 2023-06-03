import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
// import TimePicker from "react-time-picker";
// import moment from 'moment';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';
import 'react-time-picker/dist/TimePicker.css';
const AddReservation = (props) => {

  const sevenAM = dayjs().set('hour', 7).startOf('hour');
  const tenPM = dayjs().set('hour', 22).startOf('hour');
  
  // const [name, setName] = useState('');
  const [startTime, setStartTime] = useState(sevenAM);
  const [endTime, setEndTime] = useState(tenPM);
  const [pax, setPax] = useState('');
  const myDate = props.myDate;
  const status = 'Pending';

  const id = props.id;

  const startTimeFormat = startTime.format('HH:mm:ss');
  const endTimeFormat = endTime.format('HH:mm:ss');

  const handleStartTimeChange = (timeStart) => {
    setStartTime(timeStart);
  };
  const handleEndTimeChange = (timeEnd) => {
    setEndTime(timeEnd);
  };
 
  const handleSaveReservation = () => {
    if(pax >= 15) {
      alert('Maximun of 15 Pax only.');
      setPax('');
      return;
    }
    if (startTime.hour() < 7 || startTime.hour() >= 22 || endTime.hour() < 7 || endTime.hour() >= 22) {
      alert('Reservation can only be made between 7 AM and 10 PM.');
      return;
    }

    const durationHours = endTime.diff(startTime, 'hours');
    if (durationHours > 3) {
      alert('Reservation duration cannot exceed 3 hours.');
      return;
    }  
    axios.post("http://localhost:3001/api/reservation", {
      // customerName: name,
      customerID: id,
      noPax: pax,
      customerStartTime: startTimeFormat,
      customerEndTime: endTimeFormat,
      customerDate: myDate,
      customerStatus: status,
    })
    .then(response => {
      alert('Reservation saved.', response.data);
    })
    .catch(error => {
      console.error('Error saving data.', error)
    })
    // setName('');
    props.onClose(false);
  };

  const handleChangeAmount = (event) => {
    const inputValue = event.target.value;
    // Validate if the input is a non-negative number
    if (!isNaN(inputValue) && Number(inputValue) >= 0) {
      setPax(inputValue);
    }
  };
  return (
    <div className='fixed flex align-middle justify-center pt-[90px] top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-white w-[400px] md:w-[500px] h-[500px] mt-[50px] z-50 bg-[#1ca350] rounded-md shadow-xl'>
            <button className='ml-[90%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            <div className='mx-[50px]'>
              <div className='flex justify-start'>
                <h1 className='text-[20px] font-bold'>{props.date1}</h1>
              </div>
              <div className='my-[20px] flex'>
                <form>
                {/* <h1 className='text-[20px] font-bold'>{id}</h1> */}

                  <input type="text" className=" flex shadow-lg mt-[30px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='No of PAX' value={pax} onChange={handleChangeAmount} required/>
                </form>
              </div>
              <div className='flex flex-col mt-[30px]'>
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
              </div>
              <div className='flex justify-end mt-[40px]'>
                <button className='w-[150px] p-2 text-lg font-light rounded-md bg-gray-600 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl' onClick={handleSaveReservation}>Request</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AddReservation