import React, {useState} from 'react'
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SettingsTermsConditions = () => {

  const [editorContent, setEditorContent] = useState('');

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  const handleChange = (selectedOption) => {
    console.log(selectedOption);
  };
  return (
    <div>
      <h1 className='md:text-[25px] font-light text-[#93F4D3]'>Update Terms and Conditions</h1>
      <Select className='bg-white text-black mt-[20px]' options={options} onChange={handleChange} placeholder="Select an option"/>
      <div className='bg-white h-[390px] mt-[20px]'>
          <ReactQuill className=' h-[350px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
      </div>
      <div className='flex justify-end mt-[30px]'>
          <button className='w-[150px] p-2 text-lg rounded-md bg-white text-black hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300'>Confirm</button>
      </div>
    </div>
  )
}

export default SettingsTermsConditions