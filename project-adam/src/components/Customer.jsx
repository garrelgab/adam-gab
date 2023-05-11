import React from 'react'
import CustomerNavbar from './CustomerNavbar'
import { Route, Routes } from 'react-router-dom'
import CustomerPersonalInformation from './CustomerPersonalInformation'
import CustomerChangePassword from './CustomerChangePassword'
import CustomerCalendar from './CustomerCalendar'

const Customer = () => {
  return (
    <>
        <CustomerNavbar/>
        <Routes>
            <Route path='/' element={<CustomerCalendar/>}/>
            <Route path='/personalinfo' element={<CustomerPersonalInformation/>}/>
            <Route path='/account' element={<CustomerChangePassword/>}/>
        </Routes>
    </>
    
  )
}

export default Customer