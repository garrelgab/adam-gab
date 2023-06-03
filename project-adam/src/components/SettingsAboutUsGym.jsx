import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
const SettingsAboutUsGym = () => {

  axios.defaults.withCredentials = true;

  const [description, setDescription] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectOption, setSelectedOption] = useState(null);
  const [selectOptionName, setSelectedOptionName] = useState(null);
  
  const handleConfirm = () => {
    axios.post('http://localhost:3001/api/add-about', {
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
    axios.get('http://localhost:3001/api/desc-about')
    .then(response => {
      setDescription(response.data[0].description);
    })
    .catch(error => {
      console.log(error);
    })
  };
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   axios.get('http://localhost:3001/api/option-about')
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
  //     axios.get('http://localhost:3001/api/desc-about', {
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
  //   axios.put('http://localhost:3001/api/update-desc-about', {
  //     AboutDescription: description,
  //     AboutID: selectOption,
  //   })
  //   .then(response => {
  //     axios.get('http://localhost:3001/api/desc-about', {
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



  return (
    <div className='mt-[90px] mx-[50px]'>
      <h1 className='md:text-[30px] font-extrabold text-[#1ca350]'>About Us (Gym Info)</h1>
      <h1 className='mt-[20px] font-bold text-[#1ca350] md:text-[20px]'>Content</h1>
      <div className='bg-white h-[390px] mt-[5px]'>
          <ReactQuill className=' h-[350px] text-black rounded-md' value={description} onChange={setDescription}/>
      </div>
      <div className='flex justify-end mt-[30px]'>
          <button className='w-[150px] py-2 text-lg rounded-md bg-white text-[#1ca350] font-bold hover:text-white hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  )
}

export default SettingsAboutUsGym