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

  const eightAM = dayjs().set('hour', 8).startOf('hour');
  const eightPM = dayjs().set('hour', 20).startOf('hour');

  const [myDate, setMyDate] = useState(props.myDate);

  const [startTime, setStartTime] = useState(eightAM);
  const [endTime, setEndTime] = useState(eightPM);
  const [name, setName] = useState('');
  const handleStartTimeChange = (timeStart) => {
    setStartTime(timeStart);
  };
  const handleEndTimeChange = (timeEnd) => {
    setEndTime(timeEnd);
  };

  const handleTry = () => {
    console.log(startTime);
    console.log(endTime);
    console.log(myDate);
  }
  const handleSaveReservation = () => {
    if(!name) {
      alert('Field required.');
      return;
    }
    axios.post("http://localhost:3001/api/reservation", {
      customerName: name,
      customerStartTime: startTime,
      customerEndTime: endTime,
      customerDate: myDate,
    })
    .then(response => {
      alert('Reservation saved.', response.data);
    })
    .catch(error => {
      console.error('Error saving data.', error)
    })
    setName('');
    props.onClose(false);
  };

  return (
    <div className='fixed flex align-middle justify-center pt-[90px] top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-black w-[500px] h-[500px] mt-[50px] z-50 bg-[#93F4D3] rounded-md shadow-xl'>
            <button className='ml-[90%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
          <div className='mx-[50px]'>
              <div className='flex justify-start'>
                <h1 className='text-[20px] font-bold'>{props.date1}</h1>
              </div>
              <div className='my-[20px] flex justify-center'>
                <form>
                  <input type="text" className="shadow-lg block w-[350px] mt-[30px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                </form>
              </div>
              <div className='flex flex-col'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <label>Start: </label>
                    <TimePicker
                      className='shadow-md'
                      onChange={handleStartTimeChange}
                      minTime={eightAM}
                      defaultValue={startTime}
                      value={startTime}
                    />
                  <label>End: </label>
                    <TimePicker
                      className='shadow-md'
                      onChange={handleEndTimeChange}
                      maxTime={eightPM}
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