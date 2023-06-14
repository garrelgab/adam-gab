import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import PosTabs from './PosTabs';
const SettingsTermsConditions = () => {

  axios.defaults.withCredentials = true;

  const [description, setDescription] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectOption, setSelectedOption] = useState(null);
  const [selectOptionName, setSelectedOptionName] = useState(null);
  
  useEffect(() => {
    fetchOptions();
  },[]);

  const fetchOptions = () => {
    axios.get('http://localhost:3001/option-terms')
    .then((response) => {
      setOptions(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    setSelectedOptionName(selectedOption.label);

    if(selectedOption) {
      axios.get('http://localhost:3001/desc-terms', {
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
    axios.put('http://localhost:3001/update-desc-terms', {
      TermsDescription: description,
      TermsID: selectOption,
    })
    .then(response => {
      axios.get('http://localhost:3001/desc-terms', {
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

  const [name, setName] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const status = 'Active';

  const handleAddTerms = () => {
      if(!name){
          alert('Please fill up the empty field');
      }
      if(!editorContent){
          alert('Please fill up the empty field');
      }
      axios.post('http://localhost:3001/add-terms', {
          addTerms: name,
          addDescription: editorContent,
          addStatus: status,
      })
      .then((response) => {
          alert(`${name} Successfully Added.`);
          fetchOptions();
      })
      .catch((error) => {
          console.error('Error saving data.', error)
      })
      setName('');
      setEditorContent('');
  }
  const tabs = [
    {
      title: 'Add Terms and Conditions',
      content: 
      <div>
        <h1 className='md:text-[25px] text-[#1ca350] font-bold'>Add Terms and Conditions</h1>
        <input type="text" className="shadow-lg block w-full my-[30px] p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Terms and Conditions' value={name} onChange={(e) => setName(e.target.value)} required/>
        <h1 className='mt-[20px] text-[#1ca350] font-bold md:text-[20px]'>Content</h1>
        <div className='bg-white h-[390px]'>
            <ReactQuill className=' h-[350px] min-h-[200px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
        </div>
        <div className='flex justify-end mt-[30px]'>
            <button className='w-[150px] p-2 rounded-md bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white font-bold shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleAddTerms}>Add</button>
        </div>
      </div>
    },
    {
      title: 'Update Terms and Conditions',
      content: 
      <div>
        <h1 className='md:text-[25px] text-[#1ca350] font-bold'>Update Terms and Conditions</h1>
        <h1 className='mt-[20px] text-[#1ca350] font-bold md:text-[20px]'>Terms and Conditions</h1>
        <Select className='bg-white text-black mt-[5px]' options={options} onChange={handleChange} placeholder="Select an option"/>
        <h1 className='mt-[20px] text-[#1ca350] font-bold md:text-[20px]'>Content</h1>
        <div className='bg-white h-[390px] mt-[5px]'>
            <ReactQuill className=' h-[350px] text-black rounded-md' value={description} onChange={setDescription}/>
        </div>
        <div className='flex justify-end mt-[30px]'>
            <button className='w-[150px] p-2 rounded-md bg-white text-[#1ca350] hover:text-white font-bold hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleUpdateTerms}>Confirm</button>
        </div>
      </div>
    }
  ]
  return (
    <div className='my-[90px] mx-[50px]'>
      <h1 className='text-[30px] mb-[30px] text-[#1ca350] font-extrabold'>Terms and Conditions</h1>
      <div>
        <PosTabs tabs={tabs}/>
      </div>  
      
      
    </div>
  )
}

export default SettingsTermsConditions