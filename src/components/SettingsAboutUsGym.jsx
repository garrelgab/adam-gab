import React, {useState, useEffect} from 'react'
// import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import PosTabs from './PosTabs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import 'react-time-picker/dist/TimePicker.css';

const SettingsAboutUsGym = () => {

  axios.defaults.withCredentials = true;

  const [description, setDescription] = useState(null);
  // const [options, setOptions] = useState([]);
  // const [selectOption, setSelectedOption] = useState(null);
  // const [selectOptionName, setSelectedOptionName] = useState(null);
  
  const handleConfirm = () => {
    axios.post('http://localhost:3001/add-about', {
      addDescription: description,
    })
    .then(response => {
      alert(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  };

  const fetchData = () => {
    axios.get('http://localhost:3001/desc-about')
    .then(response => {
      setDescription(response.data[0].description);
    })
    .catch(error => {
      console.log(error);
    })
  };
  
  // useEffect(() => {
  //   axios.get('http://localhost:3001/option-about')
  //   .then((response) => {
  //     setOptions(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // },[]);

  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption.value);
  //   setSelectedOptionName(selectedOption.label);

  //   if(selectedOption) {
  //     axios.get('http://localhost:3001/desc-about', {
  //       params: {
  //         descAboutID: selectedOption.value,
  //       }
  //     })
  //     .then(response => {
  //       setDescription(response.data[0].description);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   }
  // };

  // const handleUpdateAbout = () =>{
  //   if(!selectOption){
  //     alert('Please fill out the empty field.');
  //     return;
  //   }
  //   axios.put('http://localhost:3001/update-desc-about', {
  //     AboutDescription: description,
  //     AboutID: selectOption,
  //   })
  //   .then(response => {
  //     axios.get('http://localhost:3001/desc-about', {
  //       params: {
  //         descAboutID: selectOption,
  //       }
  //     })
  //     .then(response => {
  //       setDescription(response.data[0].description);
  //       alert(`${selectOptionName}: Description Updated Successfully.`);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // };
  const start = dayjs().set('hour', 0).startOf('hour');
  const end = dayjs().set('hour', 23).set('minute', 59).startOf('minute');


  const [startTime, setStartTime] = useState(start);
  const [endTime, setEndTime] = useState(end);

  const startTimeFormat = startTime.format('HH:mm:ss');
  const endTimeFormat = endTime.format('HH:mm:ss');

  const handleStartTimeChange = (timeStart) => {
    setStartTime(timeStart);
  };
  const handleEndTimeChange = (timeEnd) => {
    setEndTime(timeEnd);
  };

  const handleAddBusinessHours = () => {
    axios.post('http://localhost:3001/add-business-hour', {
      businessStart: startTimeFormat,
      businessEnd: endTimeFormat,
    })
    .then(response => {
      alert(response.data);
    })
    .catch(error => {
      console.log(error)
    });
  };

  const [fetchStart, setFetchStart] = useState(null);
  const [fetchEnd, setFetchEnd] = useState(null);
  const fetchBusinessHour = () => {
    axios.get('http://localhost:3001/business-hour')
    .then(response => {
      setFetchStart(response.data[0].start_time);
      setFetchEnd(response.data[0].end_time);
    })
    .catch(error => {
      console.log(error);
    })
  };

  const [locationLink, setLocationLink] = useState(null);

  const handleAddLocation = () => {
    axios.post('http://localhost:3001/add-location', {
      locationLink: locationLink,
    })
    .then(response => {
      alert(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const fetchLocation = () => {
    axios.get('http://localhost:3001/location')
    .then(response => {
      setLocationLink(response.data[0].location_link.replace(/<\/?[^>]+(>|$)/g, ''));
    })
    .catch(error => {
      console.log(error);
    });
  };
  useEffect(() => {
    fetchBusinessHour();
    fetchData();
    fetchLocation();
  }, []);
  const tabs = [
    {
      title: 'About Us',
      content: 
      <div>
        <h1 className='mt-[20px] font-bold text-[#1ca350] md:text-[20px]'>Content</h1>
        <div className='bg-white h-[390px] mt-[5px]'>
            <ReactQuill className=' h-[350px] text-black rounded-md' value={description} onChange={setDescription}/>
        </div>
        <div className='flex justify-end mt-[30px]'>
            <button className='w-[150px] py-2 text-lg rounded-md bg-white text-[#1ca350] font-bold hover:text-white hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    },
    {
      title: 'Business Hours',
      content: 
      <div>
        <div className='flex flex-col mt-[30px]'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <label>Start: </label>
              <TimePicker
                className='shadow-md bg-white rounded-md'
                onChange={handleStartTimeChange}
                minTime={start}
                maxTime={end}
                defaultValue={startTime ? fetchStart : startTime}
                value={startTime}
              />
            <label>End: </label>
              <TimePicker
                className='shadow-md bg-white rounded-md'
                onChange={handleEndTimeChange}
                minTime={start}
                maxTime={end}
                defaultValue={endTime ? fetchEnd : endTime}
                value={endTime}
              />
          </LocalizationProvider>
        </div>
        <div className='flex justify-end mt-[30px]'>
            <button className='w-[150px] py-2 text-lg rounded-md bg-white text-[#1ca350] font-bold hover:text-white hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleAddBusinessHours}>Confirm</button>
        </div>
      </div>
    },
    {
      title: 'Location',
      content: 
      <div>
        <h1 className='mt-[20px] font-bold text-[#1ca350] md:text-[20px]'>Location Link</h1>
        <div className='bg-white h-[390px] mt-[5px]'>
            <ReactQuill className=' h-[350px] text-black rounded-md' value={locationLink} onChange={setLocationLink}/>
        </div>
        <div className='flex justify-between mt-[30px]'>
            {/* <a href={locationLink} target='_blank' rel='noreferrer'>Click here to check the business location</a> */}
            <button className='w-[150px] py-2 text-lg rounded-md bg-white text-[#1ca350] font-bold hover:text-white hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleAddLocation}>Confirm</button>
        </div>
      </div>
    }
  ]
  return (
    <div className='mt-[90px] mx-[50px]'>
      <h1 className='md:text-[30px] font-extrabold text-[#1ca350]'>About Us (Gym Info)</h1>
      <div>
        <PosTabs tabs={tabs}/>
      </div>
    </div>
  )
}

export default SettingsAboutUsGym