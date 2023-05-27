import axios from 'axios';
import React, {useEffect, useState} from 'react'
// import Calendar from 'react-calendar'

const CustomerPersonalInformation = (props) => {

    const genderOptions = [
        { label: 'Select Gender', value: '' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        
    ];
    const [selectedGender, setSelectedGender] = useState('');
    // const [showCalendar, setShowCalendar] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    // const handleButtonClick = () => {
    //     setShowCalendar(!showCalendar);
    // };

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    //     setShowCalendar(false);
    // };

    const handleChange = (event) => {
        setSelectedGender(event.target.value);
    }

    const handleUpdateCustomerInfo = () => {
        axios.put('http://localhost:3001/api/customer-info', {
            customerFname: fname,
            customerLname: lname,
            customerID: props.id,
        })
        .then((response) => {
            console.log(response.data);
            alert('Customer Information Updated Successfully!');
        })
        .catch((error) => {
            console.log('Error',error);
        });
        // setFname('');
        // setLname('');
        setSelectedGender('Select Gender');
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/get-info', {
            params: {
                customerID: props.id,
            }
        })
        .then((response) => {
            setFname(response.data[0].fname);
            setLname(response.data[0].lname);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log('Error',error);
        });
    }, []);
  return (
    <div className='flex justify-center align-middle py-[90px] bg-[#d3d3d3]'>
        <div className='text-black md:text-white md:max-w-[1240px] md:mx-auto md:max-h-[830px] w-[400px] md:w-[100%]'>
            <h1 className='text-black text-[30px] font-light text-center mb-[100px]'>Personal Information</h1>
            <div className='md:flex md:flex-col-2 text-black'>
                <div className='mt-[100px] md:mt-[10px] max-w-[350px] md:max-w-[100%] mx-auto'>
                    <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">First Name</label>
                    {/* <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light "></label> */}

                    <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder={fname} value={fname} onChange={(e) => setFname(e.target.value)}/>
                    <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light ">Last Name</label>
                    <input type="text" className="shadow-lg block w-[350px] p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder={lname} value={lname} onChange={(e) => setLname(e.target.value)}/>
                </div>

                <div className='mt-[10px] md:mt-[10px] max-w-[350px] mx-auto'>
                    <label className="block mb-1 text-md md:text-lg mx-auto text-left font-light">Gender</label>
                    <select id="gender-select" className="font-light shadow-lg mb-1 block w-[350px] rounded-lg p-4 bg-gray-50 text-black focus:outline-none" placeholder='Select Gender' onChange={handleChange}>
                        {genderOptions.map((option) => (
                        <option className='p-4 text-lg font-light' key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='mt-[50px] md:mt-[150px] text-center'>
                <button className='w-[350px] p-3 text-xl font-light rounded-xl bg-gray-600 hover:bg-gray-800 text-white mb-[50px] shadow-lg hover:shadow-xl' onClick={handleUpdateCustomerInfo}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default CustomerPersonalInformation