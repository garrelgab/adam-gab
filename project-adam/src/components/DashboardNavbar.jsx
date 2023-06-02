import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { Link as LinkRouter } from 'react-router-dom';
const DashboardNavbar = (props) => {
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const userID = props.id;
    const [nav, setNav] = useState(false);
    const [navSettings, setNavSettings] = useState(false);
    const [navUser, setNavUser] = useState(false);
    const handleNav = () => {
        setNav(!nav)
        setNavSettings(false);
        setNavUser(false);
    }
    const [currentTime, setCurrentTime] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const handleRunningDate = () => {
        const interval = setInterval(() => {
        const now = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = now.toLocaleDateString('en-US', options);
        const time = now.toLocaleTimeString('en-US', { hour12: true });
    
        setCurrentDateTime(`${date}`);
        setCurrentTime(`${time}`);
        }, 1000);
    
        return () => {
        clearInterval(interval);
        };
    }
    const handleNavSettings = () => {
        setNavSettings(!navSettings);
        setNavUser(false);
    };
    const handleNavUser = () => {
        setNavUser(!navUser);
        setNavSettings(false);
    }
    const handleLogout = () => {
        axios.put('http://localhost:3001/api/update-attendance')
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        })
    };
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const fetchAccountName = () => {
        axios.get('http://localhost:3001/api/account-name', {
            params: {
                accID: userID,
            }
        })
        .then(response => {
            setFname(response.data[0].fname);
            setLname(response.data[0].lname);
        })
        .catch(error => {
            console.log(error);
        });
    };

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
    const fetchAccessModule = () => {
        axios
        .get('http://localhost:3001/api/modules', {
            params: {
              accID: userID,
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
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        handleRunningDate();
        fetchAccountName();
        fetchAccessModule();
    }, []);
  return (
    <div className='fixed top-0 left-0 w-[100%] overflow-auto md:py-[20px] py-[20px] bg-[#1ca350] shadow-lg z-50'>
        <div className='blocked text-white flex justify-between'>
            <AiOutlineMenu size={30} className='cursor-pointer ml-[3%] md:ml-[1%]' onClick={handleNav}/>
            <div className='md:flex text-lg font-light hidden'>
                <h1 className='border-r border-white px-5'>{currentTime}</h1>
                <h1 className='px-5'>{currentDateTime}</h1>
            </div>
        </div>
        <div className={nav ? 'fixed overflow-auto top-0 left-0 w-[60%] border-r border-gray-500 md:w-[20%] z-50 text-start text-black bg-[#d9d9d9] h-full ease-in-out duration-500 font-light' : 'fixed left-[-100%]'}>
            <div className='blocked md:py-[20px] py-[20px] border-b border-gray-800'>
                <AiOutlineClose size={30} onClick={handleNav} className='cursor-pointer ml-[5%]'/>
            </div>
            <div className='mb-[20px] md:mb-[30px] justify-center items-center flex border-b border-gray-500 mx-[40px]'>
                <h1 className='my-[30px] md:my-[40px] font-bold text-[20px] md:text-[30px]'>{capitalizeFirstLetter(fname)}</h1>
            </div>
            <ul className=''>
                {/* <LinkRouter to='/dashboard' state={userID} onClick={handleNav}>
                    <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Dashboard</h1></li>
                </LinkRouter> */}
                {dashboard && (
                    <LinkRouter to='/dashboard' state={userID} onClick={handleNav}>
                        <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'>
                            <h1 className='mx-[20px]'>Dashboard</h1>
                        </li>
                    </LinkRouter>
                )}
                {/* <LinkRouter to='/dashboard/membership' state={userID} onClick={handleNav}>
                    <li className='hidden md:flex p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Membership</h1></li>
                </LinkRouter> */}
                { reservation && (
                    <LinkRouter to="/dashboard/reservation" state={userID} onClick={handleNav}>
                        <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Reservation Management</h1></li>
                    </LinkRouter>
                )}
                { windowPayment && (
                    <LinkRouter to='/dashboard/pos' state={userID} onClick={handleNav}>
                        <li className='hidden md:flex p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Window Payment (Walk-ins)</h1></li>
                    </LinkRouter>
                )}
                {/* <LinkRouter to='/dashboard/inventory' state={userID} onClick={handleNav}>
                    <li className='p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Inventory Management</h1></li>
                </LinkRouter>
                 <LinkRouter to='/dashboard/expenses' state={userID} onClick={handleNav}>
                    <li className='hidden md:flex p-4 md:py-6 hover:text-[#93F4D3] hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Expenses Management</h1></li>
                </LinkRouter> */}
                {salesReport && (
                    <LinkRouter to='/dashboard/salesreport' state={userID} onClick={handleNav}>
                        <li className='hidden md:flex p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Sales Report</h1></li>
                    </LinkRouter>
                )}
                {settings && (
                    <div className={!navSettings ? 'flex justify-between items-center hover:bg-gray-500 hover:text-white cursor-pointer ease-in-out duration-300' : 'flex justify-between items-center text-white bg-[#1ca350] cursor-pointer ease-in-out duration-300'} onClick={handleNavSettings}>
                        <li className='p-4 md:py-6'><h1 className='mx-[20px]'>Settings</h1></li>
                        <div className='mr-[30px] md:mr-[20px]'>
                            {!navSettings ? <SlArrowDown className='md:text-[15px]'/> : <SlArrowUp className='md:text-[15px]'/>}
                        </div>
                    </div>
                )}
                {navSettings && (
                    <ul className='ease-in-out duration-300'>
                        <LinkRouter to='/dashboard/gcash' state={userID} onClick={handleNav}>
                            <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>Payment Settings</h1></li>
                        </LinkRouter>
                        <LinkRouter to='/dashboard/faq' state={userID} onClick={handleNav}>
                            <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>FAQ's</h1></li>
                        </LinkRouter>
                        <LinkRouter to='/dashboard/privacy-policy' state={userID} onClick={handleNav}>
                            <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>Privacy Policy</h1></li>
                        </LinkRouter>
                        <LinkRouter to='/dashboard/terms-of-use' state={userID} onClick={handleNav}>
                            <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>Terms and Conditions</h1></li>
                        </LinkRouter>
                    </ul>
                )}
                {userAccount && (
                    <div className={!navUser ? 'flex justify-between items-center hover:bg-gray-500 hover:text-white cursor-pointer ease-in-out duration-300' : 'flex justify-between items-center text-white bg-[#1ca350] cursor-pointer ease-in-out duration-300'} onClick={handleNavUser}>
                        <li className='p-4 md:py-6'><h1 className='mx-[20px]'>User Account</h1></li>
                        <div className='mr-[30px] md:mr-[20px]'>
                            {!navUser ? <SlArrowDown className='md:text-[15px]'/> : <SlArrowUp className='md:text-[15px]'/>}
                        </div>
                    </div>
                )}
                {navUser && (
                    <ul className='ease-in-out duration-300'>
                        <LinkRouter to='/dashboard/employee' state={userID} onClick={handleNav}>
                            <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>Employee User Account</h1></li>
                        </LinkRouter>
                        <LinkRouter to='/dashboard/customer' state={userID} onClick={handleNav}>
                            <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>Customer User Account</h1></li>
                        </LinkRouter>
                        <LinkRouter to='/dashboard/membership' state={userID} onClick={handleNav}>
                            <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[35px]'>Membership</h1></li>
                        </LinkRouter>
                    </ul>
                )}
                {audit && (
                    <LinkRouter to='/dashboard/audit' state={userID} onClick={handleNav}>
                        <li className='hidden md:flex p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Audit Trail</h1></li>
                    </LinkRouter>
                )}
                {attendanceLog && (
                    <LinkRouter to='/dashboard/attendance' state={userID} onClick={handleNav}>
                        <li className='hidden md:flex p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Attendance Log</h1></li>
                    </LinkRouter>
                )}
                {healthGuide && (
                    <LinkRouter to="/dashboard/health-tips" state={userID} onClick={handleNav}>
                        <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Health Guide</h1></li>
                    </LinkRouter>
                )}
                {announcement && (
                    <LinkRouter to="/dashboard/announcement" state={userID} onClick={handleNav}>
                        <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300'><h1 className='mx-[20px]'>Announcement</h1></li>
                    </LinkRouter>
                )}
                <LinkRouter to='/'>
                    <li className='p-4 md:py-6 hover:text-white hover:bg-gray-500 cursor-pointer ease-in-out duration-300' onClick={handleLogout}><h1 className='mx-[20px] font-bold'>Logout</h1></li>
                </LinkRouter>
            </ul>
            {/* <LinkRouter to='/'>
                <h1 className='p-6 hover:bg-gray-500 cursor-pointer font-bold hover:text-[#93F4D3] ease-in-out duration-300'><h1 className='mx-[30px]'>Logout</h1></h1>
            </LinkRouter> */}
        </div>
    </div>
  )
}

export default DashboardNavbar