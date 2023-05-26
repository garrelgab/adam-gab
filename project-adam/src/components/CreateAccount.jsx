import React, {useState} from 'react'
import Calendar from 'react-calendar'
import Axios  from 'axios'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment-timezone';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useNavigate } from 'react-router';
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
    
    
    const handleChange = (event) => {
        setSelectedGender(event.target.value);
    }

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (date) => {

        setSelectedDate(date);

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
        }
        setShowCalendar(false);
    };
    // const handleChangeAge = (event) => {
    //     const inputValue = event.target.value;
    //     // Validate if the input is a non-negative number
    //     if (!isNaN(inputValue) && Number(inputValue) >= 0) {
    //       setAge(inputValue);
    //     }
    // };

    const [diabetes, setDiabetes] = useState(false);
    const [chestpains, setChestPains] = useState(false);
    const [brokenbones, setBrokenBones] = useState(false);
    const [heartmurmur, setHeartMurmur] = useState(false);
    const [epilepsy, setEpilepsy] = useState(false);
    const [oedema, setOedema] = useState(false);
    const [recentsurgery, setRecentSurgery] = useState(false);
    const [highblood, setHighblood] = useState(false);
    const [asthma, setAsthma] = useState(false);
    const [fainting, setFainting] = useState(false);
    const [heartdisease, setHeartDisease] = useState(false);
    const [shortofbreath, setShowofBreath] = useState(false);
    const [allergies, setAllergies] = useState(false);
    const [pneumonia, setPneumonia] = useState(false);
    const [tachycardia, setTachycardia] = useState(false);
    const [heartattack, setHeartAttack] = useState(false);
    const [palpitate, setPalpitate] = useState(false);
    const [lowblood, setLowBlood] = useState(false);
    const [seizure, setSeizure] = useState(false);
    const handleDiabetes = (e) => {
        setDiabetes(e.target.checked);
    };
    const handleChest = (e) => {
        setChestPains(e.target.checked);
    };
    const handleBroken = (e) => {
        setBrokenBones(e.target.checked);
    };
    const handleHeartMurmur = (e) => {
        setHeartMurmur(e.target.checked);
    };
    const handleEpilepsy = (e) => {
        setEpilepsy(e.target.checked);
    };
    const handleOedema = (e) => {
        setOedema(e.target.checked);
    };
    const handleRecent = (e) => {
        setRecentSurgery(e.target.checked);
    };
    const handleHighblood = (e) => {
        setHighblood(e.target.checked);
    };
    const handleAsthma = (e) => {
        setAsthma(e.target.checked);
    };
    const handleFainting = (e) => {
        setFainting(e.target.checked);
    };
    const handleDisease = (e) => {
        setHeartDisease(e.target.checked);
    };
    const handleShortBreath = (e) => {
        setShowofBreath(e.target.checked);
    };
    const handleAllergies = (e) => {
        setAllergies(e.target.checked);
    };
    const handlePneumonia = (e) => {
        setPneumonia(e.target.checked);
    };
    const handleTachycardia = (e) => {
        setTachycardia(e.target.checked);
    };
    const handleHeartAttack = (e) => {
        setHeartAttack(e.target.checked);
    };
    const handlePalpitate = (e) => {
        setPalpitate(e.target.checked);
    };
    const handleLowBlood = (e) => {
        setLowBlood(e.target.checked);
    };
    const handleSeizure = (e) => {
        setSeizure(e.target.checked);
    };
    const navigate = useNavigate();
    const [other, setOther] = useState('');
    const [terms, setTerms] = useState(false);
    const handleTermsChecked = (e) => {
        setTerms(e.target.checked);
    }
    const btnCreateAccount = () => {
        // if(age < 18){
        //     alert('18 years old below is not allowed to create account. Waiver Required.');
        //     return;
        // }
        if(!terms){
            alert('Please check the terms and conditions.');
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
            diabetes: diabetes,
            chest: chestpains,
            bones: brokenbones,
            heartmur: heartmurmur,
            epilepsy: epilepsy,
            oedema: oedema,
            recent: recentsurgery,
            highblood: highblood,
            asthma: asthma,
            fainting: fainting,
            heartdisease: heartdisease,
            shortbreath: shortofbreath,
            allergies: allergies,
            pneumonia: pneumonia,
            tachy: tachycardia,
            heartattack: heartattack,
            palpitation: palpitate,
            lowblood: lowblood,
            seizure: seizure,
            other: other,
        })
        .then((response) => {
            if (response.data.error) {
                // Email already exists
                alert(response.data.error);
            } else {
            // Account created successfully
            console.log(response);
            alert('Welcome to Adam Fitness Center!');
            setFname('');
            setLname('');
            setAge('');
            setBday('');
            setEmail('');
            setPword('');
            setCPword('');
            setSelectedDate(null);
            setSelectedGender('');
            setDiabetes(false);
            setChestPains(false);
            setBrokenBones(false);
            setHeartMurmur(false);
            setEpilepsy(false);
            setOedema(false);
            setRecentSurgery(false);
            setHighblood(false);
            setAsthma(false);
            setFainting(false);
            setHeartDisease(false);
            setShowofBreath(false);
            setAllergies(false);
            setPneumonia(false);
            setTachycardia(false);
            setHeartAttack(false);
            setPalpitate(false);
            setLowBlood(false);
            setSeizure(false);
            setOther('');
            navigate('/');
            }
        })
        .catch((error) => {
            console.error('Failed to Create account', error);
            alert('Email already exist!');
            setEmail('');
            setPword('');
            setCPword('');
        })        
        // alert('Welcome to Adam Fitness Center!');
        // setFname('');
        // setLname('');
        // setAge('');
        // setBday('');
        // setEmail('');
        // setPword('');
        // setCPword('');
        // setSelectedDate(null);
        // setSelectedGender('');      
    };
    
  return (
    <div className='flex align-middle justify-center top-0 left-0 md:pt-[50px] md:bg-[#93F4D3] w-[100%] h-[100%] bg-login'>
        <div className='text-white md:text-black md:max-w-[1240px] md:mx-auto w-[400px] md:w-[100%]'>
            <h1 className='text-3xl md:text-5xl font-bold text-center md:mb-2 mt-[50px] md:mt-[10px]'>Create Account</h1>
            <h1 className='text-l md:text-xl pb-[100px] font-light text-center'>Create a new Account</h1>
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
            <div className='flex items-center flex-col mx-[30px] mt-[50px] py-5 rounded-md shadow-lg text-black bg-gray-100 justify-center'>
                <h1 className='mb-[30px] text-[30px] text-center font-bold'>Health Conditions Issues</h1>
                <div className='flex flex-col md:flex-row'>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={diabetes} onChange={handleDiabetes}/>} label="Diabetes"/>
                    <FormControlLabel control={<Checkbox checked={chestpains} onChange={handleChest}/>} label="Chest Pains"/>
                    <FormControlLabel control={<Checkbox checked={brokenbones} onChange={handleBroken}/>} label="Broken Bones"/>
                    <FormControlLabel control={<Checkbox checked={heartmurmur} onChange={handleHeartMurmur}/>} label="Heart Murmur"/>
                    <FormControlLabel control={<Checkbox checked={epilepsy} onChange={handleEpilepsy}/>} label="Epilepsy"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={oedema} onChange={handleOedema}/>} label="Oedema"/>
                    <FormControlLabel control={<Checkbox checked={recentsurgery} onChange={handleRecent}/>} label="Recent Surgery"/>
                    <FormControlLabel control={<Checkbox checked={highblood} onChange={handleHighblood}/>} label="High Blood Pressure"/>
                    <FormControlLabel control={<Checkbox checked={asthma} onChange={handleAsthma}/>} label="Asthma"/>
                    <FormControlLabel control={<Checkbox checked={fainting} onChange={handleFainting}/>} label="Fainting"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={heartdisease} onChange={handleDisease}/>} label="Heart Disease"/>
                    <FormControlLabel control={<Checkbox checked={shortofbreath} onChange={handleShortBreath}/>} label="Shortness of Breath"/>
                    <FormControlLabel control={<Checkbox checked={allergies} onChange={handleAllergies}/>} label="Allergies"/>
                    <FormControlLabel control={<Checkbox checked={pneumonia} onChange={handlePneumonia}/>} label="Pneumonia"/>
                    <FormControlLabel control={<Checkbox checked={tachycardia} onChange={handleTachycardia}/>} label="Tachycardia"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={heartattack} onChange={handleHeartAttack}/>} label="Heart Attack"/>
                    <FormControlLabel control={<Checkbox checked={palpitate} onChange={handlePalpitate}/>} label="Palpitations"/>
                    <FormControlLabel control={<Checkbox checked={lowblood} onChange={handleLowBlood}/>} label="Low Blood Pressure"/>
                    <FormControlLabel control={<Checkbox checked={seizure} onChange={handleSeizure}/>} label="Seizures"/>
                    <input type="text" className="shadow-lg block w-[250px] p-2 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Other: ' value={other} onChange={(e) => setOther(e.target.value)} required/>
                </FormGroup>
                </div>
            </div>
            <div className='mt-[50px] md:mt-[100px] text-center flex flex-col items-center'>
                <div className='flex items-center'>
                    <FormControlLabel required control={<Checkbox checked={terms} onChange={handleTermsChecked}/>}/>
                    <h1 className='ml-[-10px] text-[18px]'>I agree to the <a href='/terms-of-use' className='underline'>Terms and Conditions</a></h1>
                </div>
                <button className='w-[350px] p-3 text-xl font-light rounded-xl bg-gray-600 hover:bg-gray-800 text-white mb-[50px] shadow-lg hover:shadow-xl' onClick={btnCreateAccount}>Create Account</button>
            </div>
        </div>
    </div>
  )
}

export default CreateAccount