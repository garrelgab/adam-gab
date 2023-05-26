import React, {useEffect, useState} from 'react'
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const UserEmployeeModal = (props) => {
  const roleType = [
    { label: 'Role Type', value: '' },
    { label: 'Staff', value: 'staff' },
    { label: 'Cashier', value: 'cashier' }, 
  ];
  const genderOptions = [
    { label: 'Select Gender', value: '' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }, 
  ];
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [age, setAge] = useState('');
  const [bday, setBday] = useState('');
  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');
  const [cpword, setCPword] = useState('');

  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  }
  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  }

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleButtonClick = () => {
      setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {


    const today = new Date();
    const birthDate = new Date(date);
    const yearsDiff = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday hasn't occurred yet this year
    const hasBirthdayPassed = today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

    const calculatedAge = hasBirthdayPassed ? yearsDiff - 1 : yearsDiff;
    
    if(calculatedAge < 18){
        alert('18 years old below is not allowed to create account. Waiver Required.');
    }
    else{
      setAge(calculatedAge);
      setSelectedDate(date);
    }
    setShowCalendar(false);
  };

  const handleConfirm = () => {
    if(!fname || !lname || !selectedGender || !email || !pword || !cpword){
      alert('Please fill up the empty fields.');
      return;
    }
    if(pword !== cpword){
      alert('Password and Confirm Password must match!');
      setPword('');
      setCPword('');
      return;
    }
    axios.post('http://localhost:3001/api/insert-employee', {
      userFname: fname,
      userLname: lname,
      userAge: age,
      userGender: selectedGender,
      userBday: selectedDate,
      userEmail: email,
      userPword: pword, 
      userCPword: cpword,
      userRole: selectedRole,
    })
    .then(response => {
      alert(`Successfully created. User: ${fname} `, response);
      setFname('');
      setLname('');
      setAge('');
      setBday('');
      setEmail('');
      setPword('');
      setCPword('');
      setSelectedGender('');
      setSelectedRole('');
      setSelectedDate(null);
    })
    .catch(error => {
      // alert('Email already exist.')
      console.log(error);
    });
  }

  
  useEffect(() => {

  }, []);
  return (
    <div className='flex flex-col  bg-[#fffdfa] mt-[30px] rounded-md shadow-lg'>
      <div className='text-black py-[50px]  z-10'>
        <div>
          <form className='md:flex md:flex-col-3'>
              <div className='mt-[100px] md:mt-[10px] max-w-[350px] md:max-w-[100%] mx-auto'>
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">First Name</label>
                <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='First Name' value={fname} onChange={(e) => setFname(e.target.value)} required/>
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">Last Name</label>
                <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} required/>
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">Age</label>
                <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder={age ? age : 'Age'} value={age} readOnly required/>
              </div>

              <div className='mt-[10px] md:mt-[10px] max-w-[350px] mx-auto'>
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light">Gender</label>
                <select id="gender-select" className="font-light shadow-lg mb-1 block w-[350px] rounded-lg p-4 bg-gray-50 text-black focus:outline-none" placeholder='Select Gender' value={selectedGender} onChange={handleChange} required>
                    {genderOptions.map((option) => (
                    <option className='p-4 text-lg font-light' key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
                <label className="block text-md md:text-lg mx-auto text-left font-light">Birthday</label>
                <button onClick={handleButtonClick} className='font-light shadow-lg w-[350px] text-left bg-gray-50 p-4 rounded-lg text-black focus:outline-none' value={bday} onChange={(e) => setBday(e.target.value)} required>
                    {selectedDate ? moment(selectedDate).tz('Asia/Manila').format('MMMM DD, YYYY') : 'Select Date'}
                </button>
                {showCalendar && (
                    <div className='fixed z-10'>
                        <Calendar value={selectedDate} onChange={handleDateChange} className='bg-white rounded-lg font-light shadow-xl text-black focus:outline-none'/>
                    </div>
                )}
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light">Role Type</label>
                <select id="role-select" className="font-light shadow-lg mb-1 block w-[350px] rounded-lg p-4 bg-gray-50 text-black focus:outline-none" placeholder='Role Type' value={selectedRole} onChange={handleChangeRole} required>
                    {roleType.map((option) => (
                    <option className='p-4 text-lg font-light' key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
              </div>

              <div className='mt-[10px] md:mt-[10px] max-w-[350px] mx-auto'>
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">Email</label>
                <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">Password</label>
                <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Password' value={pword} onChange={(e) => setPword(e.target.value)} required/>
                <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light">Confirm Password</label>
                <input type="password" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Confirm Password' value={cpword} onChange={(e) => setCPword(e.target.value)} required/>
              </div>
          </form>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <button className='w-[350px] p-3 text-xl font-light rounded-xl bg-gray-600 hover:bg-gray-800 text-white mb-[50px] shadow-lg hover:shadow-xl' onClick={handleConfirm}>Create Account</button>
      </div>
    </div>
  )
}

export default UserEmployeeModal