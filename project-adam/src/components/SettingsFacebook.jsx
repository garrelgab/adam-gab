import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
const SettingsFacebook = (props) => {
    const userID = props.id;
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const handleConfirm = () => {
        axios.post('http://localhost:3001/add-fb', {
            addFacebookName: name,
            addFacebookLink: link,
        })
        .then(response => {
            alert(response.data);
            fetchData();
        })
        .catch(error => {
            console.log(error);
        });
    };

    const fetchData = () => {
        axios
        .get('http://localhost:3001/facebook')
        .then(response => {
            setName(response.data[0].name);
            setLink(response.data[0].link);
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);
  return (
    <div className='mt-[90px] mx-[50px]'>
        <h1 className='text-[25px] md:text-[30px] font-extrabold text-[#1ca350]'>Facebook</h1>
        <div className='my-[5px]'>
            <h1 className='md:text-[20px] mt-[30px] text-[#1ca350] font-bold'>Name</h1>
            <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>
        <h1 className='mt-[20px] font-bold text-[#1ca350] md:text-[20px]'>Link</h1>
        <div className='bg-white h-[390px] mt-[5px] rounded-md'>
            <ReactQuill className=' h-[350px] text-black rounded-md' value={link} onChange={setLink}/>
        </div>
        <div className='flex justify-end mt-[30px]'>
            <button className='w-[150px] py-2 text-lg rounded-md bg-white text-[#1ca350] font-bold hover:text-white hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleConfirm}>Confirm</button>
        </div>
    </div>
  )
}

export default SettingsFacebook