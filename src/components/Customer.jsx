import React from 'react'
import CustomerNavbar from './CustomerNavbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import CustomerPersonalInformation from './CustomerPersonalInformation'
import CustomerChangePassword from './CustomerChangePassword'
import CustomerCalendar from './CustomerCalendar'
import CustomerHealthTips from './CustomerHealthTips'
import CustomerAnnouncement from './CustomerAnnouncement'
import CustomerProofPayment from './CustomerProofPayment'
import CustomerAccount from './CustomerAccount'
import CustomerMembership from './CustomerMembership'

const Customer = () => {

  const location = useLocation();
  const id = location.state;
  return (
    <>
        <CustomerNavbar id={id}/>
        <Routes>
            <Route path='/' element={<CustomerCalendar id={id}/>}/>
            {/* <Route path='/personalinfo' element={<CustomerPersonalInformation id={id}/>}/> */}
            {/* <Route path='/account' element={<CustomerChangePassword id={id}/>}/> */}
            <Route path='/account' element={<CustomerAccount id={id}/>}/>
            <Route path='/health-tips' element={<CustomerHealthTips id={id}/>}/>
            <Route path='/announcement' element={<CustomerAnnouncement id={id}/>}/>
            <Route path='/membership' element={<CustomerMembership id={id}/>}/>
            <Route path='/proof-of-payment' element={<CustomerProofPayment id={id}/>}/>
        </Routes>
    </>
    
  )
}

export default Customer