import React from 'react'
import CustomerNavbar from './CustomerNavbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import CustomerPersonalInformation from './CustomerPersonalInformation'
import CustomerChangePassword from './CustomerChangePassword'
import CustomerCalendar from './CustomerCalendar'
import CustomerHealthTips from './CustomerHealthTips'

const Customer = () => {

  const location = useLocation();
  const id = location.state;
  return (
    <>
        <CustomerNavbar id={id}/>
        <Routes>
            <Route path='/' element={<CustomerCalendar id={id}/>}/>
            <Route path='/personalinfo' element={<CustomerPersonalInformation id={id}/>}/>
            <Route path='/account' element={<CustomerChangePassword id={id}/>}/>
            <Route path='/health-tips' element={<CustomerHealthTips id={id}/>}/>
        </Routes>
    </>
    
  )
}

export default Customer