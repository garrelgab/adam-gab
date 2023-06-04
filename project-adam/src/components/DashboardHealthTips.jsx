import React, { useEffect, useRef, useState } from 'react';
import PosTabs from './PosTabs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Buffer } from 'buffer';
import ImageModal from './ImageModal';

const DashboardHealthTips = (props) => {
    const [name, setName] = useState('');
    const [equipment, setEquipment] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const fileRef = useRef(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalImageData, setModalImageData] = useState(null);  
    const userID = props.id;
    const [rows, setRows] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const renderInstructionCell = (params) => {
        const instructionText = params.value
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .split('. ') // Split into sentences
        .map((sentence, index) => (
          <div key={index}>
            {`${index + 1}. ${sentence.trim()}`}
          </div>
        ));
      return <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight:250}}>{instructionText}</div>;
    };
    const columns = [
        // {field: 'id', headerName: 'ID', width: 100},
        {field: 'name', headerName: 'Type of Workout', width: 250},
        {
            field: 'equipment',
            headerName: 'Equipment',
            width: 200, // Set the desired width
            renderCell: (params) => (
            <div style={{ width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{params.value}</div>
            ),
        },
        {
            field: 'instruction',
            headerName: 'Instruction',
            flex: 1, // Set the desired width
            renderCell: renderInstructionCell,
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 450,
            renderCell: (params) => (
            //   <Button
            //     variant="contained"
            //     color="primary"
            //     sx={{
            //       backgroundColor: 'white',
            //       color: 'gray',
            //       '&:hover': {
            //         backgroundColor: 'gray',
            //         color: 'white',
            //       },
            //     }}
            //     onClick={() => handleButtonClick(params.row)}
            //   >
            //     View Image
            //   </Button>
            <img
                src={imageSrc} // Assuming the 'image' field contains the URL of the image
                alt="Image"
                style={{
                width: '400px',
                height: 'auto',
                cursor: 'pointer',
                }}
                // onClick={() => handleImageClick(params.row)}
            />
            ),
        },
    ];
    const handleButtonClick = (row) => {
        setModalImageData(row.image);
        console.log(row);
        setOpenModal(true);
    };
    const bufferToBase64 = (buffer) => {
        const base64String = Buffer.from(buffer).toString('base64');
        return `data:image/png;base64,${base64String}`;
    };
    // const fetchHealthGuide = () => {
    //     axios.get('http://localhost:3001/api/health-guide')
    //       .then(response => {
    //         const rows = response.data.map(item => ({
    //             id: item.health_guide_id,
    //             name: item.name,
    //             equipment: item.equipment,
    //             instruction: item.instruction.replace(/<\/?p>/g, ''),
    //             image: item.instruction_image ? bufferToBase64(Buffer.from(item.instruction_image)) : null,
    //         }));
    //         setRows(rows);
    //     })
    //     .catch(error => {
    //     console.log(error);
    //     });
    // };

    const fetchHealthGuide = () => {
        axios.get('http://localhost:3001/api/health-guide')
          .then(response => {
            const rows = response.data.map(async item => {
              const row = {
                id: item.health_guide_id,
                name: item.name,
                equipment: item.equipment,
                instruction: item.instruction.replace(/<\/?p>/g, ''),
                image: null, // Initially set the image as null
              };
      
              if (item.instruction_image) {
                try {
                  const imageResponse = await axios.get('http://localhost:3001/api/health-guide-image', {
                    params: { healthID: item.health_guide_id }
                  });
                  const imageData = imageResponse.data[0].instruction_image;
                  row.image = bufferToBase64(Buffer.from(imageData));
                  setImageSrc(row.image)
                } catch (error) {
                  console.log('Failed to fetch image for health guide', error);
                }
              }
      
              return row;
            });
      
            Promise.all(rows)
              .then(completedRows => {
                setRows(completedRows);
              })
              .catch(error => {
                console.log('Failed to fetch health guide rows', error);
              });
          })
          .catch(error => {
            console.log('Failed to fetch health guide', error);
          });
    };
      
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
        if (file && isFileSupported(file)) {
          const imageData = reader.result.split(',')[1];
          setSelectedImage(imageData);
        } else {
          alert('Please upload a PNG or JPEG (JPG) file.');
          setSelectedImage(null);
        }
        };
        reader.readAsDataURL(file);
    };

    const isFileSupported = (file) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return allowedTypes.includes(file.type);
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
        if(fileRef.current){
            fileRef.current.value = '';
        }
    };

    useEffect(() => {
        fetchHealthGuide();
    }, []);
    const tabs = [
        {
            title: 'Health Media Guide',
            content: 
            <div>
                <h1 className='md:text-[25px] text-[#1ca350] font-bold'>Health Media Guide</h1>
                <div className='bg-[white] h-[600px] rounded-md'>
                    <DataGrid rows={rows} columns={columns} rowHeight={270} className='text-black w-[100%]'/>
                </div>
                <ImageModal open={openModal} onClose={() => setOpenModal(false)} imageData={modalImageData} />

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
                    <input type="file" ref={fileRef} accept='image/*' className="shadow-lg block w-full  p-3 md:p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md focus:outline-none" onChange={handleImageUpload} required/>
                </div>
                <div className='my-[5px]'>
                    <h1 className='md:text-[20px] text-[#1ca350] font-bold'>Instruction</h1>
                    <div className='bg-white h-[240px]'>
                        <ReactQuill className=' h-[200px] min-h-[200px] text-black rounded-md' value={editorContent} onChange={setEditorContent}/>
                    </div>
                </div>
                <div className='flex justify-end mt-[30px]'>
                    <button className='w-[150px] p-2 font-bold rounded-md bg-white text-[#1ca350] hover:text-white hover:bg-gray-500 shadow-lg hover:shadow-xl ease-in-out duration-300' onClick={handleConfirm}>Confirm</button>
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