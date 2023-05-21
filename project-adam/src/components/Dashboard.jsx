import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import DashboardContent from './DashboardContent'
import { Route, Routes, useLocation } from 'react-router'
import DashboardReservation from './DashboardReservation'
import DashboardMembership from './DashboardMembership'
import DashboardSettings from './DashboardSettings'
import DashboardPos from './DashboardPos'
import DashboardInventory from './DashboardInventory'
import DashboardSalesReport from './DashboardSalesReport'
import DashboardExpenses from './DashboardExpenses'
const Dashboard = () => {
  const location = useLocation();
  const id = location.state;
  return (
    <>
        <DashboardNavbar id={id}/>
        <Routes>
          <Route exact path='/' element={<DashboardContent/>}/>
          <Route path='/reservation' element={<DashboardReservation/>}/>
          <Route path='/membership' element={<DashboardMembership/>}/>
          <Route path='/settings' element={<DashboardSettings/>}/>
          <Route path='/pos' element={<DashboardPos/>}/>
          <Route path='/inventory' element={<DashboardInventory/>}/>
          <Route path='/salesreport' element={<DashboardSalesReport/>}/>
          <Route path='/expenses' element={<DashboardExpenses/>}/>


        </Routes>
    </>
  )
}

export default Dashboard