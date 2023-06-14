import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PrivacyPolicyContent = () => {
  const [privacy, setPrivacy] = useState([]);
  const fetchPrivacy = () => {
    axios.get('http://localhost:3001/privacy-policy')
    .then(response => {
      setPrivacy(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  };
  useEffect(() => {
    fetchPrivacy();
  }, []);
  return (
    <div className='bg-[#d3d3d3] flex flex-col justify-center items-center py-[50px] drop-shadow-md'>
        {/* <h1 className='text-[30px] text-white'>ADAM Fitness Center</h1> */}
        <h1 className='flex md:flex md:text-[50px] text-[30px] md:mt-[50px] font-extrabold '>ADAM<p className='text-[#1ca350] px-[5px]'>FITNESS</p>CENTER</h1>
        
        <div className='flex flex-col mx-[40px] md:w-[1240px] mt-[40px]'>
            <h1 className='text-justify'>ADAM Fitness Center respect your privacy. This privacy policy explains how ADAM Fitness Center through its website, may collect, use, and share information about you. Since this policy may change over time as we modify or expand our services, we suggest that you check from time to time in order to understand how we treat your personal information. Your use of this website and its services constitute your agreement to Crunch using information about you in accordance with this privacy policy.</h1>            
            <h1 className='mt-[50px] text-[30px] md:text-[35px] font-extrabold'>Privacy Policy</h1>
            {privacy.map(priv => (
              <div key={priv.privacy_id} className='mx-[20px] text-justify'>
              <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>{priv.name}</h1>
              {/* <p className='mt-[10px]'>{term.description.replace(/<[^>]+>/g, '')}</p> */}
              <p className='mt-[10px]' dangerouslySetInnerHTML={{__html: priv.description.replace(/(\. )(?=[A-Z])/g, '.\n\n')}}></p>
            </div>
            ))}
        </div>
    </div>
  )
}
export default PrivacyPolicyContent