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

  const renderInstructionCell = (params) => {
    const descriptionText = params.value
    .replace(/<[^>]+>/g, '') // Remove HTML tags
  return <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight:250}}>{descriptionText}</div>;
};
  const columns = [
    // { field: 'id', headerName: 'ID', width: 150 },
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
      flex: 1, // Set the desired width
      renderCell: renderInstructionCell,

    }
    // { field: 'description', headerName: 'Description', width: 650 },
  ];
  const fetchOptions = () => {
    axios.get('http://localhost:3001/api/option-faq')
    .then((response) => {
      setOptions(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    fetchOptions();
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
        fetchOptions();
    })
    .catch((error) => {
        console.error('Error saving data.', error)
    })
    setName('');
    setEditorContent('');
    // props.onClose(false);
  }

  //FAQ's
  
  const clearText = () => {
    setName('');
    setEditorContent('');
  }

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
      <div className='w-[100%] h-[700px] my-[50px] rounded-md bg-[white]'>
        <DataGrid rows={rows} columns={columns} rowHeight={150} className='w-[100%]'/>
      </div>
    },
    {
      title: "Add FAQ's",
      content: 
      <div>
          <h1 className='md:text-[25px] font-bold text-[#1ca350]'>Add FAQ's</h1>
          <h1 className='mt-[20px] text-[#1ca350] font-bold md:text-[20px]'>Questions</h1>
          <input type="text" className="shadow-lg block w-full mt-[5px] p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Question' value={name} onChange={(e) => setName(e.target.value)} required/>
          <h1 className='mt-[20px] text-[#1ca350] font-bold md:text-[20px]'>Content</h1>
          <div className='bg-white h-[240px] rounded-md'>
              <ReactQuill className=' h-[200px] min-h-[200px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
          </div>
          <div className='flex justify-end mt-[60px] md:mt-[30px]'>
              <button className='w-[150px] p-2 font-bold rounded-md bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleAddFaq}>Add</button>
          </div>
      </div>,
    },
    {
      title: "Update FAQ's",
      content: 
      <div>
          <h1 className='md:text-[25px] font-bold text-[#1ca350]'>Update FAQ's</h1>
        <h1 className='mt-[20px] text-[#1ca350] font-bold md:text-[20px]'>Questions</h1>
        <Select className='bg-white text-black mt-[5px]' options={options} onChange={handleChange} placeholder="Select question"/>
        <h1 className='mt-[20px] text-[#1ca350] font-bold md:text-[20px]'>Content</h1>
        <div className='bg-white h-[390px] mt-[5px] rounded-md'>
            <ReactQuill className=' h-[350px] text-black rounded-md' value={description} onChange={setDescription}/>
        </div>
        <div className='flex justify-end mt-[30px]'>
            <button className='w-[150px] p-2 font-bold rounded-md bg-white text-[#1ca350] hover:text-white hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleUpdateFaq}>Confirm</button>
        </div>
      </div>,
    },
  ];
  return (
    <div className='mt-[90px] mx-[50px]'>
      <h1 className='text-[30px] mb-[30px] text-[#1ca350] font-extrabold'>FAQ's</h1>
      <div>
        <PosTabs tabs={tabs}/>
      </div>
    </div>
  )
}

export default FAQs