import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';


const FAQs = () => {

  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [selectOption, setSelectedOption] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:3001/api/option-faq')
    .then((response) => {
      setOptions(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  },[]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.label);

    // console.log();

    if(selectedOption) {
      axios.get('http://localhost:3001/api/desc-faq', {
        params: {
          descFaqName: selectOption,
        }
      })
      .then((response) => {
        setDescription(response.data[0].description);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    else{
      // setDescription('');
    }
  };
  return (
    <div>
      <h1 className='md:text-[25px] font-light text-[#93F4D3]'>{selectOption}</h1>
      <Select className='bg-white text-black mt-[20px]' options={options} onChange={handleChange} placeholder="Select an option"/>
      <div className='bg-white h-[390px] mt-[20px]'>
          <ReactQuill className=' h-[350px] text-black rounded-md' value={description} onChange={setDescription}/>
      </div>
      <div className='flex justify-end mt-[30px]'>
          <button className='w-[150px] p-2 text-lg rounded-md bg-white text-black hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300'>Confirm</button>
      </div>
    </div>
  )
}

export default FAQs