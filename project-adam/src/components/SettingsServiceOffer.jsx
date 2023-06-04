import React, { useEffect, useState } from 'react'
import PosTabs from './PosTabs';
import { DataGrid } from '@mui/x-data-grid';
import ReactQuill from 'react-quill';
import axios from 'axios';
import Select from 'react-select';

const SettingsServiceOffer = (props) => {
    const userID = props.id;
    const [rows, setRows] = useState([]);
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'name', headerName: 'Service Offer', width: 200},
        {field: 'desc', headerName: 'Description', flex: 1},
    ];
    const [editorContent, setEditorContent] = useState('');
    const [name, setName] = useState('');

    const fetchData = () => {
        axios.get('http://localhost:3001/api/service-offer')
        .then(response => {
            const rows = response.data.map(item => ({
                id: item.service_offer_id,
                name: item.name,
                desc: item.description.replace(/<\/?p>/g, ''),
            }));
            setRows(rows);
        })
        .catch(error => {
            console.log(error);
        });
    }
    const handleAddServiceOffer = () => {
        axios.post('http://localhost:3001/api/add-service-offer', {
            name: name,
            desc: editorContent,
        })
        .then(response => {
            alert('Successfully added.');
            fetchData();
            console.log(response);
            setName('');
            setEditorContent('');
        })
        .catch(error => {
            console.log(error);
        })
    };
    const [options, setOptions] = useState([]);
    const [selectOption, setSelectedOption] = useState(null);
    const [selectOptionName, setSelectedOptionName] = useState(null);
    const [description, setDescription] = useState(null);
  
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption.value);
        setSelectedOptionName(selectedOption.label);
    
        if(selectedOption) {
          axios.get('http://localhost:3001/api/desc-service', {
            params: {
                descServiceID: selectedOption.value,
            }
          })
          .then(response => {
            setDescription(response.data[0].description);
          })
          .catch(error => {
            console.log(error);
          })
        }
    };

    const fetchOption = () => {
        axios.get('http://localhost:3001/api/option-service')
        .then((response) => {
        setOptions(response.data);
        })
        .catch((error) => {
        console.log(error);
        })
    };

    const handleUpdateService = () =>{
        if(!selectOption){
          alert('Please fill out the empty field.');
          return;
        }
        axios.put('http://localhost:3001/api/update-desc-service', {
            ServiceDescription: description,
            serviceID: selectOption,
        })
        .then(response => {
          axios.get('http://localhost:3001/api/desc-service', {
            params: {
                descServiceID: selectOption,
            }
          })
          .then(response => {
            setDescription(response.data[0].description);
            alert(`${selectOptionName}: Description Updated Successfully.`);
            // setDescription('');
            fetchData();
            // setOptions('');
          })
          .catch(error => {
            console.log(error);
          })
        })
        .catch(error => {
          console.log(error);
        })
      };
    useEffect(() => {
        fetchData();
        fetchOption();
    }, []);
    const tabs = [
        {
            title: 'Services Offers',
            content:
            <div className='mt-[50px]'>
                <div className='h-[500px] w-[100%] bg-white rounded-md'>
                    <DataGrid rows={rows} columns={columns} className='w-[100%]'/>
                </div>
            </div>
        },
        {
            title: 'Add Service Offer',
            content:
            <div className='mt-[50px]'>
                <h1 className='md:text-[25px] text-[#1ca350] font-bold'>Add Service Offer</h1>
                <input type="text" className="shadow-lg block w-full my-[30px] p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                <div className='bg-white h-[340px] rounded-md'>
                    <ReactQuill className='h-[300px] min-h-[200px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
                </div>
                <div className='flex justify-end mt-[60px] md:mt-[30px]'>
                    <button className='w-[150px] p-2 text-lg font-bold rounded-md bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleAddServiceOffer}>Add</button>
                </div>
            </div>
        },
        {
            title: 'Update Service Offer',
            content: 
            <div>
                <h1 className='md:text-[25px] font-bold text-[#1ca350]'>Update Privacy Policy</h1>
                <Select className='bg-white text-black my-[30px]' options={options} onChange={handleChange} placeholder="Select an option"/>
                <h1 className='mt-[20px] text-[#1ca350] md:text-[20px]'>Content</h1>
                <div className='bg-white h-[390px] mt-[5px]'>
                    <ReactQuill className=' h-[350px] text-black rounded-md' value={description} onChange={setDescription}/>
                </div>
                <div className='flex justify-end mt-[30px]'>
                    <button className='w-[150px] p-2 rounded-md bg-white text-[#1ca350] font-bold hover:text-white hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleUpdateService}>Confirm</button>
                </div>
            </div>
        }
    ];
    
  return (
    <div className='mt-[90px] mx-[50px]'>
      <h1 className='md:text-[30px] font-extrabold text-[#1ca350]'>Service Offers</h1>
      <PosTabs tabs={tabs}/>
    </div>
  )
}

export default SettingsServiceOffer