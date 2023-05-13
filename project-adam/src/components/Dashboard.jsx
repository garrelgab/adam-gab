import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import DashboardContent from './DashboardContent'
import { Route, Routes, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import DashboardReservation from './DashboardReservation'
import DashboardMembership from './DashboardMembership'
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
        </Routes>
    </>
  )
}

export default Dashboard