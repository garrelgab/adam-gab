import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import PosTabs from './PosTabs';
import { DataGrid } from '@mui/x-data-grid';

const FAQs = () => {

  axios.defaults.withCredentials = true;
  
  const [description, setDescription] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectOption, setSelectedOption] = useState(null);
  const [selectOptionName, setSelectedOptionName] = useState(null);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    // { field: 'name', headerName: 'Question', width: 350 },
    {
      field: 'name',
      headerName: 'Question',
      width: 500, // Set the desired width
      renderCell: (params) => (
        <div style={{ width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{params.value}</div>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 500, // Set the desired width
      renderCell: (params) => (
        <div style={{ width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{params.value}</div>
      ),

    }
    // { field: 'description', headerName: 'Description', width: 650 },
  ];
  useEffect(() => {
    axios.get('http://localhost:3001/api/option-faq')
    .then((response) => {
      setOptions(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    fetchData();
  },[]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    setSelectedOptionName(selectedOption.label);

    if(selectedOption) {
      axios.get('http://localhost:3001/api/desc-faq', {
        params: {
          descFaqID: selectedOption.value,
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
  //Update FAQs
  const handleUpdateFaq = () =>{
    if(!selectOption){
      alert('Please fill out the empty field.');
      return;
    }
    axios.put('http://localhost:3001/api/update-desc-faq', {
      FaqDescription: description,
      FaqID: selectOption,
    })
    .then(response => {
      axios.get('http://localhost:3001/api/desc-faq', {
        params: {
          descFaqID: selectOption,
        }
      })
      .then(response => {
        setDescription(response.data[0].description);
        alert(` ${selectOptionName}: Description Updated Successfully.`);
        fetchData();
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  };
  //Add FAQs
  const [name, setName] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const status = 'Active';

  const handleAddFaq = () => {
    if(!name){
        alert('Please fill up the empty field');
    }
    if(!editorContent){
        alert('Please fill up the empty field');
    }
    axios.post('http://localhost:3001/api/add-faq', {
        addFaq: name,
        addDescription: editorContent,
        addStatus: status,
    })
    .then((response) => {
        alert('Successfully Added.', name);
        fetchData();
    })
    .catch((error) => {
        console.error('Error saving data.', error)
    })
    setName('');
    setEditorContent('');
    // props.onClose(false);
  }

  //FAQ's
  

  const fetchData = () => {
    axios.get("http://localhost:3001/api/faqs")
    .then(response => {
        const rows = response.data.map(item => ({
        id: item.faq_id,
        name: item.name,
        description: item.description.replace(/<\/?p>/g, ''),
        // qty: item.stock,
        }));
        setRows(rows);
    })
    .catch(error => {
        console.error(error);
    });
  };
  const tabs = [
    {
      title: "FAQ's",
      content: 
      <div className='w-[100%] h-[400px] bg-[white]'>
        <DataGrid rows={rows} columns={columns}/>
      </div>
    },
    {
      title: "Add FAQ's",
      content: 
      <div>
          <h1 className='md:text-[25px] font-light text-[#93F4D3]'>Add FAQ's</h1>
          <h1 className='mt-[20px] text-[#93f4d3] md:text-[20px]'>Questions</h1>
          <input type="text" className="shadow-lg block w-full mt-[5px] p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Question' value={name} onChange={(e) => setName(e.target.value)} required/>
          <h1 className='mt-[20px] text-[#93f4d3] md:text-[20px]'>Content</h1>
          <div className='bg-white h-[240px]'>
              <ReactQuill className=' h-[200px] min-h-[200px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
          </div>
          <div className='flex justify-end mt-[60px] md:mt-[30px]'>
              <button className='w-[150px] p-2 text-lg font-light rounded-md bg-white hover:bg-gray-500 text-black shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleAddFaq}>Add</button>
          </div>
      </div>,
    },
    {
      title: "Update FAQ's",
      content: 
      <div>
          <h1 className='md:text-[25px] font-light text-[#93F4D3]'>Update FAQ's</h1>
        <h1 className='mt-[20px] text-[#93f4d3] md:text-[20px]'>Questions</h1>
        <Select className='bg-white text-black mt-[5px]' options={options} onChange={handleChange} placeholder="Select question"/>
        <h1 className='mt-[20px] text-[#93f4d3] md:text-[20px]'>Content</h1>
        <div className='bg-white h-[390px] mt-[5px]'>
            <ReactQuill className=' h-[350px] text-black rounded-md' value={description} onChange={setDescription}/>
        </div>
        <div className='flex justify-end mt-[30px]'>
            <button className='w-[150px] p-2 text-lg rounded-md bg-white text-black hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleUpdateFaq}>Confirm</button>
        </div>
      </div>,
    },
  ];
  return (
    <div className='mt-[90px] mx-[50px]'>
      <h1 className='text-[30px] mb-[30px] text-[#93F4D3] font-light'>FAQ's</h1>
      <div>
        <PosTabs tabs={tabs}/>
      </div>
    </div>
  )
}

export default FAQs