import React, { useState, useEffect } from 'react'
import Sample1 from '../imgs/sample1.png'
import axios from 'axios'
const Company = () => {
    const [description, setDescription] = useState('');
    const fetchData = () => {
        axios.get('http://localhost:3001/api/desc-about')
        .then(response => {
            const plainText = response.data[0].description.replace(/<\/?[^>]+(>|$)/g, '');
            setDescription(plainText);
        })
        .catch(error => {
          console.log(error);
        })
    };
    useEffect(() => {
        fetchData();
    }, []);
  return (
    <div className='bg-[#d3d3d3] py-[50px] md:py-[100px] text-justify border-gray-500 text-white shadow-md' id='company'>
        <div className='mx-auto max-w-[1240px]'>
            <div className='mx-[30px] text-black'>
                <h1 className='flex justify-center text-[40px] md:text-[40px] font-extrabold text-[#1ca350] mb-[30px]'>About Us</h1>
                <div className='text-center'>
                    <p>{description}</p>
                </div>
            </div>
        </div>       
    </div>
  )
}

export default Company