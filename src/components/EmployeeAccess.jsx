import Modal from '@mui/material/Modal';
import { AiOutlineClose } from 'react-icons/ai'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const EmployeeAccess = (props) => {

    const [dashboard, setDashboard] = useState(false);
    const [reservation, setReservation] = useState(false);
    const [windowPayment, setWindowPayment] = useState(false);
    const [salesReport, setSalesReport] = useState(false);
    const [settings, setSettings] = useState(false);
    const [userAccount, setUserAccount] = useState(false);
    const [audit, setAudit] = useState(false);
    const [attendanceLog, setAttendace] = useState(false);
    const [healthGuide, setHealthGudie] = useState(false);
    const [announcement, setAnnounce] = useState(false);
    const id = props.id;
    const fetchAccessModule = () => {
        axios
        .get('http://localhost:3001/modules', {
            params: {
              accID: id,
            },
          })
        .then(response => {
            if (response.data.length > 0) {
              const data = response.data[0];
      
              const dashboardValue = data.dashboard;
              const isDashboardChecked = Boolean(dashboardValue);
              setDashboard(isDashboardChecked);
      
              const reservationValue = data.reservation;
              const isReservationChecked = Boolean(reservationValue);
              setReservation(isReservationChecked);
      
              const windowValue = data.window_payment;
              const isWindowChecked = Boolean(windowValue);
              setWindowPayment(isWindowChecked);
      
              const salesValue = data.sales_report;
              const isSalesChecked = Boolean(salesValue);
              setSalesReport(isSalesChecked);
      
              const settingsValue = data.settings;
              const isSettingsChecked = Boolean(settingsValue);
              setSettings(isSettingsChecked);
      
              const userValue = data.user_account;
              const isUserChecked = Boolean(userValue);
              setUserAccount(isUserChecked);
      
              const auditValue = data.audit_trail;
              const isAuditChecked = Boolean(auditValue);
              setAudit(isAuditChecked);
      
              const attendanceValue = data.attendance_log;
              const isAttendanceChecked = Boolean(attendanceValue);
              setAttendace(isAttendanceChecked);
      
              const healthValue = data.health_guide;
              const isHealthChecked = Boolean(healthValue);
              setHealthGudie(isHealthChecked);
      
              const announcementValue = data.announcement;
              const isAnnouncementChecked = Boolean(announcementValue);
              setAnnounce(isAnnouncementChecked);
            }
            // console.log(response);

            })
        .catch(error => {
            console.log(error);
        });
    };
      
    const handleConfirm = () => {
        axios.put('http://localhost:3001/access', {
            accID: id,
            dashboard: dashboard,
            reservation: reservation,
            window: windowPayment,
            sales: salesReport,
            settings: settings,
            userAccount: userAccount,
            audit: audit,
            attendance: attendanceLog,
            health: healthGuide,
            announcement: announcement,
        })
        .then(response => {
            console.log(response);
            setDashboard(false);
            setReservation(false);
            setWindowPayment(false);
            setSalesReport(false);
            setSettings(false);
            setUserAccount(false);
            setAudit(false);
            setAttendace(false);
            setHealthGudie(false);
            setAnnounce(false);
            props.onClose(false);
        })
        .catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        // alert({id});
        fetchAccessModule();
    },[]);
  return (
    <div className='fixed flex align-middle justify-center items-center top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-black w-[400px] md:w-[500px] h-[500px] z-50 bg-[#d3d3d3] rounded-md shadow-xl'>
            <button className='ml-[90%] mt-[5%]' onClick={() => props.onClose(false)}>
                <AiOutlineClose size={25}/>
            </button>
            <div className='mx-[50px]'>
                <h1 className='text-[20px] font-bold'>{props.name}</h1>
            </div>
            <div className='flex flex-col md:flex-row mx-[50px] py-[50px]'>
                <FormGroup>
                    {/* <FormControlLabel control={<Checkbox checked={dashboard} onChange={(e) => setDashboard(e.target.checked)}/>} label="Dashboard"/> */}
                    <FormControlLabel control={<Checkbox checked={reservation} onChange={(e) => setReservation(e.target.checked)}/>} label="Reservation Management"/>
                    <FormControlLabel control={<Checkbox checked={windowPayment} onChange={(e) => setWindowPayment(e.target.checked)}/>} label="Window Payment"/>
                    <FormControlLabel control={<Checkbox checked={salesReport} onChange={(e) => setSalesReport(e.target.checked)}/>} label="Sales Report"/>
                    <FormControlLabel control={<Checkbox checked={settings} onChange={(e) => setSettings(e.target.checked)}/>} label="Settings"/>
                    <FormControlLabel control={<Checkbox checked={userAccount} onChange={(e) => setUserAccount(e.target.checked)}/>} label="User Account"/>
                </FormGroup>
                    
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={audit} onChange={(e) => setAudit(e.target.checked)}/>} label="Audit Trail"/>
                    <FormControlLabel control={<Checkbox checked={attendanceLog} onChange={(e) => setAttendace(e.target.checked)}/>} label="Attendance Log"/>
                    <FormControlLabel control={<Checkbox checked={healthGuide} onChange={(e) => setHealthGudie(e.target.checked)}/>} label="Health Guide"/>
                    <FormControlLabel control={<Checkbox checked={announcement} onChange={(e) => setAnnounce(e.target.checked)}/>} label="Announcement"/>
                </FormGroup>
            </div>
            <div className='flex justify-end mt-[30px] mr-[30px]'>
                <button className='w-[150px] p-2 rounded-md bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white font-bold shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeAccess