import axios from 'axios'
import React, { useEffect, useState } from 'react'

const HomeFAQsContent = () => {

  const [faqs, setFaqs] = useState([]);
  const fetchFaqs = () => {
    axios.get('http://localhost:3001/api/faqs')
    .then(response => {
      setFaqs(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    fetchFaqs();
  }, []);
  return (
    <div className='bg-[#d3d3d3] flex flex-col justify-center items-center py-[50px] drop-shadow-md'>
        {/* <h1 className='text-[30px] text-white'>ADAM Fitness Center</h1> */}
        <h1 className='flex md:flex md:text-[50px] text-[30px] md:mt-[50px] font-extrabold '>ADAM<p className='text-[#1ca350] px-[5px]'>FITNESS</p>CENTER</h1>
        <div className='flex flex-col mx-[40px] md:w-[1240px] mt-[40px]'>
            <h1 className='mt-[50px] text-[30px] md:text-[35px] font-extrabold'>FAQ's</h1>
            {faqs.map(faq => (
              <div key={faq.faq_id} className='mx-[20px] text-justify'>
                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>{faq.name}</h1>
                <p className='mt-[10px]'>{faq.description.replace(/<\/?p[^>]*>|<\/?span[^>]*>|<a\s+.*?>|<\/a\s*>|<br\s*\/?>|<style[^>]*>[\s\S]*?<\/style>/gi, '')}</p>
              </div>
        ))}
        </div>
    </div>
  )
}
export default HomeFAQsContent