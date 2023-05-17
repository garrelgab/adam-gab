import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SettingsAddAbout = (props) => {
    const [name, setName] = useState('');
    const [editorContent, setEditorContent] = useState('');

  return (
    <div className='fixed flex align-middle justify-center pt-[50px] top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-black w-[300px] md:w-[900px] h-[550px] mt-[50px] z-50 bg-[#93F4D3] rounded-md shadow-xl'>
            <button className='md:ml-[95%] ml-[90%] mt-[2%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            <div className=' mx-[30px]'>
                <h1 className='md:text-[25px] font-bold'>Add About Gym Info</h1>
                <input type="text" className="shadow-lg block w-full my-[30px] p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Title' value={name} onChange={(e) => setName(e.target.value)} required/>
                <div className='bg-white h-[240px]'>
                    <ReactQuill className=' h-[200px] min-h-[200px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
                </div>
                <div className='flex justify-end mt-[30px]'>
                    <button className='w-[150px] p-2 text-lg font-light rounded-md bg-gray-600 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl ease-in-out duration-300'>Add</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SettingsAddAbout