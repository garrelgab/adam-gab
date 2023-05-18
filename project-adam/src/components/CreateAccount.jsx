import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import Axios  from 'axios'
import 'react-calendar/dist/Calendar.css';
const CreateAccount = (props) => {

    const genderOptions = [
        { label: 'Select Gender', value: '' },
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        
    ];

    const [selectedGender, setSelectedGender] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [age, setAge] = useState('');
    const [bday, setBday] = useState('');
    const [email, setEmail] = useState('');
    const [pword, setPword] = useState('');
    const [cpword, setCPword] = useState('');
    //const [role, setRole] = useState('customer');
    const role = 'customer';
    
    const btnCreateAccount = () => {
        if(age < 18){
            alert('18 years old below is not allowed to create account. Waiver Required.');
            return;
        }
        if(pword !== cpword){
            alert('Password and Confirm Password must match!');
            setPword('');
            setCPword('');
            return;
          }
        if(!selectedGender){
            alert('Please fill out the empty field.');
            return;
        }
        if(!fname){
            alert('Please fill out the empty field.');
            return;
        }
        if(!lname){
            alert('Please fill out the empty field.');
            return;
        }
        if(!age){
            alert('Please fill out the empty field.');
            return;
        }

        if(!email){
            alert('Please fill out the empty field.');
            return;
        }
        if(!pword){
            alert('Please fill out the empty field.');
            return;
        }
        if(!cpword){
            alert('Please fill out the empty field.');
            return;
        }
        Axios.post("http://localhost:3001/api/insert", {
            userFname: fname,
            userLname: lname,
            userAge: age,
            userGender: selectedGender,
            userBday: selectedDate,
            userEmail: email,
            userPword: pword,
            userCPword: cpword,
            userRole: role,
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error('Failed to Create account', error);
        })
        alert('Welcome to Adam Fitness Center!');
        setFname('');
        setLname('');
        setAge('');
        setBday('');
        setEmail('');
        setPword('');
        setCPword('');
        setSelectedGender('');      
    };
    const handleChange = (event) => {
        setSelectedGender(event.target.value);
    }

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (date) => {
        // if (date instanceof Date && !isNaN(date)) {
        //     const formattedDate = date.toISOString().slice(0, 10);
        //     setSelectedDate(formattedDate);
        // }
        setSelectedDate(date);
        setShowCalendar(false);
    };

    // const handleButtonClick = () => {
    //     const formattedDate = selectedDate ? selectedDate.toISOString().slice(0, 10) : null;
    //     // Perform further operations with the formattedDate
    //     console.log(formattedDate);
    //   };

  return (
    <div className='flex align-middle justify-center top-0 left-0 md:pt-[50px] md:bg-[#93F4D3] w-[100%] h-[100%] bg-login'>
        <div className='text-white md:text-black md:max-w-[1240px] md:mx-auto md:max-h-[830px] w-[400px] md:w-[100%]'>
            <h1 className='text-3xl md:text-5xl font-light text-center md:mb-2 mt-[50px] md:mt-[10px]'>Create Account</h1>
            <h1 className='text-l md:text-xl pb-[100px] font-light text-center'>Create a new Account</h1>
            <div>
                <form className='md:flex md:flex-col-3'>
                <div className='mt-[100px] md:mt-[10px] max-w-[350px] md:max-w-[100%] mx-auto'>
                    <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">First Name</label>
                    <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='First Name' value={fname} onChange={(e) => setFname(e.target.value)} required/>
                    <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">Last Name</label>
                    <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} required/>
                    <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">Age</label>
                    <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} maxLength={2} required/>
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
                        {selectedDate ? selectedDate.toLocaleDateString('en-US') : 'Select Date'}
                    </button>
                    {showCalendar && (
                        <div className='relative z-10'>
                            <Calendar value={selectedDate} onChange={handleDateChange} className='bg-white rounded-lg font-light shadow-xl text-black focus:outline-none'/>
                        </div>
                    )}
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
            <div className='mt-[50px] md:mt-[150px] text-center'>
                <button className='w-[350px] p-3 text-xl font-light rounded-xl bg-gray-600 hover:bg-gray-800 text-white mb-[50px] shadow-lg hover:shadow-xl' onClick={btnCreateAccount}>Create Account</button>
            </div>
        </div>
    </div>
  )
}

export default CreateAccount