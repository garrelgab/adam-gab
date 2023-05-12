import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const DashboardReservation = () => {
  return (
    <div className='mx-[50px] mt-[30px] text-black'>
      <h1 className='text-[30px] text-white font-light'>Reservation Management</h1>
      <div className='bg-[#D9D9D9] mt-[20px] rounded-lg shadow-2xl'>
        <h1 className='text-center text-[100px] py-[300px]'>Calendar</h1>
      </div>
    </div>
  )
}

export default DashboardReservation