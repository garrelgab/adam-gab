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
import DashboardGCash from './DashboardGCash'
import FAQs from './FAQs'
import DashboardAttendance from './DashboardAttendance'
import UserAccountEmployee from './UserAccountEmployee'
import SettingsPrivacyPolicy from './SettingsPrivacyPolicy'
import DashboardAuditTrail from './DashboardAuditTrail'
import DashboardHealthTips from './DashboardHealthTips'
import SettingsTermsConditions from './SettingsTermsConditions'
import DashboardAnnouncement from './DashboardAnnouncement'
import DashboardMembershipModule from './DashboardMembershipModule'
// import SettingsAboutUs from './SettingsAboutUs'
import SettingsAboutUsGym from './SettingsAboutUsGym'
import SettingsServiceOffer from './SettingsServiceOffer'
import DashboardCustomerService from './DashboardCustomerService'
// import UserAccountCustomer from './UserAccountCustomer'
const Dashboard = () => {
  const location = useLocation();
  const id = location.state;
  return (
    <>
        <DashboardNavbar id={id}/>
        <Routes>
          <Route exact path='/' element={<DashboardContent/>}/>
          <Route path='/reservation' element={<DashboardReservation/>}/>
          <Route path='/membership' element={<DashboardMembershipModule/>}/>
          <Route path='/settings' element={<DashboardSettings/>}/>
          <Route path='/pos' element={<DashboardPos/>}/>
          <Route path='/inventory' element={<DashboardInventory/>}/>
          <Route path='/salesreport' element={<DashboardSalesReport/>}/>
          <Route path='/expenses' element={<DashboardExpenses/>}/>
          <Route path='/gcash' element={<DashboardGCash/>}/>
          <Route path='/faq' element={<FAQs/>}/>
          <Route path='/privacy-policy' element={<SettingsPrivacyPolicy/>}/>
          <Route path='/terms-of-use' element={<SettingsTermsConditions/>}/>
          <Route path='/attendance' element={<DashboardAttendance/>}/>
          <Route path='/employee' element={<UserAccountEmployee id={id}/>}/>
          {/* <Route path='/customer' element={<UserAccountCustomer/>}/> */}
          <Route path='/customer' element={<DashboardMembership/>}/>
          <Route path='/customer-service' element={<DashboardCustomerService/>}/>
          <Route path='/audit' element={<DashboardAuditTrail/>}/>
          <Route path='/health-tips' element={<DashboardHealthTips id={id}/>}/>
          <Route path='/announcement' element={<DashboardAnnouncement id={id}/>}/>
          {/* <Route path='/about-us' element={<SettingsAboutUs id={id}/>}/> */}
          <Route path='/about-us' element={<SettingsAboutUsGym id={id}/>}/>
          <Route path='/service-offer' element={<SettingsServiceOffer id={id}/>}/>

        </Routes>
    </>
  )
}

export default Dashboard