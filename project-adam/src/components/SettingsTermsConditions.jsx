import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
const SettingsTermsConditions = () => {

  axios.defaults.withCredentials = true;

  const [description, setDescription] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectOption, setSelectedOption] = useState(null);
  const [selectOptionName, setSelectedOptionName] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:3001/api/option-terms')
    .then((response) => {
      setOptions(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  },[]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    setSelectedOptionName(selectedOption.label);

    if(selectedOption) {
      axios.get('http://localhost:3001/api/desc-terms', {
        params: {
          descTermsID: selectedOption.value,
        }
      })
      .then(response => {
        setDescription(response.data[0].description);
      })
      .catch(error => {
        console.log(error);
      })
    }
  };

  const handleUpdateTerms = () =>{
    if(!selectOption){
      alert('Please fill out the empty field.');
      return;
    }
    axios.put('http://localhost:3001/api/update-desc-terms', {
      TermsDescription: description,
      TermsID: selectOption,
    })
    .then(response => {
      axios.get('http://localhost:3001/api/desc-terms', {
        params: {
          descTermsID: selectOption,
        }
      })
      .then(response => {
        setDescription(response.data[0].description);
        alert(`${selectOptionName}: Description Updated Successfully.`);
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  };
  return (
    <div>
      <h1 className='md:text-[25px] font-light text-[#93F4D3]'>Update Terms and Conditions</h1>
            <h1 className='mt-[20px] text-[#93f4d3] md:text-[20px]'>Terms and Conditions</h1>
      <Select className='bg-white text-black mt-[5px]' options={options} onChange={handleChange} placeholder="Select an option"/>
            <h1 className='mt-[20px] text-[#93f4d3] md:text-[20px]'>Content</h1>
      <div className='bg-white h-[390px] mt-[5px]'>
          <ReactQuill className=' h-[350px] text-black rounded-md' value={description} onChange={setDescription}/>
      </div>
      <div className='flex justify-end mt-[30px]'>
          <button className='w-[150px] p-2 text-lg rounded-md bg-white text-black hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleUpdateTerms}>Confirm</button>
      </div>
    </div>
  )
}

export default SettingsTermsConditions