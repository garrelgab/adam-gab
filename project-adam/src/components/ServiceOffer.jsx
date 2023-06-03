import React, { useEffect, useState } from 'react'
import { Link as LinkScroll } from 'react-scroll/modules'
import axios from 'axios'
const ServiceOffer = () => {
    const [rows, setRows] = useState([]);
    const fetchData = () => {
        axios.get('http://localhost:3001/api/service-offer')
        .then(response => {
            setRows(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        fetchData();
    }, []);
  return (
    <div className='py-[20px] md:py-[90px] items-center justify-center drop-shadow-md shadow-md' id='services'>
        <h1 className='flex justify-center text-[40px] md:text-[50px] font-extrabold text-[#1ca350] mb-[30px]'>Services Offered</h1>
        <div className='mx-[auto] max-w-[1240px] justify-center items-center text-white'>

        {rows.map(row => (
              <div key={row.service_offer_id} className='mx-[20px] text-justify'>
                <div className='bg-[#1ca350] h-[200px] md:h-[150px] rounded-2xl flex justify-center items-center my-4 md:mx-4'>
                    <h1 className='p-[50px] text-[30px] text-center font-extrabold'>{row.name}</h1>
                </div>
                {/* <h1 className='text-[20px] text-[#1ca350] mt-[30px]'></h1> */}
                {/* <p className='mt-[10px]'>{row.description.replace(/<\/?p[^>]*>|<\/?span[^>]*>|<a\s+.*?>|<\/a\s*>|<br\s*\/?>|<style[^>]*>[\s\S]*?<\/style>/gi, '')}</p> */}
              </div>
        ))}
            {/* <LinkScroll to='danceStudio' spy={true} smooth={true} offset={-150} duration={500}>
                <div className='bg-[#1ca350] h-[200px] md:h-[150px] rounded-2xl flex justify-center items-center my-4 md:mx-4 cursor-pointer'>
                    <h1 className='p-[50px] text-[30px] text-center font-extrabold'>Dance Studio</h1>
                </div>
            </LinkScroll>
            <LinkScroll to='gymWorkouts' spy={true} smooth={true} offset={-150} duration={500}>
                <div className='bg-[#1ca350] h-[200px] md:h-[150px] rounded-2xl flex justify-center items-center my-4 md:mx-4 cursor-pointer'>
                    <h1 className='p-[50px] text-[30px] text-center font-extrabold'>Gym Workouts</h1>
                </div>
            </LinkScroll>
            <LinkScroll to='muayThai' spy={true} smooth={true} offset={-150} duration={500}>
                <div className='bg-[#1ca350] h-[200px] md:h-[150px] rounded-2xl flex justify-center items-center my-4 md:mx-4 cursor-pointer'>
                    <h1 className='p-[50px] text-[30px] text-center font-extrabold'>Muay Thai</h1>
                </div>
            </LinkScroll>
            <LinkScroll to='boxing' spy={true} smooth={true} offset={-150} duration={500}>
                <div className='bg-[#1ca350] h-[200px] md:h-[150px] rounded-2xl flex justify-center items-center my-4 md:mx-4 cursor-pointer'>
                    <h1 className='p-[50px] text-[30px] text-center font-extrabold'>Boxing</h1>
                </div>
            </LinkScroll> */}
        </div>
    </div>
  )
}

export default ServiceOffer