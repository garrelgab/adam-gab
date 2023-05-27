import React, { useEffect, useState } from 'react';
import PosTabs from './PosTabs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
const DashboardHealthTips = (props) => {
    const [name, setName] = useState('');
    const [equipment, setEquipment] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const userID = props.id;
    const [rows, setRows] = useState([]);

    const renderInstructionCell = (params) => {
        const instructionText = params.value
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .split('. ') // Split into sentences
        .map((sentence, index) => (
          <div key={index}>
            {`${index + 1}. ${sentence.trim()}`}
          </div>
        ));
      return <div style={{ whiteSpace: 'pre-wrap' }}>{instructionText}</div>;
    };

    const renderImageCell = (params) => {
        return (
          <img
            src={params.value}
            alt="Instruction"
            style={{ width: '100%', height: 'auto' }}
          />
        );
      };
    const columns = [
        // {field: 'id', headerName: 'ID', width: 100},
        {field: 'name', headerName: 'Type of Workout', width: 250},
        {
            field: 'equipment',
            headerName: 'Equipment',
            width: 300, // Set the desired width
            renderCell: (params) => (
            <div style={{ width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{params.value}</div>
            ),
        },
        {
            field: 'instruction',
            headerName: 'Instruction',
            width: 500, // Set the desired width
            renderCell: renderInstructionCell,
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 500,
            renderCell: renderImageCell,
        },
    ];
    
    const fetchHealthGuide = () => {
        axios.get('http://localhost:3001/api/health-guide')
          .then(response => {
            const rows = response.data.map(item => ({
                id: item.health_guide_id,
                name: item.name,
                equipment: item.equipment,
                instruction: item.instruction.replace(/<\/?p>/g, ''),
                image: item.instruction_image.toString('base64'),
            }));
            setRows(rows);
          })
          .catch(error => {
            console.log(error);
          });
    };
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
        setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleConfirm = () => {
        if(!name || !equipment || !editorContent){
            alert('Please fill up the empty field.');
            return;
        }
        axios.post('http://localhost:3001/api/add-health-guide', { 
            imageData: selectedImage,
            name: name,
            equipment: equipment,
            instruction: editorContent,
            accID: userID,
        })
        .then((response) => {
            alert(`${name}, Successfully saved.`);
            fetchHealthGuide();
            
        })
        .catch((error) => {
            console.log('Error uploading image:', error);
        });
        setName('');
        setEquipment('');
        setEditorContent('');
        setSelectedImage(null);
        setSelectedImage('');
    };

    useEffect(() => {
        fetchHealthGuide();
    }, []);
    const rowHeight = 300;
    const tabs = [
        {
            title: 'Health Media Guide',
            content: 
            <div>
                <h1 className='md:text-[25px] text-[#1ca350] font-bold'>Health Media Guide</h1>
                <div className='bg-[white] h-[600px] rounded-md'>
                    <DataGrid rows={rows} columns={columns} rowHeight={rowHeight} className='text-black w-[100%]'/>
                </div>
            </div>
        },
        {
            title: 'Add Health Media Guide',
            content:
            <div className='text-black'>
                <h1 className='md:text-[25px] text-[#1ca350] font-bold'>Add Health Media Guide</h1>

                <div className='my-[5px]'>
                    <h1 className='md:text-[20px] mt-[30px] text-[#1ca350] font-bold'>Name</h1>
                    <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className='my-[5px]'>
                    <h1 className='md:text-[20px] text-[#1ca350] font-bold'>Equipment</h1>
                    <input type="text" className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" placeholder='Equipment' value={equipment} onChange={(e) => setEquipment(e.target.value)} required/>
                </div>
                <div className='my-[5px]'>
                    <h1 className='md:text-[20px] text-[#1ca350] font-bold'>Upload Image</h1>
                    <input type="file" accept='image/*' className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" onChange={handleImageUpload} required/>
                </div>
                <div className='my-[5px]'>
                    <h1 className='md:text-[20px] text-[#1ca350] font-bold'>Instruction</h1>
                    <div className='bg-white h-[240px]'>
                        <ReactQuill className=' h-[200px] min-h-[200px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
                    </div>
                </div>
                <div className='flex justify-end mt-[30px]'>
                    <button className='w-[150px] p-2 text-lg rounded-md bg-white text-black hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        }
    ];

    
  return (
    <div className='px-[30px] py-[90px] text-[black] bg-[#d3d3d3]'>
        <h1 className='text-[30px] font-extrabold text-[#1ca350]'>Health Media Guide</h1>
        <div>
            <PosTabs tabs={tabs}/>
        </div>
        
    </div>
  )
}

export default DashboardHealthTips